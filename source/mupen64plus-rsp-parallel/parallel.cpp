#ifdef DEBUG_JIT
#include "debug_rsp.hpp"
#else
#include "rsp_jit.hpp"
#endif
#include <stdint.h>
#include <cstdarg>

#include "m64p_plugin.h"
#include "rsp_1.1.h"

#include "m64p_frontend.h"

#define RSP_PARALLEL_VERSION 0x0101
#define RSP_PLUGIN_API_VERSION 0x020000

#define CONFIG_API_VERSION       0x020100
#define CONFIG_PARAM_VERSION     1.00

static void (*l_DebugCallback)(void *, int, const char *) = NULL;
static void *l_DebugCallContext = NULL;
static int l_PluginInit = 0;
static m64p_handle l_ConfigRsp;

#define VERSION_PRINTF_SPLIT(x) (((x) >> 16) & 0xffff), (((x) >> 8) & 0xff), ((x) & 0xff)

ptr_ConfigOpenSection      ConfigOpenSection = NULL;
ptr_ConfigDeleteSection    ConfigDeleteSection = NULL;
ptr_ConfigSetParameter     ConfigSetParameter = NULL;
ptr_ConfigGetParameter     ConfigGetParameter = NULL;
ptr_ConfigSetDefaultFloat  ConfigSetDefaultFloat;
ptr_ConfigSetDefaultBool   ConfigSetDefaultBool = NULL;
ptr_ConfigGetParamBool     ConfigGetParamBool = NULL;
ptr_CoreDoCommand          CoreDoCommand = NULL;

bool CFG_HLE_GFX = 0;
bool CFG_HLE_AUD = 0;

#ifdef _WIN32
#define DLSYM(a, b) GetProcAddress(a, b)
#else
#include <dlfcn.h>
#define DLSYM(a, b) dlsym(a, b)
#endif

#define ATTR_FMT(fmtpos, attrpos) __attribute__ ((format (printf, fmtpos, attrpos)))
static void DebugMessage(int level, const char *message, ...) ATTR_FMT(2, 3);

void DebugMessage(int level, const char *message, ...)
{
    char msgbuf[1024];
    va_list args;

    if (l_DebugCallback == NULL)
        return;

    va_start(args, message);
    vsprintf(msgbuf, message, args);

    (*l_DebugCallback)(l_DebugCallContext, level, msgbuf);

    va_end(args);
}

namespace RSP
{
RSP_INFO rsp;
#ifdef DEBUG_JIT
RSP::CPU cpu;
#else
RSP::JIT::CPU cpu;
#endif
short MFC0_count[32];
int SP_STATUS_TIMEOUT;
} // namespace RSP

