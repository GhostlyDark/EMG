/*
 * z64
 *
 * Copyright (C) 2007  ziggy
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
**/

#include <assert.h>
#include <stdarg.h>
#include <stdio.h>
#include <string.h>

#include "m64p_config.h"
#include "m64p_frontend.h"
#include "m64p_plugin.h"
#include "m64p_types.h"
#include "osal_dynamiclib.h"
#include "rsp.h"
#include "z64.h"

#define RSP_Z64_VERSION        0x020000
#define RSP_PLUGIN_API_VERSION 0x020000

#define CONFIG_API_VERSION       0x020100
#define CONFIG_PARAM_VERSION     1.00

#define L_NAME "Z64 RSP Plugin"

static void (*l_DebugCallback)(void *, int, const char *) = NULL;
static void *l_DebugCallContext = NULL;
static int l_PluginInit = 0;
static m64p_handle l_ConfigRsp;

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

#if 0
static void dump()
{
    FILE * fp = fopen("rsp.dump", "w");
    assert(fp);
    fwrite(rdram, 8*1024, 1024, fp);
    fwrite(rsp_dmem, 0x2000, 1, fp);
    fwrite(rsp.ext.MI_INTR_REG, 4, 1, fp);

    fwrite(rsp.ext.SP_MEM_ADDR_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_DRAM_ADDR_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_RD_LEN_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_WR_LEN_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_STATUS_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_DMA_FULL_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_DMA_BUSY_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_PC_REG, 4, 1, fp);
    fwrite(rsp.ext.SP_SEMAPHORE_REG, 4, 1, fp);

    fwrite(rsp.ext.DPC_START_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_END_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_CURRENT_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_STATUS_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_CLOCK_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_BUFBUSY_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_PIPEBUSY_REG, 4, 1, fp);
    fwrite(rsp.ext.DPC_TMEM_REG, 4, 1, fp);
    fclose(fp);
}
#endif

void log(m64p_msg_level level, const char *msg, ...)
{
    char buf[1024];
    va_list args;
    va_start(args, msg);
    vsnprintf(buf, 1023, msg, args);
    buf[1023]='\0';
    va_end(args);
    if (l_DebugCallback)
    {
        l_DebugCallback(l_DebugCallContext, level, buf);
    }
}