extern "C"
{
	// Hack entry point to use when loading savestates when we're tracing.
	void rsp_clear_registers()
	{
		memset(RSP::cpu.get_state().sr, 0, sizeof(uint32_t) * 32);
		memset(&RSP::cpu.get_state().cp2, 0, sizeof(RSP::cpu.get_state().cp2));
	}

#ifdef INTENSE_DEBUG
	// Need super-fast hash here.
	static uint64_t hash_imem(const uint8_t *data, size_t size)
	{
		uint64_t h = 0xcbf29ce484222325ull;
		size_t i;
		for (i = 0; i < size; i++)
			h = (h * 0x100000001b3ull) ^ data[i];
		return h;
	}

	void log_rsp_mem_parallel(void)
	{
		fprintf(stderr, "IMEM HASH: 0x%016llx\n", hash_imem(RSP::rsp.IMEM, 0x1000));
		fprintf(stderr, "DMEM HASH: 0x%016llx\n", hash_imem(RSP::rsp.DMEM, 0x1000));
	}
#endif

	EXPORT unsigned int CALL DoRspCycles(unsigned int cycles)
	{
		uint32_t TaskType = *(uint32_t*)(RSP::rsp.DMEM + 0xFC0);
		bool compareTaskType = *(uint32_t*)(RSP::rsp.DMEM + 0x0ff0) != 0;

		if (TaskType == 1 && compareTaskType && CFG_HLE_GFX != 0)
		{
			if (RSP::rsp.ProcessDlistList)
			{
				RSP::rsp.ProcessDlistList();
			}
			*RSP::rsp.SP_STATUS_REG |= (0x0203 );
			if ((*RSP::rsp.SP_STATUS_REG & SP_STATUS_INTR_BREAK) != 0 )
			{
				*RSP::rsp.MI_INTR_REG |= 1;
				RSP::rsp.CheckInterrupts();
			}
			return cycles;
		}

		else if (TaskType == 2 && compareTaskType && CFG_HLE_AUD != 0)
		{
			if (RSP::rsp.ProcessAlistList)
			{
				RSP::rsp.ProcessAlistList();
			}
			*RSP::rsp.SP_STATUS_REG |= (0x0203 );
			if ((*RSP::rsp.SP_STATUS_REG & SP_STATUS_INTR_BREAK) != 0 )
			{
				*RSP::rsp.MI_INTR_REG |= 1;
				RSP::rsp.CheckInterrupts();
			}
			return cycles;
		}

		if (*RSP::rsp.SP_STATUS_REG & (SP_STATUS_HALT | SP_STATUS_BROKE))
			return 0;

		// We don't know if Mupen from the outside invalidated our IMEM.
		RSP::cpu.invalidate_imem();

		// Run CPU until we either break or we need to fire an IRQ.
		RSP::cpu.get_state().pc = *RSP::rsp.SP_PC_REG & 0xfff;

#ifdef INTENSE_DEBUG
		fprintf(stderr, "RUN TASK: %u\n", RSP::cpu.get_state().pc);
		log_rsp_mem_parallel();
#endif

		for (auto &count : RSP::MFC0_count)
			count = 0;

		while (!(*RSP::rsp.SP_STATUS_REG & SP_STATUS_HALT))
		{
			auto mode = RSP::cpu.run();
			if (mode == RSP::MODE_CHECK_FLAGS && (*RSP::cpu.get_state().cp0.irq & 1))
				break;
		}

		*RSP::rsp.SP_PC_REG = 0x04001000 | (RSP::cpu.get_state().pc & 0xffc);

		// From CXD4.
		if (*RSP::rsp.SP_STATUS_REG & SP_STATUS_BROKE)
			return cycles;
		else if (*RSP::cpu.get_state().cp0.irq & 1)
			RSP::rsp.CheckInterrupts();
		else if (*RSP::rsp.SP_STATUS_REG & SP_STATUS_HALT)
			return cycles;
		else if (*RSP::rsp.SP_SEMAPHORE_REG != 0) // Semaphore lock fixes.
		{
		}
		else
			RSP::SP_STATUS_TIMEOUT = 16; // From now on, wait 16 times, not 0x7fff

		// CPU restarts with the correct SIGs.
		*RSP::rsp.SP_STATUS_REG &= ~SP_STATUS_HALT;

		return cycles;
	}

	EXPORT m64p_error CALL PluginGetVersion(m64p_plugin_type *PluginType, int *PluginVersion,
	                                                   int *APIVersion, const char **PluginNamePtr, int *Capabilities)
	{
		/* set version info */
		if (PluginType != NULL)
			*PluginType = M64PLUGIN_RSP;

		if (PluginVersion != NULL)
			*PluginVersion = RSP_PARALLEL_VERSION;

		if (APIVersion != NULL)
			*APIVersion = RSP_PLUGIN_API_VERSION;

		if (PluginNamePtr != NULL)
			*PluginNamePtr = "ParaLLEl RSP";

		if (Capabilities != NULL)
			*Capabilities = 0;

		return M64ERR_SUCCESS;
	}

	EXPORT void CALL RomClosed(void)
	{
		*RSP::rsp.SP_PC_REG = 0x00000000;
	}

	EXPORT void CALL InitiateRSP(RSP_INFO Rsp_Info, unsigned int *CycleCount)
	{
		if (CycleCount)
			*CycleCount = 0;

		CFG_HLE_GFX = ConfigGetParamBool(l_ConfigRsp, "DisplayListToGraphicsPlugin");
		CFG_HLE_AUD = ConfigGetParamBool(l_ConfigRsp, "AudioListToAudioPlugin");

		if (Rsp_Info.DMEM == Rsp_Info.IMEM) /* usually dummy RSP data for testing */
			return; /* DMA is not executed just because plugin initiates. */

		RSP::rsp = Rsp_Info;
		*RSP::rsp.SP_PC_REG = 0x04001000 & 0x00000FFF; /* task init bug on Mupen64 */

		auto **cr = RSP::cpu.get_state().cp0.cr;
		cr[0x0] = RSP::rsp.SP_MEM_ADDR_REG;
		cr[0x1] = RSP::rsp.SP_DRAM_ADDR_REG;
		cr[0x2] = RSP::rsp.SP_RD_LEN_REG;
		cr[0x3] = RSP::rsp.SP_WR_LEN_REG;
		cr[0x4] = RSP::rsp.SP_STATUS_REG;
		cr[0x5] = RSP::rsp.SP_DMA_FULL_REG;
		cr[0x6] = RSP::rsp.SP_DMA_BUSY_REG;
		cr[0x7] = RSP::rsp.SP_SEMAPHORE_REG;
		cr[0x8] = RSP::rsp.DPC_START_REG;
		cr[0x9] = RSP::rsp.DPC_END_REG;
		cr[0xA] = RSP::rsp.DPC_CURRENT_REG;
		cr[0xB] = RSP::rsp.DPC_STATUS_REG;
		cr[0xC] = RSP::rsp.DPC_CLOCK_REG;
		cr[0xD] = RSP::rsp.DPC_BUFBUSY_REG;
		cr[0xE] = RSP::rsp.DPC_PIPEBUSY_REG;
		cr[0xF] = RSP::rsp.DPC_TMEM_REG;

		*cr[RSP::CP0_REGISTER_SP_STATUS] = SP_STATUS_HALT;
		RSP::cpu.get_state().cp0.irq = RSP::rsp.MI_INTR_REG;

		// From CXD4.
		RSP::SP_STATUS_TIMEOUT = 0x7fff;

		RSP::cpu.set_dmem(reinterpret_cast<uint32_t *>(Rsp_Info.DMEM));
		RSP::cpu.set_imem(reinterpret_cast<uint32_t *>(Rsp_Info.IMEM));
		RSP::cpu.set_rdram(reinterpret_cast<uint32_t *>(Rsp_Info.RDRAM));
	}

	EXPORT m64p_error CALL PluginStartup(m64p_dynlib_handle CoreLibHandle, void *Context,
									 void (*DebugCallback)(void *, int, const char *))
	{
		ptr_CoreGetAPIVersions CoreAPIVersionFunc;
		
		int ConfigAPIVersion, DebugAPIVersion, VidextAPIVersion;
		float fConfigParamsVersion = 0.0f;
		
		if (l_PluginInit)
		    return M64ERR_ALREADY_INIT;
		
		/* first thing is to set the callback function for debug info */
		l_DebugCallback = DebugCallback;
		l_DebugCallContext = Context;
		
		/* attach and call the CoreGetAPIVersions function, check Config API version for compatibility */
		CoreAPIVersionFunc = (ptr_CoreGetAPIVersions) DLSYM(CoreLibHandle, "CoreGetAPIVersions");
		if (CoreAPIVersionFunc == NULL)
		{
		    DebugMessage(M64MSG_ERROR, "Core emulator broken; no CoreAPIVersionFunc() function found.");
		    return M64ERR_INCOMPATIBLE;
		}
		
		(*CoreAPIVersionFunc)(&ConfigAPIVersion, &DebugAPIVersion, &VidextAPIVersion, NULL);
		if ((ConfigAPIVersion & 0xffff0000) != (CONFIG_API_VERSION & 0xffff0000))
		{
		    DebugMessage(M64MSG_ERROR, "Emulator core Config API (v%i.%i.%i) incompatible with plugin (v%i.%i.%i)",
		            VERSION_PRINTF_SPLIT(ConfigAPIVersion), VERSION_PRINTF_SPLIT(CONFIG_API_VERSION));
		    return M64ERR_INCOMPATIBLE;
		}
		
		/* Get the core config function pointers from the library handle */
		ConfigOpenSection = (ptr_ConfigOpenSection) DLSYM(CoreLibHandle, "ConfigOpenSection");
		ConfigDeleteSection = (ptr_ConfigDeleteSection) DLSYM(CoreLibHandle, "ConfigDeleteSection");
		ConfigSetParameter = (ptr_ConfigSetParameter) DLSYM(CoreLibHandle, "ConfigSetParameter");
		ConfigGetParameter = (ptr_ConfigGetParameter) DLSYM(CoreLibHandle, "ConfigGetParameter");
		ConfigSetDefaultFloat = (ptr_ConfigSetDefaultFloat) DLSYM(CoreLibHandle, "ConfigSetDefaultFloat");
		ConfigSetDefaultBool = (ptr_ConfigSetDefaultBool) DLSYM(CoreLibHandle, "ConfigSetDefaultBool");
		ConfigGetParamBool = (ptr_ConfigGetParamBool) DLSYM(CoreLibHandle, "ConfigGetParamBool");
		CoreDoCommand = (ptr_CoreDoCommand) DLSYM(CoreLibHandle, "CoreDoCommand");
		
		if (!ConfigOpenSection || !ConfigDeleteSection || !ConfigSetParameter || !ConfigGetParameter ||
		    !ConfigSetDefaultBool || !ConfigGetParamBool || !ConfigSetDefaultFloat)
		    return M64ERR_INCOMPATIBLE;
		
		/* get a configuration section handle */
		if (ConfigOpenSection("RSP-Parallel", &l_ConfigRsp) != M64ERR_SUCCESS)
		{
		    DebugMessage(M64MSG_ERROR, "Couldn't open config section 'RSP-Parallel'");
		    return M64ERR_INPUT_NOT_FOUND;
		}
		
		/* check the section version number */
		if (ConfigGetParameter(l_ConfigRsp, "Version", M64TYPE_FLOAT, &fConfigParamsVersion, sizeof(float)) != M64ERR_SUCCESS)
		{
		    DebugMessage(M64MSG_WARNING, "No version number in 'RSP-Parallel' config section. Setting defaults.");
		    ConfigDeleteSection("RSP-Parallel");
		    ConfigOpenSection("RSP-Parallel", &l_ConfigRsp);
		}
		else if (((int) fConfigParamsVersion) != ((int) CONFIG_PARAM_VERSION))
		{
		    DebugMessage(M64MSG_WARNING, "Incompatible version %.2f in 'RSP-Parallel' config section: current is %.2f. Setting defaults.", fConfigParamsVersion, (float) CONFIG_PARAM_VERSION);
		    ConfigDeleteSection("RSP-Parallel");
		    ConfigOpenSection("RSP-Parallel", &l_ConfigRsp);
		}
		else if ((CONFIG_PARAM_VERSION - fConfigParamsVersion) >= 0.0001f)
		{
		    /* handle upgrades */
		    float fVersion = CONFIG_PARAM_VERSION;
		    ConfigSetParameter(l_ConfigRsp, "Version", M64TYPE_FLOAT, &fVersion);
		    DebugMessage(M64MSG_INFO, "Updating parameter set version in 'RSP-Parallel' config section to %.2f", fVersion);
		}
		
		/* set the default values for this plugin */
		ConfigSetDefaultFloat(l_ConfigRsp, "Version", CONFIG_PARAM_VERSION,  "Mupen64Plus Parallel RSP Plugin config parameter version number");
		ConfigSetDefaultBool(l_ConfigRsp, "DisplayListToGraphicsPlugin", 0, "Send display lists to the graphics plugin");
		ConfigSetDefaultBool(l_ConfigRsp, "AudioListToAudioPlugin", 0, "Send audio lists to the audio plugin");
		
		l_PluginInit = 1;
		return M64ERR_SUCCESS;
	}

	EXPORT m64p_error CALL PluginShutdown(void)
	{
		return M64ERR_SUCCESS;
	}

	EXPORT int CALL RomOpen(void)
	{
		return 1;
	}
}