#ifdef __cplusplus
extern "C" {
#endif

    /* DLL-exported functions */
    EXPORT m64p_error CALL PluginStartup(m64p_dynlib_handle CoreLibHandle, void *Context,
        void (*DebugCallback)(void *, int, const char *))
    {
        float fConfigParamsVersion = 0.0f;

        if (l_PluginInit)
            return M64ERR_ALREADY_INIT;

        ///* first thing is to set the callback function for debug info */
        l_DebugCallback = DebugCallback;
        l_DebugCallContext = Context;

        ///* Get the core config function pointers from the library handle */
        ConfigOpenSection = (ptr_ConfigOpenSection) osal_dynlib_getproc(CoreLibHandle, "ConfigOpenSection");
        ConfigDeleteSection = (ptr_ConfigDeleteSection) osal_dynlib_getproc(CoreLibHandle, "ConfigDeleteSection");
        ConfigSetParameter = (ptr_ConfigSetParameter) osal_dynlib_getproc(CoreLibHandle, "ConfigSetParameter");
        ConfigGetParameter = (ptr_ConfigGetParameter) osal_dynlib_getproc(CoreLibHandle, "ConfigGetParameter");
        ConfigSetDefaultFloat = (ptr_ConfigSetDefaultFloat) osal_dynlib_getproc(CoreLibHandle, "ConfigSetDefaultFloat");
        ConfigSetDefaultBool = (ptr_ConfigSetDefaultBool) osal_dynlib_getproc(CoreLibHandle, "ConfigSetDefaultBool");
        ConfigGetParamBool = (ptr_ConfigGetParamBool) osal_dynlib_getproc(CoreLibHandle, "ConfigGetParamBool");
        CoreDoCommand = (ptr_CoreDoCommand) osal_dynlib_getproc(CoreLibHandle, "CoreDoCommand");

        if (!ConfigOpenSection || !ConfigDeleteSection || !ConfigSetParameter || !ConfigGetParameter ||
            !ConfigSetDefaultBool || !ConfigGetParamBool || !ConfigSetDefaultFloat)
            return M64ERR_INCOMPATIBLE;

        ///* get a configuration section handle */
        if (ConfigOpenSection("rsp-z64", &l_ConfigRsp) != M64ERR_SUCCESS)
        {
            DebugMessage(M64MSG_ERROR, "Couldn't open config section 'rsp-z64'");
            return M64ERR_INPUT_NOT_FOUND;
        }

        ///* check the section version number */
        if (ConfigGetParameter(l_ConfigRsp, "Version", M64TYPE_FLOAT, &fConfigParamsVersion, sizeof(float)) != M64ERR_SUCCESS)
        {
            DebugMessage(M64MSG_WARNING, "No version number in 'rsp-z64' config section. Setting defaults.");
            ConfigDeleteSection("rsp-z64");
            ConfigOpenSection("rsp-z64", &l_ConfigRsp);
        }
        else if (((int) fConfigParamsVersion) != ((int) CONFIG_PARAM_VERSION))
        {
            DebugMessage(M64MSG_WARNING, "Incompatible version %.2f in 'rsp-z64' config section: current is %.2f. Setting defaults.", fConfigParamsVersion, (float) CONFIG_PARAM_VERSION);
            ConfigDeleteSection("rsp-z64");
            ConfigOpenSection("rsp-z64", &l_ConfigRsp);
        }
        else if ((CONFIG_PARAM_VERSION - fConfigParamsVersion) >= 0.0001f)
        {
            ///* handle upgrades */
            float fVersion = CONFIG_PARAM_VERSION;
            ConfigSetParameter(l_ConfigRsp, "Version", M64TYPE_FLOAT, &fVersion);
            DebugMessage(M64MSG_INFO, "Updating parameter set version in 'rsp-z64' config section to %.2f", fVersion);
        }

        #ifndef HLEVIDEO
            int hlevideo = 0;
        #else
            int hlevideo = 1;
        #endif

        ///* set the default values for this plugin */
        ConfigSetDefaultFloat(l_ConfigRsp, "Version", CONFIG_PARAM_VERSION,  "Mupen64Plus z64 RSP Plugin config parameter version number");
        ConfigSetDefaultBool(l_ConfigRsp, "DisplayListToGraphicsPlugin", hlevideo, "Send display lists to the graphics plugin");
        ConfigSetDefaultBool(l_ConfigRsp, "AudioListToAudioPlugin", 0, "Send audio lists to the audio plugin");

        l_PluginInit = 1;
        return M64ERR_SUCCESS;
    }

    EXPORT m64p_error CALL PluginShutdown(void)
    {
        if (!l_PluginInit)
            return M64ERR_NOT_INIT;

        ///* reset some local variable */
        l_DebugCallback = NULL;
        l_DebugCallContext = NULL;

        l_PluginInit = 0;
        return M64ERR_SUCCESS;
    }

    EXPORT m64p_error CALL PluginGetVersion(m64p_plugin_type *PluginType, int *PluginVersion, int *APIVersion, const char **PluginNamePtr, int *Capabilities)
    {
        /* set version info */
        if (PluginType != NULL)
            *PluginType = M64PLUGIN_RSP;

        if (PluginVersion != NULL)
            *PluginVersion = RSP_Z64_VERSION;

        if (APIVersion != NULL)
            *APIVersion = RSP_PLUGIN_API_VERSION;

        if (PluginNamePtr != NULL)
            *PluginNamePtr = L_NAME;

        if (Capabilities != NULL)
        {
            *Capabilities = 0;
        }

        return M64ERR_SUCCESS;
    }

    EXPORT unsigned int CALL DoRspCycles(unsigned int Cycles)
    {
        uint32_t TaskType = *(uint32_t*)(z64_rspinfo.DMEM + 0xFC0);
        bool compareTaskType = *(uint32_t*)(z64_rspinfo.DMEM + 0x0ff0) != 0; /* Resident Evil 2, null task pointers */

#if 0
        if (TaskType == 1) {
            SDL_Event event;
            while (SDL_PollEvent(&event)) {
                switch (event.type) {
                    case SDL_KEYDOWN:
                        switch (event.key.keysym.sym) {
                            case 'd':
                                printf("Dumping !\n");
                                dump();
                                break;
                        }
                        break;
                }
            }
        }
#endif

        if (TaskType == 1 && compareTaskType && CFG_HLE_GFX != 0) {
            if (z64_rspinfo.ProcessDlistList != NULL) {
                z64_rspinfo.ProcessDlistList();
            }
            *z64_rspinfo.SP_STATUS_REG |= (0x0203);
            if ((*z64_rspinfo.SP_STATUS_REG & SP_STATUS_INTR_BREAK) != 0 ) {
                *z64_rspinfo.MI_INTR_REG |= R4300i_SP_Intr;
                z64_rspinfo.CheckInterrupts();
            }
            return Cycles;
        }

        if (TaskType == 2 && compareTaskType && CFG_HLE_AUD != 0) {
            if (z64_rspinfo.ProcessAlistList != NULL) {
                z64_rspinfo.ProcessAlistList();
            }
            *z64_rspinfo.SP_STATUS_REG |= (0x0203);
            if ((*z64_rspinfo.SP_STATUS_REG & SP_STATUS_INTR_BREAK) != 0 ) {
                *z64_rspinfo.MI_INTR_REG |= R4300i_SP_Intr;
                z64_rspinfo.CheckInterrupts();
            }
            return Cycles;
        }  

        if (z64_rspinfo.CheckInterrupts==NULL)
            log(M64MSG_WARNING, "Emulator doesn't provide CheckInterrupts routine");
        return rsp_execute(0x100000);
        //return Cycles;
    }

    EXPORT void CALL InitiateRSP(RSP_INFO Rsp_Info, unsigned int *CycleCount)
    {
        CFG_HLE_GFX = ConfigGetParamBool(l_ConfigRsp, "DisplayListToGraphicsPlugin");
        CFG_HLE_AUD = ConfigGetParamBool(l_ConfigRsp, "AudioListToAudioPlugin");

        log(M64MSG_STATUS, "INITIATE RSP");
        rsp_init(Rsp_Info);
        memset(((UINT32*)z64_rspinfo.DMEM), 0, 0x2000);
        //*CycleCount = 0; //Causes segfault, doesn't seem to be used anyway
    }

    EXPORT void CALL RomClosed(void)
    {
        extern int rsp_gen_cache_hit;
        extern int rsp_gen_cache_miss;
        log(M64MSG_STATUS, "cache hit %d miss %d %g%%", rsp_gen_cache_hit, rsp_gen_cache_miss,
            rsp_gen_cache_miss*100.0f/rsp_gen_cache_hit);
        rsp_gen_cache_hit = rsp_gen_cache_miss = 0;

#ifdef RSPTIMING
        int i,j;
        UINT32 op, op2;

        for(i=0; i<0x140;i++) {
            if (i>=0x100)
                op = (0x12<<26) | (0x10 << 21) | (i&0x3f);
            else if (i>=0xc0)
                op = (0x3a<<26) | ((i&0x1f)<<11);
            else if (i>=0xa0)
                op = (0x32<<26) | ((i&0x1f)<<11);
            else if (i>=0x80)
                op = (0x12<<26) | ((i&0x1f)<<21);
            else if (i>=0x40)
                op = (0<<26) | (i&0x3f);
            else
                op = (i&0x3f)<<26;

            char s[128], s2[128];
            rsp_dasm_one(s, 0x800, op);
            //rsp_dasm_one(s2, 0x800, op2);
            if (rsptimings[i])
                printf("%10g %10g %7d\t%30s\n"
                /*"%10g %10g %7d\t%30s\n"*/,
                rsptimings[i]/(rspcounts[i]*1.0f), rsptimings[i]*(1.0f), rspcounts[i], s//,
                //timings[k]/1.0f/counts[k], counts[k], s2
                );
        }
#endif

        //rsp_init(z64_rspinfo);
    }
#ifdef __cplusplus
}
#endif
