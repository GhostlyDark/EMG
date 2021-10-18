document.addEventListener('DOMContentLoaded', function() {
const dialog = window.dialog,
emuLaunch = window.emuLaunch,
jstestSpawn = window.jstestSpawn,
showCheats = window.showCheats,
writeGCA = window.writeGCA,
hires_texture = window.hires_texture,
cache = window.cache,
texture_dump = window.texture_dump,

fileInput = document.getElementById('fileInput'),
fileText = document.getElementById('fileText'),
recent = document.getElementById('recent'),
optionDefault = document.getElementById('optionDefault'),
option0 = document.getElementById('option0'),
option1 = document.getElementById('option1'),
option2 = document.getElementById('option2'),
option3 = document.getElementById('option3'),
option4 = document.getElementById('option4'),
option5 = document.getElementById('option5'),
option6 = document.getElementById('option6'),
option7 = document.getElementById('option7'),
option8 = document.getElementById('option8'),
option9 = document.getElementById('option9'),
mainSettings = document.getElementById('mainSettings'),
inputSettings = document.getElementById('inputSettings'),
videoSettings = document.getElementById('videoSettings'),
mainSettingsDropdown = document.getElementById('mainSettingsDropdown'),
inputSettingsDropdown = document.getElementById('inputSettingsDropdown'),
videoSettingsDropdown = document.getElementById('videoSettingsDropdown'),
IPLROMInput = document.getElementById('IPLROM'),
IPLROMText = document.getElementById('IPLROMText'),
DiskInput = document.getElementById('Disk'),
DiskText = document.getElementById('DiskText'),
txPathInput = document.getElementById('txPath'),
txPathText = document.getElementById('txPathText'),
txCachePathInput = document.getElementById('txCachePath'),
txCachePathText = document.getElementById('txCachePathText'),
txDumpPathInput = document.getElementById('txDumpPath'),
txDumpPathText = document.getElementById('txDumpPathText'),
rspGFXCheckbox = document.getElementById('rspGFX'),
rspAudioCheckbox = document.getElementById('rspAudio'),
WaitForCPUHostCheckbox = document.getElementById('WaitForCPUHost'),
SupportCPUSemaphoreLockCheckbox = document.getElementById('SupportCPUSemaphoreLock'),
txNoTextureFileStorageCheckbox = document.getElementById('txNoTextureFileStorage'),
ScreenshotPathInput = document.getElementById('ScreenshotPath'),
SaveStatePathInput = document.getElementById('SaveStatePath'),
SaveSRAMPathInput = document.getElementById('SaveSRAMPath'),
ScreenshotPathText = document.getElementById('ScreenshotPathText'),
SaveStatePathText = document.getElementById('SaveStatePathText'),
SaveSRAMPathText = document.getElementById('SaveSRAMPathText'),
gbROM1Input = document.getElementById('gbROM1'),
gbROM1Text = document.getElementById('gbROM1Text'),
gbROM2Input = document.getElementById('gbROM2'),
gbROM2Text = document.getElementById('gbROM2Text'),
gbROM3Input = document.getElementById('gbROM3'),
gbROM3Text = document.getElementById('gbROM3Text'),
gbROM4Input = document.getElementById('gbROM4'),
gbROM4Text = document.getElementById('gbROM4Text'),
gbRAM1Input = document.getElementById('gbRAM1'),
gbRAM1Text = document.getElementById('gbRAM1Text'),
gbRAM2Input = document.getElementById('gbRAM2'),
gbRAM2Text = document.getElementById('gbRAM2Text'),
gbRAM3Input = document.getElementById('gbRAM3'),
gbRAM3Text = document.getElementById('gbRAM3Text'),
gbRAM4Input = document.getElementById('gbRAM4'),
gbRAM4Text = document.getElementById('gbRAM4Text'),
AButton1Box = document.getElementById('AButton1'),
BButton1Box = document.getElementById('BButton1'),
LTrig1Box = document.getElementById('LTrig1'),
RTrig1Box = document.getElementById('RTrig1'),
ZTrig1Box = document.getElementById('ZTrig1'),
Start1Box = document.getElementById('Start1'),
DPadU1Box = document.getElementById('DPadU1'),
DPadL1Box = document.getElementById('DPadL1'),
DPadR1Box = document.getElementById('DPadR1'),
DPadD1Box = document.getElementById('DPadD1'),
CButtonU1Box = document.getElementById('CButtonU1'),
CButtonL1Box = document.getElementById('CButtonL1'),
CButtonR1Box = document.getElementById('CButtonR1'),
CButtonD1Box = document.getElementById('CButtonD1'),
MempakSwitch1Box = document.getElementById('MempakSwitch1'),
RumblepakSwitch1Box = document.getElementById('RumblepakSwitch1'),
StickU1Box = document.getElementById('StickU1'),
StickL1Box = document.getElementById('StickL1'),
StickR1Box = document.getElementById('StickR1'),
StickD1Box = document.getElementById('StickD1'),
AButton2Box = document.getElementById('AButton2'),
BButton2Box = document.getElementById('BButton2'),
LTrig2Box = document.getElementById('LTrig2'),
RTrig2Box = document.getElementById('RTrig2'),
ZTrig2Box = document.getElementById('ZTrig2'),
Start2Box = document.getElementById('Start2'),
DPadU2Box = document.getElementById('DPadU2'),
DPadL2Box = document.getElementById('DPadL2'),
DPadR2Box = document.getElementById('DPadR2'),
DPadD2Box = document.getElementById('DPadD2'),
CButtonU2Box = document.getElementById('CButtonU2'),
CButtonL2Box = document.getElementById('CButtonL2'),
CButtonR2Box = document.getElementById('CButtonR2'),
CButtonD2Box = document.getElementById('CButtonD2'),
MempakSwitch2Box = document.getElementById('MempakSwitch2'),
RumblepakSwitch2Box = document.getElementById('RumblepakSwitch2'),
StickU2Box = document.getElementById('StickU2'),
StickL2Box = document.getElementById('StickL2'),
StickR2Box = document.getElementById('StickR2'),
StickD2Box = document.getElementById('StickD2'),
AButton3Box = document.getElementById('AButton3'),
BButton3Box = document.getElementById('BButton3'),
LTrig3Box = document.getElementById('LTrig3'),
RTrig3Box = document.getElementById('RTrig3'),
ZTrig3Box = document.getElementById('ZTrig3'),
Start3Box = document.getElementById('Start3'),
DPadU3Box = document.getElementById('DPadU3'),
DPadL3Box = document.getElementById('DPadL3'),
DPadR3Box = document.getElementById('DPadR3'),
DPadD3Box = document.getElementById('DPadD3'),
CButtonU3Box = document.getElementById('CButtonU3'),
CButtonL3Box = document.getElementById('CButtonL3'),
CButtonR3Box = document.getElementById('CButtonR3'),
CButtonD3Box = document.getElementById('CButtonD3'),
MempakSwitch3Box = document.getElementById('MempakSwitch3'),
RumblepakSwitch3Box = document.getElementById('RumblepakSwitch3'),
StickU3Box = document.getElementById('StickU3'),
StickL3Box = document.getElementById('StickL3'),
StickR3Box = document.getElementById('StickR3'),
StickD3Box = document.getElementById('StickD3'),
AButton4Box = document.getElementById('AButton4'),
BButton4Box = document.getElementById('BButton4'),
LTrig4Box = document.getElementById('LTrig4'),
RTrig4Box = document.getElementById('RTrig4'),
ZTrig4Box = document.getElementById('ZTrig4'),
Start4Box = document.getElementById('Start4'),
DPadU4Box = document.getElementById('DPadU4'),
DPadL4Box = document.getElementById('DPadL4'),
DPadR4Box = document.getElementById('DPadR4'),
DPadD4Box = document.getElementById('DPadD4'),
CButtonU4Box = document.getElementById('CButtonU4'),
CButtonL4Box = document.getElementById('CButtonL4'),
CButtonR4Box = document.getElementById('CButtonR4'),
CButtonD4Box = document.getElementById('CButtonD4'),
MempakSwitch4Box = document.getElementById('MempakSwitch4'),
RumblepakSwitch4Box = document.getElementById('RumblepakSwitch4'),
StickU4Box = document.getElementById('StickU4'),
StickL4Box = document.getElementById('StickL4'),
StickR4Box = document.getElementById('StickR4'),
StickD4Box = document.getElementById('StickD4'),
control_stick_deadzoneRange = document.getElementById('control_stick_deadzone'),
control_stick_sensitivityRange = document.getElementById('control_stick_sensitivity'),
c_stick_deadzoneRange = document.getElementById('c_stick_deadzone'),
trigger_thresholdRange = document.getElementById('trigger_threshold'),
MouseSensitivity1XRange = document.getElementById('MouseSensitivity1X'),
MouseSensitivity1YRange = document.getElementById('MouseSensitivity1Y'),
MouseSensitivity2XRange = document.getElementById('MouseSensitivity2X'),
MouseSensitivity2YRange = document.getElementById('MouseSensitivity2Y'),
MouseSensitivity3XRange = document.getElementById('MouseSensitivity3X'),
MouseSensitivity3YRange = document.getElementById('MouseSensitivity3Y'),
MouseSensitivity4XRange = document.getElementById('MouseSensitivity4X'),
MouseSensitivity4YRange = document.getElementById('MouseSensitivity4Y'),
AnalogDeadzone1XRange = document.getElementById('AnalogDeadzone1X'),
AnalogDeadzone1YRange = document.getElementById('AnalogDeadzone1Y'),
AnalogDeadzone2XRange = document.getElementById('AnalogDeadzone2X'),
AnalogDeadzone2YRange = document.getElementById('AnalogDeadzone2Y'),
AnalogDeadzone3XRange = document.getElementById('AnalogDeadzone3X'),
AnalogDeadzone3YRange = document.getElementById('AnalogDeadzone3Y'),
AnalogDeadzone4XRange = document.getElementById('AnalogDeadzone4X'),
AnalogDeadzone4YRange = document.getElementById('AnalogDeadzone4Y'),
AnalogPeak1XRange = document.getElementById('AnalogPeak1X'),
AnalogPeak1YRange = document.getElementById('AnalogPeak1Y'),
AnalogPeak2XRange = document.getElementById('AnalogPeak2X'),
AnalogPeak2YRange = document.getElementById('AnalogPeak2Y'),
AnalogPeak3XRange = document.getElementById('AnalogPeak3X'),
AnalogPeak3YRange = document.getElementById('AnalogPeak3Y'),
AnalogPeak4XRange = document.getElementById('AnalogPeak4X'),
AnalogPeak4YRange = document.getElementById('AnalogPeak4Y'),
aDropdown = document.getElementById('a'),
bDropdown = document.getElementById('b'),
xDropdown = document.getElementById('x'),
yDropdown = document.getElementById('y'),
startDropdown = document.getElementById('start'),
zDropdown = document.getElementById('z'),
lDropdown = document.getElementById('l'),
rDropdown = document.getElementById('r'),
d_pad_leftDropdown = document.getElementById('d_pad_left'),
d_pad_rightDropdown = document.getElementById('d_pad_right'),
d_pad_downDropdown = document.getElementById('d_pad_down'),
d_pad_upDropdown = document.getElementById('d_pad_up'),
c_stick_leftDropdown = document.getElementById('c_stick_left'),
c_stick_rightDropdown = document.getElementById('c_stick_right'),
c_stick_downDropdown = document.getElementById('c_stick_down'),
c_stick_upDropdown = document.getElementById('c_stick_up'),
name1Input = document.getElementById('name1'),
name2Input = document.getElementById('name2'),
name3Input = document.getElementById('name3'),
name4Input = document.getElementById('name4'),
ul_hk_keyboard = document.getElementById('ul_hk_keyboard'),
ul_hk_controller1 = document.getElementById('ul_hk_controller1'),
ul_hk_controller2 = document.getElementById('ul_hk_controller2'),
ul_hk_controller3 = document.getElementById('ul_hk_controller3'),
ul_hk_controller4 = document.getElementById('ul_hk_controller4'),
hk_keyboard = document.getElementById('hk_keyboard'),
hk_controller1 = document.getElementById('hk_controller1'),
hk_controller2 = document.getElementById('hk_controller2'),
hk_controller3 = document.getElementById('hk_controller3'),
hk_controller4 = document.getElementById('hk_controller4'),
ul_c1_controller = document.getElementById('ul_c1_controller'),
ul_c1_keyboard = document.getElementById('ul_c1_keyboard'),
ul_c2_controller = document.getElementById('ul_c2_controller'),
ul_c2_keyboard = document.getElementById('ul_c2_keyboard'),
ul_c3_controller = document.getElementById('ul_c3_controller'),
ul_c3_keyboard = document.getElementById('ul_c3_keyboard'),
ul_c4_controller = document.getElementById('ul_c4_controller'),
ul_c4_keyboard = document.getElementById('ul_c4_keyboard'),
c1_controller = document.getElementById('c1_controller'),
c1_keyboard = document.getElementById('c1_keyboard'),
c2_controller = document.getElementById('c2_controller'),
c2_keyboard = document.getElementById('c2_keyboard'),
c3_controller = document.getElementById('c3_controller'),
c3_keyboard = document.getElementById('c3_keyboard'),
c4_controller = document.getElementById('c4_controller'),
c4_keyboard = document.getElementById('c4_keyboard'),
listCheats = document.getElementById('listCheats'),
cheatList = document.getElementById('cheatList'),
mouse1Box = document.getElementById('mouse1'),
mouse2Box = document.getElementById('mouse2'),
mouse3Box = document.getElementById('mouse3'),
mouse4Box = document.getElementById('mouse4'),
mouse1_1 = document.getElementById('mouse1_1'),
mouse1_2 = document.getElementById('mouse1_2'),
mouse1_3 = document.getElementById('mouse1_3'),
mouse2_1 = document.getElementById('mouse2_1'),
mouse2_2 = document.getElementById('mouse2_2'),
mouse2_3 = document.getElementById('mouse2_3'),
mouse3_1 = document.getElementById('mouse3_1'),
mouse3_2 = document.getElementById('mouse3_2'),
mouse3_3 = document.getElementById('mouse3_3'),
mouse4_1 = document.getElementById('mouse4_1'),
mouse4_2 = document.getElementById('mouse4_2'),
mouse4_3 = document.getElementById('mouse4_3'),
hkTexDumpBox = document.getElementById('hkTexDump'),
hkHdTexReloadBox = document.getElementById('hkHdTexReload'),
hkHdTexToggleBox = document.getElementById('hkHdTexToggle'),
hkVsyncBox = document.getElementById('hkVsync'),
hkFBEmulationBox = document.getElementById('hkFBEmulation'),
hkN64DepthCompareBox = document.getElementById('hkN64DepthCompare'),
hkOsdVisBox = document.getElementById('hkOsdVis'),
hkOsdFpsBox = document.getElementById('hkOsdFps'),
hkOsdPercentBox = document.getElementById('hkOsdPercent'),
hkOsdInternalResolutionBox = document.getElementById('hkOsdInternalResolution'),
hkOsdRenderingResolutionBox = document.getElementById('hkOsdRenderingResolution'),
hkTexCoordBoundsBox = document.getElementById('hkTexCoordBounds'),
hkNativeResTexrectsBox = document.getElementById('hkNativeResTexrects'),
hkForceGammaCorrectionBox = document.getElementById('hkForceGammaCorrection'),
KbdMappingStopBox = document.getElementById('KbdMappingStop'),
KbdMappingSlot0Box = document.getElementById('KbdMappingSlot0'),
KbdMappingSlot1Box = document.getElementById('KbdMappingSlot1'),
KbdMappingSlot2Box = document.getElementById('KbdMappingSlot2'),
KbdMappingSlot3Box = document.getElementById('KbdMappingSlot3'),
KbdMappingSlot4Box = document.getElementById('KbdMappingSlot4'),
KbdMappingSlot5Box = document.getElementById('KbdMappingSlot5'),
KbdMappingSlot6Box = document.getElementById('KbdMappingSlot6'),
KbdMappingSlot7Box = document.getElementById('KbdMappingSlot7'),
KbdMappingSlot8Box = document.getElementById('KbdMappingSlot8'),
KbdMappingSlot9Box = document.getElementById('KbdMappingSlot9'),
KbdMappingFullscreenBox = document.getElementById('KbdMappingFullscreen'),
KbdMappingSaveStateBox = document.getElementById('KbdMappingSaveState'),
KbdMappingLoadStateBox = document.getElementById('KbdMappingLoadState'),
KbdMappingIncrementSlotBox = document.getElementById('KbdMappingIncrementSlot'),
KbdMappingResetBox = document.getElementById('KbdMappingReset'),
KbdMappingSpeedDownBox = document.getElementById('KbdMappingSpeedDown'),
KbdMappingSpeedUpBox = document.getElementById('KbdMappingSpeedUp'),
KbdMappingScreenshotBox = document.getElementById('KbdMappingScreenshot'),
KbdMappingPauseBox = document.getElementById('KbdMappingPause'),
KbdMappingMuteBox = document.getElementById('KbdMappingMute'),
KbdMappingIncreaseVolumeBox = document.getElementById('KbdMappingIncreaseVolume'),
KbdMappingDecreaseVolumeBox = document.getElementById('KbdMappingDecreaseVolume'),
KbdMappingFastForwardBox = document.getElementById('KbdMappingFastForward'),
KbdMappingFrameAdvanceBox = document.getElementById('KbdMappingFrameAdvance'),
KbdMappingGamesharkBox = document.getElementById('KbdMappingGameshark'),
resDropdown = document.getElementById('resolution'),
gfxDropdown = document.getElementById('gfx'),
audioDropdown = document.getElementById('audio'),
inputDropdown = document.getElementById('input'),
rspDropdown = document.getElementById('rsp'),
emumodeDropdown = document.getElementById('emumode'),
plugin1Dropdown = document.getElementById('plugin1'),
plugin2Dropdown = document.getElementById('plugin2'),
plugin3Dropdown = document.getElementById('plugin3'),
plugin4Dropdown = document.getElementById('plugin4'),
msaaDropdown = document.getElementById('msaa'),
aspectRatioDropdown = document.getElementById('aspectRatio'),
bufferSwapModeDropdown = document.getElementById('bufferSwapMode'),
useNativeResolutionFactorDropdown = document.getElementById('useNativeResolutionFactor'),
anisotropyDropdown = document.getElementById('anisotropy'),
cacheDropdown = document.getElementById('cache'),
RDRAMImageDitheringModeDropdown = document.getElementById('RDRAMImageDitheringMode'),
CorrectTexrectCoordsDropdown = document.getElementById('CorrectTexrectCoords'),
EnableNativeResTexrectsDropdown = document.getElementById('EnableNativeResTexrects'),
BackgroundsModeDropdown = document.getElementById('BackgroundsMode'),
EnableN64DepthCompareDropdown = document.getElementById('EnableN64DepthCompare'),
EnableCopyColorToRDRAMDropdown = document.getElementById('EnableCopyColorToRDRAM'),
EnableCopyDepthToRDRAMDropdown = document.getElementById('EnableCopyDepthToRDRAM'),
txFilterModeDropdown = document.getElementById('txFilterMode'),
txEnhancementModeDropdown = document.getElementById('txEnhancementMode'),
ViModeDropdown = document.getElementById('ViMode'),
ViInterpolationDropdown = document.getElementById('ViInterpolation'),
DpCompatDropdown = document.getElementById('DpCompat'),
ParallelUpscalingDropdown = document.getElementById('ParallelUpscaling'),
ParallelDeinterlaceDropdown = document.getElementById('ParallelDeinterlace'),
ParallelDownScaleDropdown = document.getElementById('ParallelDownScale'),
CountersPosDropdown = document.getElementById('CountersPos'),
SaveDiskFormatDropdown = document.getElementById('SaveDiskFormat'),
mode1Dropdown = document.getElementById('mode1'),
mode2Dropdown = document.getElementById('mode2'),
mode3Dropdown = document.getElementById('mode3'),
mode4Dropdown = document.getElementById('mode4'),
DEFAULT_FREQUENCYDropdown = document.getElementById('DEFAULT_FREQUENCY'),
SECONDARY_BUFFER_SIZEDropdown = document.getElementById('SECONDARY_BUFFER_SIZE'),
RESAMPLEDropdown = document.getElementById('RESAMPLE'),
FrameBufferWriteBackControlDropdown = document.getElementById('FrameBufferWriteBackControl'),
RenderToTextureDropdown = document.getElementById('RenderToTexture'),
ScreenUpdateSettingDropdown = document.getElementById('ScreenUpdateSetting'),
MipmappingDropdown = document.getElementById('Mipmapping'),
ForceTextureFilterDropdown = document.getElementById('ForceTextureFilter'),
TextureEnhancementDropdown = document.getElementById('TextureEnhancement'),
TextureEnhancementControlDropdown = document.getElementById('TextureEnhancementControl'),
TextureQualityDropdown = document.getElementById('TextureQuality'),
OpenGLDepthBufferSettingDropdown = document.getElementById('OpenGLDepthBufferSetting'),
RiceMultiSamplingDropdown = document.getElementById('RiceMultiSampling'),
ColorQualityDropdown = document.getElementById('ColorQuality'),
AnisotropicFilteringDropdown = document.getElementById('AnisotropicFiltering'),
wrpAntiAliasingDropdown = document.getElementById('wrpAntiAliasing'),
show_fpsDropdown = document.getElementById('show_fps'),
ghq_fltrDropdown = document.getElementById('ghq_fltr'),
ghq_cmprDropdown = document.getElementById('ghq_cmpr'),
ghq_enhtDropdown = document.getElementById('ghq_enht'),
alt_tex_sizeDropdown = document.getElementById('alt_tex_size'),
use_sts1_onlyDropdown = document.getElementById('use_sts1_only'),
force_calc_sphereDropdown = document.getElementById('force_calc_sphere'),
correct_viewportDropdown = document.getElementById('correct_viewport'),
increase_texrect_edgeDropdown = document.getElementById('increase_texrect_edge'),
decrease_fillrect_edgeDropdown = document.getElementById('decrease_fillrect_edge'),
texture_correctionDropdown = document.getElementById('texture_correction'),
pal230Dropdown = document.getElementById('pal230'),
force_microcheckDropdown = document.getElementById('force_microcheck'),
force_quad3dDropdown = document.getElementById('force_quad3d'),
clip_zminDropdown = document.getElementById('clip_zmin'),
clip_zmaxDropdown = document.getElementById('clip_zmax'),
fast_crcDropdown = document.getElementById('fast_crc'),
adjust_aspectDropdown = document.getElementById('adjust_aspect'),
zmode_compare_lessDropdown = document.getElementById('zmode_compare_less'),
old_style_aditherDropdown = document.getElementById('old_style_adither'),
n64_z_scaleDropdown = document.getElementById('n64_z_scale'),
optimize_texrectDropdown = document.getElementById('optimize_texrect'),
ignore_aux_copyDropdown = document.getElementById('ignore_aux_copy'),
hires_buf_clearDropdown = document.getElementById('hires_buf_clear'),
fb_read_alphaDropdown = document.getElementById('fb_read_alpha'),
useless_is_uselessDropdown = document.getElementById('useless_is_useless'),
fb_crc_modeDropdown = document.getElementById('fb_crc_mode'),
filteringDropdown = document.getElementById('filtering'),
fogDropdown = document.getElementById('fog'),
buff_clearDropdown = document.getElementById('buff_clear'),
swapmodeDropdown = document.getElementById('swapmode'),
aspectDropdown = document.getElementById('aspect'),
lodmodeDropdown = document.getElementById('lodmode'),
fb_smartDropdown = document.getElementById('fb_smart'),
fb_hiresDropdown = document.getElementById('fb_hires'),
fb_read_alwaysDropdown = document.getElementById('fb_read_always'),
read_back_to_screenDropdown = document.getElementById('read_back_to_screen'),
detect_cpu_writeDropdown = document.getElementById('detect_cpu_write'),
fb_get_infoDropdown = document.getElementById('fb_get_info'),
fb_renderDropdown = document.getElementById('fb_render'),
MouseSensitivity1XText = document.getElementById('MouseSensitivity1XText'),
MouseSensitivity1YText = document.getElementById('MouseSensitivity1YText'),
MouseSensitivity2XText = document.getElementById('MouseSensitivity2XText'),
MouseSensitivity2YText = document.getElementById('MouseSensitivity2YText'),
MouseSensitivity3XText = document.getElementById('MouseSensitivity3XText'),
MouseSensitivity3YText = document.getElementById('MouseSensitivity3YText'),
MouseSensitivity4XText = document.getElementById('MouseSensitivity4XText'),
MouseSensitivity4YText = document.getElementById('MouseSensitivity4YText'),
AnalogDeadzone1XText = document.getElementById('AnalogDeadzone1XText'),
AnalogDeadzone1YText = document.getElementById('AnalogDeadzone1YText'),
AnalogDeadzone2XText = document.getElementById('AnalogDeadzone2XText'),
AnalogDeadzone2YText = document.getElementById('AnalogDeadzone2YText'),
AnalogDeadzone3XText = document.getElementById('AnalogDeadzone3XText'),
AnalogDeadzone3YText = document.getElementById('AnalogDeadzone3YText'),
AnalogDeadzone4XText = document.getElementById('AnalogDeadzone4XText'),
AnalogDeadzone4YText = document.getElementById('AnalogDeadzone4YText'),
AnalogPeak1XText = document.getElementById('AnalogPeak1XText'),
AnalogPeak1YText = document.getElementById('AnalogPeak1YText'),
AnalogPeak2XText = document.getElementById('AnalogPeak2XText'),
AnalogPeak2YText = document.getElementById('AnalogPeak2YText'),
AnalogPeak3XText = document.getElementById('AnalogPeak3XText'),
AnalogPeak3YText = document.getElementById('AnalogPeak3YText'),
AnalogPeak4XText = document.getElementById('AnalogPeak4XText'),
AnalogPeak4YText = document.getElementById('AnalogPeak4YText'),
control_stick_deadzoneText = document.getElementById('control_stick_deadzoneText'),
control_stick_sensitivityText = document.getElementById('control_stick_sensitivityText'),
c_stick_deadzoneText = document.getElementById('c_stick_deadzoneText'),
trigger_thresholdText = document.getElementById('trigger_thresholdText'),
OverscanNtscTopInput = document.getElementById('OverscanNtscTop'),
OverscanNtscLeftInput = document.getElementById('OverscanNtscLeft'),
OverscanNtscRightInput = document.getElementById('OverscanNtscRight'),
OverscanNtscBottomInput = document.getElementById('OverscanNtscBottom'),
OverscanPalTopInput = document.getElementById('OverscanPalTop'),
OverscanPalLeftInput = document.getElementById('OverscanPalLeft'),
OverscanPalRightInput = document.getElementById('OverscanPalRight'),
OverscanPalBottomInput = document.getElementById('OverscanPalBottom'),
ParallelCropOverscanInput = document.getElementById('ParallelCropOverscan'),
txCacheSizeInput = document.getElementById('txCacheSize'),
NumWorkersInput = document.getElementById('NumWorkers'),
GammaCorrectionLevelInput = document.getElementById('GammaCorrectionLevel'),
fontSizeInput = document.getElementById('fontSize'),
fontColorInput = document.getElementById('fontColor'),
CountPerOpInput = document.getElementById('CountPerOp'),
CurrentStateSlotInput = document.getElementById('CurrentStateSlot'),
VOLUME_ADJUSTInput = document.getElementById('VOLUME_ADJUST'),
VOLUME_DEFAULTInput = document.getElementById('VOLUME_DEFAULT'),
PolygonOffsetFactorInput = document.getElementById('PolygonOffsetFactor'),
PolygonOffsetUnitsInput = document.getElementById('PolygonOffsetUnits'),
polygon_offset_factorInput = document.getElementById('polygon_offset_factor'),
polygon_offset_unitsInput = document.getElementById('polygon_offset_units'),
ghq_cache_sizeInput = document.getElementById('ghq_cache_size'),
decreaseCurrentStateSlot = document.getElementById('decreaseCurrentStateSlot'),
increaseCurrentStateSlot = document.getElementById('increaseCurrentStateSlot'),	
decreaseCountPerOp = document.getElementById('decreaseCountPerOp'),
increaseCountPerOp = document.getElementById('increaseCountPerOp'),	
decreaseVOLUME_ADJUST = document.getElementById('decreaseVOLUME_ADJUST'),
increaseVOLUME_ADJUST = document.getElementById('increaseVOLUME_ADJUST'),	
decreaseVOLUME_DEFAULT = document.getElementById('decreaseVOLUME_DEFAULT'),
increaseVOLUME_DEFAULT = document.getElementById('increaseVOLUME_DEFAULT'),	
decreaseNumWorkers = document.getElementById('decreaseNumWorkers'),
increaseNumWorkers = document.getElementById('increaseNumWorkers'),	
decreaseGammaCorrectionLevel = document.getElementById('decreaseGammaCorrectionLevel'),
increaseGammaCorrectionLevel = document.getElementById('increaseGammaCorrectionLevel'),	
decreaseOverscanNtscTop = document.getElementById('decreaseOverscanNtscTop'),
increaseOverscanNtscTop = document.getElementById('increaseOverscanNtscTop'),	
decreaseOverscanNtscLeft = document.getElementById('decreaseOverscanNtscLeft'),
increaseOverscanNtscLeft = document.getElementById('increaseOverscanNtscLeft'),	
decreaseOverscanNtscRight = document.getElementById('decreaseOverscanNtscRight'),
increaseOverscanNtscRight = document.getElementById('increaseOverscanNtscRight'),	
decreaseOverscanNtscBottom = document.getElementById('decreaseOverscanNtscBottom'),
increaseOverscanNtscBottom = document.getElementById('increaseOverscanNtscBottom'),	
decreaseOverscanPalTop = document.getElementById('decreaseOverscanPalTop'),
increaseOverscanPalTop = document.getElementById('increaseOverscanPalTop'),	
decreaseOverscanPalLeft = document.getElementById('decreaseOverscanPalLeft'),
increaseOverscanPalLeft = document.getElementById('increaseOverscanPalLeft'),	
decreaseOverscanPalRight = document.getElementById('decreaseOverscanPalRight'),
increaseOverscanPalRight = document.getElementById('increaseOverscanPalRight'),	
decreaseOverscanPalBottom = document.getElementById('decreaseOverscanPalBottom'),
increaseOverscanPalBottom = document.getElementById('increaseOverscanPalBottom'),	
decreasefontSize = document.getElementById('decreasefontSize'),
increasefontSize = document.getElementById('increasefontSize'),	
decreasetxCacheSize = document.getElementById('decreasetxCacheSize'),
increasetxCacheSize = document.getElementById('increasetxCacheSize'),	
decreaseParallelCropOverscan = document.getElementById('decreaseParallelCropOverscan'),
increaseParallelCropOverscan = document.getElementById('increaseParallelCropOverscan'),	
decreasePolygonOffsetFactor = document.getElementById('decreasePolygonOffsetFactor'),
increasePolygonOffsetFactor = document.getElementById('increasePolygonOffsetFactor'),	
decreasePolygonOffsetUnits = document.getElementById('decreasePolygonOffsetUnits'),
increasePolygonOffsetUnits = document.getElementById('increasePolygonOffsetUnits'),	
decreasepolygon_offset_factor = document.getElementById('decreasepolygon_offset_factor'),
increasepolygon_offset_factor = document.getElementById('increasepolygon_offset_factor'),	
decreasepolygon_offset_units = document.getElementById('decreasepolygon_offset_units'),
increasepolygon_offset_units = document.getElementById('increasepolygon_offset_units'),	
decreaseghq_cache_size = document.getElementById('decreaseghq_cache_size'),
increaseghq_cache_size = document.getElementById('increaseghq_cache_size'),
StickU1cBox = document.getElementById('StickU1c'),
StickU1cbBox = document.getElementById('StickU1cb'),
StickL1cBox = document.getElementById('StickL1c'),
StickL1cbBox = document.getElementById('StickL1cb'),
StickR1cBox = document.getElementById('StickR1c'),
StickR1cbBox = document.getElementById('StickR1cb'),
StickD1cBox = document.getElementById('StickD1c'),
StickD1cbBox = document.getElementById('StickD1cb'),
CButtonU1cBox = document.getElementById('CButtonU1c'),
CButtonU1cbBox = document.getElementById('CButtonU1cb'),
CButtonL1cBox = document.getElementById('CButtonL1c'),
CButtonL1cbBox = document.getElementById('CButtonL1cb'),
CButtonR1cBox = document.getElementById('CButtonR1c'),
CButtonR1cbBox = document.getElementById('CButtonR1cb'),
CButtonD1cBox = document.getElementById('CButtonD1c'),
CButtonD1cbBox = document.getElementById('CButtonD1cb'),
DPadU1cBox = document.getElementById('DPadU1c'),
DPadU1cbBox = document.getElementById('DPadU1cb'),
DPadL1cBox = document.getElementById('DPadL1c'),
DPadL1cbBox = document.getElementById('DPadL1cb'),
DPadR1cBox = document.getElementById('DPadR1c'),
DPadR1cbBox = document.getElementById('DPadR1cb'),
DPadD1cBox = document.getElementById('DPadD1c'),
DPadD1cbBox = document.getElementById('DPadD1cb'),
Start1cBox = document.getElementById('Start1c'),
Start1cbBox = document.getElementById('Start1cb'),
AButton1cBox = document.getElementById('AButton1c'),
AButton1cbBox = document.getElementById('AButton1cb'),
BButton1cBox = document.getElementById('BButton1c'),
BButton1cbBox = document.getElementById('BButton1cb'),
LTrig1cBox = document.getElementById('LTrig1c'),
LTrig1cbBox = document.getElementById('LTrig1cb'),
RTrig1cBox = document.getElementById('RTrig1c'),
RTrig1cbBox = document.getElementById('RTrig1cb'),
ZTrig1cBox = document.getElementById('ZTrig1c'),
ZTrig1cbBox = document.getElementById('ZTrig1cb'),
MempakSwitch1cBox = document.getElementById('MempakSwitch1c'),
MempakSwitch1cbBox = document.getElementById('MempakSwitch1cb'),
RumblepakSwitch1cBox = document.getElementById('RumblepakSwitch1c'),
RumblepakSwitch1cbBox = document.getElementById('RumblepakSwitch1cb'),
StickU2cBox = document.getElementById('StickU2c'),
StickU2cbBox = document.getElementById('StickU2cb'),
StickL2cBox = document.getElementById('StickL2c'),
StickL2cbBox = document.getElementById('StickL2cb'),
StickR2cBox = document.getElementById('StickR2c'),
StickR2cbBox = document.getElementById('StickR2cb'),
StickD2cBox = document.getElementById('StickD2c'),
StickD2cbBox = document.getElementById('StickD2cb'),
CButtonU2cBox = document.getElementById('CButtonU2c'),
CButtonU2cbBox = document.getElementById('CButtonU2cb'),
CButtonL2cBox = document.getElementById('CButtonL2c'),
CButtonL2cbBox = document.getElementById('CButtonL2cb'),
CButtonR2cBox = document.getElementById('CButtonR2c'),
CButtonR2cbBox = document.getElementById('CButtonR2cb'),
CButtonD2cBox = document.getElementById('CButtonD2c'),
CButtonD2cbBox = document.getElementById('CButtonD2cb'),
DPadU2cBox = document.getElementById('DPadU2c'),
DPadU2cbBox = document.getElementById('DPadU2cb'),
DPadL2cBox = document.getElementById('DPadL2c'),
DPadL2cbBox = document.getElementById('DPadL2cb'),
DPadR2cBox = document.getElementById('DPadR2c'),
DPadR2cbBox = document.getElementById('DPadR2cb'),
DPadD2cBox = document.getElementById('DPadD2c'),
DPadD2cbBox = document.getElementById('DPadD2cb'),
Start2cBox = document.getElementById('Start2c'),
Start2cbBox = document.getElementById('Start2cb'),
AButton2cBox = document.getElementById('AButton2c'),
AButton2cbBox = document.getElementById('AButton2cb'),
BButton2cBox = document.getElementById('BButton2c'),
BButton2cbBox = document.getElementById('BButton2cb'),
LTrig2cBox = document.getElementById('LTrig2c'),
LTrig2cbBox = document.getElementById('LTrig2cb'),
RTrig2cBox = document.getElementById('RTrig2c'),
RTrig2cbBox = document.getElementById('RTrig2cb'),
ZTrig2cBox = document.getElementById('ZTrig2c'),
ZTrig2cbBox = document.getElementById('ZTrig2cb'),
MempakSwitch2cBox = document.getElementById('MempakSwitch2c'),
MempakSwitch2cbBox = document.getElementById('MempakSwitch2cb'),
RumblepakSwitch2cBox = document.getElementById('RumblepakSwitch2c'),
RumblepakSwitch2cbBox = document.getElementById('RumblepakSwitch2cb'),
StickU3cBox = document.getElementById('StickU3c'),
StickU3cbBox = document.getElementById('StickU3cb'),
StickL3cBox = document.getElementById('StickL3c'),
StickL3cbBox = document.getElementById('StickL3cb'),
StickR3cBox = document.getElementById('StickR3c'),
StickR3cbBox = document.getElementById('StickR3cb'),
StickD3cBox = document.getElementById('StickD3c'),
StickD3cbBox = document.getElementById('StickD3cb'),
CButtonU3cBox = document.getElementById('CButtonU3c'),
CButtonU3cbBox = document.getElementById('CButtonU3cb'),
CButtonL3cBox = document.getElementById('CButtonL3c'),
CButtonL3cbBox = document.getElementById('CButtonL3cb'),
CButtonR3cBox = document.getElementById('CButtonR3c'),
CButtonR3cbBox = document.getElementById('CButtonR3cb'),
CButtonD3cBox = document.getElementById('CButtonD3c'),
CButtonD3cbBox = document.getElementById('CButtonD3cb'),
DPadU3cBox = document.getElementById('DPadU3c'),
DPadU3cbBox = document.getElementById('DPadU3cb'),
DPadL3cBox = document.getElementById('DPadL3c'),
DPadL3cbBox = document.getElementById('DPadL3cb'),
DPadR3cBox = document.getElementById('DPadR3c'),
DPadR3cbBox = document.getElementById('DPadR3cb'),
DPadD3cBox = document.getElementById('DPadD3c'),
DPadD3cbBox = document.getElementById('DPadD3cb'),
Start3cBox = document.getElementById('Start3c'),
Start3cbBox = document.getElementById('Start3cb'),
AButton3cBox = document.getElementById('AButton3c'),
AButton3cbBox = document.getElementById('AButton3cb'),
BButton3cBox = document.getElementById('BButton3c'),
BButton3cbBox = document.getElementById('BButton3cb'),
LTrig3cBox = document.getElementById('LTrig3c'),
LTrig3cbBox = document.getElementById('LTrig3cb'),
RTrig3cBox = document.getElementById('RTrig3c'),
RTrig3cbBox = document.getElementById('RTrig3cb'),
ZTrig3cBox = document.getElementById('ZTrig3c'),
ZTrig3cbBox = document.getElementById('ZTrig3cb'),
MempakSwitch3cBox = document.getElementById('MempakSwitch3c'),
MempakSwitch3cbBox = document.getElementById('MempakSwitch3cb'),
RumblepakSwitch3cBox = document.getElementById('RumblepakSwitch3c'),
RumblepakSwitch3cbBox = document.getElementById('RumblepakSwitch3cb'),
StickU4cBox = document.getElementById('StickU4c'),
StickU4cbBox = document.getElementById('StickU4cb'),
StickL4cBox = document.getElementById('StickL4c'),
StickL4cbBox = document.getElementById('StickL4cb'),
StickR4cBox = document.getElementById('StickR4c'),
StickR4cbBox = document.getElementById('StickR4cb'),
StickD4cBox = document.getElementById('StickD4c'),
StickD4cbBox = document.getElementById('StickD4cb'),
CButtonU4cBox = document.getElementById('CButtonU4c'),
CButtonU4cbBox = document.getElementById('CButtonU4cb'),
CButtonL4cBox = document.getElementById('CButtonL4c'),
CButtonL4cbBox = document.getElementById('CButtonL4cb'),
CButtonR4cBox = document.getElementById('CButtonR4c'),
CButtonR4cbBox = document.getElementById('CButtonR4cb'),
CButtonD4cBox = document.getElementById('CButtonD4c'),
CButtonD4cbBox = document.getElementById('CButtonD4cb'),
DPadU4cBox = document.getElementById('DPadU4c'),
DPadU4cbBox = document.getElementById('DPadU4cb'),
DPadL4cBox = document.getElementById('DPadL4c'),
DPadL4cbBox = document.getElementById('DPadL4cb'),
DPadR4cBox = document.getElementById('DPadR4c'),
DPadR4cbBox = document.getElementById('DPadR4cb'),
DPadD4cBox = document.getElementById('DPadD4c'),
DPadD4cbBox = document.getElementById('DPadD4cb'),
Start4cBox = document.getElementById('Start4c'),
Start4cbBox = document.getElementById('Start4cb'),
AButton4cBox = document.getElementById('AButton4c'),
AButton4cbBox = document.getElementById('AButton4cb'),
BButton4cBox = document.getElementById('BButton4c'),
BButton4cbBox = document.getElementById('BButton4cb'),
LTrig4cBox = document.getElementById('LTrig4c'),
LTrig4cbBox = document.getElementById('LTrig4cb'),
RTrig4cBox = document.getElementById('RTrig4c'),
RTrig4cbBox = document.getElementById('RTrig4cb'),
ZTrig4cBox = document.getElementById('ZTrig4c'),
ZTrig4cbBox = document.getElementById('ZTrig4cb'),
MempakSwitch4cBox = document.getElementById('MempakSwitch4c'),
MempakSwitch4cbBox = document.getElementById('MempakSwitch4cb'),
RumblepakSwitch4cBox = document.getElementById('RumblepakSwitch4c'),
RumblepakSwitch4cbBox = document.getElementById('RumblepakSwitch4cb'),
JoyMappingStop1Box = document.getElementById('JoyMappingStop1'),
JoyMappingFullscreen1Box = document.getElementById('JoyMappingFullscreen1'),
JoyMappingSaveState1Box = document.getElementById('JoyMappingSaveState1'),
JoyMappingLoadState1Box = document.getElementById('JoyMappingLoadState1'),
JoyMappingIncrementSlot1Box = document.getElementById('JoyMappingIncrementSlot1'),
JoyMappingReset1Box = document.getElementById('JoyMappingReset1'),
JoyMappingSpeedDown1Box = document.getElementById('JoyMappingSpeedDown1'),
JoyMappingSpeedUp1Box = document.getElementById('JoyMappingSpeedUp1'),
JoyMappingScreenshot1Box = document.getElementById('JoyMappingScreenshot1'),
JoyMappingPause1Box = document.getElementById('JoyMappingPause1'),
JoyMappingMute1Box = document.getElementById('JoyMappingMute1'),
JoyMappingIncreaseVolume1Box = document.getElementById('JoyMappingIncreaseVolume1'),
JoyMappingDecreaseVolume1Box = document.getElementById('JoyMappingDecreaseVolume1'),
JoyMappingFastForward1Box = document.getElementById('JoyMappingFastForward1'),
JoyMappingFrameAdvance1Box = document.getElementById('JoyMappingFrameAdvance1'),
JoyMappingGameshark1Box = document.getElementById('JoyMappingGameshark1'),
JoyMappingStop2Box = document.getElementById('JoyMappingStop2'),
JoyMappingFullscreen2Box = document.getElementById('JoyMappingFullscreen2'),
JoyMappingSaveState2Box = document.getElementById('JoyMappingSaveState2'),
JoyMappingLoadState2Box = document.getElementById('JoyMappingLoadState2'),
JoyMappingIncrementSlot2Box = document.getElementById('JoyMappingIncrementSlot2'),
JoyMappingReset2Box = document.getElementById('JoyMappingReset2'),
JoyMappingSpeedDown2Box = document.getElementById('JoyMappingSpeedDown2'),
JoyMappingSpeedUp2Box = document.getElementById('JoyMappingSpeedUp2'),
JoyMappingScreenshot2Box = document.getElementById('JoyMappingScreenshot2'),
JoyMappingPause2Box = document.getElementById('JoyMappingPause2'),
JoyMappingMute2Box = document.getElementById('JoyMappingMute2'),
JoyMappingIncreaseVolume2Box = document.getElementById('JoyMappingIncreaseVolume2'),
JoyMappingDecreaseVolume2Box = document.getElementById('JoyMappingDecreaseVolume2'),
JoyMappingFastForward2Box = document.getElementById('JoyMappingFastForward2'),
JoyMappingFrameAdvance2Box = document.getElementById('JoyMappingFrameAdvance2'),
JoyMappingGameshark2Box = document.getElementById('JoyMappingGameshark2'),
JoyMappingStop3Box = document.getElementById('JoyMappingStop3'),
JoyMappingFullscreen3Box = document.getElementById('JoyMappingFullscreen3'),
JoyMappingSaveState3Box = document.getElementById('JoyMappingSaveState3'),
JoyMappingLoadState3Box = document.getElementById('JoyMappingLoadState3'),
JoyMappingIncrementSlot3Box = document.getElementById('JoyMappingIncrementSlot3'),
JoyMappingReset3Box = document.getElementById('JoyMappingReset3'),
JoyMappingSpeedDown3Box = document.getElementById('JoyMappingSpeedDown3'),
JoyMappingSpeedUp3Box = document.getElementById('JoyMappingSpeedUp3'),
JoyMappingScreenshot3Box = document.getElementById('JoyMappingScreenshot3'),
JoyMappingPause3Box = document.getElementById('JoyMappingPause3'),
JoyMappingMute3Box = document.getElementById('JoyMappingMute3'),
JoyMappingIncreaseVolume3Box = document.getElementById('JoyMappingIncreaseVolume3'),
JoyMappingDecreaseVolume3Box = document.getElementById('JoyMappingDecreaseVolume3'),
JoyMappingFastForward3Box = document.getElementById('JoyMappingFastForward3'),
JoyMappingFrameAdvance3Box = document.getElementById('JoyMappingFrameAdvance3'),
JoyMappingGameshark3Box = document.getElementById('JoyMappingGameshark3'),
JoyMappingStop4Box = document.getElementById('JoyMappingStop4'),
JoyMappingFullscreen4Box = document.getElementById('JoyMappingFullscreen4'),
JoyMappingSaveState4Box = document.getElementById('JoyMappingSaveState4'),
JoyMappingLoadState4Box = document.getElementById('JoyMappingLoadState4'),
JoyMappingIncrementSlot4Box = document.getElementById('JoyMappingIncrementSlot4'),
JoyMappingReset4Box = document.getElementById('JoyMappingReset4'),
JoyMappingSpeedDown4Box = document.getElementById('JoyMappingSpeedDown4'),
JoyMappingSpeedUp4Box = document.getElementById('JoyMappingSpeedUp4'),
JoyMappingScreenshot4Box = document.getElementById('JoyMappingScreenshot4'),
JoyMappingPause4Box = document.getElementById('JoyMappingPause4'),
JoyMappingMute4Box = document.getElementById('JoyMappingMute4'),
JoyMappingIncreaseVolume4Box = document.getElementById('JoyMappingIncreaseVolume4'),
JoyMappingDecreaseVolume4Box = document.getElementById('JoyMappingDecreaseVolume4'),
JoyMappingFastForward4Box = document.getElementById('JoyMappingFastForward4'),
JoyMappingFrameAdvance4Box = document.getElementById('JoyMappingFrameAdvance4'),
JoyMappingGameshark4Box = document.getElementById('JoyMappingGameshark4'),

regjoy = /axis|button|hat|\(|\)/g,
regstring = /^((?!UI-Console\:\s\s\s\s*\d).)*$/gm,
regfilter = /UI-Console\:\s\s\s\s/gm,
regremove = /\r/gm,
regsplit = /\s*\n/,
regradio = /^\s\s\s/g,
regid = /\:.*/g,
regbox = /_.*/g,
regtarget = /.*\_/g,
regaxis = /\s.*/i,
reghk = /button\(|\)/g,
regkb = /key\(\)|key\(,\)/g,

keyCodes = { //HTML DOM keycodes to text
  0: '',
  3: 'break',
  8: 'backspace',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause',
  20: 'caps lock',
  27: 'escape',
  32: 'spacebar',
  33: 'page up',
  34: 'page down',
  35: 'end',
  36: 'home',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
  45: 'insert',
  46: 'delete',
  47: 'help',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  96: 'numpad 0',
  97: 'numpad 1',
  98: 'numpad 2',
  99: 'numpad 3',
  100: 'numpad 4',
  101: 'numpad 5',
  102: 'numpad 6',
  103: 'numpad 7',
  104: 'numpad 8',
  105: 'numpad 9',
  106: 'numpad *',
  107: 'numpad +',
  109: 'numpad -',
  111: 'numpad /',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  144: 'num lock'
},

keySyms = { //HTML DOM keycodes to SDL keysyms for mupen64plus hotkeys
  0: 0,
  3: 318,
  8: 8,
  9: 9,
  12: 12,
  13: 13,
  16: 304,
  17: 306,
  18: 308,
  19: 19,
  20: 301,
  27: 27,
  32: 32,
  33: 280,
  34: 281,
  35: 279,
  36: 278,
  37: 276,
  38: 273,
  39: 275,
  40: 274,
  45: 277,
  46: 127,
  47: 315,
  48: 48,
  49: 49,
  50: 50,
  51: 51,
  52: 52,
  53: 53,
  54: 54,
  55: 55,
  56: 56,
  57: 57,
  65: 97,
  66: 98,
  67: 99,
  68: 100,
  69: 101,
  70: 102,
  71: 103,
  72: 104,
  73: 105,
  74: 106,
  75: 107,
  76: 108,
  77: 109,
  78: 110,
  79: 111,
  80: 112,
  81: 113,
  82: 114,
  83: 115,
  84: 116,
  85: 117,
  86: 118,
  87: 119,
  88: 120,
  89: 121,
  90: 122,
  96: 256,
  97: 257,
  98: 258,
  99: 259,
  100: 260,
  101: 261,
  102: 262,
  103: 263,
  104: 264,
  105: 265,
  106: 268,
  107: 270,
  109: 269,
  111: 267,
  112: 282,
  113: 283,
  114: 284,
  115: 285,
  116: 286,
  117: 287,
  118: 288,
  119: 289,
  120: 290,
  121: 291,
  122: 292,
  123: 293,
  144: 300
},

hotKeys = { //HTML DOM keycodes to GLideN64 hotkeys
  0: '',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z'
};

var filePath,fileResult,cheatRadio,txPath,txCachePath,txDumpPath,IPLROM,Disk,txPathResult,txCachePathResult,txDumpPathResult,IPLROMResult,DiskResult,ScreenshotPath,ScreenshotPathResult,SaveStatePath,SaveStatePathResult,SaveSRAMPath,SaveSRAMPathResult,gbROM1,gbROM2,gbROM3,gbROM4,gbRAM1,gbRAM2,gbRAM3,gbRAM4,gbROM1Result,gbROM2Result,gbROM3Result,gbROM4Result,gbRAM1Result,gbRAM2Result,gbRAM3Result,gbRAM4Result;



mouse1Box.addEventListener('change', function(){mouse1Disable()})
mouse1Disable()
function mouse1Disable(){
if(mouse1Box.checked === false){mouse1_1.disabled = true;mouse1_2.disabled = true;mouse1_3.disabled = true;MouseSensitivity1XRange.disabled = true;MouseSensitivity1YRange.disabled = true}
else{mouse1_1.disabled = false;mouse1_2.disabled = false;mouse1_3.disabled = false;MouseSensitivity1XRange.disabled = false;MouseSensitivity1YRange.disabled = false}}

mouse2Box.addEventListener('change', function(){mouse2Disable()})
mouse2Disable()
function mouse2Disable(){
if(mouse2Box.checked === false){mouse2_1.disabled = true;mouse2_2.disabled = true;mouse2_3.disabled = true;MouseSensitivity2XRange.disabled = true;MouseSensitivity2YRange.disabled = true}
else{mouse2_1.disabled = false;mouse2_2.disabled = false;mouse2_3.disabled = false;MouseSensitivity2XRange.disabled = false;MouseSensitivity2YRange.disabled = false}}

mouse3Box.addEventListener('change', function(){mouse3Disable()})
mouse3Disable()
function mouse3Disable(){
if(mouse3Box.checked === false){mouse3_1.disabled = true;mouse3_2.disabled = true;mouse3_3.disabled = true;MouseSensitivity3XRange.disabled = true;MouseSensitivity3YRange.disabled = true}
else{mouse3_1.disabled = false;mouse3_2.disabled = false;mouse3_3.disabled = false;MouseSensitivity3XRange.disabled = false;MouseSensitivity3YRange.disabled = false}}

mouse4Box.addEventListener('change', function(){mouse4Disable()})
mouse4Disable()
function mouse4Disable(){
if(mouse4Box.checked === false){mouse4_1.disabled = true;mouse4_2.disabled = true;mouse4_3.disabled = true;MouseSensitivity4XRange.disabled = true;MouseSensitivity4YRange.disabled = true}
else{mouse4_1.disabled = false;mouse4_2.disabled = false;mouse4_3.disabled = false;MouseSensitivity4XRange.disabled = false;MouseSensitivity4YRange.disabled = false}}



document.getElementById('clearAButton1').addEventListener('click', function(){
AButton1.value = '';
AButton1.dataset.key = '0';
localStorage.removeItem('AButton1')})

if(localStorage.getItem('AButton1') != null){
AButton1Box.value = keyCodes[localStorage.getItem('AButton1')];
AButton1Box.dataset.key = keySyms[localStorage.getItem('AButton1')]}
AButton1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
AButton1Box.value = keyCodes[e.keyCode];
AButton1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('AButton1', e.keyCode)}})

document.getElementById('clearBButton1').addEventListener('click', function(){
BButton1.value = '';
BButton1.dataset.key = '0';
localStorage.removeItem('BButton1')})

if(localStorage.getItem('BButton1') != null){
BButton1Box.value = keyCodes[localStorage.getItem('BButton1')];
BButton1Box.dataset.key = keySyms[localStorage.getItem('BButton1')]}
BButton1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
BButton1Box.value = keyCodes[e.keyCode];
BButton1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('BButton1', e.keyCode)}})

document.getElementById('clearLTrig1').addEventListener('click', function(){
LTrig1.value = '';
LTrig1.dataset.key = '0';
localStorage.removeItem('LTrig1')})

if(localStorage.getItem('LTrig1') != null){
LTrig1Box.value = keyCodes[localStorage.getItem('LTrig1')];
LTrig1Box.dataset.key = keySyms[localStorage.getItem('LTrig1')]}
LTrig1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
LTrig1Box.value = keyCodes[e.keyCode];
LTrig1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('LTrig1', e.keyCode)}})

document.getElementById('clearRTrig1').addEventListener('click', function(){
RTrig1.value = '';
RTrig1.dataset.key = '0';
localStorage.removeItem('RTrig1')})

if(localStorage.getItem('RTrig1') != null){
RTrig1Box.value = keyCodes[localStorage.getItem('RTrig1')];
RTrig1Box.dataset.key = keySyms[localStorage.getItem('RTrig1')]}
RTrig1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RTrig1Box.value = keyCodes[e.keyCode];
RTrig1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RTrig1', e.keyCode)}})

document.getElementById('clearZTrig1').addEventListener('click', function(){
ZTrig1.value = '';
ZTrig1.dataset.key = '0';
localStorage.removeItem('ZTrig1')})

if(localStorage.getItem('ZTrig1') != null){
ZTrig1Box.value = keyCodes[localStorage.getItem('ZTrig1')];
ZTrig1Box.dataset.key = keySyms[localStorage.getItem('ZTrig1')]}
ZTrig1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
ZTrig1Box.value = keyCodes[e.keyCode];
ZTrig1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('ZTrig1', e.keyCode)}})

document.getElementById('clearStart1').addEventListener('click', function(){
Start1.value = '';
Start1.dataset.key = '0';
localStorage.removeItem('Start1')})

if(localStorage.getItem('Start1') != null){
Start1Box.value = keyCodes[localStorage.getItem('Start1')];
Start1Box.dataset.key = keySyms[localStorage.getItem('Start1')]}
Start1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
Start1Box.value = keyCodes[e.keyCode];
Start1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('Start1', e.keyCode)}})

document.getElementById('clearDPadU1').addEventListener('click', function(){
DPadU1.value = '';
DPadU1.dataset.key = '0';
localStorage.removeItem('DPadU1')})

if(localStorage.getItem('DPadU1') != null){
DPadU1Box.value = keyCodes[localStorage.getItem('DPadU1')];
DPadU1Box.dataset.key = keySyms[localStorage.getItem('DPadU1')]}
DPadU1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadU1Box.value = keyCodes[e.keyCode];
DPadU1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadU1', e.keyCode)}})

document.getElementById('clearDPadL1').addEventListener('click', function(){
DPadL1.value = '';
DPadL1.dataset.key = '0';
localStorage.removeItem('DPadL1')})

if(localStorage.getItem('DPadL1') != null){
DPadL1Box.value = keyCodes[localStorage.getItem('DPadL1')];
DPadL1Box.dataset.key = keySyms[localStorage.getItem('DPadL1')]}
DPadL1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadL1Box.value = keyCodes[e.keyCode];
DPadL1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadL1', e.keyCode)}})

document.getElementById('clearDPadR1').addEventListener('click', function(){
DPadR1.value = '';
DPadR1.dataset.key = '0';
localStorage.removeItem('DPadR1')})

if(localStorage.getItem('DPadR1') != null){
DPadR1Box.value = keyCodes[localStorage.getItem('DPadR1')];
DPadR1Box.dataset.key = keySyms[localStorage.getItem('DPadR1')]}
DPadR1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadR1Box.value = keyCodes[e.keyCode];
DPadR1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadR1', e.keyCode)}})

document.getElementById('clearDPadD1').addEventListener('click', function(){
DPadD1.value = '';
DPadD1.dataset.key = '0';
localStorage.removeItem('DPadD1')})

if(localStorage.getItem('DPadD1') != null){
DPadD1Box.value = keyCodes[localStorage.getItem('DPadD1')];
DPadD1Box.dataset.key = keySyms[localStorage.getItem('DPadD1')]}
DPadD1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadD1Box.value = keyCodes[e.keyCode];
DPadD1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadD1', e.keyCode)}})

document.getElementById('clearCButtonU1').addEventListener('click', function(){
CButtonU1.value = '';
CButtonU1.dataset.key = '0';
localStorage.removeItem('CButtonU1')})

if(localStorage.getItem('CButtonU1') != null){
CButtonU1Box.value = keyCodes[localStorage.getItem('CButtonU1')];
CButtonU1Box.dataset.key = keySyms[localStorage.getItem('CButtonU1')]}
CButtonU1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonU1Box.value = keyCodes[e.keyCode];
CButtonU1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonU1', e.keyCode)}})

document.getElementById('clearCButtonL1').addEventListener('click', function(){
CButtonL1.value = '';
CButtonL1.dataset.key = '0';
localStorage.removeItem('CButtonL1')})

if(localStorage.getItem('CButtonL1') != null){
CButtonL1Box.value = keyCodes[localStorage.getItem('CButtonL1')];
CButtonL1Box.dataset.key = keySyms[localStorage.getItem('CButtonL1')]}
CButtonL1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonL1Box.value = keyCodes[e.keyCode];
CButtonL1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonL1', e.keyCode)}})

document.getElementById('clearCButtonR1').addEventListener('click', function(){
CButtonR1.value = '';
CButtonR1.dataset.key = '0';
localStorage.removeItem('CButtonR1')})

if(localStorage.getItem('CButtonR1') != null){
CButtonR1Box.value = keyCodes[localStorage.getItem('CButtonR1')];
CButtonR1Box.dataset.key = keySyms[localStorage.getItem('CButtonR1')]}
CButtonR1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonR1Box.value = keyCodes[e.keyCode];
CButtonR1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonR1', e.keyCode)}})

document.getElementById('clearCButtonD1').addEventListener('click', function(){
CButtonD1.value = '';
CButtonD1.dataset.key = '0';
localStorage.removeItem('CButtonD1')})

if(localStorage.getItem('CButtonD1') != null){
CButtonD1Box.value = keyCodes[localStorage.getItem('CButtonD1')];
CButtonD1Box.dataset.key = keySyms[localStorage.getItem('CButtonD1')]}
CButtonD1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonD1Box.value = keyCodes[e.keyCode];
CButtonD1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonD1', e.keyCode)}})

document.getElementById('clearMempakSwitch1').addEventListener('click', function(){
MempakSwitch1.value = '';
MempakSwitch1.dataset.key = '0';
localStorage.removeItem('MempakSwitch1')})

if(localStorage.getItem('MempakSwitch1') != null){
MempakSwitch1Box.value = keyCodes[localStorage.getItem('MempakSwitch1')];
MempakSwitch1Box.dataset.key = keySyms[localStorage.getItem('MempakSwitch1')]}
MempakSwitch1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
MempakSwitch1Box.value = keyCodes[e.keyCode];
MempakSwitch1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('MempakSwitch1', e.keyCode)}})

document.getElementById('clearRumblepakSwitch1').addEventListener('click', function(){
RumblepakSwitch1.value = '';
RumblepakSwitch1.dataset.key = '0';
localStorage.removeItem('RumblepakSwitch1')})

if(localStorage.getItem('RumblepakSwitch1') != null){
RumblepakSwitch1Box.value = keyCodes[localStorage.getItem('RumblepakSwitch1')];
RumblepakSwitch1Box.dataset.key = keySyms[localStorage.getItem('RumblepakSwitch1')]}
RumblepakSwitch1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RumblepakSwitch1Box.value = keyCodes[e.keyCode];
RumblepakSwitch1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RumblepakSwitch1', e.keyCode)}})

document.getElementById('clearStickU1').addEventListener('click', function(){
StickU1.value = '';
StickU1.dataset.key = '0';
localStorage.removeItem('StickU1')})

if(localStorage.getItem('StickU1') != null){
StickU1Box.value = keyCodes[localStorage.getItem('StickU1')];
StickU1Box.dataset.key = keySyms[localStorage.getItem('StickU1')]}
StickU1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickU1Box.value = keyCodes[e.keyCode];
StickU1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickU1', e.keyCode)}})

document.getElementById('clearStickL1').addEventListener('click', function(){
StickL1.value = '';
StickL1.dataset.key = '0';
localStorage.removeItem('StickL1')})

if(localStorage.getItem('StickL1') != null){
StickL1Box.value = keyCodes[localStorage.getItem('StickL1')];
StickL1Box.dataset.key = keySyms[localStorage.getItem('StickL1')]}
StickL1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickL1Box.value = keyCodes[e.keyCode];
StickL1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickL1', e.keyCode)}})

document.getElementById('clearStickR1').addEventListener('click', function(){
StickR1.value = '';
StickR1.dataset.key = '0';
localStorage.removeItem('StickR1')})

if(localStorage.getItem('StickR1') != null){
StickR1Box.value = keyCodes[localStorage.getItem('StickR1')];
StickR1Box.dataset.key = keySyms[localStorage.getItem('StickR1')]}
StickR1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickR1Box.value = keyCodes[e.keyCode];
StickR1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickR1', e.keyCode)}})

document.getElementById('clearStickD1').addEventListener('click', function(){
StickD1.value = '';
StickD1.dataset.key = '0';
localStorage.removeItem('StickD1')})

if(localStorage.getItem('StickD1') != null){
StickD1Box.value = keyCodes[localStorage.getItem('StickD1')];
StickD1Box.dataset.key = keySyms[localStorage.getItem('StickD1')]}
StickD1Box.addEventListener('keyup', function(e){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickD1Box.value = keyCodes[e.keyCode];
StickD1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickD1', e.keyCode)}})



document.getElementById('clearAButton2').addEventListener('click', function(){
AButton2.value = '';
AButton2.dataset.key = '0';
localStorage.removeItem('AButton2')})

if(localStorage.getItem('AButton2') != null){
AButton2Box.value = keyCodes[localStorage.getItem('AButton2')];
AButton2Box.dataset.key = keySyms[localStorage.getItem('AButton2')]}
AButton2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
AButton2Box.value = keyCodes[e.keyCode];
AButton2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('AButton2', e.keyCode)}})

document.getElementById('clearBButton2').addEventListener('click', function(){
BButton2.value = '';
BButton2.dataset.key = '0';
localStorage.removeItem('BButton2')})

if(localStorage.getItem('BButton2') != null){
BButton2Box.value = keyCodes[localStorage.getItem('BButton2')];
BButton2Box.dataset.key = keySyms[localStorage.getItem('BButton2')]}
BButton2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
BButton2Box.value = keyCodes[e.keyCode];
BButton2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('BButton2', e.keyCode)}})

document.getElementById('clearLTrig2').addEventListener('click', function(){
LTrig2.value = '';
LTrig2.dataset.key = '0';
localStorage.removeItem('LTrig2')})

if(localStorage.getItem('LTrig2') != null){
LTrig2Box.value = keyCodes[localStorage.getItem('LTrig2')];
LTrig2Box.dataset.key = keySyms[localStorage.getItem('LTrig2')]}
LTrig2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
LTrig2Box.value = keyCodes[e.keyCode];
LTrig2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('LTrig2', e.keyCode)}})

document.getElementById('clearRTrig2').addEventListener('click', function(){
RTrig2.value = '';
RTrig2.dataset.key = '0';
localStorage.removeItem('RTrig2')})

if(localStorage.getItem('RTrig2') != null){
RTrig2Box.value = keyCodes[localStorage.getItem('RTrig2')];
RTrig2Box.dataset.key = keySyms[localStorage.getItem('RTrig2')]}
RTrig2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RTrig2Box.value = keyCodes[e.keyCode];
RTrig2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RTrig2', e.keyCode)}})

document.getElementById('clearZTrig2').addEventListener('click', function(){
ZTrig2.value = '';
ZTrig2.dataset.key = '0';
localStorage.removeItem('ZTrig2')})

if(localStorage.getItem('ZTrig2') != null){
ZTrig2Box.value = keyCodes[localStorage.getItem('ZTrig2')];
ZTrig2Box.dataset.key = keySyms[localStorage.getItem('ZTrig2')]}
ZTrig2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
ZTrig2Box.value = keyCodes[e.keyCode];
ZTrig2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('ZTrig2', e.keyCode)}})

document.getElementById('clearStart2').addEventListener('click', function(){
Start2.value = '';
Start2.dataset.key = '0';
localStorage.removeItem('Start2')})

if(localStorage.getItem('Start2') != null){
Start2Box.value = keyCodes[localStorage.getItem('Start2')];
Start2Box.dataset.key = keySyms[localStorage.getItem('Start2')]}
Start2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
Start2Box.value = keyCodes[e.keyCode];
Start2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('Start2', e.keyCode)}})

document.getElementById('clearDPadU2').addEventListener('click', function(){
DPadU2.value = '';
DPadU2.dataset.key = '0';
localStorage.removeItem('DPadU2')})

if(localStorage.getItem('DPadU2') != null){
DPadU2Box.value = keyCodes[localStorage.getItem('DPadU2')];
DPadU2Box.dataset.key = keySyms[localStorage.getItem('DPadU2')]}
DPadU2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadU2Box.value = keyCodes[e.keyCode];
DPadU2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadU2', e.keyCode)}})

document.getElementById('clearDPadL2').addEventListener('click', function(){
DPadL2.value = '';
DPadL2.dataset.key = '0';
localStorage.removeItem('DPadL2')})

if(localStorage.getItem('DPadL2') != null){
DPadL2Box.value = keyCodes[localStorage.getItem('DPadL2')];
DPadL2Box.dataset.key = keySyms[localStorage.getItem('DPadL2')]}
DPadL2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadL2Box.value = keyCodes[e.keyCode];
DPadL2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadL2', e.keyCode)}})

document.getElementById('clearDPadR2').addEventListener('click', function(){
DPadR2.value = '';
DPadR2.dataset.key = '0';
localStorage.removeItem('DPadR2')})

if(localStorage.getItem('DPadR2') != null){
DPadR2Box.value = keyCodes[localStorage.getItem('DPadR2')];
DPadR2Box.dataset.key = keySyms[localStorage.getItem('DPadR2')]}
DPadR2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadR2Box.value = keyCodes[e.keyCode];
DPadR2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadR2', e.keyCode)}})

document.getElementById('clearDPadD2').addEventListener('click', function(){
DPadD2.value = '';
DPadD2.dataset.key = '0';
localStorage.removeItem('DPadD2')})

if(localStorage.getItem('DPadD2') != null){
DPadD2Box.value = keyCodes[localStorage.getItem('DPadD2')];
DPadD2Box.dataset.key = keySyms[localStorage.getItem('DPadD2')]}
DPadD2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadD2Box.value = keyCodes[e.keyCode];
DPadD2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadD2', e.keyCode)}})

document.getElementById('clearCButtonU2').addEventListener('click', function(){
CButtonU2.value = '';
CButtonU2.dataset.key = '0';
localStorage.removeItem('CButtonU2')})

if(localStorage.getItem('CButtonU2') != null){
CButtonU2Box.value = keyCodes[localStorage.getItem('CButtonU2')];
CButtonU2Box.dataset.key = keySyms[localStorage.getItem('CButtonU2')]}
CButtonU2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonU2Box.value = keyCodes[e.keyCode];
CButtonU2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonU2', e.keyCode)}})

document.getElementById('clearCButtonL2').addEventListener('click', function(){
CButtonL2.value = '';
CButtonL2.dataset.key = '0';
localStorage.removeItem('CButtonL2')})

if(localStorage.getItem('CButtonL2') != null){
CButtonL2Box.value = keyCodes[localStorage.getItem('CButtonL2')];
CButtonL2Box.dataset.key = keySyms[localStorage.getItem('CButtonL2')]}
CButtonL2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonL2Box.value = keyCodes[e.keyCode];
CButtonL2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonL2', e.keyCode)}})

document.getElementById('clearCButtonR2').addEventListener('click', function(){
CButtonR2.value = '';
CButtonR2.dataset.key = '0';
localStorage.removeItem('CButtonR2')})

if(localStorage.getItem('CButtonR2') != null){
CButtonR2Box.value = keyCodes[localStorage.getItem('CButtonR2')];
CButtonR2Box.dataset.key = keySyms[localStorage.getItem('CButtonR2')]}
CButtonR2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonR2Box.value = keyCodes[e.keyCode];
CButtonR2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonR2', e.keyCode)}})

document.getElementById('clearCButtonD2').addEventListener('click', function(){
CButtonD2.value = '';
CButtonD2.dataset.key = '0';
localStorage.removeItem('CButtonD2')})

if(localStorage.getItem('CButtonD2') != null){
CButtonD2Box.value = keyCodes[localStorage.getItem('CButtonD2')];
CButtonD2Box.dataset.key = keySyms[localStorage.getItem('CButtonD2')]}
CButtonD2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonD2Box.value = keyCodes[e.keyCode];
CButtonD2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonD2', e.keyCode)}})

document.getElementById('clearMempakSwitch2').addEventListener('click', function(){
MempakSwitch2.value = '';
MempakSwitch2.dataset.key = '0';
localStorage.removeItem('MempakSwitch2')})

if(localStorage.getItem('MempakSwitch2') != null){
MempakSwitch2Box.value = keyCodes[localStorage.getItem('MempakSwitch2')];
MempakSwitch2Box.dataset.key = keySyms[localStorage.getItem('MempakSwitch2')]}
MempakSwitch2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
MempakSwitch2Box.value = keyCodes[e.keyCode];
MempakSwitch2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('MempakSwitch2', e.keyCode)}})
;
document.getElementById('clearRumblepakSwitch2').addEventListener('click', function(){
RumblepakSwitch2.value = '';
RumblepakSwitch2.dataset.key = '0';
localStorage.removeItem('RumblepakSwitch2')})

if(localStorage.getItem('RumblepakSwitch2') != null){
RumblepakSwitch2Box.value = keyCodes[localStorage.getItem('RumblepakSwitch2')];
RumblepakSwitch2Box.dataset.key = keySyms[localStorage.getItem('RumblepakSwitch2')]}
RumblepakSwitch2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RumblepakSwitch2Box.value = keyCodes[e.keyCode];
RumblepakSwitch2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RumblepakSwitch2', e.keyCode)}})

document.getElementById('clearStickU2').addEventListener('click', function(){
StickU2.value = '';
StickU2.dataset.key = '0';
localStorage.removeItem('StickU2')})

if(localStorage.getItem('StickU2') != null){
StickU2Box.value = keyCodes[localStorage.getItem('StickU2')];
StickU2Box.dataset.key = keySyms[localStorage.getItem('StickU2')]}
StickU2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickU2Box.value = keyCodes[e.keyCode];
StickU2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickU2', e.keyCode)}})

document.getElementById('clearStickL2').addEventListener('click', function(){
StickL2.value = '';
StickL2.dataset.key = '0';
localStorage.removeItem('StickL2')})

if(localStorage.getItem('StickL2') != null){
StickL2Box.value = keyCodes[localStorage.getItem('StickL2')];
StickL2Box.dataset.key = keySyms[localStorage.getItem('StickL2')]}
StickL2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickL2Box.value = keyCodes[e.keyCode];
StickL2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickL2', e.keyCode)}})

document.getElementById('clearStickR2').addEventListener('click', function(){
StickR2.value = '';
StickR2.dataset.key = '0';
localStorage.removeItem('StickR2')})

if(localStorage.getItem('StickR2') != null){
StickR2Box.value = keyCodes[localStorage.getItem('StickR2')];
StickR2Box.dataset.key = keySyms[localStorage.getItem('StickR2')]}
StickR2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickR2Box.value = keyCodes[e.keyCode];
StickR2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickR2', e.keyCode)}})

document.getElementById('clearStickD2').addEventListener('click', function(){
StickD2.value = '';
StickD2.dataset.key = '0';
localStorage.removeItem('StickD2')})

if(localStorage.getItem('StickD2') != null){
StickD2Box.value = keyCodes[localStorage.getItem('StickD2')];
StickD2Box.dataset.key = keySyms[localStorage.getItem('StickD2')]}
StickD2Box.addEventListener('keyup', function(e){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickD2Box.value = keyCodes[e.keyCode];
StickD2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickD2', e.keyCode)}})



document.getElementById('clearAButton3').addEventListener('click', function(){
AButton3.value = '';
AButton3.dataset.key = '0';
localStorage.removeItem('AButton3')})

if(localStorage.getItem('AButton3') != null){
AButton3Box.value = keyCodes[localStorage.getItem('AButton3')];
AButton3Box.dataset.key = keySyms[localStorage.getItem('AButton3')]}
AButton3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
AButton3Box.value = keyCodes[e.keyCode];
AButton3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('AButton3', e.keyCode)}})

document.getElementById('clearBButton3').addEventListener('click', function(){
BButton3.value = '';
BButton3.dataset.key = '0';
localStorage.removeItem('BButton3')})

if(localStorage.getItem('BButton3') != null){
BButton3Box.value = keyCodes[localStorage.getItem('BButton3')];
BButton3Box.dataset.key = keySyms[localStorage.getItem('BButton3')]}
BButton3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
BButton3Box.value = keyCodes[e.keyCode];
BButton3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('BButton3', e.keyCode)}})

document.getElementById('clearLTrig3').addEventListener('click', function(){
LTrig3.value = '';
LTrig3.dataset.key = '0';
localStorage.removeItem('LTrig3')})

if(localStorage.getItem('LTrig3') != null){
LTrig3Box.value = keyCodes[localStorage.getItem('LTrig3')];
LTrig3Box.dataset.key = keySyms[localStorage.getItem('LTrig3')]}
LTrig3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
LTrig3Box.value = keyCodes[e.keyCode];
LTrig3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('LTrig3', e.keyCode)}})

document.getElementById('clearRTrig3').addEventListener('click', function(){
RTrig3.value = '';
RTrig3.dataset.key = '0';
localStorage.removeItem('RTrig3')})

if(localStorage.getItem('RTrig3') != null){
RTrig3Box.value = keyCodes[localStorage.getItem('RTrig3')];
RTrig3Box.dataset.key = keySyms[localStorage.getItem('RTrig3')]}
RTrig3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RTrig3Box.value = keyCodes[e.keyCode];
RTrig3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RTrig3', e.keyCode)}})

document.getElementById('clearZTrig3').addEventListener('click', function(){
ZTrig3.value = '';
ZTrig3.dataset.key = '0';
localStorage.removeItem('ZTrig3')})

if(localStorage.getItem('ZTrig3') != null){
ZTrig3Box.value = keyCodes[localStorage.getItem('ZTrig3')];
ZTrig3Box.dataset.key = keySyms[localStorage.getItem('ZTrig3')]}
ZTrig3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
ZTrig3Box.value = keyCodes[e.keyCode];
ZTrig3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('ZTrig3', e.keyCode)}})

document.getElementById('clearStart3').addEventListener('click', function(){
Start3.value = '';
Start3.dataset.key = '0';
localStorage.removeItem('Start3')})

if(localStorage.getItem('Start3') != null){
Start3Box.value = keyCodes[localStorage.getItem('Start3')];
Start3Box.dataset.key = keySyms[localStorage.getItem('Start3')]}
Start3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
Start3Box.value = keyCodes[e.keyCode];
Start3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('Start3', e.keyCode)}})

document.getElementById('clearDPadU3').addEventListener('click', function(){
DPadU3.value = '';
DPadU3.dataset.key = '0';
localStorage.removeItem('DPadU3')})

if(localStorage.getItem('DPadU3') != null){
DPadU3Box.value = keyCodes[localStorage.getItem('DPadU3')];
DPadU3Box.dataset.key = keySyms[localStorage.getItem('DPadU3')]}
DPadU3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadU3Box.value = keyCodes[e.keyCode];
DPadU3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadU3', e.keyCode)}})

document.getElementById('clearDPadL3').addEventListener('click', function(){
DPadL3.value = '';
DPadL3.dataset.key = '0';
localStorage.removeItem('DPadL3')})

if(localStorage.getItem('DPadL3') != null){
DPadL3Box.value = keyCodes[localStorage.getItem('DPadL3')];
DPadL3Box.dataset.key = keySyms[localStorage.getItem('DPadL3')]}
DPadL3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadL3Box.value = keyCodes[e.keyCode];
DPadL3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadL3', e.keyCode)}})

document.getElementById('clearDPadR3').addEventListener('click', function(){
DPadR3.value = '';
DPadR3.dataset.key = '0';
localStorage.removeItem('DPadR3')})

if(localStorage.getItem('DPadR3') != null){
DPadR3Box.value = keyCodes[localStorage.getItem('DPadR3')];
DPadR3Box.dataset.key = keySyms[localStorage.getItem('DPadR3')]}
DPadR3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadR3Box.value = keyCodes[e.keyCode];
DPadR3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadR3', e.keyCode)}})

document.getElementById('clearDPadD3').addEventListener('click', function(){
DPadD3.value = '';
DPadD3.dataset.key = '0';
localStorage.removeItem('DPadD3')})

if(localStorage.getItem('DPadD3') != null){
DPadD3Box.value = keyCodes[localStorage.getItem('DPadD3')];
DPadD3Box.dataset.key = keySyms[localStorage.getItem('DPadD3')]}
DPadD3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadD3Box.value = keyCodes[e.keyCode];
DPadD3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadD3', e.keyCode)}})

document.getElementById('clearCButtonU3').addEventListener('click', function(){
CButtonU3.value = '';
CButtonU3.dataset.key = '0';
localStorage.removeItem('CButtonU3')})

if(localStorage.getItem('CButtonU3') != null){
CButtonU3Box.value = keyCodes[localStorage.getItem('CButtonU3')];
CButtonU3Box.dataset.key = keySyms[localStorage.getItem('CButtonU3')]}
CButtonU3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonU3Box.value = keyCodes[e.keyCode];
CButtonU3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonU3', e.keyCode)}})

document.getElementById('clearCButtonL3').addEventListener('click', function(){
CButtonL3.value = '';
CButtonL3.dataset.key = '0';
localStorage.removeItem('CButtonL3')})

if(localStorage.getItem('CButtonL3') != null){
CButtonL3Box.value = keyCodes[localStorage.getItem('CButtonL3')];
CButtonL3Box.dataset.key = keySyms[localStorage.getItem('CButtonL3')]}
CButtonL3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonL3Box.value = keyCodes[e.keyCode];
CButtonL3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonL3', e.keyCode)}})

document.getElementById('clearCButtonR3').addEventListener('click', function(){
CButtonR3.value = '';
CButtonR3.dataset.key = '0';
localStorage.removeItem('CButtonR3')})

if(localStorage.getItem('CButtonR3') != null){
CButtonR3Box.value = keyCodes[localStorage.getItem('CButtonR3')];
CButtonR3Box.dataset.key = keySyms[localStorage.getItem('CButtonR3')]}
CButtonR3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonR3Box.value = keyCodes[e.keyCode];
CButtonR3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonR3', e.keyCode)}})

document.getElementById('clearCButtonD3').addEventListener('click', function(){
CButtonD3.value = '';
CButtonD3.dataset.key = '0';
localStorage.removeItem('CButtonD3')})

if(localStorage.getItem('CButtonD3') != null){
CButtonD3Box.value = keyCodes[localStorage.getItem('CButtonD3')];
CButtonD3Box.dataset.key = keySyms[localStorage.getItem('CButtonD3')]}
CButtonD3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonD3Box.value = keyCodes[e.keyCode];
CButtonD3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonD3', e.keyCode)}})

document.getElementById('clearMempakSwitch3').addEventListener('click', function(){
MempakSwitch3.value = '';
MempakSwitch3.dataset.key = '0';
localStorage.removeItem('MempakSwitch3')})

if(localStorage.getItem('MempakSwitch3') != null){
MempakSwitch3Box.value = keyCodes[localStorage.getItem('MempakSwitch3')];
MempakSwitch3Box.dataset.key = keySyms[localStorage.getItem('MempakSwitch3')]}
MempakSwitch3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
MempakSwitch3Box.value = keyCodes[e.keyCode];
MempakSwitch3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('MempakSwitch3', e.keyCode)}})

document.getElementById('clearRumblepakSwitch3').addEventListener('click', function(){
RumblepakSwitch3.value = '';
RumblepakSwitch3.dataset.key = '0';
localStorage.removeItem('RumblepakSwitch3')})

if(localStorage.getItem('RumblepakSwitch3') != null){
RumblepakSwitch3Box.value = keyCodes[localStorage.getItem('RumblepakSwitch3')];
RumblepakSwitch3Box.dataset.key = keySyms[localStorage.getItem('RumblepakSwitch3')]}
RumblepakSwitch3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RumblepakSwitch3Box.value = keyCodes[e.keyCode];
RumblepakSwitch3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RumblepakSwitch3', e.keyCode)}})

document.getElementById('clearStickU3').addEventListener('click', function(){
StickU3.value = '';
StickU3.dataset.key = '0';
localStorage.removeItem('StickU3')})

if(localStorage.getItem('StickU3') != null){
StickU3Box.value = keyCodes[localStorage.getItem('StickU3')];
StickU3Box.dataset.key = keySyms[localStorage.getItem('StickU3')]}
StickU3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickU3Box.value = keyCodes[e.keyCode];
StickU3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickU3', e.keyCode)}})

document.getElementById('clearStickL3').addEventListener('click', function(){
StickL3.value = '';
StickL3.dataset.key = '0';
localStorage.removeItem('StickL3')})

if(localStorage.getItem('StickL3') != null){
StickL3Box.value = keyCodes[localStorage.getItem('StickL3')];
StickL3Box.dataset.key = keySyms[localStorage.getItem('StickL3')]}
StickL3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickL3Box.value = keyCodes[e.keyCode];
StickL3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickL3', e.keyCode)}})

document.getElementById('clearStickR3').addEventListener('click', function(){
StickR3.value = '';
StickR3.dataset.key = '0';
localStorage.removeItem('StickR3')})

if(localStorage.getItem('StickR3') != null){
StickR3Box.value = keyCodes[localStorage.getItem('StickR3')];
StickR3Box.dataset.key = keySyms[localStorage.getItem('StickR3')]}
StickR3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickR3Box.value = keyCodes[e.keyCode];
StickR3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickR3', e.keyCode)}})

document.getElementById('clearStickD3').addEventListener('click', function(){
StickD3.value = '';
StickD3.dataset.key = '0';
localStorage.removeItem('StickD3')})

if(localStorage.getItem('StickD3') != null){
StickD3Box.value = keyCodes[localStorage.getItem('StickD3')];
StickD3Box.dataset.key = keySyms[localStorage.getItem('StickD3')]}
StickD3Box.addEventListener('keyup', function(e){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickD3Box.value = keyCodes[e.keyCode];
StickD3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickD3', e.keyCode)}})



document.getElementById('clearAButton4').addEventListener('click', function(){
AButton4.value = '';
AButton4.dataset.key = '0';
localStorage.removeItem('AButton4')})

if(localStorage.getItem('AButton4') != null){
AButton4Box.value = keyCodes[localStorage.getItem('AButton4')];
AButton4Box.dataset.key = keySyms[localStorage.getItem('AButton4')]}
AButton4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
AButton4Box.value = keyCodes[e.keyCode];
AButton4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('AButton4', e.keyCode)}})

document.getElementById('clearBButton4').addEventListener('click', function(){
BButton4.value = '';
BButton4.dataset.key = '0';
localStorage.removeItem('BButton4')})

if(localStorage.getItem('BButton4') != null){
BButton4Box.value = keyCodes[localStorage.getItem('BButton4')];
BButton4Box.dataset.key = keySyms[localStorage.getItem('BButton4')]}
BButton4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
BButton4Box.value = keyCodes[e.keyCode];
BButton4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('BButton4', e.keyCode)}})

document.getElementById('clearLTrig4').addEventListener('click', function(){
LTrig4.value = '';
LTrig4.dataset.key = '0';
localStorage.removeItem('LTrig4')})

if(localStorage.getItem('LTrig4') != null){
LTrig4Box.value = keyCodes[localStorage.getItem('LTrig4')];
LTrig4Box.dataset.key = keySyms[localStorage.getItem('LTrig4')]}
LTrig4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
LTrig4Box.value = keyCodes[e.keyCode];
LTrig4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('LTrig4', e.keyCode)}})

document.getElementById('clearRTrig4').addEventListener('click', function(){
RTrig4.value = '';
RTrig4.dataset.key = '0';
localStorage.removeItem('RTrig4')})

if(localStorage.getItem('RTrig4') != null){
RTrig4Box.value = keyCodes[localStorage.getItem('RTrig4')];
RTrig4Box.dataset.key = keySyms[localStorage.getItem('RTrig4')]}
RTrig4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RTrig4Box.value = keyCodes[e.keyCode];
RTrig4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RTrig4', e.keyCode)}})

document.getElementById('clearZTrig4').addEventListener('click', function(){
ZTrig4.value = '';
ZTrig4.dataset.key = '0';
localStorage.removeItem('ZTrig4')})

if(localStorage.getItem('ZTrig4') != null){
ZTrig4Box.value = keyCodes[localStorage.getItem('ZTrig4')];
ZTrig4Box.dataset.key = keySyms[localStorage.getItem('ZTrig4')]}
ZTrig4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
ZTrig4Box.value = keyCodes[e.keyCode];
ZTrig4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('ZTrig4', e.keyCode)}})

document.getElementById('clearStart4').addEventListener('click', function(){
Start4.value = '';
Start4.dataset.key = '0';
localStorage.removeItem('Start4')})

if(localStorage.getItem('Start4') != null){
Start4Box.value = keyCodes[localStorage.getItem('Start4')];
Start4Box.dataset.key = keySyms[localStorage.getItem('Start4')]}
Start4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
Start4Box.value = keyCodes[e.keyCode];
Start4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('Start4', e.keyCode)}})

document.getElementById('clearDPadU4').addEventListener('click', function(){
DPadU4.value = '';
DPadU4.dataset.key = '0';
localStorage.removeItem('DPadU4')})

if(localStorage.getItem('DPadU4') != null){
DPadU4Box.value = keyCodes[localStorage.getItem('DPadU4')];
DPadU4Box.dataset.key = keySyms[localStorage.getItem('DPadU4')]}
DPadU4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadU4Box.value = keyCodes[e.keyCode];
DPadU4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadU4', e.keyCode)}})

document.getElementById('clearDPadL4').addEventListener('click', function(){
DPadL4.value = '';
DPadL4.dataset.key = '0';
localStorage.removeItem('DPadL4')})

if(localStorage.getItem('DPadL4') != null){
DPadL4Box.value = keyCodes[localStorage.getItem('DPadL4')];
DPadL4Box.dataset.key = keySyms[localStorage.getItem('DPadL4')]}
DPadL4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadL4Box.value = keyCodes[e.keyCode];
DPadL4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadL4', e.keyCode)}})

document.getElementById('clearDPadR4').addEventListener('click', function(){
DPadR4.value = '';
DPadR4.dataset.key = '0';
localStorage.removeItem('DPadR4')})

if(localStorage.getItem('DPadR4') != null){
DPadR4Box.value = keyCodes[localStorage.getItem('DPadR4')];
DPadR4Box.dataset.key = keySyms[localStorage.getItem('DPadR4')]}
DPadR4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadR4Box.value = keyCodes[e.keyCode];
DPadR4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadR4', e.keyCode)}})

document.getElementById('clearDPadD4').addEventListener('click', function(){
DPadD4.value = '';
DPadD4.dataset.key = '0';
localStorage.removeItem('DPadD4')})

if(localStorage.getItem('DPadD4') != null){
DPadD4Box.value = keyCodes[localStorage.getItem('DPadD4')];
DPadD4Box.dataset.key = keySyms[localStorage.getItem('DPadD4')]}
DPadD4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
DPadD4Box.value = keyCodes[e.keyCode];
DPadD4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('DPadD4', e.keyCode)}})

document.getElementById('clearCButtonU4').addEventListener('click', function(){
CButtonU4.value = '';
CButtonU4.dataset.key = '0';
localStorage.removeItem('CButtonU4')})

if(localStorage.getItem('CButtonU4') != null){
CButtonU4Box.value = keyCodes[localStorage.getItem('CButtonU4')];
CButtonU4Box.dataset.key = keySyms[localStorage.getItem('CButtonU4')]}
CButtonU4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonU4Box.value = keyCodes[e.keyCode];
CButtonU4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonU4', e.keyCode)}})

document.getElementById('clearCButtonL4').addEventListener('click', function(){
CButtonL4.value = '';
CButtonL4.dataset.key = '0';
localStorage.removeItem('CButtonL4')})

if(localStorage.getItem('CButtonL4') != null){
CButtonL4Box.value = keyCodes[localStorage.getItem('CButtonL4')];
CButtonL4Box.dataset.key = keySyms[localStorage.getItem('CButtonL4')]}
CButtonL4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonL4Box.value = keyCodes[e.keyCode];
CButtonL4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonL4', e.keyCode)}})

document.getElementById('clearCButtonR4').addEventListener('click', function(){
CButtonR4.value = '';
CButtonR4.dataset.key = '0';
localStorage.removeItem('CButtonR4')})

if(localStorage.getItem('CButtonR4') != null){
CButtonR4Box.value = keyCodes[localStorage.getItem('CButtonR4')];
CButtonR4Box.dataset.key = keySyms[localStorage.getItem('CButtonR4')]}
CButtonR4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonR4Box.value = keyCodes[e.keyCode];
CButtonR4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonR4', e.keyCode)}})

document.getElementById('clearCButtonD4').addEventListener('click', function(){
CButtonD4.value = '';
CButtonD4.dataset.key = '0';
localStorage.removeItem('CButtonD4')})

if(localStorage.getItem('CButtonD4') != null){
CButtonD4Box.value = keyCodes[localStorage.getItem('CButtonD4')];
CButtonD4Box.dataset.key = keySyms[localStorage.getItem('CButtonD4')]}
CButtonD4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
CButtonD4Box.value = keyCodes[e.keyCode];
CButtonD4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('CButtonD4', e.keyCode)}})

document.getElementById('clearMempakSwitch4').addEventListener('click', function(){
MempakSwitch4.value = '';
MempakSwitch4.dataset.key = '0';
localStorage.removeItem('MempakSwitch4')})

if(localStorage.getItem('MempakSwitch4') != null){
MempakSwitch4Box.value = keyCodes[localStorage.getItem('MempakSwitch4')];
MempakSwitch4Box.dataset.key = keySyms[localStorage.getItem('MempakSwitch4')]}
MempakSwitch4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
MempakSwitch4Box.value = keyCodes[e.keyCode];
MempakSwitch4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('MempakSwitch4', e.keyCode)}})

document.getElementById('clearRumblepakSwitch4').addEventListener('click', function(){
RumblepakSwitch4.value = '';
RumblepakSwitch4.dataset.key = '0';
localStorage.removeItem('RumblepakSwitch4')})

if(localStorage.getItem('RumblepakSwitch4') != null){
RumblepakSwitch4Box.value = keyCodes[localStorage.getItem('RumblepakSwitch4')];
RumblepakSwitch4Box.dataset.key = keySyms[localStorage.getItem('RumblepakSwitch4')]}
RumblepakSwitch4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
RumblepakSwitch4Box.value = keyCodes[e.keyCode];
RumblepakSwitch4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('RumblepakSwitch4', e.keyCode)}})

document.getElementById('clearStickU4').addEventListener('click', function(){
StickU4.value = '';
StickU4.dataset.key = '0';
localStorage.removeItem('StickU4')})

if(localStorage.getItem('StickU4') != null){
StickU4Box.value = keyCodes[localStorage.getItem('StickU4')];
StickU4Box.dataset.key = keySyms[localStorage.getItem('StickU4')]}
StickU4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickU4Box.value = keyCodes[e.keyCode];
StickU4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickU4', e.keyCode)}})

document.getElementById('clearStickL4').addEventListener('click', function(){
StickL4.value = '';
StickL4.dataset.key = '0';
localStorage.removeItem('StickL4')})

if(localStorage.getItem('StickL4') != null){
StickL4Box.value = keyCodes[localStorage.getItem('StickL4')];
StickL4Box.dataset.key = keySyms[localStorage.getItem('StickL4')]}
StickL4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickL4Box.value = keyCodes[e.keyCode];
StickL4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickL4', e.keyCode)}})

document.getElementById('clearStickR4').addEventListener('click', function(){
StickR4.value = '';
StickR4.dataset.key = '0';
localStorage.removeItem('StickR4')})

if(localStorage.getItem('StickR4') != null){
StickR4Box.value = keyCodes[localStorage.getItem('StickR4')];
StickR4Box.dataset.key = keySyms[localStorage.getItem('StickR4')]}
StickR4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickR4Box.value = keyCodes[e.keyCode];
StickR4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickR4', e.keyCode)}})

document.getElementById('clearStickD4').addEventListener('click', function(){
StickD4.value = '';
StickD4.dataset.key = '0';
localStorage.removeItem('StickD4')})

if(localStorage.getItem('StickD4') != null){
StickD4Box.value = keyCodes[localStorage.getItem('StickD4')];
StickD4Box.dataset.key = keySyms[localStorage.getItem('StickD4')]}
StickD4Box.addEventListener('keyup', function(e){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')
if(keyCodes[e.keyCode] != undefined){
StickD4Box.value = keyCodes[e.keyCode];
StickD4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('StickD4', e.keyCode)}})



document.getElementById('clearhkTexDump').addEventListener('click', function(){
hkTexDumpBox.value = '';
localStorage.removeItem('hkTexDump')})
if(localStorage.getItem('hkTexDump') != null){
hkTexDumpBox.value = hotKeys[localStorage.getItem('hkTexDump')]}
hkTexDumpBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkTexDumpBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkTexDump', e.keyCode)}})

document.getElementById('clearhkHdTexReload').addEventListener('click', function(){
hkHdTexReloadBox.value = '';
localStorage.removeItem('hkHdTexReload')})
if(localStorage.getItem('hkHdTexReload') != null){
hkHdTexReloadBox.value = hotKeys[localStorage.getItem('hkHdTexReload')]}
hkHdTexReloadBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkHdTexReloadBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkHdTexReload', e.keyCode)}})

document.getElementById('clearhkHdTexToggle').addEventListener('click', function(){
hkHdTexToggleBox.value = '';
localStorage.removeItem('hkHdTexToggle')})
if(localStorage.getItem('hkHdTexToggle') != null){
hkHdTexToggleBox.value = hotKeys[localStorage.getItem('hkHdTexToggle')]}
hkHdTexToggleBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkHdTexToggleBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkHdTexToggle', e.keyCode)}})

document.getElementById('clearhkVsync').addEventListener('click', function(){
hkVsyncBox.value = '';
localStorage.removeItem('hkVsync')})
if(localStorage.getItem('hkVsync') != null){
hkVsyncBox.value = hotKeys[localStorage.getItem('hkVsync')]}
hkVsyncBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkVsyncBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkVsync', e.keyCode)}})

document.getElementById('clearhkFBEmulation').addEventListener('click', function(){
hkFBEmulationBox.value = '';
localStorage.removeItem('hkFBEmulation')})
if(localStorage.getItem('hkFBEmulation') != null){
hkFBEmulationBox.value = hotKeys[localStorage.getItem('hkFBEmulation')]}
hkFBEmulationBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkFBEmulationBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkFBEmulation', e.keyCode)}})

document.getElementById('clearhkN64DepthCompare').addEventListener('click', function(){
hkN64DepthCompareBox.value = '';
localStorage.removeItem('hkN64DepthCompare')})
if(localStorage.getItem('hkN64DepthCompare') != null){
hkN64DepthCompareBox.value = hotKeys[localStorage.getItem('hkN64DepthCompare')]}
hkN64DepthCompareBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkN64DepthCompareBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkN64DepthCompare', e.keyCode)}})

document.getElementById('clearhkOsdVis').addEventListener('click', function(){
hkOsdVisBox.value = '';
localStorage.removeItem('hkOsdVis')})
if(localStorage.getItem('hkOsdVis') != null){
hkOsdVisBox.value = hotKeys[localStorage.getItem('hkOsdVis')]}
hkOsdVisBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkOsdVisBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkOsdVis', e.keyCode)}})

document.getElementById('clearhkOsdFps').addEventListener('click', function(){
hkOsdFpsBox.value = '';
localStorage.removeItem('hkOsdFps')})
if(localStorage.getItem('hkOsdFps') != null){
hkOsdFpsBox.value = hotKeys[localStorage.getItem('hkOsdFps')]}
hkOsdFpsBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkOsdFpsBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkOsdFps', e.keyCode)}})

document.getElementById('clearhkOsdPercent').addEventListener('click', function(){
hkOsdPercentBox.value = '';
localStorage.removeItem('hkOsdPercent')})
if(localStorage.getItem('hkOsdPercent') != null){
hkOsdPercentBox.value = hotKeys[localStorage.getItem('hkOsdPercent')]}
hkOsdPercentBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkOsdPercentBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkOsdPercent', e.keyCode)}})

document.getElementById('clearhkOsdInternalResolution').addEventListener('click', function(){
hkOsdInternalResolutionBox.value = '';
localStorage.removeItem('hkOsdInternalResolution')})
if(localStorage.getItem('hkOsdInternalResolution') != null){
hkOsdInternalResolutionBox.value = hotKeys[localStorage.getItem('hkOsdInternalResolution')]}
hkOsdInternalResolutionBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkOsdInternalResolutionBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkOsdInternalResolution', e.keyCode)}})

document.getElementById('clearhkOsdRenderingResolution').addEventListener('click', function(){
hkOsdRenderingResolutionBox.value = '';
localStorage.removeItem('hkOsdRenderingResolution')})
if(localStorage.getItem('hkOsdRenderingResolution') != null){
hkOsdRenderingResolutionBox.value = hotKeys[localStorage.getItem('hkOsdRenderingResolution')]}
hkOsdRenderingResolutionBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkOsdRenderingResolutionBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkOsdRenderingResolution', e.keyCode)}})

document.getElementById('clearhkTexCoordBounds').addEventListener('click', function(){
hkTexCoordBoundsBox.value = '';
localStorage.removeItem('hkTexCoordBounds')})
if(localStorage.getItem('hkTexCoordBounds') != null){
hkTexCoordBoundsBox.value = hotKeys[localStorage.getItem('hkTexCoordBounds')]}
hkTexCoordBoundsBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkTexCoordBoundsBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkTexCoordBounds', e.keyCode)}})

document.getElementById('clearhkNativeResTexrects').addEventListener('click', function(){
hkNativeResTexrectsBox.value = '';
localStorage.removeItem('hkNativeResTexrects')})
if(localStorage.getItem('hkNativeResTexrects') != null){
hkNativeResTexrectsBox.value = hotKeys[localStorage.getItem('hkNativeResTexrects')]}
hkNativeResTexrectsBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkNativeResTexrectsBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkNativeResTexrects', e.keyCode)}})

document.getElementById('clearhkForceGammaCorrection').addEventListener('click', function(){
hkForceGammaCorrectionBox.value = '';
localStorage.removeItem('hkForceGammaCorrection')})
if(localStorage.getItem('hkForceGammaCorrection') != null){
hkForceGammaCorrectionBox.value = hotKeys[localStorage.getItem('hkForceGammaCorrection')]}
hkForceGammaCorrectionBox.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
hkForceGammaCorrectionBox.value = hotKeys[e.keyCode];
localStorage.setItem('hkForceGammaCorrection', e.keyCode)}})



document.getElementById('clearKbdMappingStop').addEventListener('click', function(){
KbdMappingStopBox.value = '';
KbdMappingStopBox.dataset.key = '0';
localStorage.removeItem('KbdMappingStop')})
if(localStorage.getItem('KbdMappingStop') != null){
KbdMappingStopBox.value = keyCodes[localStorage.getItem('KbdMappingStop')];
KbdMappingStopBox.dataset.key = keySyms[localStorage.getItem('KbdMappingStop')]}
KbdMappingStopBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingStopBox.value = keyCodes[e.keyCode];
KbdMappingStopBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingStop', e.keyCode)}})

document.getElementById('clearKbdMappingSlot0').addEventListener('click', function(){
KbdMappingSlot0Box.value = '';
KbdMappingSlot0Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot0')})
if(localStorage.getItem('KbdMappingSlot0') != null){
KbdMappingSlot0Box.value = keyCodes[localStorage.getItem('KbdMappingSlot0')];
KbdMappingSlot0Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot0')]}
KbdMappingSlot0Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot0Box.value = keyCodes[e.keyCode];
KbdMappingSlot0Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot0', e.keyCode)}})

document.getElementById('clearKbdMappingSlot1').addEventListener('click', function(){
KbdMappingSlot1Box.value = '';
KbdMappingSlot1Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot1')})
if(localStorage.getItem('KbdMappingSlot1') != null){
KbdMappingSlot1Box.value = keyCodes[localStorage.getItem('KbdMappingSlot1')];
KbdMappingSlot1Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot1')]}
KbdMappingSlot1Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot1Box.value = keyCodes[e.keyCode];
KbdMappingSlot1Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot1', e.keyCode)}})

document.getElementById('clearKbdMappingSlot2').addEventListener('click', function(){
KbdMappingSlot2Box.value = '';
KbdMappingSlot2Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot2')})
if(localStorage.getItem('KbdMappingSlot2') != null){
KbdMappingSlot2Box.value = keyCodes[localStorage.getItem('KbdMappingSlot2')];
KbdMappingSlot2Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot2')]}
KbdMappingSlot2Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot2Box.value = keyCodes[e.keyCode];
KbdMappingSlot2Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot2', e.keyCode)}})

document.getElementById('clearKbdMappingSlot3').addEventListener('click', function(){
KbdMappingSlot3Box.value = '';
KbdMappingSlot3Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot3')})
if(localStorage.getItem('KbdMappingSlot3') != null){
KbdMappingSlot3Box.value = keyCodes[localStorage.getItem('KbdMappingSlot3')];
KbdMappingSlot3Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot3')]}
KbdMappingSlot3Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot3Box.value = keyCodes[e.keyCode];
KbdMappingSlot3Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot3', e.keyCode)}})

document.getElementById('clearKbdMappingSlot4').addEventListener('click', function(){
KbdMappingSlot4Box.value = '';
KbdMappingSlot4Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot4')})
if(localStorage.getItem('KbdMappingSlot4') != null){
KbdMappingSlot4Box.value = keyCodes[localStorage.getItem('KbdMappingSlot4')];
KbdMappingSlot4Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot4')]}
KbdMappingSlot4Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot4Box.value = keyCodes[e.keyCode];
KbdMappingSlot4Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot4', e.keyCode)}})

document.getElementById('clearKbdMappingSlot5').addEventListener('click', function(){
KbdMappingSlot5Box.value = '';
KbdMappingSlot5Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot5')})
if(localStorage.getItem('KbdMappingSlot5') != null){
KbdMappingSlot5Box.value = keyCodes[localStorage.getItem('KbdMappingSlot5')];
KbdMappingSlot5Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot5')]}
KbdMappingSlot5Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot5Box.value = keyCodes[e.keyCode];
KbdMappingSlot5Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot5', e.keyCode)}})

document.getElementById('clearKbdMappingSlot6').addEventListener('click', function(){
KbdMappingSlot6Box.value = '';
KbdMappingSlot6Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot6')})
if(localStorage.getItem('KbdMappingSlot6') != null){
KbdMappingSlot6Box.value = keyCodes[localStorage.getItem('KbdMappingSlot6')];
KbdMappingSlot6Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot6')]}
KbdMappingSlot6Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot6Box.value = keyCodes[e.keyCode];
KbdMappingSlot6Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot6', e.keyCode)}})

document.getElementById('clearKbdMappingSlot7').addEventListener('click', function(){
KbdMappingSlot7Box.value = '';
KbdMappingSlot7Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot7')})
if(localStorage.getItem('KbdMappingSlot7') != null){
KbdMappingSlot7Box.value = keyCodes[localStorage.getItem('KbdMappingSlot7')];
KbdMappingSlot7Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot7')]}
KbdMappingSlot7Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot7Box.value = keyCodes[e.keyCode];
KbdMappingSlot7Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot7', e.keyCode)}})

document.getElementById('clearKbdMappingSlot8').addEventListener('click', function(){
KbdMappingSlot8Box.value = '';
KbdMappingSlot8Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot8')})
if(localStorage.getItem('KbdMappingSlot8') != null){
KbdMappingSlot8Box.value = keyCodes[localStorage.getItem('KbdMappingSlot8')];
KbdMappingSlot8Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot8')]}
KbdMappingSlot8Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot8Box.value = keyCodes[e.keyCode];
KbdMappingSlot8Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot8', e.keyCode)}})

document.getElementById('clearKbdMappingSlot9').addEventListener('click', function(){
KbdMappingSlot9Box.value = '';
KbdMappingSlot9Box.dataset.key = '0';
localStorage.removeItem('KbdMappingSlot9')})
if(localStorage.getItem('KbdMappingSlot9') != null){
KbdMappingSlot9Box.value = keyCodes[localStorage.getItem('KbdMappingSlot9')];
KbdMappingSlot9Box.dataset.key = keySyms[localStorage.getItem('KbdMappingSlot9')]}
KbdMappingSlot9Box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSlot9Box.value = keyCodes[e.keyCode];
KbdMappingSlot9Box.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSlot9', e.keyCode)}})

document.getElementById('clearKbdMappingFullscreen').addEventListener('click', function(){
KbdMappingFullscreenBox.value = '';
KbdMappingFullscreenBox.dataset.key = '0';
localStorage.removeItem('KbdMappingFullscreen')})
if(localStorage.getItem('KbdMappingFullscreen') != null){
KbdMappingFullscreenBox.value = keyCodes[localStorage.getItem('KbdMappingFullscreen')];
KbdMappingFullscreenBox.dataset.key = keySyms[localStorage.getItem('KbdMappingFullscreen')]}
KbdMappingFullscreenBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingFullscreenBox.value = keyCodes[e.keyCode];
KbdMappingFullscreenBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingFullscreen', e.keyCode)}})

document.getElementById('clearKbdMappingSaveState').addEventListener('click', function(){
KbdMappingSaveStateBox.value = '';
KbdMappingSaveStateBox.dataset.key = '0';
localStorage.removeItem('KbdMappingSaveState')})
if(localStorage.getItem('KbdMappingSaveState') != null){
KbdMappingSaveStateBox.value = keyCodes[localStorage.getItem('KbdMappingSaveState')];
KbdMappingSaveStateBox.dataset.key = keySyms[localStorage.getItem('KbdMappingSaveState')]}
KbdMappingSaveStateBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSaveStateBox.value = keyCodes[e.keyCode];
KbdMappingSaveStateBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSaveState', e.keyCode)}})

document.getElementById('clearKbdMappingLoadState').addEventListener('click', function(){
KbdMappingLoadStateBox.value = '';
KbdMappingLoadStateBox.dataset.key = '0';
localStorage.removeItem('KbdMappingLoadState')})
if(localStorage.getItem('KbdMappingLoadState') != null){
KbdMappingLoadStateBox.value = keyCodes[localStorage.getItem('KbdMappingLoadState')];
KbdMappingLoadStateBox.dataset.key = keySyms[localStorage.getItem('KbdMappingLoadState')]}
KbdMappingLoadStateBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingLoadStateBox.value = keyCodes[e.keyCode];
KbdMappingLoadStateBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingLoadState', e.keyCode)}})

document.getElementById('clearKbdMappingIncrementSlot').addEventListener('click', function(){
KbdMappingIncrementSlotBox.value = '';
KbdMappingIncrementSlotBox.dataset.key = '0';
localStorage.removeItem('KbdMappingIncrementSlot')})
if(localStorage.getItem('KbdMappingIncrementSlot') != null){
KbdMappingIncrementSlotBox.value = keyCodes[localStorage.getItem('KbdMappingIncrementSlot')];
KbdMappingIncrementSlotBox.dataset.key = keySyms[localStorage.getItem('KbdMappingIncrementSlot')]}
KbdMappingIncrementSlotBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingIncrementSlotBox.value = keyCodes[e.keyCode];
KbdMappingIncrementSlotBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingIncrementSlot', e.keyCode)}})

document.getElementById('clearKbdMappingReset').addEventListener('click', function(){
KbdMappingResetBox.value = '';
KbdMappingResetBox.dataset.key = '0';
localStorage.removeItem('KbdMappingReset')})
if(localStorage.getItem('KbdMappingReset') != null){
KbdMappingResetBox.value = keyCodes[localStorage.getItem('KbdMappingReset')];
KbdMappingResetBox.dataset.key = keySyms[localStorage.getItem('KbdMappingReset')]}
KbdMappingResetBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingResetBox.value = keyCodes[e.keyCode];
KbdMappingResetBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingReset', e.keyCode)}})

document.getElementById('clearKbdMappingSpeedDown').addEventListener('click', function(){
KbdMappingSpeedDownBox.value = '';
KbdMappingSpeedDownBox.dataset.key = '0';
localStorage.removeItem('KbdMappingSpeedDown')})
if(localStorage.getItem('KbdMappingSpeedDown') != null){
KbdMappingSpeedDownBox.value = keyCodes[localStorage.getItem('KbdMappingSpeedDown')];
KbdMappingSpeedDownBox.dataset.key = keySyms[localStorage.getItem('KbdMappingSpeedDown')]}
KbdMappingSpeedDownBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSpeedDownBox.value = keyCodes[e.keyCode];
KbdMappingSpeedDownBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSpeedDown', e.keyCode)}})

document.getElementById('clearKbdMappingSpeedUp').addEventListener('click', function(){
KbdMappingSpeedUpBox.value = '';
KbdMappingSpeedUpBox.dataset.key = '0';
localStorage.removeItem('KbdMappingSpeedUp')})
if(localStorage.getItem('KbdMappingSpeedUp') != null){
KbdMappingSpeedUpBox.value = keyCodes[localStorage.getItem('KbdMappingSpeedUp')];
KbdMappingSpeedUpBox.dataset.key = keySyms[localStorage.getItem('KbdMappingSpeedUp')]}
KbdMappingSpeedUpBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingSpeedUpBox.value = keyCodes[e.keyCode];
KbdMappingSpeedUpBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingSpeedUp', e.keyCode)}})

document.getElementById('clearKbdMappingScreenshot').addEventListener('click', function(){
KbdMappingScreenshotBox.value = '';
KbdMappingScreenshotBox.dataset.key = '0';
localStorage.removeItem('KbdMappingScreenshot')})
if(localStorage.getItem('KbdMappingScreenshot') != null){
KbdMappingScreenshotBox.value = keyCodes[localStorage.getItem('KbdMappingScreenshot')];
KbdMappingScreenshotBox.dataset.key = keySyms[localStorage.getItem('KbdMappingScreenshot')]}
KbdMappingScreenshotBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingScreenshotBox.value = keyCodes[e.keyCode];
KbdMappingScreenshotBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingScreenshot', e.keyCode)}})

document.getElementById('clearKbdMappingPause').addEventListener('click', function(){
KbdMappingPauseBox.value = '';
KbdMappingPauseBox.dataset.key = '0';
localStorage.removeItem('KbdMappingPause')})
if(localStorage.getItem('KbdMappingPause') != null){
KbdMappingPauseBox.value = keyCodes[localStorage.getItem('KbdMappingPause')];
KbdMappingPauseBox.dataset.key = keySyms[localStorage.getItem('KbdMappingPause')]}
KbdMappingPauseBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingPauseBox.value = keyCodes[e.keyCode];
KbdMappingPauseBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingPause', e.keyCode)}})

document.getElementById('clearKbdMappingMute').addEventListener('click', function(){
KbdMappingMuteBox.value = '';
KbdMappingMuteBox.dataset.key = '0';
localStorage.removeItem('KbdMappingMute')})
if(localStorage.getItem('KbdMappingMute') != null){
KbdMappingMuteBox.value = keyCodes[localStorage.getItem('KbdMappingMute')];
KbdMappingMuteBox.dataset.key = keySyms[localStorage.getItem('KbdMappingMute')]}
KbdMappingMuteBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingMuteBox.value = keyCodes[e.keyCode];
KbdMappingMuteBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingMute', e.keyCode)}})

document.getElementById('clearKbdMappingIncreaseVolume').addEventListener('click', function(){
KbdMappingIncreaseVolumeBox.value = '';
KbdMappingIncreaseVolumeBox.dataset.key = '0';
localStorage.removeItem('KbdMappingIncreaseVolume')})
if(localStorage.getItem('KbdMappingIncreaseVolume') != null){
KbdMappingIncreaseVolumeBox.value = keyCodes[localStorage.getItem('KbdMappingIncreaseVolume')];
KbdMappingIncreaseVolumeBox.dataset.key = keySyms[localStorage.getItem('KbdMappingIncreaseVolume')]}
KbdMappingIncreaseVolumeBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingIncreaseVolumeBox.value = keyCodes[e.keyCode];
KbdMappingIncreaseVolumeBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingIncreaseVolume', e.keyCode)}})

document.getElementById('clearKbdMappingDecreaseVolume').addEventListener('click', function(){
KbdMappingDecreaseVolumeBox.value = '';
KbdMappingDecreaseVolumeBox.dataset.key = '0';
localStorage.removeItem('KbdMappingDecreaseVolume')})
if(localStorage.getItem('KbdMappingDecreaseVolume') != null){
KbdMappingDecreaseVolumeBox.value = keyCodes[localStorage.getItem('KbdMappingDecreaseVolume')];
KbdMappingDecreaseVolumeBox.dataset.key = keySyms[localStorage.getItem('KbdMappingDecreaseVolume')]}
KbdMappingDecreaseVolumeBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingDecreaseVolumeBox.value = keyCodes[e.keyCode];
KbdMappingDecreaseVolumeBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingDecreaseVolume', e.keyCode)}})

document.getElementById('clearKbdMappingFastForward').addEventListener('click', function(){
KbdMappingFastForwardBox.value = '';
KbdMappingFastForwardBox.dataset.key = '0';
localStorage.removeItem('KbdMappingFastForward')})
if(localStorage.getItem('KbdMappingFastForward') != null){
KbdMappingFastForwardBox.value = keyCodes[localStorage.getItem('KbdMappingFastForward')];
KbdMappingFastForwardBox.dataset.key = keySyms[localStorage.getItem('KbdMappingFastForward')]}
KbdMappingFastForwardBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingFastForwardBox.value = keyCodes[e.keyCode];
KbdMappingFastForwardBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingFastForward', e.keyCode)}})

document.getElementById('clearKbdMappingFrameAdvance').addEventListener('click', function(){
KbdMappingFrameAdvanceBox.value = '';
KbdMappingFrameAdvanceBox.dataset.key = '0';
localStorage.removeItem('KbdMappingFrameAdvance')})
if(localStorage.getItem('KbdMappingFrameAdvance') != null){
KbdMappingFrameAdvanceBox.value = keyCodes[localStorage.getItem('KbdMappingFrameAdvance')];
KbdMappingFrameAdvanceBox.dataset.key = keySyms[localStorage.getItem('KbdMappingFrameAdvance')]}
KbdMappingFrameAdvanceBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingFrameAdvanceBox.value = keyCodes[e.keyCode];
KbdMappingFrameAdvanceBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingFrameAdvance', e.keyCode)}})

document.getElementById('clearKbdMappingGameshark').addEventListener('click', function(){
KbdMappingGamesharkBox.value = '';
KbdMappingGamesharkBox.dataset.key = '0';
localStorage.removeItem('KbdMappingGameshark')})
if(localStorage.getItem('KbdMappingGameshark') != null){
KbdMappingGamesharkBox.value = keyCodes[localStorage.getItem('KbdMappingGameshark')];
KbdMappingGamesharkBox.dataset.key = keySyms[localStorage.getItem('KbdMappingGameshark')]}
KbdMappingGamesharkBox.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
KbdMappingGamesharkBox.value = keyCodes[e.keyCode];
KbdMappingGamesharkBox.dataset.key = keySyms[e.keyCode];
localStorage.setItem('KbdMappingGameshark', e.keyCode)}})



if(localStorage.getItem('resolution') != null){resDropdown.value = localStorage.getItem('resolution')}
resDropdown.addEventListener('change', function(){localStorage.setItem('resolution', resDropdown.options[resDropdown.selectedIndex].value)})

if(localStorage.getItem('gfx') != null){gfxDropdown.value = localStorage.getItem('gfx')}
gfxDropdown.addEventListener('change', function(){localStorage.setItem('gfx', gfxDropdown.options[gfxDropdown.selectedIndex].value)})

if(localStorage.getItem('audio') != null){audioDropdown.value = localStorage.getItem('audio')}
audioDropdown.addEventListener('change', function(){localStorage.setItem('audio', audioDropdown.options[audioDropdown.selectedIndex].value)})

if(localStorage.getItem('input') != null){inputDropdown.value = localStorage.getItem('input')}
inputDropdown.addEventListener('change', function(){localStorage.setItem('input', inputDropdown.options[inputDropdown.selectedIndex].value)})

if(localStorage.getItem('rsp') != null){
rspDropdown.value = localStorage.getItem('rsp')
if(localStorage.getItem('rsp') === 'mupen64plus-rsp-hle'){rspGFXCheckbox.disabled = true;rspAudioCheckbox.disabled = false;WaitForCPUHostCheckbox.disabled = true;SupportCPUSemaphoreLockCheckbox.disabled = true}
else if(localStorage.getItem('rsp') === 'mupen64plus-rsp-cxd4-sse2'){rspGFXCheckbox.disabled = false;rspAudioCheckbox.disabled = false;WaitForCPUHostCheckbox.disabled = false;SupportCPUSemaphoreLockCheckbox.disabled = false}
else if(localStorage.getItem('rsp') === 'mupen64plus-rsp-parallel'){rspGFXCheckbox.disabled = true;rspAudioCheckbox.disabled = true;WaitForCPUHostCheckbox.disabled = true;SupportCPUSemaphoreLockCheckbox.disabled = true}}
function rspDropdownDisable(){if(rspDropdown.value === 'mupen64plus-rsp-hle'){
rspGFXCheckbox.disabled = true;rspAudioCheckbox.disabled = false;WaitForCPUHostCheckbox.disabled = true;SupportCPUSemaphoreLockCheckbox.disabled = true}
else if(rspDropdown.value === 'mupen64plus-rsp-cxd4-sse2'){rspGFXCheckbox.disabled = false;rspAudioCheckbox.disabled = false;WaitForCPUHostCheckbox.disabled = false;SupportCPUSemaphoreLockCheckbox.disabled = false}
else if(rspDropdown.value === 'mupen64plus-rsp-parallel'){rspGFXCheckbox.disabled = true;rspAudioCheckbox.disabled = true;WaitForCPUHostCheckbox.disabled = true;SupportCPUSemaphoreLockCheckbox.disabled = true}
localStorage.setItem('rsp', rspDropdown.options[rspDropdown.selectedIndex].value)}
rspDropdown.addEventListener('change', function(){rspDropdownDisable()})
rspDropdownDisable();

if(localStorage.getItem('emumode') != null){emumodeDropdown.value = localStorage.getItem('emumode')}
emumodeDropdown.addEventListener('change', function(){localStorage.setItem('emumode', emumodeDropdown.options[emumodeDropdown.selectedIndex].value)})

if(localStorage.getItem('plugin1') != null){plugin1Dropdown.value = localStorage.getItem('plugin1')}
plugin1Dropdown.addEventListener('change', function(){localStorage.setItem('plugin1', plugin1Dropdown.options[plugin1Dropdown.selectedIndex].value)})

if(localStorage.getItem('plugin2') != null){plugin2Dropdown.value = localStorage.getItem('plugin2')}
plugin2Dropdown.addEventListener('change', function(){localStorage.setItem('plugin2', plugin2Dropdown.options[plugin2Dropdown.selectedIndex].value)})

if(localStorage.getItem('plugin3') != null){plugin3Dropdown.value = localStorage.getItem('plugin3')}
plugin3Dropdown.addEventListener('change', function(){localStorage.setItem('plugin3', plugin3Dropdown.options[plugin3Dropdown.selectedIndex].value)})

if(localStorage.getItem('plugin4') != null){plugin4Dropdown.value = localStorage.getItem('plugin4')}
plugin4Dropdown.addEventListener('change', function(){localStorage.setItem('plugin4', plugin4Dropdown.options[plugin4Dropdown.selectedIndex].value)})

if(localStorage.getItem('msaa') != null){msaaDropdown.value = localStorage.getItem('msaa')}
msaaDropdown.addEventListener('change', function(){localStorage.setItem('msaa', msaaDropdown.options[msaaDropdown.selectedIndex].value)})

if(localStorage.getItem('aspectRatio') != null){aspectRatioDropdown.value = localStorage.getItem('aspectRatio')}
aspectRatioDropdown.addEventListener('change', function(){localStorage.setItem('aspectRatio', aspectRatioDropdown.options[aspectRatioDropdown.selectedIndex].value)})

if(localStorage.getItem('bufferSwapMode') != null){bufferSwapModeDropdown.value = localStorage.getItem('bufferSwapMode')}
bufferSwapModeDropdown.addEventListener('change', function(){localStorage.setItem('bufferSwapMode', bufferSwapModeDropdown.options[bufferSwapModeDropdown.selectedIndex].value)})

if(localStorage.getItem('useNativeResolutionFactor') != null){useNativeResolutionFactorDropdown.value = localStorage.getItem('useNativeResolutionFactor')}
useNativeResolutionFactorDropdown.addEventListener('change', function(){localStorage.setItem('useNativeResolutionFactor', useNativeResolutionFactorDropdown.options[useNativeResolutionFactorDropdown.selectedIndex].value)})

if(localStorage.getItem('anisotropy') != null){anisotropyDropdown.value = localStorage.getItem('anisotropy')}
anisotropyDropdown.addEventListener('change', function(){localStorage.setItem('anisotropy', anisotropyDropdown.options[anisotropyDropdown.selectedIndex].value)})

if(localStorage.getItem('cache') != null){cacheDropdown.value = localStorage.getItem('cache')}
cacheDropdown.addEventListener('change', function(){localStorage.setItem('cache', cacheDropdown.options[cacheDropdown.selectedIndex].value)})

if(localStorage.getItem('RDRAMImageDitheringMode') != null){RDRAMImageDitheringModeDropdown.value = localStorage.getItem('RDRAMImageDitheringMode')}
RDRAMImageDitheringModeDropdown.addEventListener('change', function(){
localStorage.setItem('RDRAMImageDitheringMode', RDRAMImageDitheringModeDropdown.options[RDRAMImageDitheringModeDropdown.selectedIndex].value)})

if(localStorage.getItem('CorrectTexrectCoords') != null){CorrectTexrectCoordsDropdown.value = localStorage.getItem('CorrectTexrectCoords')}
CorrectTexrectCoordsDropdown.addEventListener('change', function(){localStorage.setItem('CorrectTexrectCoords', CorrectTexrectCoordsDropdown.options[CorrectTexrectCoordsDropdown.selectedIndex].value)})

if(localStorage.getItem('EnableNativeResTexrects') != null){EnableNativeResTexrectsDropdown.value = localStorage.getItem('EnableNativeResTexrects')}
EnableNativeResTexrectsDropdown.addEventListener('change', function(){localStorage.setItem('EnableNativeResTexrects', EnableNativeResTexrectsDropdown.options[EnableNativeResTexrectsDropdown.selectedIndex].value)})

if(localStorage.getItem('BackgroundsMode') != null){BackgroundsModeDropdown.value = localStorage.getItem('BackgroundsMode')}
BackgroundsModeDropdown.addEventListener('change', function(){localStorage.setItem('BackgroundsMode', BackgroundsModeDropdown.options[BackgroundsModeDropdown.selectedIndex].value)})

if(localStorage.getItem('EnableN64DepthCompare') != null){EnableN64DepthCompareDropdown.value = localStorage.getItem('EnableN64DepthCompare')}
EnableN64DepthCompareDropdown.addEventListener('change', function(){localStorage.setItem('EnableN64DepthCompare', EnableN64DepthCompareDropdown.options[EnableN64DepthCompareDropdown.selectedIndex].value)})

if(localStorage.getItem('EnableCopyColorToRDRAM') != null){EnableCopyColorToRDRAMDropdown.value = localStorage.getItem('EnableCopyColorToRDRAM')}
EnableCopyColorToRDRAMDropdown.addEventListener('change', function(){localStorage.setItem('EnableCopyColorToRDRAM', EnableCopyColorToRDRAMDropdown.options[EnableCopyColorToRDRAMDropdown.selectedIndex].value)})

if(localStorage.getItem('EnableCopyDepthToRDRAM') != null){EnableCopyDepthToRDRAMDropdown.value = localStorage.getItem('EnableCopyDepthToRDRAM')}
EnableCopyDepthToRDRAMDropdown.addEventListener('change', function(){localStorage.setItem('EnableCopyDepthToRDRAM', EnableCopyDepthToRDRAMDropdown.options[EnableCopyDepthToRDRAMDropdown.selectedIndex].value)})

if(localStorage.getItem('txFilterMode') != null){txFilterModeDropdown.value = localStorage.getItem('txFilterMode')}
txFilterModeDropdown.addEventListener('change', function(){localStorage.setItem('txFilterMode', txFilterModeDropdown.options[txFilterModeDropdown.selectedIndex].value)})

if(localStorage.getItem('txEnhancementMode') != null){txEnhancementModeDropdown.value = localStorage.getItem('txEnhancementMode')}
txEnhancementModeDropdown.addEventListener('change', function(){localStorage.setItem('txEnhancementMode', txEnhancementModeDropdown.options[txEnhancementModeDropdown.selectedIndex].value)})

if(localStorage.getItem('ViMode') != null){ViModeDropdown.value = localStorage.getItem('ViMode')}
ViModeDropdown.addEventListener('change', function(){localStorage.setItem('ViMode', ViModeDropdown.options[ViModeDropdown.selectedIndex].value)})

if(localStorage.getItem('ViInterpolation') != null){ViInterpolationDropdown.value = localStorage.getItem('ViInterpolation')}
ViInterpolationDropdown.addEventListener('change', function(){localStorage.setItem('ViInterpolation', ViInterpolationDropdown.options[ViInterpolationDropdown.selectedIndex].value)})

if(localStorage.getItem('DpCompat') != null){DpCompatDropdown.value = localStorage.getItem('DpCompat')}
DpCompatDropdown.addEventListener('change', function(){localStorage.setItem('DpCompat', DpCompatDropdown.options[DpCompatDropdown.selectedIndex].value)})

if(localStorage.getItem('ParallelUpscaling') != null){ParallelUpscalingDropdown.value = localStorage.getItem('ParallelUpscaling')}
ParallelUpscalingDropdown.addEventListener('change', function(){localStorage.setItem('ParallelUpscaling', ParallelUpscalingDropdown.options[ParallelUpscalingDropdown.selectedIndex].value)})

if(localStorage.getItem('ParallelDeinterlace') != null){ParallelDeinterlaceDropdown.value = localStorage.getItem('ParallelDeinterlace')}
ParallelDeinterlaceDropdown.addEventListener('change', function(){localStorage.setItem('ParallelDeinterlace', ParallelDeinterlaceDropdown.options[ParallelDeinterlaceDropdown.selectedIndex].value)})

if(localStorage.getItem('ParallelDownScale') != null){ParallelDownScaleDropdown.value = localStorage.getItem('ParallelDownScale')}
ParallelDownScaleDropdown.addEventListener('change', function(){localStorage.setItem('ParallelDownScale', ParallelDownScaleDropdown.options[ParallelDownScaleDropdown.selectedIndex].value)})

if(localStorage.getItem('CountersPos') != null){CountersPosDropdown.value = localStorage.getItem('CountersPos')}
CountersPosDropdown.addEventListener('change', function(){localStorage.setItem('CountersPos', CountersPosDropdown.options[CountersPosDropdown.selectedIndex].value)})

if(localStorage.getItem('SaveDiskFormat') != null){SaveDiskFormatDropdown.value = localStorage.getItem('SaveDiskFormat')}
SaveDiskFormatDropdown.addEventListener('change', function(){localStorage.setItem('SaveDiskFormat', SaveDiskFormatDropdown.options[SaveDiskFormatDropdown.selectedIndex].value)})

if(localStorage.getItem('mode1') != null){mode1Dropdown.value = localStorage.getItem('mode1')}
mode1Dropdown.addEventListener('change', function(){localStorage.setItem('mode1', mode1Dropdown.options[mode1Dropdown.selectedIndex].value)})

if(localStorage.getItem('mode2') != null){mode2Dropdown.value = localStorage.getItem('mode2')}
mode2Dropdown.addEventListener('change', function(){localStorage.setItem('mode2', mode2Dropdown.options[mode2Dropdown.selectedIndex].value)})

if(localStorage.getItem('mode3') != null){mode3Dropdown.value = localStorage.getItem('mode3')}
mode3Dropdown.addEventListener('change', function(){localStorage.setItem('mode3', mode3Dropdown.options[mode3Dropdown.selectedIndex].value)})

if(localStorage.getItem('mode4') != null){mode4Dropdown.value = localStorage.getItem('mode4')}
mode4Dropdown.addEventListener('change', function(){localStorage.setItem('mode4', mode4Dropdown.options[mode4Dropdown.selectedIndex].value)})

if(localStorage.getItem('DEFAULT_FREQUENCY') != null){DEFAULT_FREQUENCYDropdown.value = localStorage.getItem('DEFAULT_FREQUENCY')}
DEFAULT_FREQUENCYDropdown.addEventListener('change', function(){localStorage.setItem('DEFAULT_FREQUENCY', DEFAULT_FREQUENCYDropdown.options[DEFAULT_FREQUENCYDropdown.selectedIndex].value)})

if(localStorage.getItem('SECONDARY_BUFFER_SIZE') != null){SECONDARY_BUFFER_SIZEDropdown.value = localStorage.getItem('SECONDARY_BUFFER_SIZE')}
SECONDARY_BUFFER_SIZEDropdown.addEventListener('change', function(){localStorage.setItem('SECONDARY_BUFFER_SIZE', SECONDARY_BUFFER_SIZEDropdown.options[SECONDARY_BUFFER_SIZEDropdown.selectedIndex].value)})

if(localStorage.getItem('RESAMPLE') != null){RESAMPLEDropdown.value = localStorage.getItem('RESAMPLE')}
RESAMPLEDropdown.addEventListener('change', function(){localStorage.setItem('RESAMPLE', RESAMPLEDropdown.options[RESAMPLEDropdown.selectedIndex].value)})

if(localStorage.getItem('FrameBufferWriteBackControl') != null){FrameBufferWriteBackControlDropdown.value = localStorage.getItem('FrameBufferWriteBackControl')}
FrameBufferWriteBackControlDropdown.addEventListener('change', function(){localStorage.setItem('FrameBufferWriteBackControl', FrameBufferWriteBackControlDropdown.options[FrameBufferWriteBackControlDropdown.selectedIndex].value)})

if(localStorage.getItem('RenderToTexture') != null){RenderToTextureDropdown.value = localStorage.getItem('RenderToTexture')}
RenderToTextureDropdown.addEventListener('change', function(){localStorage.setItem('RenderToTexture', RenderToTextureDropdown.options[RenderToTextureDropdown.selectedIndex].value)})

if(localStorage.getItem('ScreenUpdateSetting') != null){ScreenUpdateSettingDropdown.value = localStorage.getItem('ScreenUpdateSetting')}
ScreenUpdateSettingDropdown.addEventListener('change', function(){localStorage.setItem('ScreenUpdateSetting', ScreenUpdateSettingDropdown.options[ScreenUpdateSettingDropdown.selectedIndex].value)})

if(localStorage.getItem('Mipmapping') != null){MipmappingDropdown.value = localStorage.getItem('Mipmapping')}
MipmappingDropdown.addEventListener('change', function(){localStorage.setItem('Mipmapping', MipmappingDropdown.options[MipmappingDropdown.selectedIndex].value)})

if(localStorage.getItem('ForceTextureFilter') != null){ForceTextureFilterDropdown.value = localStorage.getItem('ForceTextureFilter')}
ForceTextureFilterDropdown.addEventListener('change', function(){localStorage.setItem('ForceTextureFilter', ForceTextureFilterDropdown.options[ForceTextureFilterDropdown.selectedIndex].value)})

if(localStorage.getItem('TextureEnhancement') != null){TextureEnhancementDropdown.value = localStorage.getItem('TextureEnhancement')}
TextureEnhancementDropdown.addEventListener('change', function(){localStorage.setItem('TextureEnhancement', TextureEnhancementDropdown.options[TextureEnhancementDropdown.selectedIndex].value)})

if(localStorage.getItem('TextureEnhancementControl') != null){TextureEnhancementControlDropdown.value = localStorage.getItem('TextureEnhancementControl')}
TextureEnhancementControlDropdown.addEventListener('change', function(){localStorage.setItem('TextureEnhancementControl', TextureEnhancementControlDropdown.options[TextureEnhancementControlDropdown.selectedIndex].value)})

if(localStorage.getItem('TextureQuality') != null){TextureQualityDropdown.value = localStorage.getItem('TextureQuality')}
TextureQualityDropdown.addEventListener('change', function(){localStorage.setItem('TextureQuality', TextureQualityDropdown.options[TextureQualityDropdown.selectedIndex].value)})

if(localStorage.getItem('OpenGLDepthBufferSetting') != null){OpenGLDepthBufferSettingDropdown.value = localStorage.getItem('OpenGLDepthBufferSetting')}
OpenGLDepthBufferSettingDropdown.addEventListener('change', function(){localStorage.setItem('OpenGLDepthBufferSetting', OpenGLDepthBufferSettingDropdown.options[OpenGLDepthBufferSettingDropdown.selectedIndex].value)})

if(localStorage.getItem('RiceMultiSampling') != null){RiceMultiSamplingDropdown.value = localStorage.getItem('RiceMultiSampling')}
RiceMultiSamplingDropdown.addEventListener('change', function(){localStorage.setItem('RiceMultiSampling', RiceMultiSamplingDropdown.options[RiceMultiSamplingDropdown.selectedIndex].value)})

if(localStorage.getItem('ColorQuality') != null){ColorQualityDropdown.value = localStorage.getItem('ColorQuality')}
ColorQualityDropdown.addEventListener('change', function(){localStorage.setItem('ColorQuality', ColorQualityDropdown.options[ColorQualityDropdown.selectedIndex].value)})

if(localStorage.getItem('AnisotropicFiltering') != null){AnisotropicFilteringDropdown.value = localStorage.getItem('AnisotropicFiltering')}
AnisotropicFilteringDropdown.addEventListener('change', function(){localStorage.setItem('AnisotropicFiltering', AnisotropicFilteringDropdown.options[AnisotropicFilteringDropdown.selectedIndex].value)})

if(localStorage.getItem('wrpAntiAliasing') != null){wrpAntiAliasingDropdown.value = localStorage.getItem('wrpAntiAliasing')}
wrpAntiAliasingDropdown.addEventListener('change', function(){localStorage.setItem('wrpAntiAliasing', wrpAntiAliasingDropdown.options[wrpAntiAliasingDropdown.selectedIndex].value)})

if(localStorage.getItem('show_fps') != null){show_fpsDropdown.value = localStorage.getItem('show_fps')}
show_fpsDropdown.addEventListener('change', function(){localStorage.setItem('show_fps', show_fpsDropdown.options[show_fpsDropdown.selectedIndex].value)})

if(localStorage.getItem('ghq_fltr') != null){ghq_fltrDropdown.value = localStorage.getItem('ghq_fltr')}
ghq_fltrDropdown.addEventListener('change', function(){localStorage.setItem('ghq_fltr', ghq_fltrDropdown.options[ghq_fltrDropdown.selectedIndex].value)})

if(localStorage.getItem('ghq_cmpr') != null){ghq_cmprDropdown.value = localStorage.getItem('ghq_cmpr')}
ghq_cmprDropdown.addEventListener('change', function(){localStorage.setItem('ghq_cmpr', ghq_cmprDropdown.options[ghq_cmprDropdown.selectedIndex].value)})

if(localStorage.getItem('ghq_enht') != null){ghq_enhtDropdown.value = localStorage.getItem('ghq_enht')}
ghq_enhtDropdown.addEventListener('change', function(){localStorage.setItem('ghq_enht', ghq_enhtDropdown.options[ghq_enhtDropdown.selectedIndex].value)})

if(localStorage.getItem('alt_tex_size') != null){alt_tex_sizeDropdown.value = localStorage.getItem('alt_tex_size')}
alt_tex_sizeDropdown.addEventListener('change', function(){localStorage.setItem('alt_tex_size', alt_tex_sizeDropdown.options[alt_tex_sizeDropdown.selectedIndex].value)})

if(localStorage.getItem('use_sts1_only') != null){use_sts1_onlyDropdown.value = localStorage.getItem('use_sts1_only')}
use_sts1_onlyDropdown.addEventListener('change', function(){localStorage.setItem('use_sts1_only', use_sts1_onlyDropdown.options[use_sts1_onlyDropdown.selectedIndex].value)})

if(localStorage.getItem('force_calc_sphere') != null){force_calc_sphereDropdown.value = localStorage.getItem('force_calc_sphere')}
force_calc_sphereDropdown.addEventListener('change', function(){localStorage.setItem('force_calc_sphere', force_calc_sphereDropdown.options[force_calc_sphereDropdown.selectedIndex].value)})

if(localStorage.getItem('correct_viewport') != null){correct_viewportDropdown.value = localStorage.getItem('correct_viewport')}
correct_viewportDropdown.addEventListener('change', function(){localStorage.setItem('correct_viewport', correct_viewportDropdown.options[correct_viewportDropdown.selectedIndex].value)})

if(localStorage.getItem('increase_texrect_edge') != null){increase_texrect_edgeDropdown.value = localStorage.getItem('increase_texrect_edge')}
increase_texrect_edgeDropdown.addEventListener('change', function(){localStorage.setItem('increase_texrect_edge', increase_texrect_edgeDropdown.options[increase_texrect_edgeDropdown.selectedIndex].value)})

if(localStorage.getItem('decrease_fillrect_edge') != null){decrease_fillrect_edgeDropdown.value = localStorage.getItem('decrease_fillrect_edge')}
decrease_fillrect_edgeDropdown.addEventListener('change', function(){localStorage.setItem('decrease_fillrect_edge', decrease_fillrect_edgeDropdown.options[decrease_fillrect_edgeDropdown.selectedIndex].value)})

if(localStorage.getItem('texture_correction') != null){texture_correctionDropdown.value = localStorage.getItem('texture_correction')}
texture_correctionDropdown.addEventListener('change', function(){localStorage.setItem('texture_correction', texture_correctionDropdown.options[texture_correctionDropdown.selectedIndex].value)})

if(localStorage.getItem('pal230') != null){pal230Dropdown.value = localStorage.getItem('pal230')}
pal230Dropdown.addEventListener('change', function(){localStorage.setItem('pal230', pal230Dropdown.options[pal230Dropdown.selectedIndex].value)})

if(localStorage.getItem('force_microcheck') != null){force_microcheckDropdown.value = localStorage.getItem('force_microcheck')}
force_microcheckDropdown.addEventListener('change', function(){localStorage.setItem('force_microcheck', force_microcheckDropdown.options[force_microcheckDropdown.selectedIndex].value)})

if(localStorage.getItem('force_quad3d') != null){force_quad3dDropdown.value = localStorage.getItem('force_quad3d')}
force_quad3dDropdown.addEventListener('change', function(){localStorage.setItem('force_quad3d', force_quad3dDropdown.options[force_quad3dDropdown.selectedIndex].value)})

if(localStorage.getItem('clip_zmin') != null){clip_zminDropdown.value = localStorage.getItem('clip_zmin')}
clip_zminDropdown.addEventListener('change', function(){localStorage.setItem('clip_zmin', clip_zminDropdown.options[clip_zminDropdown.selectedIndex].value)})

if(localStorage.getItem('clip_zmax') != null){clip_zmaxDropdown.value = localStorage.getItem('clip_zmax')}
clip_zmaxDropdown.addEventListener('change', function(){localStorage.setItem('clip_zmax', clip_zmaxDropdown.options[clip_zmaxDropdown.selectedIndex].value)})

if(localStorage.getItem('fast_crc') != null){fast_crcDropdown.value = localStorage.getItem('fast_crc')}
fast_crcDropdown.addEventListener('change', function(){localStorage.setItem('fast_crc', fast_crcDropdown.options[fast_crcDropdown.selectedIndex].value)})

if(localStorage.getItem('adjust_aspect') != null){adjust_aspectDropdown.value = localStorage.getItem('adjust_aspect')}
adjust_aspectDropdown.addEventListener('change', function(){localStorage.setItem('adjust_aspect', adjust_aspectDropdown.options[adjust_aspectDropdown.selectedIndex].value)})

if(localStorage.getItem('zmode_compare_less') != null){zmode_compare_lessDropdown.value = localStorage.getItem('zmode_compare_less')}
zmode_compare_lessDropdown.addEventListener('change', function(){localStorage.setItem('zmode_compare_less', zmode_compare_lessDropdown.options[zmode_compare_lessDropdown.selectedIndex].value)})

if(localStorage.getItem('old_style_adither') != null){old_style_aditherDropdown.value = localStorage.getItem('old_style_adither')}
old_style_aditherDropdown.addEventListener('change', function(){localStorage.setItem('old_style_adither', old_style_aditherDropdown.options[old_style_aditherDropdown.selectedIndex].value)})

if(localStorage.getItem('n64_z_scale') != null){n64_z_scaleDropdown.value = localStorage.getItem('n64_z_scale')}
n64_z_scaleDropdown.addEventListener('change', function(){localStorage.setItem('n64_z_scale', n64_z_scaleDropdown.options[n64_z_scaleDropdown.selectedIndex].value)})

if(localStorage.getItem('optimize_texrect') != null){optimize_texrectDropdown.value = localStorage.getItem('optimize_texrect')}
optimize_texrectDropdown.addEventListener('change', function(){localStorage.setItem('optimize_texrect', optimize_texrectDropdown.options[optimize_texrectDropdown.selectedIndex].value)})

if(localStorage.getItem('ignore_aux_copy') != null){ignore_aux_copyDropdown.value = localStorage.getItem('ignore_aux_copy')}
ignore_aux_copyDropdown.addEventListener('change', function(){localStorage.setItem('ignore_aux_copy', ignore_aux_copyDropdown.options[ignore_aux_copyDropdown.selectedIndex].value)})

if(localStorage.getItem('hires_buf_clear') != null){hires_buf_clearDropdown.value = localStorage.getItem('hires_buf_clear')}
hires_buf_clearDropdown.addEventListener('change', function(){localStorage.setItem('hires_buf_clear', hires_buf_clearDropdown.options[hires_buf_clearDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_read_alpha') != null){fb_read_alphaDropdown.value = localStorage.getItem('fb_read_alpha')}
fb_read_alphaDropdown.addEventListener('change', function(){localStorage.setItem('fb_read_alpha', fb_read_alphaDropdown.options[fb_read_alphaDropdown.selectedIndex].value)})

if(localStorage.getItem('useless_is_useless') != null){useless_is_uselessDropdown.value = localStorage.getItem('useless_is_useless')}
useless_is_uselessDropdown.addEventListener('change', function(){localStorage.setItem('useless_is_useless', useless_is_uselessDropdown.options[useless_is_uselessDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_crc_mode') != null){fb_crc_modeDropdown.value = localStorage.getItem('fb_crc_mode')}
fb_crc_modeDropdown.addEventListener('change', function(){localStorage.setItem('fb_crc_mode', fb_crc_modeDropdown.options[fb_crc_modeDropdown.selectedIndex].value)})

if(localStorage.getItem('filtering') != null){filteringDropdown.value = localStorage.getItem('filtering')}
filteringDropdown.addEventListener('change', function(){localStorage.setItem('filtering', filteringDropdown.options[filteringDropdown.selectedIndex].value)})

if(localStorage.getItem('fog') != null){fogDropdown.value = localStorage.getItem('fog')}
fogDropdown.addEventListener('change', function(){localStorage.setItem('fog', fogDropdown.options[fogDropdown.selectedIndex].value)})

if(localStorage.getItem('buff_clear') != null){buff_clearDropdown.value = localStorage.getItem('buff_clear')}
buff_clearDropdown.addEventListener('change', function(){localStorage.setItem('buff_clear', buff_clearDropdown.options[buff_clearDropdown.selectedIndex].value)})

if(localStorage.getItem('swapmode') != null){swapmodeDropdown.value = localStorage.getItem('swapmode')}
swapmodeDropdown.addEventListener('change', function(){localStorage.setItem('swapmode', swapmodeDropdown.options[swapmodeDropdown.selectedIndex].value)})

if(localStorage.getItem('aspect') != null){aspectDropdown.value = localStorage.getItem('aspect')}
aspectDropdown.addEventListener('change', function(){localStorage.setItem('aspect', aspectDropdown.options[aspectDropdown.selectedIndex].value)})

if(localStorage.getItem('lodmode') != null){lodmodeDropdown.value = localStorage.getItem('lodmode')}
lodmodeDropdown.addEventListener('change', function(){localStorage.setItem('lodmode', lodmodeDropdown.options[lodmodeDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_smart') != null){fb_smartDropdown.value = localStorage.getItem('fb_smart')}
fb_smartDropdown.addEventListener('change', function(){localStorage.setItem('fb_smart', fb_smartDropdown.options[fb_smartDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_hires') != null){fb_hiresDropdown.value = localStorage.getItem('fb_hires')}
fb_hiresDropdown.addEventListener('change', function(){localStorage.setItem('fb_hires', fb_hiresDropdown.options[fb_hiresDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_read_always') != null){fb_read_alwaysDropdown.value = localStorage.getItem('fb_read_always')}
fb_read_alwaysDropdown.addEventListener('change', function(){localStorage.setItem('fb_read_always', fb_read_alwaysDropdown.options[fb_read_alwaysDropdown.selectedIndex].value)})

if(localStorage.getItem('read_back_to_screen') != null){read_back_to_screenDropdown.value = localStorage.getItem('read_back_to_screen')}
read_back_to_screenDropdown.addEventListener('change', function(){localStorage.setItem('read_back_to_screen', read_back_to_screenDropdown.options[read_back_to_screenDropdown.selectedIndex].value)})

if(localStorage.getItem('detect_cpu_write') != null){detect_cpu_writeDropdown.value = localStorage.getItem('detect_cpu_write')}
detect_cpu_writeDropdown.addEventListener('change', function(){localStorage.setItem('detect_cpu_write', detect_cpu_writeDropdown.options[detect_cpu_writeDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_get_info') != null){fb_get_infoDropdown.value = localStorage.getItem('fb_get_info')}
fb_get_infoDropdown.addEventListener('change', function(){localStorage.setItem('fb_get_info', fb_get_infoDropdown.options[fb_get_infoDropdown.selectedIndex].value)})

if(localStorage.getItem('fb_render') != null){fb_renderDropdown.value = localStorage.getItem('fb_render')}
fb_renderDropdown.addEventListener('change', function(){localStorage.setItem('fb_render', fb_renderDropdown.options[fb_renderDropdown.selectedIndex].value)})



if(localStorage.getItem('mouse1_1') != null){mouse1_1.value = localStorage.getItem('mouse1_1')}
mouse1_1.addEventListener('change', function(){localStorage.setItem('mouse1_1', mouse1_1.options[mouse1_1.selectedIndex].value)})

if(localStorage.getItem('mouse1_2') != null){mouse1_2.value = localStorage.getItem('mouse1_2')}
mouse1_2.addEventListener('change', function(){localStorage.setItem('mouse1_2', mouse1_2.options[mouse1_2.selectedIndex].value)})

if(localStorage.getItem('mouse1_3') != null){mouse1_3.value = localStorage.getItem('mouse1_3')}
mouse1_3.addEventListener('change', function(){localStorage.setItem('mouse1_3', mouse1_3.options[mouse1_3.selectedIndex].value)})

if(localStorage.getItem('mouse2_1') != null){mouse2_1.value = localStorage.getItem('mouse2_1')}
mouse2_1.addEventListener('change', function(){localStorage.setItem('mouse2_1', mouse2_1.options[mouse2_1.selectedIndex].value)})

if(localStorage.getItem('mouse2_2') != null){mouse2_2.value = localStorage.getItem('mouse2_2')}
mouse2_2.addEventListener('change', function(){localStorage.setItem('mouse2_2', mouse2_2.options[mouse2_2.selectedIndex].value)})

if(localStorage.getItem('mouse2_3') != null){mouse2_3.value = localStorage.getItem('mouse2_3')}
mouse2_3.addEventListener('change', function(){localStorage.setItem('mouse2_3', mouse2_3.options[mouse2_3.selectedIndex].value)})

if(localStorage.getItem('mouse3_1') != null){mouse3_1.value = localStorage.getItem('mouse3_1')}
mouse3_1.addEventListener('change', function(){localStorage.setItem('mouse3_1', mouse3_1.options[mouse3_1.selectedIndex].value)})

if(localStorage.getItem('mouse3_2') != null){mouse3_2.value = localStorage.getItem('mouse3_2')}
mouse3_2.addEventListener('change', function(){localStorage.setItem('mouse3_2', mouse3_2.options[mouse3_2.selectedIndex].value)})

if(localStorage.getItem('mouse3_3') != null){mouse3_3.value = localStorage.getItem('mouse3_3')}
mouse3_3.addEventListener('change', function(){localStorage.setItem('mouse3_3', mouse3_3.options[mouse3_3.selectedIndex].value)})

if(localStorage.getItem('mouse4_1') != null){mouse4_1.value = localStorage.getItem('mouse4_1')}
mouse4_1.addEventListener('change', function(){localStorage.setItem('mouse4_1', mouse4_1.options[mouse4_1.selectedIndex].value)})

if(localStorage.getItem('mouse4_2') != null){mouse4_2.value = localStorage.getItem('mouse4_2')}
mouse4_2.addEventListener('change', function(){localStorage.setItem('mouse4_2', mouse4_2.options[mouse4_2.selectedIndex].value)})

if(localStorage.getItem('mouse4_3') != null){mouse4_3.value = localStorage.getItem('mouse4_3')}
mouse4_3.addEventListener('change', function(){localStorage.setItem('mouse4_3', mouse4_3.options[mouse4_3.selectedIndex].value)})



document.getElementById('resetMouseSensitivity1X').addEventListener('click', function(){MouseSensitivity1XRange.value = '2.00';localStorage.removeItem('MouseSensitivity1X');MouseSensitivity1XText.innerHTML = MouseSensitivity1XRange.value})
if(localStorage.getItem('MouseSensitivity1X') != null){MouseSensitivity1XRange.value = localStorage.getItem('MouseSensitivity1X');MouseSensitivity1XText.innerHTML = MouseSensitivity1XRange.value}
MouseSensitivity1XRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity1X', MouseSensitivity1XRange.value);MouseSensitivity1XText.innerHTML = MouseSensitivity1XRange.value})

document.getElementById('resetMouseSensitivity1Y').addEventListener('click', function(){MouseSensitivity1YRange.value = '2.00';localStorage.removeItem('MouseSensitivity1Y');MouseSensitivity1YText.innerHTML = MouseSensitivity1YRange.value})
if(localStorage.getItem('MouseSensitivity1Y') != null){MouseSensitivity1YRange.value = localStorage.getItem('MouseSensitivity1Y');MouseSensitivity1YText.innerHTML = MouseSensitivity1YRange.value}
MouseSensitivity1YRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity1Y', MouseSensitivity1YRange.value);MouseSensitivity1YText.innerHTML = MouseSensitivity1YRange.value})

document.getElementById('resetMouseSensitivity2X').addEventListener('click', function(){MouseSensitivity2XRange.value = '2.00';localStorage.removeItem('MouseSensitivity2X');MouseSensitivity2XText.innerHTML = MouseSensitivity2XRange.value})
if(localStorage.getItem('MouseSensitivity2X') != null){MouseSensitivity2XRange.value = localStorage.getItem('MouseSensitivity2X');MouseSensitivity2XText.innerHTML = MouseSensitivity2XRange.value}
MouseSensitivity2XRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity2X', MouseSensitivity2XRange.value);MouseSensitivity2XText.innerHTML = MouseSensitivity2XRange.value})

document.getElementById('resetMouseSensitivity2Y').addEventListener('click', function(){MouseSensitivity2YRange.value = '2.00';localStorage.removeItem('MouseSensitivity2Y');MouseSensitivity2YText.innerHTML = MouseSensitivity2YRange.value})
if(localStorage.getItem('MouseSensitivity2Y') != null){MouseSensitivity2YRange.value = localStorage.getItem('MouseSensitivity2Y');MouseSensitivity2YText.innerHTML = MouseSensitivity2YRange.value}
MouseSensitivity2YRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity2Y', MouseSensitivity2YRange.value);MouseSensitivity2YText.innerHTML = MouseSensitivity2YRange.value})

document.getElementById('resetMouseSensitivity3X').addEventListener('click', function(){MouseSensitivity3XRange.value = '2.00';localStorage.removeItem('MouseSensitivity3X');MouseSensitivity3XText.innerHTML = MouseSensitivity3XRange.value})
if(localStorage.getItem('MouseSensitivity3X') != null){MouseSensitivity3XRange.value = localStorage.getItem('MouseSensitivity3X');MouseSensitivity3XText.innerHTML = MouseSensitivity3XRange.value}
MouseSensitivity3XRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity3X', MouseSensitivity3XRange.value);MouseSensitivity3XText.innerHTML = MouseSensitivity3XRange.value})

document.getElementById('resetMouseSensitivity3Y').addEventListener('click', function(){MouseSensitivity3YRange.value = '2.00';localStorage.removeItem('MouseSensitivity3Y');MouseSensitivity3YText.innerHTML = MouseSensitivity3YRange.value})
if(localStorage.getItem('MouseSensitivity3Y') != null){MouseSensitivity3YRange.value = localStorage.getItem('MouseSensitivity3Y');MouseSensitivity3YText.innerHTML = MouseSensitivity3YRange.value}
MouseSensitivity3YRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity3Y', MouseSensitivity3YRange.value);MouseSensitivity3YText.innerHTML = MouseSensitivity3YRange.value})

document.getElementById('resetMouseSensitivity4X').addEventListener('click', function(){MouseSensitivity4XRange.value = '2.00';localStorage.removeItem('MouseSensitivity4X');MouseSensitivity4XText.innerHTML = MouseSensitivity4XRange.value})
if(localStorage.getItem('MouseSensitivity4X') != null){MouseSensitivity4XRange.value = localStorage.getItem('MouseSensitivity4X');MouseSensitivity4XText.innerHTML = MouseSensitivity4XRange.value}
MouseSensitivity4XRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity4X', MouseSensitivity4XRange.value);MouseSensitivity4XText.innerHTML = MouseSensitivity4XRange.value})

document.getElementById('resetMouseSensitivity4Y').addEventListener('click', function(){MouseSensitivity4YRange.value = '2.00';localStorage.removeItem('MouseSensitivity4Y');MouseSensitivity4YText.innerHTML = MouseSensitivity4YRange.value})
if(localStorage.getItem('MouseSensitivity4Y') != null){MouseSensitivity4YRange.value = localStorage.getItem('MouseSensitivity4Y');MouseSensitivity4YText.innerHTML = MouseSensitivity4YRange.value}
MouseSensitivity4YRange.addEventListener('change', function(){localStorage.setItem('MouseSensitivity4Y', MouseSensitivity4YRange.value);MouseSensitivity4YText.innerHTML = MouseSensitivity4YRange.value})

document.getElementById('resetAnalogDeadzone1X').addEventListener('click', function(){AnalogDeadzone1XRange.value = '4096';localStorage.removeItem('AnalogDeadzone1X');AnalogDeadzone1XText.innerHTML = AnalogDeadzone1XRange.value})
if(localStorage.getItem('AnalogDeadzone1X') != null){AnalogDeadzone1XRange.value = localStorage.getItem('AnalogDeadzone1X');AnalogDeadzone1XText.innerHTML = AnalogDeadzone1XRange.value}
AnalogDeadzone1XRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone1X', AnalogDeadzone1XRange.value);AnalogDeadzone1XText.innerHTML = AnalogDeadzone1XRange.value})

document.getElementById('resetAnalogDeadzone1Y').addEventListener('click', function(){AnalogDeadzone1YRange.value = '4096';localStorage.removeItem('AnalogDeadzone1Y');AnalogDeadzone1YText.innerHTML = AnalogDeadzone1YRange.value})
if(localStorage.getItem('AnalogDeadzone1Y') != null){AnalogDeadzone1YRange.value = localStorage.getItem('AnalogDeadzone1Y');AnalogDeadzone1YText.innerHTML = AnalogDeadzone1YRange.value}
AnalogDeadzone1YRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone1Y', AnalogDeadzone1YRange.value);AnalogDeadzone1YText.innerHTML = AnalogDeadzone1YRange.value})

document.getElementById('resetAnalogDeadzone2X').addEventListener('click', function(){AnalogDeadzone2XRange.value = '4096';localStorage.removeItem('AnalogDeadzone2X');AnalogDeadzone2XText.innerHTML = AnalogDeadzone2XRange.value})
if(localStorage.getItem('AnalogDeadzone2X') != null){AnalogDeadzone2XRange.value = localStorage.getItem('AnalogDeadzone2X');AnalogDeadzone2XText.innerHTML = AnalogDeadzone2XRange.value}
AnalogDeadzone2XRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone2X', AnalogDeadzone2XRange.value);AnalogDeadzone2XText.innerHTML = AnalogDeadzone2XRange.value})

document.getElementById('resetAnalogDeadzone2Y').addEventListener('click', function(){AnalogDeadzone2YRange.value = '4096';localStorage.removeItem('AnalogDeadzone2Y');AnalogDeadzone2YText.innerHTML = AnalogDeadzone2YRange.value})
if(localStorage.getItem('AnalogDeadzone2Y') != null){AnalogDeadzone2YRange.value = localStorage.getItem('AnalogDeadzone2Y');AnalogDeadzone2YText.innerHTML = AnalogDeadzone2YRange.value}
AnalogDeadzone2YRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone2Y', AnalogDeadzone2YRange.value);AnalogDeadzone2YText.innerHTML = AnalogDeadzone2YRange.value})

document.getElementById('resetAnalogDeadzone3X').addEventListener('click', function(){AnalogDeadzone3XRange.value = '4096';localStorage.removeItem('AnalogDeadzone3X');AnalogDeadzone3XText.innerHTML = AnalogDeadzone3XRange.value})
if(localStorage.getItem('AnalogDeadzone3X') != null){AnalogDeadzone3XRange.value = localStorage.getItem('AnalogDeadzone3X');AnalogDeadzone3XText.innerHTML = AnalogDeadzone3XRange.value}
AnalogDeadzone3XRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone3X', AnalogDeadzone3XRange.value);AnalogDeadzone3XText.innerHTML = AnalogDeadzone3XRange.value})

document.getElementById('resetAnalogDeadzone3Y').addEventListener('click', function(){AnalogDeadzone3YRange.value = '4096';localStorage.removeItem('AnalogDeadzone3Y');AnalogDeadzone3YText.innerHTML = AnalogDeadzone3YRange.value})
if(localStorage.getItem('AnalogDeadzone3Y') != null){AnalogDeadzone3YRange.value = localStorage.getItem('AnalogDeadzone3Y');AnalogDeadzone3YText.innerHTML = AnalogDeadzone3YRange.value}
AnalogDeadzone3YRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone3Y', AnalogDeadzone3YRange.value);AnalogDeadzone3YText.innerHTML = AnalogDeadzone3YRange.value})

document.getElementById('resetAnalogDeadzone4X').addEventListener('click', function(){AnalogDeadzone4XRange.value = '4096';localStorage.removeItem('AnalogDeadzone4X');AnalogDeadzone4XText.innerHTML = AnalogDeadzone4XRange.value})
if(localStorage.getItem('AnalogDeadzone4X') != null){AnalogDeadzone4XRange.value = localStorage.getItem('AnalogDeadzone4X');AnalogDeadzone4XText.innerHTML = AnalogDeadzone4XRange.value}
AnalogDeadzone4XRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone4X', AnalogDeadzone4XRange.value);AnalogDeadzone4XText.innerHTML = AnalogDeadzone4XRange.value})

document.getElementById('resetAnalogDeadzone4Y').addEventListener('click', function(){AnalogDeadzone4YRange.value = '4096';localStorage.removeItem('AnalogDeadzone4Y');AnalogDeadzone4YText.innerHTML = AnalogDeadzone4YRange.value})
if(localStorage.getItem('AnalogDeadzone4Y') != null){AnalogDeadzone4YRange.value = localStorage.getItem('AnalogDeadzone4Y');AnalogDeadzone4YText.innerHTML = AnalogDeadzone4YRange.value}
AnalogDeadzone4YRange.addEventListener('change', function(){localStorage.setItem('AnalogDeadzone4Y', AnalogDeadzone4YRange.value);AnalogDeadzone4YText.innerHTML = AnalogDeadzone4YRange.value})

document.getElementById('resetAnalogPeak1X').addEventListener('click', function(){AnalogPeak1XRange.value = '32768';localStorage.removeItem('AnalogPeak1X');AnalogPeak1XText.innerHTML = AnalogPeak1XRange.value})
if(localStorage.getItem('AnalogPeak1X') != null){AnalogPeak1XRange.value = localStorage.getItem('AnalogPeak1X');AnalogPeak1XText.innerHTML = AnalogPeak1XRange.value}
AnalogPeak1XRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak1X', AnalogPeak1XRange.value);AnalogPeak1XText.innerHTML = AnalogPeak1XRange.value})

document.getElementById('resetAnalogPeak1Y').addEventListener('click', function(){AnalogPeak1YRange.value = '32768';localStorage.removeItem('AnalogPeak1Y');AnalogPeak1YText.innerHTML = AnalogPeak1YRange.value})
if(localStorage.getItem('AnalogPeak1Y') != null){AnalogPeak1YRange.value = localStorage.getItem('AnalogPeak1Y');AnalogPeak1YText.innerHTML = AnalogPeak1YRange.value}
AnalogPeak1YRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak1Y', AnalogPeak1YRange.value);AnalogPeak1YText.innerHTML = AnalogPeak1YRange.value})

document.getElementById('resetAnalogPeak2X').addEventListener('click', function(){AnalogPeak2XRange.value = '32768';localStorage.removeItem('AnalogPeak2X');AnalogPeak2XText.innerHTML = AnalogPeak2XRange.value})
if(localStorage.getItem('AnalogPeak2X') != null){AnalogPeak2XRange.value = localStorage.getItem('AnalogPeak2X');AnalogPeak2XText.innerHTML = AnalogPeak2XRange.value}
AnalogPeak2XRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak2X', AnalogPeak2XRange.value);AnalogPeak2XText.innerHTML = AnalogPeak2XRange.value})

document.getElementById('resetAnalogPeak2Y').addEventListener('click', function(){AnalogPeak2YRange.value = '32768';localStorage.removeItem('AnalogPeak2Y');AnalogPeak2YText.innerHTML = AnalogPeak2YRange.value})
if(localStorage.getItem('AnalogPeak2Y') != null){AnalogPeak2YRange.value = localStorage.getItem('AnalogPeak2Y');AnalogPeak2YText.innerHTML = AnalogPeak2YRange.value}
AnalogPeak2YRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak2Y', AnalogPeak2YRange.value);AnalogPeak2YText.innerHTML = AnalogPeak2YRange.value})

document.getElementById('resetAnalogPeak3X').addEventListener('click', function(){AnalogPeak3XRange.value = '32768';localStorage.removeItem('AnalogPeak3X');AnalogPeak3XText.innerHTML = AnalogPeak3XRange.value})
if(localStorage.getItem('AnalogPeak3X') != null){AnalogPeak3XRange.value = localStorage.getItem('AnalogPeak3X');AnalogPeak3XText.innerHTML = AnalogPeak3XRange.value}
AnalogPeak3XRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak3X', AnalogPeak3XRange.value);AnalogPeak3XText.innerHTML = AnalogPeak3XRange.value})

document.getElementById('resetAnalogPeak3Y').addEventListener('click', function(){AnalogPeak3YRange.value = '32768';localStorage.removeItem('AnalogPeak3Y');AnalogPeak3YText.innerHTML = AnalogPeak3YRange.value})
if(localStorage.getItem('AnalogPeak3Y') != null){AnalogPeak3YRange.value = localStorage.getItem('AnalogPeak3Y');AnalogPeak3YText.innerHTML = AnalogPeak3YRange.value}
AnalogPeak3YRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak3Y', AnalogPeak3YRange.value);AnalogPeak3YText.innerHTML = AnalogPeak3YRange.value})

document.getElementById('resetAnalogPeak4X').addEventListener('click', function(){AnalogPeak4XRange.value = '32768';localStorage.removeItem('AnalogPeak4X');AnalogPeak4XText.innerHTML = AnalogPeak4XRange.value})
if(localStorage.getItem('AnalogPeak4X') != null){AnalogPeak4XRange.value = localStorage.getItem('AnalogPeak4X');AnalogPeak4XText.innerHTML = AnalogPeak4XRange.value}
AnalogPeak4XRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak4X', AnalogPeak4XRange.value);AnalogPeak4XText.innerHTML = AnalogPeak4XRange.value})

document.getElementById('resetAnalogPeak4Y').addEventListener('click', function(){AnalogPeak4YRange.value = '32768';localStorage.removeItem('AnalogPeak4Y');AnalogPeak4YText.innerHTML = AnalogPeak4YRange.value})
if(localStorage.getItem('AnalogPeak4Y') != null){AnalogPeak4YRange.value = localStorage.getItem('AnalogPeak4Y');AnalogPeak4YText.innerHTML = AnalogPeak4YRange.value}
AnalogPeak4YRange.addEventListener('change', function(){localStorage.setItem('AnalogPeak4Y', AnalogPeak4YRange.value);AnalogPeak4YText.innerHTML = AnalogPeak4YRange.value})



document.getElementById('resetcontrol_stick_deadzone').addEventListener('click', function(){control_stick_deadzoneRange.value = '20';localStorage.removeItem('control_stick_deadzone');control_stick_deadzoneText.innerHTML = control_stick_deadzoneRange.value})
if(localStorage.getItem('control_stick_deadzone') != null){control_stick_deadzoneRange.value = localStorage.getItem('control_stick_deadzone');control_stick_deadzoneText.innerHTML = control_stick_deadzoneRange.value}
control_stick_deadzoneRange.addEventListener('change', function(){localStorage.setItem('control_stick_deadzone', control_stick_deadzoneRange.value);control_stick_deadzoneText.innerHTML = control_stick_deadzoneRange.value})

document.getElementById('resetcontrol_stick_sensitivity').addEventListener('click', function(){control_stick_sensitivityRange.value = '180';localStorage.removeItem('control_stick_sensitivity');control_stick_sensitivityText.innerHTML = control_stick_sensitivityRange.value})
if(localStorage.getItem('control_stick_sensitivity') != null){control_stick_sensitivityRange.value = localStorage.getItem('control_stick_sensitivity');control_stick_sensitivityText.innerHTML = control_stick_sensitivityRange.value}
control_stick_sensitivityRange.addEventListener('change', function(){localStorage.setItem('control_stick_sensitivity', control_stick_sensitivityRange.value);control_stick_sensitivityText.innerHTML = control_stick_sensitivityRange.value})

document.getElementById('resetc_stick_deadzone').addEventListener('click', function(){c_stick_deadzoneRange.value = '40';localStorage.removeItem('c_stick_deadzone');c_stick_deadzoneText.innerHTML = c_stick_deadzoneRange.value})
if(localStorage.getItem('c_stick_deadzone') != null){c_stick_deadzoneRange.value = localStorage.getItem('c_stick_deadzone');c_stick_deadzoneText.innerHTML = c_stick_deadzoneRange.value}
c_stick_deadzoneRange.addEventListener('change', function(){localStorage.setItem('c_stick_deadzone', c_stick_deadzoneRange.value);c_stick_deadzoneText.innerHTML = c_stick_deadzoneRange.value})

document.getElementById('resettrigger_threshold').addEventListener('click', function(){trigger_thresholdRange.value = '168';localStorage.removeItem('trigger_threshold');trigger_thresholdText.innerHTML = trigger_thresholdRange.value})
if(localStorage.getItem('trigger_threshold') != null){trigger_thresholdRange.value = localStorage.getItem('trigger_threshold');trigger_thresholdText.innerHTML = trigger_thresholdRange.value}
trigger_thresholdRange.addEventListener('change', function(){localStorage.setItem('trigger_threshold', trigger_thresholdRange.value);trigger_thresholdText.innerHTML = trigger_thresholdRange.value})



if(localStorage.getItem('a') != null){aDropdown.value = localStorage.getItem('a')}
aDropdown.addEventListener('change', function(){localStorage.setItem('a', aDropdown.options[aDropdown.selectedIndex].value)})

if(localStorage.getItem('b') != null){bDropdown.value = localStorage.getItem('b')}
bDropdown.addEventListener('change', function(){localStorage.setItem('b', bDropdown.options[bDropdown.selectedIndex].value)})

if(localStorage.getItem('x') != null){xDropdown.value = localStorage.getItem('x')}
xDropdown.addEventListener('change', function(){localStorage.setItem('x', xDropdown.options[xDropdown.selectedIndex].value)})

if(localStorage.getItem('y') != null){yDropdown.value = localStorage.getItem('y')}
yDropdown.addEventListener('change', function(){localStorage.setItem('y', yDropdown.options[yDropdown.selectedIndex].value)})

if(localStorage.getItem('start') != null){startDropdown.value = localStorage.getItem('start')}
startDropdown.addEventListener('change', function(){localStorage.setItem('start', startDropdown.options[startDropdown.selectedIndex].value)})

if(localStorage.getItem('z') != null){zDropdown.value = localStorage.getItem('z')}
zDropdown.addEventListener('change', function(){localStorage.setItem('z', zDropdown.options[zDropdown.selectedIndex].value)})

if(localStorage.getItem('l') != null){lDropdown.value = localStorage.getItem('l')}
lDropdown.addEventListener('change', function(){localStorage.setItem('l', lDropdown.options[lDropdown.selectedIndex].value)})

if(localStorage.getItem('r') != null){rDropdown.value = localStorage.getItem('r')}
rDropdown.addEventListener('change', function(){localStorage.setItem('r', rDropdown.options[rDropdown.selectedIndex].value)})

if(localStorage.getItem('d_pad_left') != null){d_pad_leftDropdown.value = localStorage.getItem('d_pad_left')}
d_pad_leftDropdown.addEventListener('change', function(){localStorage.setItem('d_pad_left', d_pad_leftDropdown.options[d_pad_leftDropdown.selectedIndex].value)})

if(localStorage.getItem('d_pad_right') != null){d_pad_rightDropdown.value = localStorage.getItem('d_pad_right')}
d_pad_rightDropdown.addEventListener('change', function(){localStorage.setItem('d_pad_right', d_pad_rightDropdown.options[d_pad_rightDropdown.selectedIndex].value)})

if(localStorage.getItem('d_pad_down') != null){d_pad_downDropdown.value = localStorage.getItem('d_pad_down')}
d_pad_downDropdown.addEventListener('change', function(){localStorage.setItem('d_pad_down', d_pad_downDropdown.options[d_pad_downDropdown.selectedIndex].value)})

if(localStorage.getItem('d_pad_up') != null){d_pad_upDropdown.value = localStorage.getItem('d_pad_up')}
d_pad_upDropdown.addEventListener('change', function(){localStorage.setItem('d_pad_up', d_pad_upDropdown.options[d_pad_upDropdown.selectedIndex].value)})

if(localStorage.getItem('c_stick_left') != null){c_stick_leftDropdown.value = localStorage.getItem('c_stick_left')}
c_stick_leftDropdown.addEventListener('change', function(){localStorage.setItem('c_stick_left', c_stick_leftDropdown.options[c_stick_leftDropdown.selectedIndex].value)})

if(localStorage.getItem('c_stick_right') != null){c_stick_rightDropdown.value = localStorage.getItem('c_stick_right')}
c_stick_rightDropdown.addEventListener('change', function(){localStorage.setItem('c_stick_right', c_stick_rightDropdown.options[c_stick_rightDropdown.selectedIndex].value)})

if(localStorage.getItem('c_stick_down') != null){c_stick_downDropdown.value = localStorage.getItem('c_stick_down')}
c_stick_downDropdown.addEventListener('change', function(){localStorage.setItem('c_stick_down', c_stick_downDropdown.options[c_stick_downDropdown.selectedIndex].value)})

if(localStorage.getItem('c_stick_up') != null){c_stick_upDropdown.value = localStorage.getItem('c_stick_up')}
c_stick_upDropdown.addEventListener('change', function(){localStorage.setItem('c_stick_up', c_stick_upDropdown.options[c_stick_upDropdown.selectedIndex].value)})



if(localStorage.getItem('OverscanNtscTop') != null){OverscanNtscTopInput.value = localStorage.getItem('OverscanNtscTop')}
OverscanNtscTopInput.addEventListener('change', function(){localStorage.setItem('OverscanNtscTop', OverscanNtscTopInput.value)})
OverscanNtscTopInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanNtscLeft') != null){OverscanNtscLeftInput.value = localStorage.getItem('OverscanNtscLeft')}
OverscanNtscLeftInput.addEventListener('change', function(){localStorage.setItem('OverscanNtscLeft', OverscanNtscLeftInput.value)})
OverscanNtscLeftInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanNtscRight') != null){OverscanNtscRightInput.value = localStorage.getItem('OverscanNtscRight')}
OverscanNtscRightInput.addEventListener('change', function(){localStorage.setItem('OverscanNtscRight', OverscanNtscRightInput.value)})
OverscanNtscRightInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanNtscBottom') != null){OverscanNtscBottomInput.value = localStorage.getItem('OverscanNtscBottom')}
OverscanNtscBottomInput.addEventListener('change', function(){localStorage.setItem('OverscanNtscBottom', OverscanNtscBottomInput.value)})
OverscanNtscBottomInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanPalTop') != null){OverscanPalTopInput.value = localStorage.getItem('OverscanPalTop')}
OverscanPalTopInput.addEventListener('change', function(){localStorage.setItem('OverscanPalTop', OverscanPalTopInput.value)})
OverscanPalTopInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanPalLeft') != null){OverscanPalLeftInput.value = localStorage.getItem('OverscanPalLeft')}
OverscanPalLeftInput.addEventListener('change', function(){localStorage.setItem('OverscanPalLeft', OverscanPalLeftInput.value)})
OverscanPalLeftInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanPalRight') != null){OverscanPalRightInput.value = localStorage.getItem('OverscanPalRight')}
OverscanPalRightInput.addEventListener('change', function(){localStorage.setItem('OverscanPalRight', OverscanPalRightInput.value)})
OverscanPalRightInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('OverscanPalBottom') != null){OverscanPalBottomInput.value = localStorage.getItem('OverscanPalBottom')}
OverscanPalBottomInput.addEventListener('change', function(){localStorage.setItem('OverscanPalBottom', OverscanPalBottomInput.value)})
OverscanPalBottomInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('ParallelCropOverscan') != null){ParallelCropOverscanInput.value = localStorage.getItem('ParallelCropOverscan')}
ParallelCropOverscanInput.addEventListener('change', function(){localStorage.setItem('ParallelCropOverscan', ParallelCropOverscanInput.value)})
ParallelCropOverscanInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('txCacheSize') != null){txCacheSizeInput.value = localStorage.getItem('txCacheSize')}
txCacheSizeInput.addEventListener('change', function(){localStorage.setItem('txCacheSize', txCacheSizeInput.value)})
txCacheSizeInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('NumWorkers') != null){NumWorkersInput.value = localStorage.getItem('NumWorkers')}
NumWorkersInput.addEventListener('change', function(){localStorage.setItem('NumWorkers', NumWorkersInput.value)})
NumWorkersInput.max = window.navigator.hardwareConcurrency;
NumWorkersInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('GammaCorrectionLevel') != null){GammaCorrectionLevelInput.value = localStorage.getItem('GammaCorrectionLevel')}
GammaCorrectionLevelInput.addEventListener('change', function(){localStorage.setItem('GammaCorrectionLevel', GammaCorrectionLevelInput.value)})
GammaCorrectionLevelInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('fontSize') != null){fontSizeInput.value = localStorage.getItem('fontSize')}
fontSizeInput.addEventListener('change', function(){localStorage.setItem('fontSize', fontSizeInput.value)})
fontSizeInput.addEventListener('keydown', function(e){e.preventDefault()})

document.getElementById('resetfontColor').addEventListener('click', function(){fontColor = '#B5E61D';fontColorInput.value = '#B5E61D';localStorage.removeItem('fontColor')})
if(localStorage.getItem('fontColor') != null){fontColorInput.value = localStorage.getItem('fontColor')}
fontColorInput.addEventListener('change', function(){localStorage.setItem('fontColor', fontColorInput.value)})

if(localStorage.getItem('CountPerOp') != null){CountPerOpInput.value = localStorage.getItem('CountPerOp')}
CountPerOpInput.addEventListener('change', function(){localStorage.setItem('CountPerOp', CountPerOpInput.value)})
CountPerOpInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('CurrentStateSlot') != null){CurrentStateSlotInput.value = localStorage.getItem('CurrentStateSlot')}
CurrentStateSlotInput.addEventListener('change', function(){localStorage.setItem('CurrentStateSlot', CurrentStateSlotInput.value)})
CurrentStateSlotInput.addEventListener('keydown', function(e){e.preventDefault()})

if(localStorage.getItem('name1') != null){name1Input.value = localStorage.getItem('name1')}
name1Input.addEventListener('change', function(){localStorage.setItem('name1', name1Input.value)})
document.getElementById('resetname1').addEventListener('click', function(){name1Input.value = 'Keyboard';localStorage.setItem('name1','Keyboard')})

if(localStorage.getItem('name2') != null){name2Input.value = localStorage.getItem('name2')}
name2Input.addEventListener('change', function(){localStorage.setItem('name2', name2Input.value)})
document.getElementById('resetname2').addEventListener('click', function(){name2Input.value = 'Keyboard';localStorage.setItem('name2','Keyboard')})

if(localStorage.getItem('name3') != null){name3Input.value = localStorage.getItem('name3')}
name3Input.addEventListener('change', function(){localStorage.setItem('name3', name3Input.value)})
document.getElementById('resetname3').addEventListener('click', function(){name3Input.value = 'Keyboard';localStorage.setItem('name3','Keyboard')})

if(localStorage.getItem('name4') != null){name4Input.value = localStorage.getItem('name4')}
name4Input.addEventListener('change', function(){localStorage.setItem('name4', name4Input.value)})
document.getElementById('resetname4').addEventListener('click', function(){name4Input.value = 'Keyboard';localStorage.setItem('name4','Keyboard')})

if(localStorage.getItem('VOLUME_ADJUST') != null){VOLUME_ADJUSTInput.value = localStorage.getItem('VOLUME_ADJUST')}
VOLUME_ADJUSTInput.addEventListener('change', function(){localStorage.setItem('VOLUME_ADJUST', VOLUME_ADJUSTInput.value)})

if(localStorage.getItem('VOLUME_DEFAULT') != null){VOLUME_DEFAULTInput.value = localStorage.getItem('VOLUME_DEFAULT')}
VOLUME_DEFAULTInput.addEventListener('change', function(){localStorage.setItem('VOLUME_DEFAULT', VOLUME_DEFAULTInput.value)})

if(localStorage.getItem('PolygonOffsetFactor') != null){PolygonOffsetFactorInput.value = localStorage.getItem('PolygonOffsetFactor')}
PolygonOffsetFactorInput.addEventListener('change', function(){localStorage.setItem('PolygonOffsetFactor', PolygonOffsetFactorInput.value)})

if(localStorage.getItem('PolygonOffsetUnits') != null){PolygonOffsetUnitsInput.value = localStorage.getItem('PolygonOffsetUnits')}
PolygonOffsetUnitsInput.addEventListener('change', function(){localStorage.setItem('PolygonOffsetUnits', PolygonOffsetUnitsInput.value)})

if(localStorage.getItem('polygon_offset_factor') != null){polygon_offset_factorInput.value = localStorage.getItem('polygon_offset_factor')}
polygon_offset_factorInput.addEventListener('change', function(){localStorage.setItem('polygon_offset_factor', polygon_offset_factorInput.value)})

if(localStorage.getItem('polygon_offset_units') != null){polygon_offset_unitsInput.value = localStorage.getItem('polygon_offset_units')}
polygon_offset_unitsInput.addEventListener('change', function(){localStorage.setItem('polygon_offset_units', polygon_offset_unitsInput.value)})

if(localStorage.getItem('ghq_cache_size') != null){ghq_cache_sizeInput.value = localStorage.getItem('ghq_cache_size')}
ghq_cache_sizeInput.addEventListener('change', function(){localStorage.setItem('ghq_cache_size', ghq_cache_sizeInput.value)})



decreaseCurrentStateSlot.addEventListener('click', function(){if(CurrentStateSlotInput.value != CurrentStateSlotInput.min){CurrentStateSlotInput.value = parseInt(CurrentStateSlotInput.value) - 1;localStorage.setItem('CurrentStateSlot', CurrentStateSlotInput.value)}})
increaseCurrentStateSlot.addEventListener('click', function(){if(CurrentStateSlotInput.value != CurrentStateSlotInput.max){CurrentStateSlotInput.value = parseInt(CurrentStateSlotInput.value) + 1;localStorage.setItem('CurrentStateSlot', CurrentStateSlotInput.value)}})

decreaseCountPerOp.addEventListener('click', function(){if(CountPerOpInput.value != CountPerOpInput.min){CountPerOpInput.value = parseInt(CountPerOpInput.value) - 1;localStorage.setItem('CountPerOp', CountPerOpInput.value)}})
increaseCountPerOp.addEventListener('click', function(){if(CountPerOpInput.value != CountPerOpInput.max){CountPerOpInput.value = parseInt(CountPerOpInput.value) + 1;localStorage.setItem('CountPerOp', CountPerOpInput.value)}})

decreaseVOLUME_ADJUST.addEventListener('click', function(){if(VOLUME_ADJUSTInput.value != VOLUME_ADJUSTInput.min){VOLUME_ADJUSTInput.value = parseInt(VOLUME_ADJUSTInput.value) - 1;localStorage.setItem('VOLUME_ADJUST', VOLUME_ADJUSTInput.value)}})
increaseVOLUME_ADJUST.addEventListener('click', function(){if(VOLUME_ADJUSTInput.value != VOLUME_ADJUSTInput.max){VOLUME_ADJUSTInput.value = parseInt(VOLUME_ADJUSTInput.value) + 1;localStorage.setItem('VOLUME_ADJUST', VOLUME_ADJUSTInput.value)}})

decreaseVOLUME_DEFAULT.addEventListener('click', function(){if(VOLUME_DEFAULTInput.value != VOLUME_DEFAULTInput.min){VOLUME_DEFAULTInput.value = parseInt(VOLUME_DEFAULTInput.value) - 1;localStorage.setItem('VOLUME_DEFAULT', VOLUME_DEFAULTInput.value)}})
increaseVOLUME_DEFAULT.addEventListener('click', function(){if(VOLUME_DEFAULTInput.value != VOLUME_DEFAULTInput.max){VOLUME_DEFAULTInput.value = parseInt(VOLUME_DEFAULTInput.value) + 1;localStorage.setItem('VOLUME_DEFAULT', VOLUME_DEFAULTInput.value)}})

decreaseNumWorkers.addEventListener('click', function(){if(NumWorkersInput.value != NumWorkersInput.min){NumWorkersInput.value = parseInt(NumWorkersInput.value) - 1;localStorage.setItem('NumWorkers', NumWorkersInput.value)}})
increaseNumWorkers.addEventListener('click', function(){if(NumWorkersInput.value != NumWorkersInput.max){NumWorkersInput.value = parseInt(NumWorkersInput.value) + 1;localStorage.setItem('NumWorkers', NumWorkersInput.value)}})

decreaseGammaCorrectionLevel.addEventListener('click', function(){if(GammaCorrectionLevelInput.value != GammaCorrectionLevelInput.min){GammaCorrectionLevelInput.value = (parseFloat(GammaCorrectionLevelInput.value) - 0.100).toFixed(2);localStorage.setItem('GammaCorrectionLevel', GammaCorrectionLevelInput.value)}})
increaseGammaCorrectionLevel.addEventListener('click', function(){if(GammaCorrectionLevelInput.value != GammaCorrectionLevelInput.max){GammaCorrectionLevelInput.value = (parseFloat(GammaCorrectionLevelInput.value) + 0.100).toFixed(2);localStorage.setItem('GammaCorrectionLevel', GammaCorrectionLevelInput.value)}})

decreaseOverscanNtscTop.addEventListener('click', function(){if(OverscanNtscTopInput.value != OverscanNtscTopInput.min){OverscanNtscTopInput.value = parseInt(OverscanNtscTopInput.value) - 1;localStorage.setItem('OverscanNtscTop', OverscanNtscTopInput.value)}})
increaseOverscanNtscTop.addEventListener('click', function(){if(OverscanNtscTopInput.value != OverscanNtscTopInput.max){OverscanNtscTopInput.value = parseInt(OverscanNtscTopInput.value) + 1;localStorage.setItem('OverscanNtscTop', OverscanNtscTopInput.value)}})

decreaseOverscanNtscLeft.addEventListener('click', function(){if(OverscanNtscLeftInput.value != OverscanNtscLeftInput.min){OverscanNtscLeftInput.value = parseInt(OverscanNtscLeftInput.value) - 1;localStorage.setItem('OverscanNtscLeft', OverscanNtscLeftInput.value)}})
increaseOverscanNtscLeft.addEventListener('click', function(){if(OverscanNtscLeftInput.value != OverscanNtscLeftInput.max){OverscanNtscLeftInput.value = parseInt(OverscanNtscLeftInput.value) + 1;localStorage.setItem('OverscanNtscLeft', OverscanNtscLeftInput.value)}})

decreaseOverscanNtscRight.addEventListener('click', function(){if(OverscanNtscRightInput.value != OverscanNtscRightInput.min){OverscanNtscRightInput.value = parseInt(OverscanNtscRightInput.value) - 1;localStorage.setItem('OverscanNtscRight', OverscanNtscRightInput.value)}})
increaseOverscanNtscRight.addEventListener('click', function(){if(OverscanNtscRightInput.value != OverscanNtscRightInput.max){OverscanNtscRightInput.value = parseInt(OverscanNtscRightInput.value) + 1;localStorage.setItem('OverscanNtscRight', OverscanNtscRightInput.value)}})

decreaseOverscanNtscBottom.addEventListener('click', function(){if(OverscanNtscBottomInput.value != OverscanNtscBottomInput.min){OverscanNtscBottomInput.value = parseInt(OverscanNtscBottomInput.value) - 1;localStorage.setItem('OverscanNtscBottom', OverscanNtscBottomInput.value)}})
increaseOverscanNtscBottom.addEventListener('click', function(){if(OverscanNtscBottomInput.value != OverscanNtscBottomInput.max){OverscanNtscBottomInput.value = parseInt(OverscanNtscBottomInput.value) + 1;localStorage.setItem('OverscanNtscBottom', OverscanNtscBottomInput.value)}})

decreaseOverscanPalTop.addEventListener('click', function(){if(OverscanPalTopInput.value != OverscanPalTopInput.min){OverscanPalTopInput.value = parseInt(OverscanPalTopInput.value) - 1;localStorage.setItem('OverscanPalTop', OverscanPalTopInput.value)}})
increaseOverscanPalTop.addEventListener('click', function(){if(OverscanPalTopInput.value != OverscanPalTopInput.max){OverscanPalTopInput.value = parseInt(OverscanPalTopInput.value) + 1;localStorage.setItem('OverscanPalTop', OverscanPalTopInput.value)}})

decreaseOverscanPalLeft.addEventListener('click', function(){if(OverscanPalLeftInput.value != OverscanPalLeftInput.min){OverscanPalLeftInput.value = parseInt(OverscanPalLeftInput.value) - 1;localStorage.setItem('OverscanPalLeft', OverscanPalLeftInput.value)}})
increaseOverscanPalLeft.addEventListener('click', function(){if(OverscanPalLeftInput.value != OverscanPalLeftInput.max){OverscanPalLeftInput.value = parseInt(OverscanPalLeftInput.value) + 1;localStorage.setItem('OverscanPalLeft', OverscanPalLeftInput.value)}})

decreaseOverscanPalRight.addEventListener('click', function(){if(OverscanPalRightInput.value != OverscanPalRightInput.min){OverscanPalRightInput.value = parseInt(OverscanPalRightInput.value) - 1;localStorage.setItem('OverscanPalRight', OverscanPalRightInput.value)}})
increaseOverscanPalRight.addEventListener('click', function(){if(OverscanPalRightInput.value != OverscanPalRightInput.max){OverscanPalRightInput.value = parseInt(OverscanPalRightInput.value) + 1;localStorage.setItem('OverscanPalRight', OverscanPalRightInput.value)}})

decreaseOverscanPalBottom.addEventListener('click', function(){if(OverscanPalBottomInput.value != OverscanPalBottomInput.min){OverscanPalBottomInput.value = parseInt(OverscanPalBottomInput.value) - 1;localStorage.setItem('OverscanPalBottom', OverscanPalBottomInput.value)}})
increaseOverscanPalBottom.addEventListener('click', function(){if(OverscanPalBottomInput.value != OverscanPalBottomInput.max){OverscanPalBottomInput.value = parseInt(OverscanPalBottomInput.value) + 1;localStorage.setItem('OverscanPalBottom', OverscanPalBottomInput.value)}})

decreasefontSize.addEventListener('click', function(){if(fontSizeInput.value != fontSizeInput.min){fontSizeInput.value = parseInt(fontSizeInput.value) - 1;localStorage.setItem('fontSize', fontSizeInput.value)}})
increasefontSize.addEventListener('click', function(){if(fontSizeInput.value != fontSizeInput.max){fontSizeInput.value = parseInt(fontSizeInput.value) + 1;localStorage.setItem('fontSize', fontSizeInput.value)}})

decreasetxCacheSize.addEventListener('click', function(){if(txCacheSizeInput.value != txCacheSizeInput.min){txCacheSizeInput.value = parseInt(txCacheSizeInput.value) - 128;localStorage.setItem('txCacheSize', txCacheSizeInput.value)}})
increasetxCacheSize.addEventListener('click', function(){if(txCacheSizeInput.value != txCacheSizeInput.max){txCacheSizeInput.value = parseInt(txCacheSizeInput.value) + 128;localStorage.setItem('txCacheSize', txCacheSizeInput.value)}})

decreaseParallelCropOverscan.addEventListener('click', function(){if(ParallelCropOverscanInput.value != ParallelCropOverscanInput.min){ParallelCropOverscanInput.value = parseInt(ParallelCropOverscanInput.value) - 1;localStorage.setItem('ParallelCropOverscan', ParallelCropOverscanInput.value)}})
increaseParallelCropOverscan.addEventListener('click', function(){if(ParallelCropOverscanInput.value != ParallelCropOverscanInput.max){ParallelCropOverscanInput.value = parseInt(ParallelCropOverscanInput.value) + 1;localStorage.setItem('ParallelCropOverscan', ParallelCropOverscanInput.value)}})

decreasePolygonOffsetFactor.addEventListener('click', function(){if(PolygonOffsetFactorInput.value != PolygonOffsetFactorInput.min){PolygonOffsetFactorInput.value = (parseFloat(PolygonOffsetFactorInput.value) - 0.1).toFixed(2);localStorage.setItem('PolygonOffsetFactor', PolygonOffsetFactorInput.value)}})
increasePolygonOffsetFactor.addEventListener('click', function(){if(PolygonOffsetFactorInput.value != PolygonOffsetFactorInput.max){PolygonOffsetFactorInput.value = (parseFloat(PolygonOffsetFactorInput.value) + 0.1).toFixed(2);localStorage.setItem('PolygonOffsetFactor', PolygonOffsetFactorInput.value)}})

decreasePolygonOffsetUnits.addEventListener('click', function(){if(PolygonOffsetUnitsInput.value != PolygonOffsetUnitsInput.min){PolygonOffsetUnitsInput.value = (parseFloat(PolygonOffsetUnitsInput.value) - 0.1).toFixed(2);localStorage.setItem('PolygonOffsetUnits', PolygonOffsetUnitsInput.value)}})
increasePolygonOffsetUnits.addEventListener('click', function(){if(PolygonOffsetUnitsInput.value != PolygonOffsetUnitsInput.max){PolygonOffsetUnitsInput.value = (parseFloat(PolygonOffsetUnitsInput.value) + 0.1).toFixed(2);localStorage.setItem('PolygonOffsetUnits', PolygonOffsetUnitsInput.value)}})

decreasepolygon_offset_factor.addEventListener('click', function(){if(polygon_offset_factorInput.value != polygon_offset_factorInput.min){polygon_offset_factorInput.value = (parseFloat(polygon_offset_factorInput.value) - 0.1).toFixed(2);localStorage.setItem('polygon_offset_factor', polygon_offset_factorInput.value)}})
increasepolygon_offset_factor.addEventListener('click', function(){if(polygon_offset_factorInput.value != polygon_offset_factorInput.max){polygon_offset_factorInput.value = (parseFloat(polygon_offset_factorInput.value) + 0.1).toFixed(2);localStorage.setItem('polygon_offset_factor', polygon_offset_factorInput.value)}})

decreasepolygon_offset_units.addEventListener('click', function(){if(polygon_offset_unitsInput.value != polygon_offset_unitsInput.min){polygon_offset_unitsInput.value = (parseFloat(polygon_offset_unitsInput.value) - 0.1).toFixed(2);localStorage.setItem('polygon_offset_units', polygon_offset_unitsInput.value)}})
increasepolygon_offset_units.addEventListener('click', function(){if(polygon_offset_unitsInput.value != polygon_offset_unitsInput.max){polygon_offset_unitsInput.value = (parseFloat(polygon_offset_unitsInput.value) + 0.1).toFixed(2);localStorage.setItem('polygon_offset_units', polygon_offset_unitsInput.value)}})

decreaseghq_cache_size.addEventListener('click', function(){if(ghq_cache_sizeInput.value != ghq_cache_sizeInput.min){ghq_cache_sizeInput.value = parseInt(ghq_cache_sizeInput.value) - 128;localStorage.setItem('ghq_cache_size', ghq_cache_sizeInput.value)}})
increaseghq_cache_size.addEventListener('click', function(){if(ghq_cache_sizeInput.value != ghq_cache_sizeInput.max){ghq_cache_sizeInput.value = parseInt(ghq_cache_sizeInput.value) + 128;localStorage.setItem('ghq_cache_size', ghq_cache_sizeInput.value)}})



document.getElementById('clearIPLROM').addEventListener('click', function(){IPLROM = '';IPLROMText.innerHTML = '';localStorage.removeItem('IPLROM')})
if(localStorage.getItem('IPLROM') === null || localStorage.getItem('IPLROM') === undefined){IPLROM = '';IPLROMText.innerHTML = IPLROM}
if(localStorage.getItem('IPLROM') != null){IPLROM = localStorage.getItem('IPLROM');IPLROMText.innerHTML = IPLROM}
IPLROMInput.addEventListener('click', function(){
IPLROMResult = dialog.open({properties:['openFile'],filters:[{name:'64DD IPL',extensions:['n64','v64','z64','bin','rom']}]})
if(IPLROMResult != undefined){IPLROM = IPLROMResult;IPLROMText.innerHTML = IPLROM;localStorage.setItem('IPLROM', IPLROM)}})

document.getElementById('clearDisk').addEventListener('click', function(){Disk = '';DiskText.innerHTML = '';localStorage.removeItem('Disk')})
if(localStorage.getItem('Disk') === null || localStorage.getItem('Disk') === undefined){Disk = '';DiskText.innerHTML = Disk}
if(localStorage.getItem('Disk') != null){Disk = localStorage.getItem('Disk');DiskText.innerHTML = Disk}
DiskInput.addEventListener('click', function(){
DiskResult = dialog.open({properties:['openFile'],filters:[{name:'64DD Disk',extensions:['ndd']}]})
if(DiskResult != undefined){Disk = DiskResult;DiskText.innerHTML = Disk;localStorage.setItem('Disk', Disk)}})

document.getElementById('cleargbROM1').addEventListener('click', function(){gbROM1 = '';gbROM1Text.innerHTML = '';localStorage.removeItem('gbROM1')})
if(localStorage.getItem('gbROM1') === null || localStorage.getItem('gbROM1') === undefined){gbROM1 = '';gbROM1Text.innerHTML = gbROM1}
if(localStorage.getItem('gbROM1') != null){gbROM1 = localStorage.getItem('gbROM1');gbROM1Text.innerHTML = gbROM1}
gbROM1Input.addEventListener('click', function(){
gbROM1Result = dialog.open({properties:['openFile'],filters:[{name:'GB ROM',extensions:['gb','gbc']}]})
if(gbROM1Result != undefined){gbROM1 = gbROM1Result;gbROM1Text.innerHTML = gbROM1;localStorage.setItem('gbROM1', gbROM1)}})

document.getElementById('cleargbROM2').addEventListener('click', function(){gbROM2 = '';gbROM2Text.innerHTML = '';localStorage.removeItem('gbROM2')})
if(localStorage.getItem('gbROM2') === null || localStorage.getItem('gbROM2') === undefined){gbROM2 = '';gbROM2Text.innerHTML = gbROM2}
if(localStorage.getItem('gbROM2') != null){gbROM2 = localStorage.getItem('gbROM2');gbROM2Text.innerHTML = gbROM2}
gbROM2Input.addEventListener('click', function(){
gbROM2Result = dialog.open({properties:['openFile'],filters:[{name:'GB ROM',extensions:['gb','gbc']}]})
if(gbROM2Result != undefined){gbROM2 = gbROM2Result;gbROM2Text.innerHTML = gbROM2;localStorage.setItem('gbROM2', gbROM2)}})

document.getElementById('cleargbROM3').addEventListener('click', function(){gbROM3 = '';gbROM3Text.innerHTML = '';localStorage.removeItem('gbROM3')})
if(localStorage.getItem('gbROM3') === null || localStorage.getItem('gbROM3') === undefined){gbROM3 = '';gbROM3Text.innerHTML = gbROM3}
if(localStorage.getItem('gbROM3') != null){gbROM3 = localStorage.getItem('gbROM3');gbROM3Text.innerHTML = gbROM3}
gbROM3Input.addEventListener('click', function(){
gbROM3Result = dialog.open({properties:['openFile'],filters:[{name:'GB ROM',extensions:['gb','gbc']}]})
if(gbROM3Result != undefined){gbROM3 = gbROM3Result;gbROM3Text.innerHTML = gbROM3;localStorage.setItem('gbROM3', gbROM3)}})

document.getElementById('cleargbROM4').addEventListener('click', function(){gbROM4 = '';gbROM4Text.innerHTML = '';localStorage.removeItem('gbROM4')})
if(localStorage.getItem('gbROM4') === null || localStorage.getItem('gbROM4') === undefined){gbROM4 = '';gbROM4Text.innerHTML = gbROM4}
if(localStorage.getItem('gbROM4') != null){gbROM4 = localStorage.getItem('gbROM4');gbROM4Text.innerHTML = gbROM4}
gbROM4Input.addEventListener('click', function(){
gbROM4Result = dialog.open({properties:['openFile'],filters:[{name:'GB ROM',extensions:['gb','gbc']}]})
if(gbROM4Result != undefined){gbROM4 = gbROM4Result;gbROM4Text.innerHTML = gbROM4;localStorage.setItem('gbROM4', gbROM4)}})

document.getElementById('cleargbRAM1').addEventListener('click', function(){gbRAM1 = '';gbRAM1Text.innerHTML = '';localStorage.removeItem('gbRAM1')})
if(localStorage.getItem('gbRAM1') === null || localStorage.getItem('gbRAM1') === undefined){gbRAM1 = '';gbRAM1Text.innerHTML = gbRAM1}
if(localStorage.getItem('gbRAM1') != null){gbRAM1 = localStorage.getItem('gbRAM1');gbRAM1Text.innerHTML = gbRAM1}
gbRAM1Input.addEventListener('click', function(){
gbRAM1Result = dialog.open({properties:['openFile'],filters:[{name:'GB Save File',extensions:['sav']}]})
if(gbRAM1Result != undefined){gbRAM1 = gbRAM1Result;gbRAM1Text.innerHTML = gbRAM1;localStorage.setItem('gbRAM1', gbRAM1)}})

document.getElementById('cleargbRAM2').addEventListener('click', function(){gbRAM2 = '';gbRAM2Text.innerHTML = '';localStorage.removeItem('gbRAM2')})
if(localStorage.getItem('gbRAM2') === null || localStorage.getItem('gbRAM2') === undefined){gbRAM2 = '';gbRAM2Text.innerHTML = gbRAM2}
if(localStorage.getItem('gbRAM2') != null){gbRAM2 = localStorage.getItem('gbRAM2');gbRAM2Text.innerHTML = gbRAM2}
gbRAM2Input.addEventListener('click', function(){
gbRAM2Result = dialog.open({properties:['openFile'],filters:[{name:'GB Save File',extensions:['sav']}]})
if(gbRAM2Result != undefined){gbRAM2 = gbRAM2Result;gbRAM2Text.innerHTML = gbRAM2;localStorage.setItem('gbRAM2', gbRAM2)}})

document.getElementById('cleargbRAM3').addEventListener('click', function(){gbRAM3 = '';gbRAM3Text.innerHTML = '';localStorage.removeItem('gbRAM3')})
if(localStorage.getItem('gbRAM3') === null || localStorage.getItem('gbRAM3') === undefined){gbRAM3 = '';gbRAM3Text.innerHTML = gbRAM3}
if(localStorage.getItem('gbRAM3') != null){gbRAM3 = localStorage.getItem('gbRAM3');gbRAM3Text.innerHTML = gbRAM3}
gbRAM3Input.addEventListener('click', function(){
gbRAM3Result = dialog.open({properties:['openFile'],filters:[{name:'GB Save File',extensions:['sav']}]})
if(gbRAM3Result != undefined){gbRAM3 = gbRAM3Result;gbRAM3Text.innerHTML = gbRAM3;localStorage.setItem('gbRAM3', gbRAM3)}})

document.getElementById('cleargbRAM4').addEventListener('click', function(){gbRAM4 = '';gbRAM4Text.innerHTML = '';localStorage.removeItem('gbRAM4')})
if(localStorage.getItem('gbRAM4') === null || localStorage.getItem('gbRAM4') === undefined){gbRAM4 = '';gbRAM4Text.innerHTML = gbRAM4}
if(localStorage.getItem('gbRAM4') != null){gbRAM4 = localStorage.getItem('gbRAM4');gbRAM4Text.innerHTML = gbRAM4}
gbRAM4Input.addEventListener('click', function(){
gbRAM4Result = dialog.open({properties:['openFile'],filters:[{name:'GB Save File',extensions:['sav']}]})
if(gbRAM4Result != undefined){gbRAM4 = gbRAM4Result;gbRAM4Text.innerHTML = gbRAM4;localStorage.setItem('gbRAM4', gbRAM4)}})

document.getElementById('resetScreenshotPath').addEventListener('click', function(){ScreenshotPath = '';ScreenshotPathText.innerHTML = '';localStorage.removeItem('ScreenshotPath')})
if(localStorage.getItem('ScreenshotPath') === null || localStorage.getItem('ScreenshotPath') === undefined){ScreenshotPath = '';ScreenshotPathText.innerHTML = ScreenshotPath}
if(localStorage.getItem('ScreenshotPath') != null){ScreenshotPath = localStorage.getItem('ScreenshotPath');ScreenshotPathText.innerHTML = ScreenshotPath}
ScreenshotPathInput.addEventListener('click', function(){
ScreenshotPathResult = dialog.open({properties:['openDirectory']})
if(ScreenshotPathResult != undefined){ScreenshotPath = ScreenshotPathResult;ScreenshotPathText.innerHTML = ScreenshotPath;localStorage.setItem('ScreenshotPath', ScreenshotPath)}})

document.getElementById('resetSaveStatePath').addEventListener('click', function(){SaveStatePath = '';SaveStatePathText.innerHTML = '';localStorage.removeItem('SaveStatePath')})
if(localStorage.getItem('SaveStatePath') === null || localStorage.getItem('SaveStatePath') === undefined){SaveStatePath = '';SaveStatePathText.innerHTML = SaveStatePath}
if(localStorage.getItem('SaveStatePath') != null){SaveStatePath = localStorage.getItem('SaveStatePath');SaveStatePathText.innerHTML = SaveStatePath}
SaveStatePathInput.addEventListener('click', function(){
SaveStatePathResult = dialog.open({properties:['openDirectory']})
if(SaveStatePathResult != undefined){SaveStatePath = SaveStatePathResult;SaveStatePathText.innerHTML = SaveStatePath;localStorage.setItem('SaveStatePath', SaveStatePath)}})

document.getElementById('resetSaveSRAMPath').addEventListener('click', function(){SaveSRAMPath = '';SaveSRAMPathText.innerHTML = '';localStorage.removeItem('SaveSRAMPath')})
if(localStorage.getItem('SaveSRAMPath') === null || localStorage.getItem('SaveSRAMPath') === undefined){SaveSRAMPath = '';SaveSRAMPathText.innerHTML = SaveSRAMPath}
if(localStorage.getItem('SaveSRAMPath') != null){SaveSRAMPath = localStorage.getItem('SaveSRAMPath');SaveSRAMPathText.innerHTML = SaveSRAMPath}
SaveSRAMPathInput.addEventListener('click', function(){
SaveSRAMPathResult = dialog.open({properties:['openDirectory']})
if(SaveSRAMPathResult != undefined){SaveSRAMPath = SaveSRAMPathResult;SaveSRAMPathText.innerHTML = SaveSRAMPath;localStorage.setItem('SaveSRAMPath', SaveSRAMPath)}})

document.getElementById('resetTxPath').addEventListener('click', function(){txPath = hires_texture;txPathText.innerHTML = txPath;localStorage.removeItem('txPath')})
if(localStorage.getItem('txPath') === null || localStorage.getItem('txPath') === undefined){txPath = hires_texture;txPathText.innerHTML = txPath}
if(localStorage.getItem('txPath') != null){txPath = localStorage.getItem('txPath');txPathText.innerHTML = txPath}
txPathInput.addEventListener('click', function(){
txPathResult = dialog.open({properties:['openDirectory']})
if(txPathResult != undefined){txPath = txPathResult;txPathText.innerHTML = txPath;localStorage.setItem('txPath', txPath)}})

document.getElementById('resetTxCachePath').addEventListener('click', function(){txCachePath = cache;txCachePathText.innerHTML = txCachePath;localStorage.removeItem('txCachePath')})
if(localStorage.getItem('txCachePath') === null || localStorage.getItem('txCachePath') === undefined){txCachePath = cache;txCachePathText.innerHTML = txCachePath}
if(localStorage.getItem('txCachePath') != null){txCachePath = localStorage.getItem('txCachePath');txCachePathText.innerHTML = txCachePath}
txCachePathInput.addEventListener('click', function(){
txCachePathResult = dialog.open({properties:['openDirectory']})
if(txCachePathResult != undefined){txCachePath = txCachePathResult;txCachePathText.innerHTML = txCachePath;localStorage.setItem('txCachePath', txCachePath)}})

document.getElementById('resetTxDumpPath').addEventListener('click', function(){txDumpPath = texture_dump;txDumpPathText.innerHTML = txDumpPath;localStorage.removeItem('txDumpPath')})
if(localStorage.getItem('txDumpPath') === null || localStorage.getItem('txDumpPath') === undefined){txDumpPath = texture_dump;txDumpPathText.innerHTML = txDumpPath}
if(localStorage.getItem('txDumpPath') != null){txDumpPath = localStorage.getItem('txDumpPath');txDumpPathText.innerHTML = txDumpPath}
txDumpPathInput.addEventListener('click', function(){
txDumpPathResult = dialog.open({properties:['openDirectory']})
if(txDumpPathResult != undefined){txDumpPath = txDumpPathResult;txDumpPathText.innerHTML = txDumpPath;localStorage.setItem('txDumpPath', txDumpPath)}})



function txNoTextureFileStorageDisable(){if(txNoTextureFileStorageCheckbox.checked){cacheDropdown.disabled = true}else{cacheDropdown.disabled = false}}
if(localStorage.getItem('txNoTextureFileStorage') != 'null'){if(localStorage.getItem('txNoTextureFileStorage') === 'true'){cacheDropdown.disabled = true}}
txNoTextureFileStorageCheckbox.addEventListener('change', function(){txNoTextureFileStorageDisable()})

function mode1Disable(){if(mode1Dropdown.value === 'Input-SDL-Control1[mode]=2'){plugged1.disabled = true;name1.disabled = true}else{plugged1.disabled = false;name1.disabled = false}}
if(localStorage.getItem('mode1') != 'null'){if(localStorage.getItem('mode1') === 'Input-SDL-Control1[mode]=2'){plugged1.disabled = true;name1.disabled = true}}
mode1Dropdown.addEventListener('change', function(){mode1Disable()})
mode1Disable();

function mode2Disable(){if(mode2Dropdown.value === 'Input-SDL-Control2[mode]=2'){plugged2.disabled = true;name2.disabled = true}else{plugged2.disabled = false;name2.disabled = false}}
if(localStorage.getItem('mode2') != 'null'){if(localStorage.getItem('mode2') === 'Input-SDL-Control2[mode]=2'){plugged2.disabled = true;name2.disabled = true}}
mode2Dropdown.addEventListener('change', function(){mode2Disable()})
mode2Disable();

function mode3Disable(){if(mode3Dropdown.value === 'Input-SDL-Control3[mode]=2'){plugged3.disabled = true;name3.disabled = true}else{plugged3.disabled = false;name3.disabled = false}}
if(localStorage.getItem('mode3') != 'null'){if(localStorage.getItem('mode3') === 'Input-SDL-Control3[mode]=2'){plugged3.disabled = true;name3.disabled = true}}
mode3Dropdown.addEventListener('change', function(){mode3Disable()})
mode3Disable();

function mode4Disable(){if(mode4Dropdown.value === 'Input-SDL-Control4[mode]=2'){plugged4.disabled = true;name4.disabled = true}else{plugged4.disabled = false;name4.disabled = false}}
if(localStorage.getItem('mode4') != 'null'){if(localStorage.getItem('mode4') === 'Input-SDL-Control4[mode]=2'){plugged4.disabled = true;name4.disabled = true}}
mode4Dropdown.addEventListener('change', function(){mode4Disable()})
mode4Disable();



var recentFiles = [];
if(localStorage.getItem('recentFiles') != null){recentFiles = JSON.parse(localStorage.getItem('recentFiles'))}
if(localStorage.getItem('filePath') != null){filePath = localStorage.getItem('filePath');fileText.innerHTML = filePath}
fileInput.addEventListener('click', function(){
fileResult = dialog.open({properties:['openFile'],filters:[{name:'N64 ROM',extensions:['n64','v64','z64']}]});
if(fileResult != undefined){filePath = fileResult;fileText.innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath.toString()))recentFiles.unshift(filePath.toString());recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(cheatList.innerHTML!='')cheatList.innerHTML=''}})

function recentFilesUpdate(){
optionDefault.selected = true;
if(recentFiles[0] != null){option0.value = recentFiles[0];option0.innerHTML = '1. ' + recentFiles[0]}
if(recentFiles[1] != null){option1.value = recentFiles[1];option1.innerHTML = '2. ' + recentFiles[1]}
if(recentFiles[2] != null){option2.value = recentFiles[2];option2.innerHTML = '3. ' + recentFiles[2]}
if(recentFiles[3] != null){option3.value = recentFiles[3];option3.innerHTML = '4. ' + recentFiles[3]}
if(recentFiles[4] != null){option4.value = recentFiles[4];option4.innerHTML = '5. ' + recentFiles[4]}
if(recentFiles[5] != null){option5.value = recentFiles[5];option5.innerHTML = '6. ' + recentFiles[5]}
if(recentFiles[6] != null){option6.value = recentFiles[6];option6.innerHTML = '7. ' + recentFiles[6]}
if(recentFiles[7] != null){option7.value = recentFiles[7];option7.innerHTML = '8. ' + recentFiles[7]}
if(recentFiles[8] != null){option8.value = recentFiles[8];option8.innerHTML = '9. ' + recentFiles[8]}
if(recentFiles[9] != null){option9.value = recentFiles[9];option9.innerHTML = '10. ' + recentFiles[9]}}
recentFilesUpdate()
recent.addEventListener('change', function(){
if(recent.value != null && recent.value != ''){filePath = recent.value;fileText.innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath))recentFiles.unshift(filePath);recentFiles.splice(10);localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(cheatList.innerHTML!='')cheatList.innerHTML=''}})

document.getElementById('clearRecent').addEventListener('click', function(){
recentFiles = [];
localStorage.removeItem('recentFiles');
optionDefault.selected = true;
option0.value = '';option0.innerHTML = '';
option1.value = '';option1.innerHTML = '';
option2.value = '';option2.innerHTML = '';
option3.value = '';option3.innerHTML = '';
option4.value = '';option4.innerHTML = '';
option5.value = '';option5.innerHTML = '';
option6.value = '';option6.innerHTML = '';
option7.value = '';option7.innerHTML = '';
option8.value = '';option8.innerHTML = '';
option9.value = '';option9.innerHTML = ''})

document.getElementById('launch').addEventListener('click', function(){
var PluginDir,osd,fullscreen,resolution,gfx,audio,input,rsp,emumode,exp,threadedVideo,plugin1,plugin2,plugin3,plugin4,plugged1,plugged2,plugged3,plugged4,mode1,mode2,mode3,mode4,name1,name2,name3,name4,device1,device2,device3,device4,mouse1,mouse2,mouse3,mouse4,msensitivity1,msensitivity2,msensitivity3,msensitivity4,analogdeadzone1,analogdeadzone2,analogdeadzone3,analogdeadzone4,analogpeak1,analogpeak2,analogpeak3,analogpeak4,msaa,fxaa,aspectRatio,vsync,bufferSwapMode,useNativeResolutionFactor,cxd4GFX,cxd4Audio,m64pGFX,m64pAudio,RspFallback,bilinearMode,enableHalosRemoval,anisotropy,cache,txHiresEnable,txNoTextureFileStorage,EnableDitheringPattern,EnableHiresNoiseDithering,DitheringQuantization,RDRAMImageDitheringMode,EnableLOD,EnableHWLighting,EnableCoverage,EnableClipping,EnableShadersStorage,EnableLegacyBlending,EnableHybridFilter,EnableFragmentDepthWrite,EnableCustomSettings,CorrectTexrectCoords,EnableNativeResTexrects,BackgroundsMode,EnableTexCoordBounds,EnableFBEmulation,EnableCopyAuxiliaryToRDRAM,EnableN64DepthCompare,ForceDepthBufferClear,DisableFBInfo,FBInfoReadColorChunk,FBInfoReadDepthChunk,EnableCopyColorToRDRAM,EnableCopyDepthToRDRAM,EnableCopyColorFromRDRAM,EnableCopyDepthToMainDepthBuffer,OverscanNtscTop,OverscanNtscLeft,OverscanNtscRight,OverscanNtscBottom,OverscanPalTop,OverscanPalLeft,OverscanPalRight,OverscanPalBottom,txFilterMode,txEnhancementMode,txDeposterize,txFilterIgnoreBG,txCacheSize,txHiresFullAlphaChannel,txHresAltCRC,txCacheCompression,txForce16bpp,txSaveCache,txPathSetting,txCachePathSetting,txDumpPathSetting,KbdMappingSlot0,KbdMappingSlot1,KbdMappingSlot2,KbdMappingSlot3,KbdMappingSlot4,KbdMappingSlot5,KbdMappingSlot6,KbdMappingSlot7,KbdMappingSlot8,KbdMappingSlot9,KbdMappingStop,KbdMappingFullscreen,KbdMappingSaveState,KbdMappingLoadState,KbdMappingIncrementSlot,KbdMappingReset,KbdMappingSpeedDown,KbdMappingSpeedUp,KbdMappingScreenshot,KbdMappingPause,KbdMappingMute,KbdMappingIncreaseVolume,KbdMappingDecreaseVolume,KbdMappingFastForward,KbdMappingFrameAdvance,KbdMappingGameshark,JoyMappingStop,JoyMappingFullscreen,JoyMappingSaveState,JoyMappingLoadState,JoyMappingIncrementSlot,JoyMappingReset,JoyMappingSpeedDown,JoyMappingSpeedUp,JoyMappingScreenshot,JoyMappingPause,JoyMappingMute,JoyMappingIncreaseVolume,JoyMappingDecreaseVolume,JoyMappingFastForward,JoyMappingFrameAdvance,JoyMappingGameshark,Parallel,NumWorkers,BusyLoop,ViMode,ViInterpolation,ViWidescreen,ViHideOverscan,ViIntegerScaling,DpCompat,ParallelFullscreen,ParallelUpscaling,ParallelScreenWidth,ParallelScreenHeight,ParallelSuperscaledReads,ParallelSuperscaledDither,ParallelDeinterlace,ParallelIntegerScale,ParallelCropOverscan,ParallelVIAA,ParallelDivot,ParallelGammaDither,ParallelVIBilerp,ParallelVIDither,ParallelDownScale,ParallelNativeTextLOD,ParallelNativeTextRECT,ForceGammaCorrection,GammaCorrectionLevel,fontSize,fontColor,ShowFPS,ShowVIS,ShowPercent,ShowInternalResolution,ShowRenderingResolution,ShowStatistics,CountersPos,IPLROMSetting,DiskSetting,NoCompiledJump,CountPerOp,AutoStateSlotIncrement,CurrentStateSlot,SharedDataPath,ScreenshotPathSetting,SaveStatePathSetting,SaveSRAMPathSetting,RandomizeInterrupt,SaveDiskFormat,WaitForCPUHost,SupportCPUSemaphoreLock,gbROM1Setting,gbROM2Setting,gbROM3Setting,gbROM4Setting,gbRAM1Setting,gbRAM2Setting,gbRAM3Setting,gbRAM4Setting,DEFAULT_FREQUENCY,SWAP_CHANNELS,PRIMARY_BUFFER_TARGET,SECONDARY_BUFFER_SIZE,RESAMPLE,VOLUME_ADJUST,VOLUME_DEFAULT,AUDIO_SYNC,hkTexDump,hkHdTexReload,hkHdTexToggle,hkVsync,hkFBEmulation,hkN64DepthCompare,hkOsdVis,hkOsdFps,hkOsdPercent,hkOsdInternalResolution,hkOsdRenderingResolution,hkTexCoordBounds,hkNativeResTexrects,hkForceGammaCorrection,
FrameBufferSetting,FrameBufferWriteBackControl,RenderToTexture,ScreenUpdateSetting,NormalAlphaBlender,FastTextureLoading,AccurateTextureMapping,InN64Resolution,SaveVRAM,DoubleSizeForSmallTxtrBuf,DefaultCombinerDisable,EnableHacks,WinFrameMode,FullTMEMEmulation,OpenGLVertexClipper,EnableSSE,SkipFrame,TexRectOnly,SmallTextureOnly,LoadHiResCRCOnly,LoadHiResTextures,DumpTexturesToFiles,RiceShowFPS,Mipmapping,FogMethod,ForceTextureFilter,TextureEnhancement,TextureEnhancementControl,TextureQuality,OpenGLDepthBufferSetting,RiceMultiSampling,ColorQuality,OpenGLRenderSetting,AnisotropicFiltering,ForcePolygonOffset,PolygonOffsetFactor,PolygonOffsetUnits,
Glide64VSync,wrpAntiAliasing,force_polygon_offset,polygon_offset_factor,polygon_offset_units,show_fps,clock,clock_24_hr,wrpFBO,wrpAnisotropic,ghq_fltr,ghq_cmpr,ghq_enht,ghq_hirs,ghq_enht_cmpr,ghq_enht_tile,ghq_enht_f16bpp,ghq_enht_gz,ghq_enht_nobg,ghq_hirs_cmpr,ghq_hirs_tile,ghq_hirs_f16bpp,ghq_hirs_gz,ghq_hirs_altcrc,ghq_cache_save,ghq_cache_size,ghq_hirs_let_texartists_fly,ghq_hirs_dump,alt_tex_size,use_sts1_only,force_calc_sphere,correct_viewport,increase_texrect_edge,decrease_fillrect_edge,texture_correction,pal230,force_microcheck,force_quad3d,clip_zmin,clip_zmax,fast_crc,adjust_aspect,zmode_compare_less,old_style_adither,n64_z_scale,optimize_texrect,ignore_aux_copy,hires_buf_clear,fb_read_alpha,useless_is_useless,fb_crc_mode,filtering,fog,buff_clear,swapmode,aspect,lodmode,fb_smart,fb_hires,fb_read_always,read_back_to_screen,detect_cpu_write,fb_get_info,fb_render,
AButton1,AButton2,AButton3,AButton4,BButton1,BButton2,BButton3,BButton4,LTrig1,LTrig2,LTrig3,LTrig4,RTrig1,RTrig2,RTrig3,RTrig4,ZTrig1,ZTrig2,ZTrig3,ZTrig4,Start1,Start2,Start3,Start4,DPadU1,DPadU2,DPadU3,DPadU4,DPadL1,DPadL2,DPadL3,DPadL4,DPadR1,DPadR2,DPadR3,DPadR4,DPadD1,DPadD2,DPadD3,DPadD4,CButtonU1,CButtonU2,CButtonU3,CButtonU4,CButtonL1,CButtonL2,CButtonL3,CButtonL4,CButtonR1,CButtonR2,CButtonR3,CButtonR4,CButtonD1,CButtonD2,CButtonD3,CButtonD4,MempakSwitch1,MempakSwitch2,MempakSwitch3,MempakSwitch4,RumblepakSwitch1,RumblepakSwitch2,RumblepakSwitch3,RumblepakSwitch4,XAxis1,XAxis2,XAxis3,XAxis4,YAxis1,YAxis2,YAxis3,YAxis4,
nospeedlimit;
if(document.getElementById('exp').checked === true){exp = 'Core[DisableExtraMem]=True'}else{exp = 'Core[DisableExtraMem]=False'}
if(document.getElementById('osd').checked === true){osd = '--osd'}else{osd = '--noosd'}
if(document.getElementById('fullScreen').checked === true){fullscreen = '--fullscreen';ParallelFullscreen = 'Video-Parallel[Fullscreen]=True'}else{fullscreen = '--windowed';ParallelFullscreen = 'Video-Parallel[Fullscreen]=False'}
if(document.getElementById('vsync').checked === true){vsync = 'Video-General[VerticalSync]=True';Glide64VSync = 'Video-Glide64mk2[vsync]=True'}else{vsync = 'Video-General[VerticalSync]=False';Glide64VSync = 'Video-Glide64mk2[vsync]=False'}
if(rspGFXCheckbox.checked === true){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=True'}
else{cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=False'}
if(rspAudioCheckbox.checked === true){cxd4Audio = 'rsp-cxd4[AudioListToAudioPlugin]=True'; m64pAudio = 'Rsp-HLE[AudioListToAudioPlugin]=True'}
else{cxd4Audio = 'rsp-cxd4[AudioListToAudioPlugin]=False'; m64pAudio = 'Rsp-HLE[AudioListToAudioPlugin]=False'}
if(WaitForCPUHostCheckbox.checked === true){WaitForCPUHost = 'rsp-cxd4[WaitForCPUHost]=True'}else{WaitForCPUHost = 'rsp-cxd4[WaitForCPUHost]=False'}
if(SupportCPUSemaphoreLockCheckbox.checked === true){SupportCPUSemaphoreLock = 'rsp-cxd4[SupportCPUSemaphoreLock]=True'}else{SupportCPUSemaphoreLock = 'rsp-cxd4[SupportCPUSemaphoreLock]=False'}
if(document.getElementById('threadedVideo').checked === true){threadedVideo = 'Video-GLideN64[ThreadedVideo]=True'}else{threadedVideo = 'Video-GLideN64[ThreadedVideo]=False'}
if(document.getElementById('bilinearMode').checked === true){bilinearMode = 'Video-GLideN64[bilinearMode]=True'}else{bilinearMode = 'Video-GLideN64[bilinearMode]=False'}
if(document.getElementById('fxaa').checked === true){fxaa = 'Video-GLideN64[FXAA]=True'}else{fxaa = 'Video-GLideN64[FXAA]=False'}
if(document.getElementById('enableHalosRemoval').checked === true){enableHalosRemoval = 'Video-GLideN64[enableHalosRemoval]=True'}else{enableHalosRemoval = 'Video-GLideN64[enableHalosRemoval]=False'}
if(document.getElementById('txHiresEnable').checked === true){txHiresEnable = 'Video-GLideN64[txHiresEnable]=True'}else{txHiresEnable = 'Video-GLideN64[txHiresEnable]=False'}
if(txNoTextureFileStorageCheckbox.checked === true){txNoTextureFileStorage = 'Video-GLideN64[txNoTextureFileStorage]=True'}else{txNoTextureFileStorage = 'Video-GLideN64[txNoTextureFileStorage]=False'}
if(document.getElementById('EnableDitheringPattern').checked === true){EnableDitheringPattern = 'Video-GLideN64[EnableDitheringPattern]=True'}else{EnableDitheringPattern = 'Video-GLideN64[EnableDitheringPattern]=False'}
if(document.getElementById('EnableHiresNoiseDithering').checked === true){EnableHiresNoiseDithering = 'Video-GLideN64[EnableHiresNoiseDithering]=True'}else{EnableHiresNoiseDithering = 'Video-GLideN64[EnableHiresNoiseDithering]=False'}
if(document.getElementById('DitheringQuantization').checked === true){DitheringQuantization = 'Video-GLideN64[DitheringQuantization]=True'}else{DitheringQuantization = 'Video-GLideN64[DitheringQuantization]=False'}
if(document.getElementById('EnableHWLighting').checked === true){EnableHWLighting = 'Video-GLideN64[EnableHWLighting]=True'}else{EnableHWLighting = 'Video-GLideN64[EnableHWLighting]=False'}
if(document.getElementById('EnableCoverage').checked === true){EnableCoverage = 'Video-GLideN64[EnableCoverage]=True'}else{EnableCoverage = 'Video-GLideN64[EnableCoverage]=False'}
if(document.getElementById('EnableClipping').checked === true){EnableClipping = 'Video-GLideN64[EnableClipping]=True'}else{EnableClipping = 'Video-GLideN64[EnableClipping]=False'}
if(document.getElementById('EnableShadersStorage').checked === true){EnableShadersStorage = 'Video-GLideN64[EnableShadersStorage]=True'}else{EnableShadersStorage = 'Video-GLideN64[EnableShadersStorage]=False'}
if(document.getElementById('EnableLegacyBlending').checked === true){EnableLegacyBlending = 'Video-GLideN64[EnableLegacyBlending]=True'}else{EnableLegacyBlending = 'Video-GLideN64[EnableLegacyBlending]=False'}
if(document.getElementById('EnableHybridFilter').checked === true){EnableHybridFilter = 'Video-GLideN64[EnableHybridFilter]=True'}else{EnableHybridFilter = 'Video-GLideN64[EnableHybridFilter]=False'}
if(document.getElementById('EnableFragmentDepthWrite').checked === true){EnableFragmentDepthWrite = 'Video-GLideN64[EnableFragmentDepthWrite]=True'}else{EnableFragmentDepthWrite = 'Video-GLideN64[EnableFragmentDepthWrite]=False'}
if(document.getElementById('EnableCustomSettings').checked === true){EnableCustomSettings = 'Video-GLideN64[EnableCustomSettings]=True'}else{EnableCustomSettings = 'Video-GLideN64[EnableCustomSettings]=False'}
if(document.getElementById('EnableTexCoordBounds').checked === true){EnableTexCoordBounds = 'Video-GLideN64[EnableTexCoordBounds]=1'}else{EnableTexCoordBounds = 'Video-GLideN64[EnableTexCoordBounds]=0'}
if(document.getElementById('EnableLOD').checked === true){EnableLOD = 'Video-GLideN64[EnableLOD]=True'}else{EnableLOD = 'Video-GLideN64[EnableLOD]=False'}
if(document.getElementById('EnableFBEmulation').checked === true){EnableFBEmulation = 'Video-GLideN64[EnableFBEmulation]=True'}else{EnableFBEmulation = 'Video-GLideN64[EnableFBEmulation]=False'}
if(document.getElementById('EnableCopyAuxiliaryToRDRAM').checked === true){EnableCopyAuxiliaryToRDRAM = 'Video-GLideN64[EnableCopyAuxiliaryToRDRAM]=True'}else{EnableCopyAuxiliaryToRDRAM = 'Video-GLideN64[EnableCopyAuxiliaryToRDRAM]=False'}
if(document.getElementById('ForceDepthBufferClear').checked === true){ForceDepthBufferClear = 'Video-GLideN64[ForceDepthBufferClear]=True'}else{ForceDepthBufferClear = 'Video-GLideN64[ForceDepthBufferClear]=False'}
if(document.getElementById('DisableFBInfo').checked === true){DisableFBInfo = 'Video-GLideN64[DisableFBInfo]=True'}else{DisableFBInfo = 'Video-GLideN64[DisableFBInfo]=False'}
if(document.getElementById('FBInfoReadColorChunk').checked === true){FBInfoReadColorChunk = 'Video-GLideN64[FBInfoReadColorChunk]=True'}else{FBInfoReadColorChunk = 'Video-GLideN64[FBInfoReadColorChunk]=False'}
if(document.getElementById('FBInfoReadDepthChunk').checked === true){FBInfoReadDepthChunk = 'Video-GLideN64[FBInfoReadDepthChunk]=True'}else{FBInfoReadDepthChunk = 'Video-GLideN64[FBInfoReadDepthChunk]=False'}
if(document.getElementById('EnableCopyColorFromRDRAM').checked === true){EnableCopyColorFromRDRAM = 'Video-GLideN64[EnableCopyColorFromRDRAM]=True'}else{EnableCopyColorFromRDRAM = 'Video-GLideN64[EnableCopyColorFromRDRAM]=False'}
if(document.getElementById('EnableCopyDepthToMainDepthBuffer').checked === true){EnableCopyDepthToMainDepthBuffer = 'Video-GLideN64[EnableCopyDepthToMainDepthBuffer]=True'}else{EnableCopyDepthToMainDepthBuffer = 'Video-GLideN64[EnableCopyDepthToMainDepthBuffer]=False'}
if(document.getElementById('EnableOverscan').checked === true){EnableOverscan = 'Video-GLideN64[EnableOverscan]=True'}else{EnableOverscan = 'Video-GLideN64[EnableOverscan]=False'}
if(document.getElementById('txDeposterize').checked === true){txDeposterize = 'Video-GLideN64[txDeposterize]=True'}else{txDeposterize = 'Video-GLideN64[txDeposterize]=False'}
if(document.getElementById('txFilterIgnoreBG').checked === true){txFilterIgnoreBG = 'Video-GLideN64[txFilterIgnoreBG]=True'}else{txFilterIgnoreBG = 'Video-GLideN64[txFilterIgnoreBG]=False'}
if(document.getElementById('txHiresFullAlphaChannel').checked === true){txHiresFullAlphaChannel = 'Video-GLideN64[txHiresFullAlphaChannel]=True'}else{txHiresFullAlphaChannel = 'Video-GLideN64[txHiresFullAlphaChannel]=False'}
if(document.getElementById('txHresAltCRC').checked === true){txHresAltCRC = 'Video-GLideN64[txHresAltCRC]=True'}else{txHresAltCRC = 'Video-GLideN64[txHresAltCRC]=False'}
if(document.getElementById('txCacheCompression').checked === true){txCacheCompression = 'Video-GLideN64[txCacheCompression]=True'}else{txCacheCompression = 'Video-GLideN64[txCacheCompression]=False'}
if(document.getElementById('txForce16bpp').checked === true){txForce16bpp = 'Video-GLideN64[txForce16bpp]=True'}else{txForce16bpp = 'Video-GLideN64[txForce16bpp]=False'}
if(document.getElementById('txSaveCache').checked === true){txSaveCache = 'Video-GLideN64[txSaveCache]=True'}else{txSaveCache = 'Video-GLideN64[txSaveCache]=False'}
if(document.getElementById('ForceGammaCorrection').checked === true){ForceGammaCorrection = 'Video-GLideN64[ForceGammaCorrection]=True'}else{ForceGammaCorrection = 'Video-GLideN64[ForceGammaCorrection]=False'}
if(document.getElementById('ShowFPS').checked === true){ShowFPS = 'Video-GLideN64[ShowFPS]=True'}else{ShowFPS = 'Video-GLideN64[ShowFPS]=False'}
if(document.getElementById('ShowVIS').checked === true){ShowVIS = 'Video-GLideN64[ShowVIS]=True'}else{ShowVIS = 'Video-GLideN64[ShowVIS]=False'}
if(document.getElementById('ShowPercent').checked === true){ShowPercent = 'Video-GLideN64[ShowPercent]=True'}else{ShowPercent = 'Video-GLideN64[ShowPercent]=False'}
if(document.getElementById('ShowInternalResolution').checked === true){ShowInternalResolution = 'Video-GLideN64[ShowInternalResolution]=True'}else{ShowInternalResolution = 'Video-GLideN64[ShowInternalResolution]=False'}
if(document.getElementById('ShowRenderingResolution').checked === true){ShowRenderingResolution = 'Video-GLideN64[ShowRenderingResolution]=True'}else{ShowRenderingResolution = 'Video-GLideN64[ShowRenderingResolution]=False'}
if(document.getElementById('ShowStatistics').checked === true){ShowStatistics = 'Video-GLideN64[ShowStatistics]=True'}else{ShowStatistics = 'Video-GLideN64[ShowStatistics]=False'}

if(document.getElementById('NoCompiledJump').checked === true){NoCompiledJump = 'Core[NoCompiledJump]=True'}else{NoCompiledJump = 'Core[NoCompiledJump]=False'}
if(document.getElementById('AutoStateSlotIncrement').checked === true){AutoStateSlotIncrement = 'Core[AutoStateSlotIncrement]=True'}else{AutoStateSlotIncrement = 'Core[AutoStateSlotIncrement]=False'}
if(document.getElementById('RandomizeInterrupt').checked === true){RandomizeInterrupt = 'Core[RandomizeInterrupt]=True'}else{RandomizeInterrupt = 'Core[RandomizeInterrupt]=False'}
if(document.getElementById('SWAP_CHANNELS').checked === true){SWAP_CHANNELS = 'Audio-SDL[SWAP_CHANNELS]=True'}else{SWAP_CHANNELS = 'Audio-SDL[SWAP_CHANNELS]=False'}
if(document.getElementById('AUDIO_SYNC').checked === true){AUDIO_SYNC = 'Audio-SDL[AUDIO_SYNC]=True'}else{AUDIO_SYNC = 'Audio-SDL[AUDIO_SYNC]=False'}

if(document.getElementById('Parallel').checked === true){Parallel = 'Video-Angrylion-Plus[Parallel]=True'}else{Parallel = 'Video-Angrylion-Plus[Parallel]=False'}
if(document.getElementById('BusyLoop').checked === true){BusyLoop = 'Video-Angrylion-Plus[BusyLoop]=True'}else{BusyLoop = 'Video-Angrylion-Plus[BusyLoop]=False'}
if(document.getElementById('ViWidescreen').checked === true){ViWidescreen = 'Video-Angrylion-Plus[ViWidescreen]=True'}else{ViWidescreen = 'Video-Angrylion-Plus[ViWidescreen]=False'}
if(document.getElementById('ViHideOverscan').checked === true){ViHideOverscan = 'Video-Angrylion-Plus[ViHideOverscan]=True'}else{ViHideOverscan = 'Video-Angrylion-Plus[ViHideOverscan]=False'}
if(document.getElementById('ViIntegerScaling').checked === true){ViIntegerScaling = 'Video-Angrylion-Plus[ViIntegerScaling]=True'}else{ViIntegerScaling = 'Video-Angrylion-Plus[ViIntegerScaling]=False'}

if(document.getElementById('ParallelSuperscaledReads').checked === true){ParallelSuperscaledReads = 'Video-Parallel[SuperscaledReads]=True'}else{ParallelSuperscaledReads = 'Video-Parallel[SuperscaledReads]=False'}
if(document.getElementById('ParallelSuperscaledDither').checked === true){ParallelSuperscaledDither = 'Video-Parallel[SuperscaledDither]=True'}else{ParallelSuperscaledDither = 'Video-Parallel[SuperscaledDither]=False'}
if(document.getElementById('ParallelIntegerScale').checked === true){ParallelIntegerScale = 'Video-Parallel[IntegerScale]=True'}else{ParallelIntegerScale = 'Video-Parallel[IntegerScale]=False'}
if(document.getElementById('ParallelVIAA').checked === true){ParallelVIAA = 'Video-Parallel[VIAA]=True'}else{ParallelVIAA = 'Video-Parallel[VIAA]=False'}
if(document.getElementById('ParallelDivot').checked === true){ParallelDivot = 'Video-Parallel[Divot]=True'}else{ParallelDivot = 'Video-Parallel[Divot]=False'}
if(document.getElementById('ParallelGammaDither').checked === true){ParallelGammaDither = 'Video-Parallel[GammaDither]=True'}else{ParallelGammaDither = 'Video-Parallel[GammaDither]=False'}
if(document.getElementById('ParallelVIBilerp').checked === true){ParallelVIBilerp = 'Video-Parallel[VIBilerp]=True'}else{ParallelVIBilerp = 'Video-Parallel[VIBilerp]=False'}
if(document.getElementById('ParallelVIDither').checked === true){ParallelVIDither = 'Video-Parallel[VIDither]=True'}else{ParallelVIDither = 'Video-Parallel[VIDither]=False'}
if(document.getElementById('ParallelNativeTextLOD').checked === true){ParallelNativeTextLOD = 'Video-Parallel[NativeTextLOD]=True'}else{ParallelNativeTextLOD = 'Video-Parallel[NativeTextLOD]=False'}
if(document.getElementById('ParallelNativeTextRECT').checked === true){ParallelNativeTextRECT = 'Video-Parallel[NativeTextRECT]=True'}else{ParallelNativeTextRECT = 'Video-Parallel[NativeTextRECT]=False'}
if(document.getElementById('ParallelWidescreenStretch').checked === true){ParallelWidescreenStretch = 'Video-Parallel[WidescreenStretch]=True'}else{ParallelWidescreenStretch = 'Video-Parallel[WidescreenStretch]=False'}

if(document.getElementById('FrameBufferSetting').checked === true){FrameBufferSetting = 'Video-Rice[FrameBufferSetting]=1'}else{FrameBufferSetting = 'Video-Rice[FrameBufferSetting]=0'}
if(document.getElementById('NormalAlphaBlender').checked === true){NormalAlphaBlender = 'Video-Rice[NormalAlphaBlender]=True'}else{NormalAlphaBlender = 'Video-Rice[NormalAlphaBlender]=False'}
if(document.getElementById('FastTextureLoading').checked === true){FastTextureLoading = 'Video-Rice[FastTextureLoading]=True'}else{FastTextureLoading = 'Video-Rice[FastTextureLoading]=False'}
if(document.getElementById('AccurateTextureMapping').checked === true){AccurateTextureMapping = 'Video-Rice[AccurateTextureMapping]=True'}else{AccurateTextureMapping = 'Video-Rice[AccurateTextureMapping]=False'}
if(document.getElementById('InN64Resolution').checked === true){InN64Resolution = 'Video-Rice[InN64Resolution]=True'}else{InN64Resolution = 'Video-Rice[InN64Resolution]=False'}
if(document.getElementById('SaveVRAM').checked === true){SaveVRAM = 'Video-Rice[SaveVRAM]=True'}else{SaveVRAM = 'Video-Rice[SaveVRAM]=False'}
if(document.getElementById('DoubleSizeForSmallTxtrBuf').checked === true){DoubleSizeForSmallTxtrBuf = 'Video-Rice[DoubleSizeForSmallTxtrBuf]=True'}else{DoubleSizeForSmallTxtrBuf = 'Video-Rice[DoubleSizeForSmallTxtrBuf]=False'}
if(document.getElementById('DefaultCombinerDisable').checked === true){DefaultCombinerDisable = 'Video-Rice[DefaultCombinerDisable]=True'}else{DefaultCombinerDisable = 'Video-Rice[DefaultCombinerDisable]=False'}
if(document.getElementById('EnableHacks').checked === true){EnableHacks = 'Video-Rice[EnableHacks]=True'}else{EnableHacks = 'Video-Rice[EnableHacks]=False'}
if(document.getElementById('WinFrameMode').checked === true){WinFrameMode = 'Video-Rice[WinFrameMode]=True'}else{WinFrameMode = 'Video-Rice[WinFrameMode]=False'}
if(document.getElementById('FullTMEMEmulation').checked === true){FullTMEMEmulation = 'Video-Rice[FullTMEMEmulation]=True'}else{FullTMEMEmulation = 'Video-Rice[FullTMEMEmulation]=False'}
if(document.getElementById('OpenGLVertexClipper').checked === true){OpenGLVertexClipper = 'Video-Rice[OpenGLVertexClipper]=True'}else{OpenGLVertexClipper = 'Video-Rice[OpenGLVertexClipper]=False'}
if(document.getElementById('EnableSSE').checked === true){EnableSSE = 'Video-Rice[EnableSSE]=True'}else{EnableSSE = 'Video-Rice[EnableSSE]=False'}
if(document.getElementById('SkipFrame').checked === true){SkipFrame = 'Video-Rice[SkipFrame]=True'}else{SkipFrame = 'Video-Rice[SkipFrame]=False'}
if(document.getElementById('TexRectOnly').checked === true){TexRectOnly = 'Video-Rice[TexRectOnly]=True'}else{TexRectOnly = 'Video-Rice[TexRectOnly]=False'}
if(document.getElementById('SmallTextureOnly').checked === true){SmallTextureOnly = 'Video-Rice[SmallTextureOnly]=True'}else{SmallTextureOnly = 'Video-Rice[SmallTextureOnly]=False'}
if(document.getElementById('LoadHiResCRCOnly').checked === true){LoadHiResCRCOnly = 'Video-Rice[LoadHiResCRCOnly]=True'}else{LoadHiResCRCOnly = 'Video-Rice[LoadHiResCRCOnly]=False'}
if(document.getElementById('LoadHiResTextures').checked === true){LoadHiResTextures = 'Video-Rice[LoadHiResTextures]=True'}else{LoadHiResTextures = 'Video-Rice[LoadHiResTextures]=False'}
if(document.getElementById('DumpTexturesToFiles').checked === true){DumpTexturesToFiles = 'Video-Rice[DumpTexturesToFiles]=True'}else{DumpTexturesToFiles = 'Video-Rice[DumpTexturesToFiles]=False'}
if(document.getElementById('RiceShowFPS').checked === true){RiceShowFPS = 'Video-Rice[ShowFPS]=True'}else{RiceShowFPS = 'Video-Rice[ShowFPS]=False'}
if(document.getElementById('FogMethod').checked === true){FogMethod = 'Video-Rice[FogMethod]=1'}else{FogMethod = 'Video-Rice[FogMethod]=0'}
if(document.getElementById('OpenGLRenderSetting').checked === true){OpenGLRenderSetting = 'Video-Rice[OpenGLRenderSetting]=1'}else{OpenGLRenderSetting = 'Video-Rice[OpenGLRenderSetting]=0'}
if(document.getElementById('ForcePolygonOffset').checked === true){ForcePolygonOffset = 'Video-Rice[ForcePolygonOffset]=True'}else{ForcePolygonOffset = 'Video-Rice[ForcePolygonOffset]=False'}

if(document.getElementById('force_polygon_offset').checked === true){force_polygon_offset = 'Video-Glide64mk2[force_polygon_offset]=True'}else{force_polygon_offset = 'Video-Glide64mk2[force_polygon_offset]=False'}
if(document.getElementById('clock').checked === true){clock = 'Video-Glide64mk2[clock]=True'}else{clock = 'Video-Glide64mk2[clock]=False'}
if(document.getElementById('clock_24_hr').checked === true){clock_24_hr = 'Video-Glide64mk2[clock_24_hr]=True'}else{clock_24_hr = 'Video-Glide64mk2[clock_24_hr]=False'}
if(document.getElementById('wrpFBO').checked === true){wrpFBO = 'Video-Glide64mk2[wrpFBO]=True'}else{wrpFBO = 'Video-Glide64mk2[wrpFBO]=False'}
if(document.getElementById('wrpAnisotropic').checked === true){wrpAnisotropic = 'Video-Glide64mk2[wrpAnisotropic]=True'}else{wrpAnisotropic = 'Video-Glide64mk2[wrpAnisotropic]=False'}
if(document.getElementById('ghq_hirs').checked === true){ghq_hirs = 'Video-Glide64mk2[ghq_hirs]=1'}else{ghq_hirs = 'Video-Glide64mk2[ghq_hirs]=0'}
if(document.getElementById('ghq_enht_cmpr').checked === true){ghq_enht_cmpr = 'Video-Glide64mk2[ghq_enht_cmpr]=True'}else{ghq_enht_cmpr = 'Video-Glide64mk2[ghq_enht_cmpr]=False'}
if(document.getElementById('ghq_enht_tile').checked === true){ghq_enht_tile = 'Video-Glide64mk2[ghq_enht_tile]=1'}else{ghq_enht_tile = 'Video-Glide64mk2[ghq_enht_tile]=0'}
if(document.getElementById('ghq_enht_f16bpp').checked === true){ghq_enht_f16bpp = 'Video-Glide64mk2[ghq_enht_f16bpp]=True'}else{ghq_enht_f16bpp = 'Video-Glide64mk2[ghq_enht_f16bpp]=False'}
if(document.getElementById('ghq_enht_gz').checked === true){ghq_enht_gz = 'Video-Glide64mk2[ghq_enht_gz]=True'}else{ghq_enht_gz = 'Video-Glide64mk2[ghq_enht_gz]=False'}
if(document.getElementById('ghq_enht_nobg').checked === true){ghq_enht_nobg = 'Video-Glide64mk2[ghq_enht_nobg]=True'}else{ghq_enht_nobg = 'Video-Glide64mk2[ghq_enht_nobg]=False'}
if(document.getElementById('ghq_hirs_cmpr').checked === true){ghq_hirs_cmpr = 'Video-Glide64mk2[ghq_hirs_cmpr]=True'}else{ghq_hirs_cmpr = 'Video-Glide64mk2[ghq_hirs_cmpr]=False'}
if(document.getElementById('ghq_hirs_tile').checked === true){ghq_hirs_tile = 'Video-Glide64mk2[ghq_hirs_tile]=True'}else{ghq_hirs_tile = 'Video-Glide64mk2[ghq_hirs_tile]=False'}
if(document.getElementById('ghq_hirs_f16bpp').checked === true){ghq_hirs_f16bpp = 'Video-Glide64mk2[ghq_hirs_f16bpp]=True'}else{ghq_hirs_f16bpp = 'Video-Glide64mk2[ghq_hirs_f16bpp]=False'}
if(document.getElementById('ghq_hirs_gz').checked === true){ghq_hirs_gz = 'Video-Glide64mk2[ghq_hirs_gz]=True'}else{ghq_hirs_gz = 'Video-Glide64mk2[ghq_hirs_gz]=False'}
if(document.getElementById('ghq_hirs_altcrc').checked === true){ghq_hirs_altcrc = 'Video-Glide64mk2[ghq_hirs_altcrc]=True'}else{ghq_hirs_altcrc = 'Video-Glide64mk2[ghq_hirs_altcrc]=False'}
if(document.getElementById('ghq_cache_save').checked === true){ghq_cache_save = 'Video-Glide64mk2[ghq_cache_save]=True'}else{ghq_cache_save = 'Video-Glide64mk2[ghq_cache_save]=False'}
if(document.getElementById('ghq_hirs_let_texartists_fly').checked === true){ghq_hirs_let_texartists_fly = 'Video-Glide64mk2[ghq_hirs_let_texartists_fly]=True'}else{ghq_hirs_let_texartists_fly = 'Video-Glide64mk2[ghq_hirs_let_texartists_fly]=False'}
if(document.getElementById('ghq_hirs_dump').checked === true){ghq_hirs_dump = 'Video-Glide64mk2[ghq_hirs_dump]=True'}else{ghq_hirs_dump = 'Video-Glide64mk2[ghq_hirs_dump]=False'}

if(document.getElementById('plugged1').checked === true){plugged1 = 'Input-SDL-Control1[plugged]=True'}else{plugged1 = 'Input-SDL-Control1[plugged]=False'}
if(document.getElementById('plugged2').checked === true){plugged2 = 'Input-SDL-Control2[plugged]=True'}else{plugged2 = 'Input-SDL-Control2[plugged]=False'}
if(document.getElementById('plugged3').checked === true){plugged3 = 'Input-SDL-Control3[plugged]=True'}else{plugged3 = 'Input-SDL-Control3[plugged]=False'}
if(document.getElementById('plugged4').checked === true){plugged4 = 'Input-SDL-Control4[plugged]=True'}else{plugged4 = 'Input-SDL-Control4[plugged]=False'}
if(mouse1Box.checked === true){mouse1 = 'Input-SDL-Control1[mouse]=True'}else{mouse1 = 'Input-SDL-Control1[mouse]=False'}
if(mouse2Box.checked === true){mouse2 = 'Input-SDL-Control2[mouse]=True'}else{mouse2 = 'Input-SDL-Control2[mouse]=False'}
if(mouse3Box.checked === true){mouse3 = 'Input-SDL-Control3[mouse]=True'}else{mouse3 = 'Input-SDL-Control3[mouse]=False'}
if(mouse4Box.checked === true){mouse4 = 'Input-SDL-Control4[mouse]=True'}else{mouse4 = 'Input-SDL-Control4[mouse]=False'}

resolution = resDropdown.options[resDropdown.selectedIndex].value;
ParallelScreenWidth = 'Video-Parallel[ScreenWidth]=' + resDropdown.options[resDropdown.selectedIndex].dataset.width;
ParallelScreenHeight = 'Video-Parallel[ScreenHeight]=' + resDropdown.options[resDropdown.selectedIndex].dataset.height;
gfx = gfxDropdown.options[gfxDropdown.selectedIndex].value;
audio = audioDropdown.options[audioDropdown.selectedIndex].value;
input = inputDropdown.options[inputDropdown.selectedIndex].value;
rsp = rspDropdown.options[rspDropdown.selectedIndex].value;
emumode = emumodeDropdown.options[emumodeDropdown.selectedIndex].value;
plugin1 = plugin1Dropdown.options[plugin1Dropdown.selectedIndex].value;
plugin2 = plugin2Dropdown.options[plugin2Dropdown.selectedIndex].value;
plugin3 = plugin3Dropdown.options[plugin3Dropdown.selectedIndex].value;
plugin4 = plugin4Dropdown.options[plugin4Dropdown.selectedIndex].value;
mode1 = mode1Dropdown.options[mode1Dropdown.selectedIndex].value;
mode2 = mode2Dropdown.options[mode2Dropdown.selectedIndex].value;
mode3 = mode3Dropdown.options[mode3Dropdown.selectedIndex].value;
mode4 = mode4Dropdown.options[mode4Dropdown.selectedIndex].value;
msaa = msaaDropdown.options[msaaDropdown.selectedIndex].value;
aspectRatio = aspectRatioDropdown.options[aspectRatioDropdown.selectedIndex].value;
bufferSwapMode = bufferSwapModeDropdown.options[bufferSwapModeDropdown.selectedIndex].value;
useNativeResolutionFactor = useNativeResolutionFactorDropdown.options[useNativeResolutionFactorDropdown.selectedIndex].value;
anisotropy = anisotropyDropdown.options[anisotropyDropdown.selectedIndex].value;
cache = cacheDropdown.options[cacheDropdown.selectedIndex].value;
RDRAMImageDitheringMode = RDRAMImageDitheringModeDropdown.options[RDRAMImageDitheringModeDropdown.selectedIndex].value;
CorrectTexrectCoords = CorrectTexrectCoordsDropdown.options[CorrectTexrectCoordsDropdown.selectedIndex].value;
EnableNativeResTexrects = EnableNativeResTexrectsDropdown.options[EnableNativeResTexrectsDropdown.selectedIndex].value;
BackgroundsMode = BackgroundsModeDropdown.options[BackgroundsModeDropdown.selectedIndex].value;
EnableN64DepthCompare = EnableN64DepthCompareDropdown.options[EnableN64DepthCompareDropdown.selectedIndex].value;
EnableCopyColorToRDRAM = EnableCopyColorToRDRAMDropdown.options[EnableCopyColorToRDRAMDropdown.selectedIndex].value;
EnableCopyDepthToRDRAM = EnableCopyDepthToRDRAMDropdown.options[EnableCopyDepthToRDRAMDropdown.selectedIndex].value;
txFilterMode = txFilterModeDropdown.options[txFilterModeDropdown.selectedIndex].value;
txEnhancementMode = txEnhancementModeDropdown.options[txEnhancementModeDropdown.selectedIndex].value;
ViMode = ViModeDropdown.options[ViModeDropdown.selectedIndex].value;
ViInterpolation = ViInterpolationDropdown.options[ViInterpolationDropdown.selectedIndex].value;
DpCompat = DpCompatDropdown.options[DpCompatDropdown.selectedIndex].value;
ParallelUpscaling = ParallelUpscalingDropdown.options[ParallelUpscalingDropdown.selectedIndex].value;
ParallelDeinterlace = ParallelDeinterlaceDropdown.options[ParallelDeinterlaceDropdown.selectedIndex].value;
ParallelDownScale = ParallelDownScaleDropdown.options[ParallelDownScaleDropdown.selectedIndex].value;
CountersPos = CountersPosDropdown.options[CountersPosDropdown.selectedIndex].value;
SaveDiskFormat = SaveDiskFormatDropdown.options[SaveDiskFormatDropdown.selectedIndex].value;
DEFAULT_FREQUENCY = DEFAULT_FREQUENCYDropdown.options[DEFAULT_FREQUENCYDropdown.selectedIndex].value;
PRIMARY_BUFFER_TARGET = SECONDARY_BUFFER_SIZEDropdown.options[SECONDARY_BUFFER_SIZEDropdown.selectedIndex].dataset.buffer;
SECONDARY_BUFFER_SIZE = SECONDARY_BUFFER_SIZEDropdown.options[SECONDARY_BUFFER_SIZEDropdown.selectedIndex].value;
RESAMPLE = RESAMPLEDropdown.options[RESAMPLEDropdown.selectedIndex].value;
FrameBufferWriteBackControl = FrameBufferWriteBackControlDropdown.options[FrameBufferWriteBackControlDropdown.selectedIndex].value;
RenderToTexture = RenderToTextureDropdown.options[RenderToTextureDropdown.selectedIndex].value;
ScreenUpdateSetting = ScreenUpdateSettingDropdown.options[ScreenUpdateSettingDropdown.selectedIndex].value;
Mipmapping = MipmappingDropdown.options[MipmappingDropdown.selectedIndex].value;
ForceTextureFilter = ForceTextureFilterDropdown.options[ForceTextureFilterDropdown.selectedIndex].value;
TextureEnhancement = TextureEnhancementDropdown.options[TextureEnhancementDropdown.selectedIndex].value;
TextureEnhancementControl = TextureEnhancementControlDropdown.options[TextureEnhancementControlDropdown.selectedIndex].value;
TextureQuality = TextureQualityDropdown.options[TextureQualityDropdown.selectedIndex].value;
OpenGLDepthBufferSetting = OpenGLDepthBufferSettingDropdown.options[OpenGLDepthBufferSettingDropdown.selectedIndex].value;
RiceMultiSampling = RiceMultiSamplingDropdown.options[RiceMultiSamplingDropdown.selectedIndex].value;
ColorQuality = ColorQualityDropdown.options[ColorQualityDropdown.selectedIndex].value;
AnisotropicFiltering = AnisotropicFilteringDropdown.options[AnisotropicFilteringDropdown.selectedIndex].value;
wrpAntiAliasing = wrpAntiAliasingDropdown.options[wrpAntiAliasingDropdown.selectedIndex].value;
show_fps = show_fpsDropdown.options[show_fpsDropdown.selectedIndex].value;
ghq_fltr = ghq_fltrDropdown.options[ghq_fltrDropdown.selectedIndex].value;
ghq_cmpr = ghq_cmprDropdown.options[ghq_cmprDropdown.selectedIndex].value;
ghq_enht = ghq_enhtDropdown.options[ghq_enhtDropdown.selectedIndex].value;
alt_tex_size = alt_tex_sizeDropdown.options[alt_tex_sizeDropdown.selectedIndex].value;
use_sts1_only = use_sts1_onlyDropdown.options[use_sts1_onlyDropdown.selectedIndex].value;
force_calc_sphere = force_calc_sphereDropdown.options[force_calc_sphereDropdown.selectedIndex].value;
correct_viewport = correct_viewportDropdown.options[correct_viewportDropdown.selectedIndex].value;
increase_texrect_edge = increase_texrect_edgeDropdown.options[increase_texrect_edgeDropdown.selectedIndex].value;
decrease_fillrect_edge = decrease_fillrect_edgeDropdown.options[decrease_fillrect_edgeDropdown.selectedIndex].value;
texture_correction = texture_correctionDropdown.options[texture_correctionDropdown.selectedIndex].value;
pal230 = pal230Dropdown.options[pal230Dropdown.selectedIndex].value;
force_microcheck = force_microcheckDropdown.options[force_microcheckDropdown.selectedIndex].value;
force_quad3d = force_quad3dDropdown.options[force_quad3dDropdown.selectedIndex].value;
clip_zmin = clip_zminDropdown.options[clip_zminDropdown.selectedIndex].value;
clip_zmax = clip_zmaxDropdown.options[clip_zmaxDropdown.selectedIndex].value;
fast_crc = fast_crcDropdown.options[fast_crcDropdown.selectedIndex].value;
adjust_aspect = adjust_aspectDropdown.options[adjust_aspectDropdown.selectedIndex].value;
zmode_compare_less = zmode_compare_lessDropdown.options[zmode_compare_lessDropdown.selectedIndex].value;
old_style_adither = old_style_aditherDropdown.options[old_style_aditherDropdown.selectedIndex].value;
n64_z_scale = n64_z_scaleDropdown.options[n64_z_scaleDropdown.selectedIndex].value;
optimize_texrect = optimize_texrectDropdown.options[optimize_texrectDropdown.selectedIndex].value;
ignore_aux_copy = ignore_aux_copyDropdown.options[ignore_aux_copyDropdown.selectedIndex].value;
hires_buf_clear = hires_buf_clearDropdown.options[hires_buf_clearDropdown.selectedIndex].value;
fb_read_alpha = fb_read_alphaDropdown.options[fb_read_alphaDropdown.selectedIndex].value;
useless_is_useless = useless_is_uselessDropdown.options[useless_is_uselessDropdown.selectedIndex].value;
fb_crc_mode = fb_crc_modeDropdown.options[fb_crc_modeDropdown.selectedIndex].value;
filtering = filteringDropdown.options[filteringDropdown.selectedIndex].value;
fog = fogDropdown.options[fogDropdown.selectedIndex].value;
buff_clear = buff_clearDropdown.options[buff_clearDropdown.selectedIndex].value;
swapmode = swapmodeDropdown.options[swapmodeDropdown.selectedIndex].value;
aspect = aspectDropdown.options[aspectDropdown.selectedIndex].value;
lodmode = lodmodeDropdown.options[lodmodeDropdown.selectedIndex].value;
fb_smart = fb_smartDropdown.options[fb_smartDropdown.selectedIndex].value;
fb_hires = fb_hiresDropdown.options[fb_hiresDropdown.selectedIndex].value;
fb_read_always = fb_read_alwaysDropdown.options[fb_read_alwaysDropdown.selectedIndex].value;
read_back_to_screen = read_back_to_screenDropdown.options[read_back_to_screenDropdown.selectedIndex].value;
detect_cpu_write = detect_cpu_writeDropdown.options[detect_cpu_writeDropdown.selectedIndex].value;
fb_get_info = fb_get_infoDropdown.options[fb_get_infoDropdown.selectedIndex].value;
fb_render = fb_renderDropdown.options[fb_renderDropdown.selectedIndex].value;

OverscanNtscTop = 'Video-GLideN64[OverscanNtscTop]=' + OverscanNtscTopInput.value;
OverscanNtscLeft = 'Video-GLideN64[OverscanNtscLeft]=' + OverscanNtscLeftInput.value;
OverscanNtscRight = 'Video-GLideN64[OverscanNtscRight]=' + OverscanNtscRightInput.value;
OverscanNtscBottom = 'Video-GLideN64[OverscanNtscBottom]=' + OverscanNtscBottomInput.value;
OverscanPalTop = 'Video-GLideN64[OverscanPalTop]=' + OverscanPalTopInput.value;
OverscanPalLeft = 'Video-GLideN64[OverscanPalLeft]=' + OverscanPalLeftInput.value;
OverscanPalRight = 'Video-GLideN64[OverscanPalRight]=' + OverscanPalRightInput.value;
OverscanPalBottom = 'Video-GLideN64[OverscanPalBottom]=' + OverscanPalBottomInput.value;
ParallelCropOverscan = 'Video-Parallel[CropOverscan]=' + ParallelCropOverscanInput.value;
txCacheSize = 'Video-GLideN64[txCacheSize]=' + txCacheSizeInput.value;
GammaCorrectionLevel = 'Video-GLideN64[GammaCorrectionLevel]=' + GammaCorrectionLevelInput.value;
fontSize = 'Video-GLideN64[fontSize]=' + fontSizeInput.value;
fontColor = 'Video-GLideN64[fontColor]=' + fontColorInput.value.substring(1);
NumWorkers = 'Video-Angrylion-Plus[NumWorkers]=' + NumWorkersInput.value;
CountPerOp = 'Core[CountPerOp]=' + CountPerOpInput.value;
CurrentStateSlot = 'Core[CurrentStateSlot]=' + CurrentStateSlotInput.value;
name1 = 'Input-SDL-Control1[name]=' + name1Input.value;
name2 = 'Input-SDL-Control2[name]=' + name2Input.value;
name3 = 'Input-SDL-Control3[name]=' + name3Input.value;
name4 = 'Input-SDL-Control4[name]=' + name4Input.value;
VOLUME_ADJUST = 'Audio-SDL[VOLUME_ADJUST]=' + VOLUME_ADJUSTInput.value;
VOLUME_DEFAULT = 'Audio-SDL[VOLUME_DEFAULT]=' + VOLUME_DEFAULTInput.value;
PolygonOffsetFactor = 'Video-Rice[PolygonOffsetFactor]=' + PolygonOffsetFactorInput.value;
PolygonOffsetUnits = 'Video-Rice[PolygonOffsetUnits]=' + PolygonOffsetUnitsInput.value;
polygon_offset_factor = 'Video-Glide64mk2[polygon_offset_factor]=' + polygon_offset_factorInput.value;
polygon_offset_units = 'Video-Glide64mk2[polygon_offset_units]=' + polygon_offset_unitsInput.value;
ghq_cache_size = 'Video-Glide64mk2[ghq_cache_size]=' + ghq_cache_sizeInput.value;

IPLROMSetting = '64DD[IPL-ROM]=' + IPLROM;
DiskSetting = '64DD[Disk]=' + Disk;
txPathSetting = 'Video-GLideN64[txPath]=' + txPath;
txCachePathSetting = 'Video-GLideN64[txCachePath]=' + txCachePath;
txDumpPathSetting = 'Video-GLideN64[txDumpPath]=' + txDumpPath;
ScreenshotPathSetting = 'Core[ScreenshotPath]=' + ScreenshotPath;
SaveStatePathSetting = 'Core[SaveStatePath]=' + SaveStatePath;
SaveSRAMPathSetting = 'Core[SaveSRAMPath]=' + SaveSRAMPath;
gbROM1Setting = 'Transferpak[GB-rom-1]=' + gbROM1;
gbROM2Setting = 'Transferpak[GB-rom-2]=' + gbROM2;
gbROM3Setting = 'Transferpak[GB-rom-3]=' + gbROM3;
gbROM4Setting = 'Transferpak[GB-rom-4]=' + gbROM4;
gbRAM1Setting = 'Transferpak[GB-ram-1]=' + gbRAM1;
gbRAM2Setting = 'Transferpak[GB-ram-2]=' + gbRAM2;
gbRAM3Setting = 'Transferpak[GB-ram-3]=' + gbRAM3;
gbRAM4Setting = 'Transferpak[GB-ram-4]=' + gbRAM4;

KbdMappingStop = 'CoreEvents[Kbd Mapping Stop]=' + KbdMappingStopBox.dataset.key;
KbdMappingSlot0 = 'CoreEvents[Kbd Mapping Slot 0]=' + KbdMappingSlot0Box.dataset.key;
KbdMappingSlot1 = 'CoreEvents[Kbd Mapping Slot 1]=' + KbdMappingSlot1Box.dataset.key;
KbdMappingSlot2 = 'CoreEvents[Kbd Mapping Slot 2]=' + KbdMappingSlot2Box.dataset.key;
KbdMappingSlot3 = 'CoreEvents[Kbd Mapping Slot 3]=' + KbdMappingSlot3Box.dataset.key;
KbdMappingSlot4 = 'CoreEvents[Kbd Mapping Slot 4]=' + KbdMappingSlot4Box.dataset.key;
KbdMappingSlot5 = 'CoreEvents[Kbd Mapping Slot 5]=' + KbdMappingSlot5Box.dataset.key;
KbdMappingSlot6 = 'CoreEvents[Kbd Mapping Slot 6]=' + KbdMappingSlot6Box.dataset.key;
KbdMappingSlot7 = 'CoreEvents[Kbd Mapping Slot 7]=' + KbdMappingSlot7Box.dataset.key;
KbdMappingSlot8 = 'CoreEvents[Kbd Mapping Slot 8]=' + KbdMappingSlot8Box.dataset.key;
KbdMappingSlot9 = 'CoreEvents[Kbd Mapping Slot 9]=' + KbdMappingSlot9Box.dataset.key;
KbdMappingFullscreen = 'CoreEvents[Kbd Mapping Fullscreen]=' + KbdMappingFullscreenBox.dataset.key;
KbdMappingSaveState = 'CoreEvents[Kbd Mapping Save State]=' + KbdMappingSaveStateBox.dataset.key;
KbdMappingLoadState = 'CoreEvents[Kbd Mapping Load State]=' + KbdMappingLoadStateBox.dataset.key;
KbdMappingIncrementSlot = 'CoreEvents[Kbd Mapping Increment Slot]=' + KbdMappingIncrementSlotBox.dataset.key;
KbdMappingReset = 'CoreEvents[Kbd Mapping Reset]=' + KbdMappingResetBox.dataset.key;
KbdMappingSpeedDown = 'CoreEvents[Kbd Mapping Speed Down]=' + KbdMappingSpeedDownBox.dataset.key;
KbdMappingSpeedUp = 'CoreEvents[Kbd Mapping Speed Up]=' + KbdMappingSpeedUpBox.dataset.key;
KbdMappingScreenshot = 'CoreEvents[Kbd Mapping Screenshot]=' + KbdMappingScreenshotBox.dataset.key;
KbdMappingPause = 'CoreEvents[Kbd Mapping Pause]=' + KbdMappingPauseBox.dataset.key;
KbdMappingMute = 'CoreEvents[Kbd Mapping Mute]=' + KbdMappingMuteBox.dataset.key;
KbdMappingIncreaseVolume = 'CoreEvents[Kbd Mapping Increase Volume]=' + KbdMappingIncreaseVolumeBox.dataset.key;
KbdMappingDecreaseVolume = 'CoreEvents[Kbd Mapping Decrease Volume]=' + KbdMappingDecreaseVolumeBox.dataset.key;
KbdMappingFastForward = 'CoreEvents[Kbd Mapping Fast Forward]=' + KbdMappingFastForwardBox.dataset.key;
KbdMappingFrameAdvance = 'CoreEvents[Kbd Mapping Frame Advance]=' + KbdMappingFrameAdvanceBox.dataset.key;
KbdMappingGameshark = 'CoreEvents[Kbd Mapping Gameshark]=' + KbdMappingGamesharkBox.dataset.key;

JoyMappingStop = 'CoreEvents[Joy Mapping Stop]=' + 'J0' + JoyMappingStop1Box.value + ',' + 'J1' + JoyMappingStop2Box.value + ',' + 'J2' + JoyMappingStop3Box.value + ',' + 'J3' + JoyMappingStop4Box.value;
JoyMappingFullscreen = 'CoreEvents[Joy Mapping Fullscreen]=' + 'J0' + JoyMappingFullscreen1Box.value + ',' + 'J1' + JoyMappingFullscreen2Box.value + ',' + 'J2' + JoyMappingFullscreen3Box.value + ',' + 'J3' + JoyMappingFullscreen4Box.value;
JoyMappingSaveState = 'CoreEvents[Joy Mapping Save State]=' + 'J0' + JoyMappingSaveState1Box.value + ',' + 'J1' + JoyMappingSaveState2Box.value + ',' + 'J2' + JoyMappingSaveState3Box.value + ',' + 'J3' + JoyMappingSaveState4Box.value;
JoyMappingLoadState = 'CoreEvents[Joy Mapping Load State]=' + 'J0' + JoyMappingLoadState1Box.value + ',' + 'J1' + JoyMappingLoadState2Box.value + ',' + 'J2' + JoyMappingLoadState3Box.value + ',' + 'J3' + JoyMappingLoadState4Box.value;
JoyMappingIncrementSlot = 'CoreEvents[Joy Mapping Increment Slot]=' + 'J0' + JoyMappingIncrementSlot1Box.value + ',' + 'J1' + JoyMappingIncrementSlot2Box.value + ',' + 'J2' + JoyMappingIncrementSlot3Box.value + ',' + 'J3' + JoyMappingIncrementSlot4Box.value;
JoyMappingReset = 'CoreEvents[Joy Mapping Reset]=' + 'J0' + JoyMappingReset1Box.value + ',' + 'J1' + JoyMappingReset2Box.value + ',' + 'J2' + JoyMappingReset3Box.value + ',' + 'J3' + JoyMappingReset4Box.value;
JoyMappingSpeedDown = 'CoreEvents[Joy Mapping Speed Down]=' + 'J0' + JoyMappingSpeedDown1Box.value + ',' + 'J1' + JoyMappingSpeedDown2Box.value + ',' + 'J2' + JoyMappingSpeedDown3Box.value + ',' + 'J3' + JoyMappingSpeedDown4Box.value;
JoyMappingSpeedUp = 'CoreEvents[Joy Mapping Speed Up]=' + 'J0' + JoyMappingSpeedUp1Box.value + ',' + 'J1' + JoyMappingSpeedUp2Box.value + ',' + 'J2' + JoyMappingSpeedUp3Box.value + ',' + 'J3' + JoyMappingSpeedUp4Box.value;
JoyMappingScreenshot = 'CoreEvents[Joy Mapping Screenshot]=' + 'J0' + JoyMappingScreenshot1Box.value + ',' + 'J1' + JoyMappingScreenshot2Box.value + ',' + 'J2' + JoyMappingScreenshot3Box.value + ',' + 'J3' + JoyMappingScreenshot4Box.value;
JoyMappingPause = 'CoreEvents[Joy Mapping Pause]=' + 'J0' + JoyMappingPause1Box.value + ',' + 'J1' + JoyMappingPause2Box.value + ',' + 'J2' + JoyMappingPause3Box.value + ',' + 'J3' + JoyMappingPause4Box.value;
JoyMappingMute = 'CoreEvents[Joy Mapping Mute]=' + 'J0' + JoyMappingMute1Box.value + ',' + 'J1' + JoyMappingMute2Box.value + ',' + 'J2' + JoyMappingMute3Box.value + ',' + 'J3' + JoyMappingMute4Box.value;
JoyMappingIncreaseVolume = 'CoreEvents[Joy Mapping Increase Volume]=' + 'J0' + JoyMappingIncreaseVolume1Box.value + ',' + 'J1' + JoyMappingIncreaseVolume2Box.value + ',' + 'J2' + JoyMappingIncreaseVolume3Box.value + ',' + 'J3' + JoyMappingIncreaseVolume4Box.value;
JoyMappingDecreaseVolume = 'CoreEvents[Joy Mapping Decrease Volume]=' + 'J0' + JoyMappingDecreaseVolume1Box.value + ',' + 'J1' + JoyMappingDecreaseVolume2Box.value + ',' + 'J2' + JoyMappingDecreaseVolume3Box.value + ',' + 'J3' + JoyMappingDecreaseVolume4Box.value;
JoyMappingFastForward = 'CoreEvents[Joy Mapping Fast Forward]=' + 'J0' + JoyMappingFastForward1Box.value + ',' + 'J1' + JoyMappingFastForward2Box.value + ',' + 'J2' + JoyMappingFastForward3Box.value + ',' + 'J3' + JoyMappingFastForward4Box.value;
JoyMappingFrameAdvance = 'CoreEvents[Joy Mapping Frame Advance]=' + 'J0' + JoyMappingFrameAdvance1Box.value + ',' + 'J1' + JoyMappingFrameAdvance2Box.value + ',' + 'J2' + JoyMappingFrameAdvance3Box.value + ',' + 'J3' + JoyMappingFrameAdvance4Box.value;
JoyMappingGameshark = 'CoreEvents[Joy Mapping Gameshark]=' + 'J0' + JoyMappingGameshark1Box.value + ',' + 'J1' + JoyMappingGameshark2Box.value + ',' + 'J2' + JoyMappingGameshark3Box.value + ',' + 'J3' + JoyMappingGameshark4Box.value;

hkTexDump = 'Video-GLideN64[hkTexDump]=' + hkTexDumpBox.value;
hkHdTexReload = 'Video-GLideN64[hkHdTexReload]=' + hkHdTexReloadBox.value;
hkHdTexToggle = 'Video-GLideN64[hkHdTexToggle]=' + hkHdTexToggleBox.value;
hkVsync = 'Video-GLideN64[hkVsync]=' + hkVsyncBox.value;
hkFBEmulation = 'Video-GLideN64[hkFBEmulation]=' + hkFBEmulationBox.value;
hkN64DepthCompare = 'Video-GLideN64[hkN64DepthCompare]=' + hkN64DepthCompareBox.value;
hkOsdVis = 'Video-GLideN64[hkOsdVis]=' + hkOsdVisBox.value;
hkOsdFps = 'Video-GLideN64[hkOsdFps]=' + hkOsdFpsBox.value;
hkOsdPercent = 'Video-GLideN64[hkOsdPercent]=' + hkOsdPercentBox.value;
hkOsdInternalResolution = 'Video-GLideN64[hkOsdInternalResolution]=' + hkOsdInternalResolutionBox.value;
hkOsdRenderingResolution = 'Video-GLideN64[hkOsdRenderingResolution]=' + hkOsdRenderingResolutionBox.value;
hkTexCoordBounds = 'Video-GLideN64[hkTexCoordBounds]=' + hkTexCoordBoundsBox.value;
hkNativeResTexrects = 'Video-GLideN64[hkNativeResTexrects]=' + hkNativeResTexrectsBox.value;
hkForceGammaCorrection = 'Video-GLideN64[hkForceGammaCorrection]=' + hkForceGammaCorrectionBox.value;



if(name1Input.value === 'Keyboard'){
device1 = 'Input-SDL-Control1[device]=-1';
AButton1 = 'Input-SDL-Control1[A Button]=' + 'key(' + AButton1Box.dataset.key + ')';
BButton1 = 'Input-SDL-Control1[B Button]=' + 'key(' + BButton1Box.dataset.key + ')';
LTrig1 = 'Input-SDL-Control1[L Trig]=' + 'key(' + LTrig1Box.dataset.key + ')';
RTrig1 = 'Input-SDL-Control1[R Trig]=' + 'key(' + RTrig1Box.dataset.key + ')';
ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + 'key(' + ZTrig1Box.dataset.key + ')';
Start1 = 'Input-SDL-Control1[Start]=' + 'key(' + Start1Box.dataset.key + ')';
DPadU1 = 'Input-SDL-Control1[DPad U]=' + 'key(' + DPadU1Box.dataset.key + ')';
DPadL1 = 'Input-SDL-Control1[DPad L]=' + 'key(' + DPadL1Box.dataset.key + ')';
DPadR1 = 'Input-SDL-Control1[DPad R]=' + 'key(' + DPadR1Box.dataset.key + ')';
DPadD1 = 'Input-SDL-Control1[DPad D]=' + 'key(' + DPadD1Box.dataset.key + ')';
CButtonU1 = 'Input-SDL-Control1[C Button U]=' + 'key(' + CButtonU1Box.dataset.key + ')';
CButtonL1 = 'Input-SDL-Control1[C Button L]=' + 'key(' + CButtonL1Box.dataset.key + ')';
CButtonR1 = 'Input-SDL-Control1[C Button R]=' + 'key(' + CButtonR1Box.dataset.key + ')';
CButtonD1 = 'Input-SDL-Control1[C Button D]=' + 'key(' + CButtonD1Box.dataset.key + ')';
MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + 'key(' + MempakSwitch1Box.dataset.key + ')';
RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + 'key(' + RumblepakSwitch1Box.dataset.key + ')';
XAxis1 = 'Input-SDL-Control1[X Axis]=' + 'key(' + StickL1Box.dataset.key + ',' + StickR1Box.dataset.key + ')';
YAxis1 = 'Input-SDL-Control1[Y Axis]=' + 'key(' + StickU1Box.dataset.key + ',' + StickD1Box.dataset.key + ')';
if(mouse1Box.checked === true && mouse1_1.options[mouse1_1.selectedIndex].value != ''){
if(mouse1_1.options[mouse1_1.selectedIndex].value === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=mouse(1)'}
if(mouse1_1.options[mouse1_1.selectedIndex].value === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=mouse(1)'}
if(mouse1_1.options[mouse1_1.selectedIndex].value === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=mouse(1)'}
if(mouse1_1.options[mouse1_1.selectedIndex].value === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=mouse(1)'}
if(mouse1_1.options[mouse1_1.selectedIndex].value === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=mouse(1)'}}
if(mouse1Box.checked === true && mouse1_2.options[mouse1_2.selectedIndex].value != ''){
if(mouse1_2.options[mouse1_2.selectedIndex].value === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=mouse(2)'}
if(mouse1_2.options[mouse1_2.selectedIndex].value === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=mouse(2)'}
if(mouse1_2.options[mouse1_2.selectedIndex].value === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=mouse(2)'}
if(mouse1_2.options[mouse1_2.selectedIndex].value === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=mouse(2)'}
if(mouse1_2.options[mouse1_2.selectedIndex].value === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=mouse(2)'}}
if(mouse1Box.checked === true && mouse1_3.options[mouse1_3.selectedIndex].value != ''){
if(mouse1_3.options[mouse1_3.selectedIndex].value === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=mouse(3)'}
if(mouse1_3.options[mouse1_3.selectedIndex].value === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=mouse(3)'}
if(mouse1_3.options[mouse1_3.selectedIndex].value === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=mouse(3)'}
if(mouse1_3.options[mouse1_3.selectedIndex].value === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=mouse(3)'}
if(mouse1_3.options[mouse1_3.selectedIndex].value === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=mouse(3)'}}
}else{
device1 = 'Input-SDL-Control1[device]=0';
var StickU1value,StickL1value,StickR1value,StickD1value,StickU1bvalue,StickL1bvalue,StickR1bvalue,StickD1bvalue,
buttonType = '',
buttonTypeB = '';
if(StickU1cBox.value.includes('axis') || StickL1cBox.value.includes('axis') || StickR1cBox.value.includes('axis') || StickD1cBox.value.includes('axis')){buttonType = 'axis'}
if(StickU1cbBox.value.includes('axis') || StickL1cbBox.value.includes('axis') || StickR1cbBox.value.includes('axis') || StickD1cbBox.value.includes('axis')){buttonTypeB = 'axis'}
if(StickU1cBox.value.includes('button') || StickL1cBox.value.includes('button') || StickR1cBox.value.includes('button') || StickD1cBox.value.includes('button')){buttonType = 'button'}
if(StickU1cbBox.value.includes('button') || StickL1cbBox.value.includes('button') || StickR1cbBox.value.includes('button') || StickD1cbBox.value.includes('button')){buttonTypeB = 'button'}
if(StickU1cBox.value.includes('hat') || StickL1cBox.value.includes('hat') || StickR1cBox.value.includes('hat') || StickD1cBox.value.includes('hat')){buttonType = 'hat'}
if(StickU1cbBox.value.includes('hat') || StickL1cbBox.value.includes('hat') || StickR1cbBox.value.includes('hat') || StickD1cbBox.value.includes('hat')){buttonTypeB = 'hat'}
StickU1value = StickU1cBox.value.replace(regjoy,'');
StickL1value = StickL1cBox.value.replace(regjoy,'');
StickR1value = StickR1cBox.value.replace(regjoy,'');
StickD1value = StickD1cBox.value.replace(regjoy,'');
StickU1bvalue = StickU1cbBox.value.replace(regjoy,'');
StickL1bvalue = StickL1cbBox.value.replace(regjoy,'');
StickR1bvalue = StickR1cbBox.value.replace(regjoy,'');
StickD1bvalue = StickD1cbBox.value.replace(regjoy,'');
AButton1 = 'Input-SDL-Control1[A Button]=' + AButton1c.value + ' ' + AButton1cb.value;
BButton1 = 'Input-SDL-Control1[B Button]=' + BButton1c.value + ' ' + BButton1cb.value;
LTrig1 = 'Input-SDL-Control1[L Trig]=' + LTrig1c.value + ' ' + LTrig1cb.value;
RTrig1 = 'Input-SDL-Control1[R Trig]=' + RTrig1c.value + ' ' + RTrig1cb.value;
ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + ZTrig1c.value + ' ' + ZTrig1cb.value;
Start1 = 'Input-SDL-Control1[Start]=' + Start1c.value + ' ' + Start1cb.value;
DPadU1 = 'Input-SDL-Control1[DPad U]=' + DPadU1c.value + ' ' +  DPadU1cb.value;
DPadL1 = 'Input-SDL-Control1[DPad L]=' + DPadL1c.value + ' ' +  DPadL1cb.value;
DPadR1 = 'Input-SDL-Control1[DPad R]=' + DPadR1c.value + ' ' +  DPadR1cb.value;
DPadD1 = 'Input-SDL-Control1[DPad D]=' + DPadD1c.value + ' ' +  DPadD1cb.value;
CButtonU1 = 'Input-SDL-Control1[C Button U]=' + CButtonU1c.value + ' ' +  CButtonU1cb.value;
CButtonL1 = 'Input-SDL-Control1[C Button L]=' + CButtonL1c.value + ' ' +  CButtonL1cb.value;
CButtonR1 = 'Input-SDL-Control1[C Button R]=' + CButtonR1c.value + ' ' +  CButtonR1cb.value;
CButtonD1 = 'Input-SDL-Control1[C Button D]=' + CButtonD1c.value + ' ' +  CButtonD1cb.value;
MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + MempakSwitch1c.value + ' ' +  MempakSwitch1cb.value;
RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + RumblepakSwitch1c.value + ' ' +  RumblepakSwitch1cb.value;
XAxis1 = 'Input-SDL-Control1[X Axis]=' + buttonType + '(' + StickL1value + ',' + StickR1value + ')' + ' ' + buttonTypeB + '(' + StickL1bvalue + ',' + StickR1bvalue + ')';
YAxis1 = 'Input-SDL-Control1[Y Axis]=' + buttonType + '(' + StickU1value + ',' + StickD1value + ')' + ' ' + buttonTypeB + '(' + StickU1bvalue + ',' + StickD1bvalue + ')'}

if(name2Input.value === 'Keyboard'){
device2 = 'Input-SDL-Control2[device]=-1';
AButton2 = 'Input-SDL-Control2[A Button]=' + 'key(' + AButton2Box.dataset.key + ')';
BButton2 = 'Input-SDL-Control2[B Button]=' + 'key(' + BButton2Box.dataset.key + ')';
LTrig2 = 'Input-SDL-Control2[L Trig]=' + 'key(' + LTrig2Box.dataset.key + ')';
RTrig2 = 'Input-SDL-Control2[R Trig]=' + 'key(' + RTrig2Box.dataset.key + ')';
ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + 'key(' + ZTrig2Box.dataset.key + ')';
Start2 = 'Input-SDL-Control2[Start]=' + 'key(' + Start2Box.dataset.key + ')';
DPadU2 = 'Input-SDL-Control2[DPad U]=' + 'key(' + DPadU2Box.dataset.key + ')';
DPadL2 = 'Input-SDL-Control2[DPad L]=' + 'key(' + DPadL2Box.dataset.key + ')';
DPadR2 = 'Input-SDL-Control2[DPad R]=' + 'key(' + DPadR2Box.dataset.key + ')';
DPadD2 = 'Input-SDL-Control2[DPad D]=' + 'key(' + DPadD2Box.dataset.key + ')';
CButtonU2 = 'Input-SDL-Control2[C Button U]=' + 'key(' + CButtonU2Box.dataset.key + ')';
CButtonL2 = 'Input-SDL-Control2[C Button L]=' + 'key(' + CButtonL2Box.dataset.key + ')';
CButtonR2 = 'Input-SDL-Control2[C Button R]=' + 'key(' + CButtonR2Box.dataset.key + ')';
CButtonD2 = 'Input-SDL-Control2[C Button D]=' + 'key(' + CButtonD2Box.dataset.key + ')';
MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + 'key(' + MempakSwitch2Box.dataset.key + ')';
RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + 'key(' + RumblepakSwitch2Box.dataset.key + ')';
XAxis2 = 'Input-SDL-Control2[X Axis]=' + 'key(' + StickL2Box.dataset.key + ',' + StickR2Box.dataset.key + ')';
YAxis2 = 'Input-SDL-Control2[Y Axis]=' + 'key(' + StickU2Box.dataset.key + ',' + StickD2Box.dataset.key + ')'
if(mouse2Box.checked === true && mouse2_1.options[mouse2_1.selectedIndex].value != ''){
if(mouse2_1.options[mouse2_1.selectedIndex].value === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=mouse(1)'}
if(mouse2_1.options[mouse2_1.selectedIndex].value === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=mouse(1)'}
if(mouse2_1.options[mouse2_1.selectedIndex].value === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=mouse(1)'}
if(mouse2_1.options[mouse2_1.selectedIndex].value === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=mouse(1)'}
if(mouse2_1.options[mouse2_1.selectedIndex].value === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=mouse(1)'}}
if(mouse2Box.checked === true && mouse2_2.options[mouse2_2.selectedIndex].value != ''){
if(mouse2_2.options[mouse2_2.selectedIndex].value === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=mouse(2)'}
if(mouse2_2.options[mouse2_2.selectedIndex].value === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=mouse(2)'}
if(mouse2_2.options[mouse2_2.selectedIndex].value === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=mouse(2)'}
if(mouse2_2.options[mouse2_2.selectedIndex].value === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=mouse(2)'}
if(mouse2_2.options[mouse2_2.selectedIndex].value === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=mouse(2)'}}
if(mouse2Box.checked === true && mouse2_3.options[mouse2_3.selectedIndex].value != ''){
if(mouse2_3.options[mouse2_3.selectedIndex].value === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=mouse(3)'}
if(mouse2_3.options[mouse2_3.selectedIndex].value === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=mouse(3)'}
if(mouse2_3.options[mouse2_3.selectedIndex].value === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=mouse(3)'}
if(mouse2_3.options[mouse2_3.selectedIndex].value === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=mouse(3)'}
if(mouse2_3.options[mouse2_3.selectedIndex].value === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=mouse(3)'}}
}else{
device2 = 'Input-SDL-Control2[device]=1';
var StickU2value,StickL2value,StickR2value,StickD2value,StickU2bvalue,StickL2bvalue,StickR2bvalue,StickD2bvalue,
buttonType = '',
buttonTypeB = '';
if(StickU2cBox.value.includes('axis') || StickL2cBox.value.includes('axis') || StickR2cBox.value.includes('axis') || StickD2cBox.value.includes('axis')){buttonType = 'axis'}
if(StickU2cbBox.value.includes('axis') || StickL2cbBox.value.includes('axis') || StickR2cbBox.value.includes('axis') || StickD2cbBox.value.includes('axis')){buttonTypeB = 'axis'}
if(StickU2cBox.value.includes('button') || StickL2cBox.value.includes('button') || StickR2cBox.value.includes('button') || StickD2cBox.value.includes('button')){buttonType = 'button'}
if(StickU2cbBox.value.includes('button') || StickL2cbBox.value.includes('button') || StickR2cbBox.value.includes('button') || StickD2cbBox.value.includes('button')){buttonTypeB = 'button'}
if(StickU2cBox.value.includes('hat') || StickL2cBox.value.includes('hat') || StickR2cBox.value.includes('hat') || StickD2cBox.value.includes('hat')){buttonType = 'hat'}
if(StickU2cbBox.value.includes('hat') || StickL2cbBox.value.includes('hat') || StickR2cbBox.value.includes('hat') || StickD2cbBox.value.includes('hat')){buttonTypeB = 'hat'}
StickU2value = StickU2cBox.value.replace(regjoy,'');
StickL2value = StickL2cBox.value.replace(regjoy,'');
StickR2value = StickR2cBox.value.replace(regjoy,'');
StickD2value = StickD2cBox.value.replace(regjoy,'');
StickU2bvalue = StickU2cbBox.value.replace(regjoy,'');
StickL2bvalue = StickL2cbBox.value.replace(regjoy,'');
StickR2bvalue = StickR2cbBox.value.replace(regjoy,'');
StickD2bvalue = StickD2cbBox.value.replace(regjoy,'');
AButton2 = 'Input-SDL-Control2[A Button]=' + AButton2c.value + ' ' + AButton2cb.value;
BButton2 = 'Input-SDL-Control2[B Button]=' + BButton2c.value + ' ' + BButton2cb.value;
LTrig2 = 'Input-SDL-Control2[L Trig]=' + LTrig2c.value + ' ' + LTrig2cb.value;
RTrig2 = 'Input-SDL-Control2[R Trig]=' + RTrig2c.value + ' ' + RTrig2cb.value;
ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + ZTrig2c.value + ' ' + ZTrig2cb.value;
Start2 = 'Input-SDL-Control2[Start]=' + Start2c.value + ' ' + Start2cb.value;
DPadU2 = 'Input-SDL-Control2[DPad U]=' + DPadU2c.value + ' ' +  DPadU2cb.value;
DPadL2 = 'Input-SDL-Control2[DPad L]=' + DPadL2c.value + ' ' +  DPadL2cb.value;
DPadR2 = 'Input-SDL-Control2[DPad R]=' + DPadR2c.value + ' ' +  DPadR2cb.value;
DPadD2 = 'Input-SDL-Control2[DPad D]=' + DPadD2c.value + ' ' +  DPadD2cb.value;
CButtonU2 = 'Input-SDL-Control2[C Button U]=' + CButtonU2c.value + ' ' +  CButtonU2cb.value;
CButtonL2 = 'Input-SDL-Control2[C Button L]=' + CButtonL2c.value + ' ' +  CButtonL2cb.value;
CButtonR2 = 'Input-SDL-Control2[C Button R]=' + CButtonR2c.value + ' ' +  CButtonR2cb.value;
CButtonD2 = 'Input-SDL-Control2[C Button D]=' + CButtonD2c.value + ' ' +  CButtonD2cb.value;
MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + MempakSwitch2c.value + ' ' +  MempakSwitch2cb.value;
RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + RumblepakSwitch2c.value + ' ' +  RumblepakSwitch2cb.value;
XAxis2 = 'Input-SDL-Control2[X Axis]=' + buttonType + '(' + StickL2value + ',' + StickR2value + ')' + ' ' + buttonTypeB + '(' + StickL2bvalue + ',' + StickR2bvalue + ')';
YAxis2 = 'Input-SDL-Control2[Y Axis]=' + buttonType + '(' + StickU2value + ',' + StickD2value + ')' + ' ' + buttonTypeB + '(' + StickU2bvalue + ',' + StickD2bvalue + ')'}

if(name3Input.value === 'Keyboard'){
device3 = 'Input-SDL-Control3[device]=-1';
AButton3 = 'Input-SDL-Control3[A Button]=' + 'key(' + AButton3Box.dataset.key + ')';
BButton3 = 'Input-SDL-Control3[B Button]=' + 'key(' + BButton3Box.dataset.key + ')';
LTrig3 = 'Input-SDL-Control3[L Trig]=' + 'key(' + LTrig3Box.dataset.key + ')';
RTrig3 = 'Input-SDL-Control3[R Trig]=' + 'key(' + RTrig3Box.dataset.key + ')';
ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + 'key(' + ZTrig3Box.dataset.key + ')';
Start3 = 'Input-SDL-Control3[Start]=' + 'key(' + Start3Box.dataset.key + ')';
DPadU3 = 'Input-SDL-Control3[DPad U]=' + 'key(' + DPadU3Box.dataset.key + ')';
DPadL3 = 'Input-SDL-Control3[DPad L]=' + 'key(' + DPadL3Box.dataset.key + ')';
DPadR3 = 'Input-SDL-Control3[DPad R]=' + 'key(' + DPadR3Box.dataset.key + ')';
DPadD3 = 'Input-SDL-Control3[DPad D]=' + 'key(' + DPadD3Box.dataset.key + ')';
CButtonU3 = 'Input-SDL-Control3[C Button U]=' + 'key(' + CButtonU3Box.dataset.key + ')';
CButtonL3 = 'Input-SDL-Control3[C Button L]=' + 'key(' + CButtonL3Box.dataset.key + ')';
CButtonR3 = 'Input-SDL-Control3[C Button R]=' + 'key(' + CButtonR3Box.dataset.key + ')';
CButtonD3 = 'Input-SDL-Control3[C Button D]=' + 'key(' + CButtonD3Box.dataset.key + ')';
MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + 'key(' + MempakSwitch3Box.dataset.key + ')';
RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + 'key(' + RumblepakSwitch3Box.dataset.key + ')';
XAxis3 = 'Input-SDL-Control3[X Axis]=' + 'key(' + StickL3Box.dataset.key + ',' + StickR3Box.dataset.key + ')';
YAxis3 = 'Input-SDL-Control3[Y Axis]=' + 'key(' + StickU3Box.dataset.key + ',' + StickD3Box.dataset.key + ')'
if(mouse3Box.checked === true && mouse3_1.options[mouse3_1.selectedIndex].value != ''){
if(mouse3_1.options[mouse3_1.selectedIndex].value === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=mouse(1)'}
if(mouse3_1.options[mouse3_1.selectedIndex].value === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=mouse(1)'}
if(mouse3_1.options[mouse3_1.selectedIndex].value === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=mouse(1)'}
if(mouse3_1.options[mouse3_1.selectedIndex].value === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=mouse(1)'}
if(mouse3_1.options[mouse3_1.selectedIndex].value === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=mouse(1)'}}
if(mouse3Box.checked === true && mouse3_2.options[mouse3_2.selectedIndex].value != ''){
if(mouse3_2.options[mouse3_2.selectedIndex].value === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=mouse(2)'}
if(mouse3_2.options[mouse3_2.selectedIndex].value === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=mouse(2)'}
if(mouse3_2.options[mouse3_2.selectedIndex].value === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=mouse(2)'}
if(mouse3_2.options[mouse3_2.selectedIndex].value === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=mouse(2)'}
if(mouse3_2.options[mouse3_2.selectedIndex].value === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=mouse(2)'}}
if(mouse3Box.checked === true && mouse3_3.options[mouse3_3.selectedIndex].value != ''){
if(mouse3_3.options[mouse3_3.selectedIndex].value === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=mouse(3)'}
if(mouse3_3.options[mouse3_3.selectedIndex].value === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=mouse(3)'}
if(mouse3_3.options[mouse3_3.selectedIndex].value === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=mouse(3)'}
if(mouse3_3.options[mouse3_3.selectedIndex].value === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=mouse(3)'}
if(mouse3_3.options[mouse3_3.selectedIndex].value === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=mouse(3)'}}
}else{
device3 = 'Input-SDL-Control3[device]=2';
var StickU3value,StickL3value,StickR3value,StickD3value,StickU3bvalue,StickL3bvalue,StickR3bvalue,StickD3bvalue,
buttonType = '',
buttonTypeB = '';
if(StickU3cBox.value.includes('axis') || StickL3cBox.value.includes('axis') || StickR3cBox.value.includes('axis') || StickD3cBox.value.includes('axis')){buttonType = 'axis'}
if(StickU3cbBox.value.includes('axis') || StickL3cbBox.value.includes('axis') || StickR3cbBox.value.includes('axis') || StickD3cbBox.value.includes('axis')){buttonTypeB = 'axis'}
if(StickU3cBox.value.includes('button') || StickL3cBox.value.includes('button') || StickR3cBox.value.includes('button') || StickD3cBox.value.includes('button')){buttonType = 'button'}
if(StickU3cbBox.value.includes('button') || StickL3cbBox.value.includes('button') || StickR3cbBox.value.includes('button') || StickD3cbBox.value.includes('button')){buttonTypeB = 'button'}
if(StickU3cBox.value.includes('hat') || StickL3cBox.value.includes('hat') || StickR3cBox.value.includes('hat') || StickD3cBox.value.includes('hat')){buttonType = 'hat'}
if(StickU3cbBox.value.includes('hat') || StickL3cbBox.value.includes('hat') || StickR3cbBox.value.includes('hat') || StickD3cbBox.value.includes('hat')){buttonTypeB = 'hat'}
StickU3value = StickU3cBox.value.replace(regjoy,'');
StickL3value = StickL3cBox.value.replace(regjoy,'');
StickR3value = StickR3cBox.value.replace(regjoy,'');
StickD3value = StickD3cBox.value.replace(regjoy,'');
StickU3bvalue = StickU3cbBox.value.replace(regjoy,'');
StickL3bvalue = StickL3cbBox.value.replace(regjoy,'');
StickR3bvalue = StickR3cbBox.value.replace(regjoy,'');
StickD3bvalue = StickD3cbBox.value.replace(regjoy,'');
AButton3 = 'Input-SDL-Control3[A Button]=' + AButton3c.value + ' ' + AButton3cb.value;
BButton3 = 'Input-SDL-Control3[B Button]=' + BButton3c.value + ' ' + BButton3cb.value;
LTrig3 = 'Input-SDL-Control3[L Trig]=' + LTrig3c.value + ' ' + LTrig3cb.value;
RTrig3 = 'Input-SDL-Control3[R Trig]=' + RTrig3c.value + ' ' + RTrig3cb.value;
ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + ZTrig3c.value + ' ' + ZTrig3cb.value;
Start3 = 'Input-SDL-Control3[Start]=' + Start3c.value + ' ' + Start3cb.value;
DPadU3 = 'Input-SDL-Control3[DPad U]=' + DPadU3c.value + ' ' +  DPadU3cb.value;
DPadL3 = 'Input-SDL-Control3[DPad L]=' + DPadL3c.value + ' ' +  DPadL3cb.value;
DPadR3 = 'Input-SDL-Control3[DPad R]=' + DPadR3c.value + ' ' +  DPadR3cb.value;
DPadD3 = 'Input-SDL-Control3[DPad D]=' + DPadD3c.value + ' ' +  DPadD3cb.value;
CButtonU3 = 'Input-SDL-Control3[C Button U]=' + CButtonU3c.value + ' ' +  CButtonU3cb.value;
CButtonL3 = 'Input-SDL-Control3[C Button L]=' + CButtonL3c.value + ' ' +  CButtonL3cb.value;
CButtonR3 = 'Input-SDL-Control3[C Button R]=' + CButtonR3c.value + ' ' +  CButtonR3cb.value;
CButtonD3 = 'Input-SDL-Control3[C Button D]=' + CButtonD3c.value + ' ' +  CButtonD3cb.value;
MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + MempakSwitch3c.value + ' ' +  MempakSwitch3cb.value;
RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + RumblepakSwitch3c.value + ' ' +  RumblepakSwitch3cb.value;
XAxis3 = 'Input-SDL-Control3[X Axis]=' + buttonType + '(' + StickL3value + ',' + StickR3value + ')' + ' ' + buttonTypeB + '(' + StickL3bvalue + ',' + StickR3bvalue + ')';
YAxis3 = 'Input-SDL-Control3[Y Axis]=' + buttonType + '(' + StickU3value + ',' + StickD3value + ')' + ' ' + buttonTypeB + '(' + StickU3bvalue + ',' + StickD3bvalue + ')'}

if(name4Input.value === 'Keyboard'){
device4 = 'Input-SDL-Control4[device]=-1';
AButton4 = 'Input-SDL-Control4[A Button]=' + 'key(' + AButton4Box.dataset.key + ')';
BButton4 = 'Input-SDL-Control4[B Button]=' + 'key(' + BButton4Box.dataset.key + ')';
LTrig4 = 'Input-SDL-Control4[L Trig]=' + 'key(' + LTrig4Box.dataset.key + ')';
RTrig4 = 'Input-SDL-Control4[R Trig]=' + 'key(' + RTrig4Box.dataset.key + ')';
ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + 'key(' + ZTrig4Box.dataset.key + ')';
Start4 = 'Input-SDL-Control4[Start]=' + 'key(' + Start4Box.dataset.key + ')';
DPadU4 = 'Input-SDL-Control4[DPad U]=' + 'key(' + DPadU4Box.dataset.key + ')';
DPadL4 = 'Input-SDL-Control4[DPad L]=' + 'key(' + DPadL4Box.dataset.key + ')';
DPadR4 = 'Input-SDL-Control4[DPad R]=' + 'key(' + DPadR4Box.dataset.key + ')';
DPadD4 = 'Input-SDL-Control4[DPad D]=' + 'key(' + DPadD4Box.dataset.key + ')';
CButtonU4 = 'Input-SDL-Control4[C Button U]=' + 'key(' + CButtonU4Box.dataset.key + ')';
CButtonL4 = 'Input-SDL-Control4[C Button L]=' + 'key(' + CButtonL4Box.dataset.key + ')';
CButtonR4 = 'Input-SDL-Control4[C Button R]=' + 'key(' + CButtonR4Box.dataset.key + ')';
CButtonD4 = 'Input-SDL-Control4[C Button D]=' + 'key(' + CButtonD4Box.dataset.key + ')';
MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + 'key(' + MempakSwitch4Box.dataset.key + ')';
RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + 'key(' + RumblepakSwitch4Box.dataset.key + ')';
XAxis4 = 'Input-SDL-Control4[X Axis]=' + 'key(' + StickL4Box.dataset.key + ',' + StickR4Box.dataset.key + ')';
YAxis4 = 'Input-SDL-Control4[Y Axis]=' + 'key(' + StickU4Box.dataset.key + ',' + StickD4Box.dataset.key + ')'
if(mouse4Box.checked === true && mouse4_1.options[mouse4_1.selectedIndex].value != ''){
if(mouse4_1.options[mouse4_1.selectedIndex].value === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=mouse(1)'}
if(mouse4_1.options[mouse4_1.selectedIndex].value === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=mouse(1)'}
if(mouse4_1.options[mouse4_1.selectedIndex].value === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=mouse(1)'}
if(mouse4_1.options[mouse4_1.selectedIndex].value === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=mouse(1)'}
if(mouse4_1.options[mouse4_1.selectedIndex].value === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=mouse(1)'}}
if(mouse4Box.checked === true && mouse4_2.options[mouse4_2.selectedIndex].value != ''){
if(mouse4_2.options[mouse4_2.selectedIndex].value === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=mouse(2)'}
if(mouse4_2.options[mouse4_2.selectedIndex].value === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=mouse(2)'}
if(mouse4_2.options[mouse4_2.selectedIndex].value === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=mouse(2)'}
if(mouse4_2.options[mouse4_2.selectedIndex].value === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=mouse(2)'}
if(mouse4_2.options[mouse4_2.selectedIndex].value === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=mouse(2)'}}
if(mouse4Box.checked === true && mouse4_3.options[mouse4_3.selectedIndex].value != ''){
if(mouse4_3.options[mouse4_3.selectedIndex].value === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=mouse(3)'}
if(mouse4_3.options[mouse4_3.selectedIndex].value === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=mouse(3)'}
if(mouse4_3.options[mouse4_3.selectedIndex].value === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=mouse(3)'}
if(mouse4_3.options[mouse4_3.selectedIndex].value === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=mouse(3)'}
if(mouse4_3.options[mouse4_3.selectedIndex].value === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=mouse(3)'}}
}else{
device4 = 'Input-SDL-Control4[device]=3';
var StickU4value,StickL4value,StickR4value,StickD4value,StickU4bvalue,StickL4bvalue,StickR4bvalue,StickD4bvalue,
buttonType = '',
buttonTypeB = '';
if(StickU4cBox.value.includes('axis') || StickL4cBox.value.includes('axis') || StickR4cBox.value.includes('axis') || StickD4cBox.value.includes('axis')){buttonType = 'axis'}
if(StickU4cbBox.value.includes('axis') || StickL4cbBox.value.includes('axis') || StickR4cbBox.value.includes('axis') || StickD4cbBox.value.includes('axis')){buttonTypeB = 'axis'}
if(StickU4cBox.value.includes('button') || StickL4cBox.value.includes('button') || StickR4cBox.value.includes('button') || StickD4cBox.value.includes('button')){buttonType = 'button'}
if(StickU4cbBox.value.includes('button') || StickL4cbBox.value.includes('button') || StickR4cbBox.value.includes('button') || StickD4cbBox.value.includes('button')){buttonTypeB = 'button'}
if(StickU4cBox.value.includes('hat') || StickL4cBox.value.includes('hat') || StickR4cBox.value.includes('hat') || StickD4cBox.value.includes('hat')){buttonType = 'hat'}
if(StickU4cbBox.value.includes('hat') || StickL4cbBox.value.includes('hat') || StickR4cbBox.value.includes('hat') || StickD4cbBox.value.includes('hat')){buttonTypeB = 'hat'}
StickU4value = StickU4cBox.value.replace(regjoy,'');
StickL4value = StickL4cBox.value.replace(regjoy,'');
StickR4value = StickR4cBox.value.replace(regjoy,'');
StickD4value = StickD4cBox.value.replace(regjoy,'');
StickU4bvalue = StickU4cbBox.value.replace(regjoy,'');
StickL4bvalue = StickL4cbBox.value.replace(regjoy,'');
StickR4bvalue = StickR4cbBox.value.replace(regjoy,'');
StickD4bvalue = StickD4cbBox.value.replace(regjoy,'');
AButton4 = 'Input-SDL-Control4[A Button]=' + AButton4c.value + ' ' + AButton4cb.value;
BButton4 = 'Input-SDL-Control4[B Button]=' + BButton4c.value + ' ' + BButton4cb.value;
LTrig4 = 'Input-SDL-Control4[L Trig]=' + LTrig4c.value + ' ' + LTrig4cb.value;
RTrig4 = 'Input-SDL-Control4[R Trig]=' + RTrig4c.value + ' ' + RTrig4cb.value;
ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + ZTrig4c.value + ' ' + ZTrig4cb.value;
Start4 = 'Input-SDL-Control4[Start]=' + Start4c.value + ' ' + Start4cb.value;
DPadU4 = 'Input-SDL-Control4[DPad U]=' + DPadU4c.value + ' ' +  DPadU4cb.value;
DPadL4 = 'Input-SDL-Control4[DPad L]=' + DPadL4c.value + ' ' +  DPadL4cb.value;
DPadR4 = 'Input-SDL-Control4[DPad R]=' + DPadR4c.value + ' ' +  DPadR4cb.value;
DPadD4 = 'Input-SDL-Control4[DPad D]=' + DPadD4c.value + ' ' +  DPadD4cb.value;
CButtonU4 = 'Input-SDL-Control4[C Button U]=' + CButtonU4c.value + ' ' +  CButtonU4cb.value;
CButtonL4 = 'Input-SDL-Control4[C Button L]=' + CButtonL4c.value + ' ' +  CButtonL4cb.value;
CButtonR4 = 'Input-SDL-Control4[C Button R]=' + CButtonR4c.value + ' ' +  CButtonR4cb.value;
CButtonD4 = 'Input-SDL-Control4[C Button D]=' + CButtonD4c.value + ' ' +  CButtonD4cb.value;
MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + MempakSwitch4c.value + ' ' +  MempakSwitch4cb.value;
RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + RumblepakSwitch4c.value + ' ' +  RumblepakSwitch4cb.value;
XAxis4 = 'Input-SDL-Control4[X Axis]=' + buttonType + '(' + StickL4value + ',' + StickR4value + ')' + ' ' + buttonTypeB + '(' + StickL4bvalue + ',' + StickR4bvalue + ')';
YAxis4 = 'Input-SDL-Control4[Y Axis]=' + buttonType + '(' + StickU4value + ',' + StickD4value + ')' + ' ' + buttonTypeB + '(' + StickU4bvalue + ',' + StickD4bvalue + ')'}

msensitivity1 = 'Input-SDL-Control1[MouseSensitivity]=' + MouseSensitivity1X.value + ',' + MouseSensitivity1Y.value;
msensitivity2 = 'Input-SDL-Control2[MouseSensitivity]=' + MouseSensitivity2X.value + ',' + MouseSensitivity2Y.value;
msensitivity3 = 'Input-SDL-Control3[MouseSensitivity]=' + MouseSensitivity3X.value + ',' + MouseSensitivity3Y.value;
msensitivity4 = 'Input-SDL-Control4[MouseSensitivity]=' + MouseSensitivity4X.value + ',' + MouseSensitivity4Y.value;
analogdeadzone1 = 'Input-SDL-Control1[AnalogDeadzone]=' + AnalogDeadzone1X.value + ',' + AnalogDeadzone1Y.value;
analogdeadzone2 = 'Input-SDL-Control2[AnalogDeadzone]=' + AnalogDeadzone2X.value + ',' + AnalogDeadzone2Y.value;
analogdeadzone3 = 'Input-SDL-Control3[AnalogDeadzone]=' + AnalogDeadzone3X.value + ',' + AnalogDeadzone3Y.value;
analogdeadzone4 = 'Input-SDL-Control4[AnalogDeadzone]=' + AnalogDeadzone4X.value + ',' + AnalogDeadzone4Y.value;
analogpeak1 = 'Input-SDL-Control1[AnalogPeak]=' + AnalogPeak1X.value + ',' + AnalogPeak1Y.value;
analogpeak2 = 'Input-SDL-Control2[AnalogPeak]=' + AnalogPeak2X.value + ',' + AnalogPeak2Y.value;
analogpeak3 = 'Input-SDL-Control3[AnalogPeak]=' + AnalogPeak3X.value + ',' + AnalogPeak3Y.value;
analogpeak4 = 'Input-SDL-Control4[AnalogPeak]=' + AnalogPeak4X.value + ',' + AnalogPeak4Y.value;

if(AButton1.match(regkb))AButton1 = AButton1.replace(regkb,'')
if(BButton1.match(regkb))BButton1 = BButton1.replace(regkb,'')
if(LTrig1.match(regkb))LTrig1 = LTrig1.replace(regkb,'')
if(RTrig1.match(regkb))RTrig1 = RTrig1.replace(regkb,'')
if(ZTrig1.match(regkb))ZTrig1 = ZTrig1.replace(regkb,'')
if(Start1.match(regkb))Start1 = Start1.replace(regkb,'')
if(DPadU1.match(regkb))DPadU1 = DPadU1.replace(regkb,'')
if(DPadL1.match(regkb))DPadL1 = DPadL1.replace(regkb,'')
if(DPadR1.match(regkb))DPadR1 = DPadR1.replace(regkb,'')
if(DPadD1.match(regkb))DPadD1 = DPadD1.replace(regkb,'')
if(CButtonU1.match(regkb))CButtonU1 = CButtonU1.replace(regkb,'')
if(CButtonL1.match(regkb))CButtonL1 = CButtonL1.replace(regkb,'')
if(CButtonR1.match(regkb))CButtonR1 = CButtonR1.replace(regkb,'')
if(CButtonD1.match(regkb))CButtonD1 = CButtonD1.replace(regkb,'')
if(MempakSwitch1.match(regkb))MempakSwitch1 = MempakSwitch1.replace(regkb,'')
if(RumblepakSwitch1.match(regkb))RumblepakSwitch1 = RumblepakSwitch1.replace(regkb,'')
if(XAxis1.match(regkb))XAxis1 = XAxis1.replace(regkb,'')
if(YAxis1.match(regkb))YAxis1 = YAxis1.replace(regkb,'')

if(AButton2.match(regkb))AButton2 = AButton2.replace(regkb,'')
if(BButton2.match(regkb))BButton2 = BButton2.replace(regkb,'')
if(LTrig2.match(regkb))LTrig2 = LTrig2.replace(regkb,'')
if(RTrig2.match(regkb))RTrig2 = RTrig2.replace(regkb,'')
if(ZTrig2.match(regkb))ZTrig2 = ZTrig2.replace(regkb,'')
if(Start2.match(regkb))Start2 = Start2.replace(regkb,'')
if(DPadU2.match(regkb))DPadU2 = DPadU2.replace(regkb,'')
if(DPadL2.match(regkb))DPadL2 = DPadL2.replace(regkb,'')
if(DPadR2.match(regkb))DPadR2 = DPadR2.replace(regkb,'')
if(DPadD2.match(regkb))DPadD2 = DPadD2.replace(regkb,'')
if(CButtonU2.match(regkb))CButtonU2 = CButtonU2.replace(regkb,'')
if(CButtonL2.match(regkb))CButtonL2 = CButtonL2.replace(regkb,'')
if(CButtonR2.match(regkb))CButtonR2 = CButtonR2.replace(regkb,'')
if(CButtonD2.match(regkb))CButtonD2 = CButtonD2.replace(regkb,'')
if(MempakSwitch2.match(regkb))MempakSwitch2 = MempakSwitch2.replace(regkb,'')
if(RumblepakSwitch2.match(regkb))RumblepakSwitch2 = RumblepakSwitch2.replace(regkb,'')
if(XAxis2.match(regkb))XAxis2 = XAxis2.replace(regkb,'')
if(YAxis2.match(regkb))YAxis2 = YAxis2.replace(regkb,'')

if(AButton3.match(regkb))AButton3 = AButton3.replace(regkb,'')
if(BButton3.match(regkb))BButton3 = BButton3.replace(regkb,'')
if(LTrig3.match(regkb))LTrig3 = LTrig3.replace(regkb,'')
if(RTrig3.match(regkb))RTrig3 = RTrig3.replace(regkb,'')
if(ZTrig3.match(regkb))ZTrig3 = ZTrig3.replace(regkb,'')
if(Start3.match(regkb))Start3 = Start3.replace(regkb,'')
if(DPadU3.match(regkb))DPadU3 = DPadU3.replace(regkb,'')
if(DPadL3.match(regkb))DPadL3 = DPadL3.replace(regkb,'')
if(DPadR3.match(regkb))DPadR3 = DPadR3.replace(regkb,'')
if(DPadD3.match(regkb))DPadD3 = DPadD3.replace(regkb,'')
if(CButtonU3.match(regkb))CButtonU3 = CButtonU3.replace(regkb,'')
if(CButtonL3.match(regkb))CButtonL3 = CButtonL3.replace(regkb,'')
if(CButtonR3.match(regkb))CButtonR3 = CButtonR3.replace(regkb,'')
if(CButtonD3.match(regkb))CButtonD3 = CButtonD3.replace(regkb,'')
if(MempakSwitch3.match(regkb))MempakSwitch3 = MempakSwitch3.replace(regkb,'')
if(RumblepakSwitch3.match(regkb))RumblepakSwitch3 = RumblepakSwitch3.replace(regkb,'')
if(XAxis3.match(regkb))XAxis3 = XAxis3.replace(regkb,'')
if(YAxis3.match(regkb))YAxis3 = YAxis3.replace(regkb,'')

if(AButton4.match(regkb))AButton4 = AButton4.replace(regkb,'')
if(BButton4.match(regkb))BButton4 = BButton4.replace(regkb,'')
if(LTrig4.match(regkb))LTrig4 = LTrig4.replace(regkb,'')
if(RTrig4.match(regkb))RTrig4 = RTrig4.replace(regkb,'')
if(ZTrig4.match(regkb))ZTrig4 = ZTrig4.replace(regkb,'')
if(Start4.match(regkb))Start4 = Start4.replace(regkb,'')
if(DPadU4.match(regkb))DPadU4 = DPadU4.replace(regkb,'')
if(DPadL4.match(regkb))DPadL4 = DPadL4.replace(regkb,'')
if(DPadR4.match(regkb))DPadR4 = DPadR4.replace(regkb,'')
if(DPadD4.match(regkb))DPadD4 = DPadD4.replace(regkb,'')
if(CButtonU4.match(regkb))CButtonU4 = CButtonU4.replace(regkb,'')
if(CButtonL4.match(regkb))CButtonL4 = CButtonL4.replace(regkb,'')
if(CButtonR4.match(regkb))CButtonR4 = CButtonR4.replace(regkb,'')
if(CButtonD4.match(regkb))CButtonD4 = CButtonD4.replace(regkb,'')
if(MempakSwitch4.match(regkb))MempakSwitch4 = MempakSwitch4.replace(regkb,'')
if(RumblepakSwitch4.match(regkb))RumblepakSwitch4 = RumblepakSwitch4.replace(regkb,'')
if(XAxis4.match(regkb))XAxis4 = XAxis4.replace(regkb,'')
if(YAxis4.match(regkb))YAxis4 = YAxis4.replace(regkb,'')

m64pGFX = 'Rsp-HLE[DisplayListToGraphicsPlugin]=True';
RspFallback = 'Rsp-HLE[RspFallback]=mupen64plus-rsp-cxd4-sse2';
if(gfx === 'mupen64plus-video-angrylion-plus' || gfx === 'mupen64plus-video-parallel'){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=False'; cxd4Audio = 'rsp-cxd4[DisplayListToAudioPlugin]=False'}
else if(gfx === 'mupen64plus-video-rice' || gfx === 'mupen64plus-video-glide64mk2'){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=True'}
if(gfx === 'mupen64plus-video-angrylion-plus' && rsp === 'mupen64plus-rsp-hle'){rsp = 'mupen64plus-rsp-cxd4-sse2'}
else if(gfx === 'mupen64plus-video-parallel' && rsp === 'mupen64plus-rsp-hle'){rsp = 'mupen64plus-rsp-parallel'}
else if((gfx === 'mupen64plus-video-rice' || gfx === 'mupen64plus-video-glide64mk2') && rsp === 'mupen64plus-rsp-parallel'){rsp = 'mupen64plus-rsp-hle'}
SharedDataPath = 'Core[SharedDataPath]=';
PluginDir = '.';

if(document.getElementById('nospeedlimit').checked === true){nospeedlimit = ['--nospeedlimit'];audio = 'dummy';vsync = 'Video-General[VerticalSync]=False';Glide64VSync = 'Video-Glide64mk2[vsync]=False'}else{nospeedlimit = []}

var controls1 = ['--set', AButton1, '--set', BButton1, '--set', LTrig1, '--set', RTrig1, '--set', ZTrig1, '--set', Start1, '--set', DPadU1, '--set', DPadL1, '--set', DPadR1, '--set', DPadD1, '--set', CButtonU1, '--set', CButtonL1, '--set', CButtonR1, '--set', CButtonD1, '--set', MempakSwitch1, '--set', RumblepakSwitch1, '--set', XAxis1, '--set', YAxis1],
controls2 = ['--set', AButton2, '--set', BButton2, '--set', LTrig2, '--set', RTrig2, '--set', ZTrig2, '--set', Start2, '--set', DPadU2, '--set', DPadL2, '--set', DPadR2, '--set', DPadD2, '--set', CButtonU2, '--set', CButtonL2, '--set', CButtonR2, '--set', CButtonD2, '--set', MempakSwitch2, '--set', RumblepakSwitch2, '--set', XAxis2, '--set', YAxis2],
controls3 = ['--set', AButton3, '--set', BButton3, '--set', LTrig3, '--set', RTrig3, '--set', ZTrig3, '--set', Start3, '--set', DPadU3, '--set', DPadL3, '--set', DPadR3, '--set', DPadD3, '--set', CButtonU3, '--set', CButtonL3, '--set', CButtonR3, '--set', CButtonD3, '--set', MempakSwitch3, '--set', RumblepakSwitch3, '--set', XAxis3, '--set', YAxis3],
controls4 = ['--set', AButton4, '--set', BButton4, '--set', LTrig4, '--set', RTrig4, '--set', ZTrig4, '--set', Start4, '--set', DPadU4, '--set', DPadL4, '--set', DPadR4, '--set', DPadD4, '--set', CButtonU4, '--set', CButtonL4, '--set', CButtonR4, '--set', CButtonD4, '--set', MempakSwitch4, '--set', RumblepakSwitch4, '--set', XAxis4, '--set', YAxis4],
config = ['--plugindir', PluginDir, osd, fullscreen, '--resolution', resolution, '--gfx', gfx, '--audio', audio, '--input', input, '--rsp', rsp, '--emumode', emumode, '--set', exp, '--set', vsync, '--set', cxd4GFX, '--set', m64pGFX, '--set', plugin1, '--set', plugin2, '--set', plugin3, '--set', plugin4, '--set', plugged1, '--set', plugged2, '--set', plugged3, '--set', plugged4, '--set', mode1, '--set', mode2, '--set', mode3, '--set', mode4, '--set', name1, '--set', name2, '--set', name3, '--set', name4, '--set', mouse1, '--set', mouse2, '--set', mouse3, '--set', mouse4, '--set', msensitivity1, '--set', msensitivity2, '--set', msensitivity3, '--set', msensitivity4, '--set', analogdeadzone1, '--set', analogdeadzone2, '--set', analogdeadzone3, '--set', analogdeadzone4, '--set', analogpeak1, '--set', analogpeak2, '--set', analogpeak3, '--set', analogpeak4, '--set', device1, '--set', device2, '--set', device3, '--set', device4, '--set', threadedVideo, '--set', msaa, '--set', fxaa, '--set', aspectRatio, '--set', bufferSwapMode, '--set', useNativeResolutionFactor, '--set', RspFallback, '--set', bilinearMode, '--set', enableHalosRemoval, '--set', anisotropy, '--set', cache, '--set', txHiresEnable, '--set', txNoTextureFileStorage, '--set', EnableDitheringPattern, '--set', EnableHiresNoiseDithering, '--set', DitheringQuantization, '--set', RDRAMImageDitheringMode, '--set', EnableLOD, '--set', EnableHWLighting, '--set', EnableCoverage, '--set', EnableClipping, '--set', EnableShadersStorage, '--set', EnableLegacyBlending, '--set', EnableHybridFilter, '--set', EnableCustomSettings, '--set', CorrectTexrectCoords, '--set', EnableNativeResTexrects, '--set', BackgroundsMode, '--set', EnableTexCoordBounds, '--set', EnableFBEmulation, '--set', EnableCopyAuxiliaryToRDRAM, '--set', EnableN64DepthCompare, '--set', ForceDepthBufferClear, '--set', DisableFBInfo, '--set', FBInfoReadColorChunk, '--set', FBInfoReadDepthChunk, '--set', EnableCopyColorToRDRAM, '--set', EnableCopyDepthToRDRAM, '--set', EnableCopyColorFromRDRAM, '--set', EnableCopyDepthToMainDepthBuffer, '--set', EnableOverscan, '--set', OverscanNtscTop, '--set', OverscanNtscLeft, '--set', OverscanNtscRight, '--set', OverscanNtscBottom, '--set', OverscanPalTop, '--set', OverscanPalLeft, '--set', OverscanPalRight, '--set', OverscanPalBottom, '--set', txFilterMode, '--set', txEnhancementMode, '--set', txDeposterize, '--set', txFilterIgnoreBG, '--set', txCacheSize, '--set', txHiresFullAlphaChannel, '--set', txHresAltCRC, '--set', txCacheCompression,  '--set', txForce16bpp,  '--set', txSaveCache, '--set', txPathSetting, '--set', txCachePathSetting, '--set', txDumpPathSetting, '--set', KbdMappingSlot0, '--set', KbdMappingSlot1, '--set', KbdMappingSlot2, '--set', KbdMappingSlot3, '--set', KbdMappingSlot4, '--set', KbdMappingSlot5, '--set', KbdMappingSlot6, '--set', KbdMappingSlot7, '--set', KbdMappingSlot8, '--set', KbdMappingSlot9, '--set', KbdMappingStop, '--set',KbdMappingFullscreen,'--set',KbdMappingSaveState,'--set',KbdMappingLoadState,'--set',KbdMappingIncrementSlot,'--set',KbdMappingReset,'--set',KbdMappingSpeedDown,'--set',KbdMappingSpeedUp,'--set',KbdMappingScreenshot,'--set',KbdMappingPause,'--set',KbdMappingMute,'--set',KbdMappingIncreaseVolume,'--set',KbdMappingDecreaseVolume,'--set',KbdMappingFastForward,'--set',KbdMappingFrameAdvance,'--set',KbdMappingGameshark,'--set', JoyMappingStop,'--set',JoyMappingFullscreen,'--set',JoyMappingSaveState,'--set',JoyMappingLoadState,'--set',JoyMappingIncrementSlot,'--set',JoyMappingReset,'--set',JoyMappingSpeedDown,'--set',JoyMappingSpeedUp,'--set',JoyMappingScreenshot,'--set',JoyMappingPause,'--set',JoyMappingMute,'--set',JoyMappingIncreaseVolume,'--set',JoyMappingDecreaseVolume,'--set',JoyMappingFastForward,'--set',JoyMappingFrameAdvance,'--set',JoyMappingGameshark, '--set', Parallel, '--set', NumWorkers, '--set', BusyLoop,'--set',ViMode,'--set',ViInterpolation,'--set',ViWidescreen,'--set',ViHideOverscan,'--set',ViIntegerScaling,'--set',DpCompat,'--set',ParallelFullscreen,'--set',ParallelUpscaling,'--set',ParallelScreenWidth,'--set',ParallelScreenHeight,'--set',ParallelSuperscaledReads,'--set',ParallelSuperscaledDither,'--set',ParallelDeinterlace,'--set',ParallelIntegerScale,'--set',ParallelCropOverscan,'--set',ParallelVIAA,'--set',ParallelDivot,'--set',ParallelGammaDither,'--set',ParallelVIBilerp,'--set',ParallelVIDither,'--set',ParallelDownScale,'--set',ParallelNativeTextLOD,'--set',ParallelNativeTextRECT,'--set',ParallelWidescreenStretch,'--set',ForceGammaCorrection,'--set',GammaCorrectionLevel,'--set',fontSize,'--set',fontColor,'--set',ShowFPS,'--set',ShowVIS,'--set',ShowPercent,'--set',ShowInternalResolution,'--set',ShowRenderingResolution,'--set',ShowStatistics,'--set',CountersPos,'--set',IPLROMSetting,'--set',DiskSetting,'--set',NoCompiledJump,'--set',CountPerOp,'--set',AutoStateSlotIncrement,'--set',CurrentStateSlot,'--set',SharedDataPath,'--set',ScreenshotPathSetting,'--set',SaveStatePathSetting,'--set',SaveSRAMPathSetting,'--set',RandomizeInterrupt,'--set',SaveDiskFormat,'--set',WaitForCPUHost,'--set',SupportCPUSemaphoreLock,'--set',gbROM1Setting,'--set',gbROM2Setting,'--set',gbROM3Setting,'--set',gbROM4Setting,'--set',gbRAM1Setting,'--set',gbRAM2Setting,'--set',gbRAM3Setting,'--set',gbRAM4Setting,'--set',DEFAULT_FREQUENCY,'--set',SWAP_CHANNELS,'--set',PRIMARY_BUFFER_TARGET,'--set',SECONDARY_BUFFER_SIZE,'--set',RESAMPLE,'--set',VOLUME_ADJUST,'--set',VOLUME_DEFAULT,'--set',AUDIO_SYNC,'--set',hkTexDump,'--set',hkHdTexReload,'--set',hkHdTexToggle,'--set',hkVsync,'--set',hkFBEmulation,'--set',hkN64DepthCompare,'--set',hkOsdVis,'--set',hkOsdFps,'--set',hkOsdPercent,'--set',hkOsdInternalResolution,'--set',hkOsdRenderingResolution,'--set',hkTexCoordBounds,'--set',hkNativeResTexrects,'--set',hkForceGammaCorrection,'--set',FrameBufferSetting,'--set',FrameBufferWriteBackControl,'--set',RenderToTexture,'--set',ScreenUpdateSetting,'--set',NormalAlphaBlender,'--set',FastTextureLoading,'--set',AccurateTextureMapping,'--set',InN64Resolution,'--set',SaveVRAM,'--set',DoubleSizeForSmallTxtrBuf,'--set',DefaultCombinerDisable,'--set',EnableHacks,'--set',WinFrameMode,'--set',FullTMEMEmulation,'--set',OpenGLVertexClipper,'--set',EnableSSE,'--set',SkipFrame,'--set',TexRectOnly,'--set',SmallTextureOnly,'--set',LoadHiResCRCOnly,'--set',LoadHiResTextures,'--set',DumpTexturesToFiles,'--set',RiceShowFPS,'--set',Mipmapping,'--set',FogMethod,'--set',ForceTextureFilter,'--set',TextureEnhancement,'--set',TextureEnhancementControl,'--set',TextureQuality,'--set',OpenGLDepthBufferSetting,'--set',RiceMultiSampling,'--set',ColorQuality,'--set',OpenGLRenderSetting,'--set',AnisotropicFiltering,'--set',ForcePolygonOffset,'--set',PolygonOffsetFactor,'--set',PolygonOffsetUnits,'--set',Glide64VSync,'--set',wrpAntiAliasing,'--set',force_polygon_offset,'--set',polygon_offset_factor,'--set',polygon_offset_units,'--set',show_fps,'--set',clock,'--set',clock_24_hr,'--set',wrpFBO,'--set',wrpAnisotropic,'--set',ghq_fltr,'--set',ghq_cmpr,'--set',ghq_enht,'--set',ghq_hirs,'--set',ghq_enht_cmpr,'--set',ghq_enht_tile,'--set',ghq_enht_f16bpp,'--set',ghq_enht_gz,'--set',ghq_enht_nobg,'--set',ghq_hirs_cmpr,'--set',ghq_hirs_tile,'--set',ghq_hirs_f16bpp,'--set',ghq_hirs_gz,'--set',ghq_hirs_altcrc,'--set',ghq_cache_save,'--set',ghq_cache_size,'--set',ghq_hirs_let_texartists_fly,'--set',ghq_hirs_dump,'--set',alt_tex_size,'--set',use_sts1_only,'--set',force_calc_sphere,'--set',correct_viewport,'--set',increase_texrect_edge,'--set',decrease_fillrect_edge,'--set',texture_correction,'--set',pal230,'--set',force_microcheck,'--set',force_quad3d,'--set',clip_zmin,'--set',clip_zmax,'--set',fast_crc,'--set',adjust_aspect,'--set',zmode_compare_less,'--set',old_style_adither,'--set',n64_z_scale,'--set',optimize_texrect,'--set',ignore_aux_copy,'--set',hires_buf_clear,'--set',fb_read_alpha,'--set',useless_is_useless,'--set',fb_crc_mode,'--set',filtering,'--set',fog,'--set',buff_clear,'--set',swapmode,'--set',aspect,'--set',lodmode,'--set',fb_smart,'--set',fb_hires,'--set',fb_read_always,'--set',read_back_to_screen,'--set',detect_cpu_write,'--set',fb_get_info,'--set',fb_render,filePath],
cheats = [],
activeCheats = '';
if(cheatList.innerHTML != ''){
var cheatInputs = cheatList.querySelectorAll("input[type='checkbox']");
for (var i = 0; i < cheatInputs.length; i++){var cheatInput = cheatInputs[i];checkCheats(cheatInput)}
function checkCheats(cheatInput){if(cheatInput.checked === true){var id = cheatInput.id.replace('_','-');activeCheats += id + ','}}
cheats = ['--cheats',activeCheats]}

if(mode1Dropdown.value != 'Input-SDL-Control1[mode]=0'){controls1 = []}
if(mode2Dropdown.value != 'Input-SDL-Control2[mode]=0'){controls2 = []}
if(mode3Dropdown.value != 'Input-SDL-Control3[mode]=0'){controls3 = []}
if(mode4Dropdown.value != 'Input-SDL-Control4[mode]=0'){controls4 = []}

var control_stick_deadzone = control_stick_deadzoneRange.value,
control_stick_sensitivity = control_stick_sensitivityRange.value,
c_stick_deadzone = c_stick_deadzoneRange.value,
trigger_threshold = trigger_thresholdRange.value,
a = aDropdown.value,
b = bDropdown.value,
x = xDropdown.value,
y = yDropdown.value,
start = startDropdown.value,
z = zDropdown.value,
l = lDropdown.value,
r = rDropdown.value,
d_pad_left = d_pad_leftDropdown.value,
d_pad_right = d_pad_rightDropdown.value,
d_pad_down = d_pad_downDropdown.value,
d_pad_up = d_pad_upDropdown.value,
c_stick_left = c_stick_leftDropdown.value,
c_stick_right = c_stick_rightDropdown.value,
c_stick_down = c_stick_downDropdown.value,
c_stick_up = c_stick_upDropdown.value;

const gcaSettings = 'control_stick_deadzone = ' +  control_stick_deadzone + '\n' + 'control_stick_sensitivity = ' + control_stick_sensitivity + '\n' + 'c_stick_deadzone = ' + c_stick_deadzone + '\n' + 'trigger_threshold = ' + trigger_threshold + '\n' + '\n' + '[controller_mapping]' + '\n' + 'a = ' + a + '\n' + 'b = ' + b + '\n' + 'x = ' + x + '\n' + 'y = ' + y + '\n' + 'start = ' + start + '\n' + 'z = ' + z + '\n' + 'l = ' + l + '\n' + 'r = ' + r + '\n' + 'd_pad_left = ' + d_pad_left + '\n' + 'd_pad_right = ' + d_pad_right + '\n' + 'd_pad_down = ' + d_pad_down + '\n' + 'd_pad_up = ' + d_pad_up + '\n' + 'c_stick_left = ' + c_stick_left + '\n' + 'c_stick_right = ' + c_stick_right + '\n' + 'c_stick_down = ' + c_stick_down + '\n' + 'c_stick_up = ' + c_stick_up;

writeGCA(gcaSettings)

const parameters = controls1.concat(controls2,controls3,controls4,nospeedlimit,cheats,config),
child = emuLaunch(parameters);

})



listCheats.addEventListener('click', function(){
cheatList.innerHTML = '';
const parameters = ['--cheats','list',filePath],
child = showCheats(parameters);
var datastring = child.replace(regstring,''),
datafilter = datastring.replace(regfilter,''),
dataremove = datafilter.replace(regremove,'');
datasplit = dataremove.split(regsplit);
datasplit.forEach(e => cheat(e));
function cheat(e){if(e != ''){
var cheatCheckbox,cheat;
cheatCheckbox = e.replace(regid,'');
if(!e.match(regradio)){cheatRadio = cheatCheckbox}
if(e.match(regradio)){cheatCheckbox = cheatCheckbox.replace(regradio,cheatRadio + '_')}
if(cheatCheckbox.includes('_')){document.getElementById(cheatCheckbox.replace(regbox,'')).disabled = true}
cheat = "<input id='" + cheatCheckbox + "' type='checkbox'><label for='" + cheatCheckbox + "'>" + e.replace(regradio,'') + "</label>";
cheatList.innerHTML += cheat + '<br><br>';
if(cheatCheckbox.includes('_')){var radioBox = cheatList.querySelector('#' + CSS.escape(cheatCheckbox));radioBox.classList.add('radio')}
}}
if(cheatList.innerHTML === ''){cheatList.innerHTML = 'No cheats for this ROM found.'}
})

cheatList.addEventListener('change', function(e){
if(e.target.classList.contains('radio')){
var id = e.target.id.replace(regbox,'_');
const radioBoxes = document.querySelectorAll('.radio');
for (var i = 0; i < radioBoxes.length; i++){var box = radioBoxes[i];if(box.id.includes(id)){if(box.id != e.target.id)box.checked = false}}}})



const keys = {32:1,33:1,34:1,35:1,36:1,37:1,38:1,39:1,40:1}, // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40
textInputs = document.querySelectorAll("input[type='text']");
function noScroll(e){if(keys[e.keyCode]){e.preventDefault();return false}}
for (var i = 0; i < textInputs.length; i++){var textInput = textInputs[i];preventScroll(textInput)}
function preventScroll(textInput){
textInput.addEventListener('focus',(e) => {window.addEventListener('keydown',noScroll,false)})
textInput.addEventListener('blur',(e) => {window.removeEventListener('keydown',noScroll,false)})}
name1.addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})
name2.addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})
name3.addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})
name4.addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})

function removeShow(){
if(mainSettings.classList.contains('active'))mainSettings.classList.remove('active');
if(inputSettings.classList.contains('active'))inputSettings.classList.remove('active');
if(videoSettings.classList.contains('active'))videoSettings.classList.remove('active');
if(mainSettingsDropdown.classList.contains('show'))mainSettingsDropdown.classList.remove('show');
if(inputSettingsDropdown.classList.contains('show'))inputSettingsDropdown.classList.remove('show');
if(videoSettingsDropdown.classList.contains('show'))videoSettingsDropdown.classList.remove('show')}

mainSettings.addEventListener('click', function(){
if(mainSettingsDropdown.classList.contains('show')){removeShow()}
else{removeShow();mainSettingsDropdown.classList.toggle('show');mainSettings.classList.toggle('active')}})
inputSettings.addEventListener('click', function(){
if(inputSettingsDropdown.classList.contains('show')){removeShow()}
else{removeShow();inputSettingsDropdown.classList.toggle('show');inputSettings.classList.toggle('active')}})
videoSettings.addEventListener('click', function(){
if(videoSettingsDropdown.classList.contains('show')){removeShow()}
else{removeShow();videoSettingsDropdown.classList.toggle('show');videoSettings.classList.toggle('active')}})

window.onclick = function(e){if(!e.target.matches('.dropbutton')){removeShow()}}
function prevent(e){e.preventDefault();e.stopPropagation()}

function fileExtension(fpath,ext){ext = fpath.slice((fpath.lastIndexOf(".") - 1 >>> 0) + 2);return ext}

function ROMInput(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'n64' || fileExtension(fPath) === 'v64' || fileExtension(fPath) === 'z64'){
filePath = fPath;fileText.innerHTML = fPath;localStorage.setItem('filePath', fPath);if(!recentFiles.includes(filePath))recentFiles.unshift(filePath);recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(cheatList.innerHTML!='')cheatList.innerHTML=''}}}

fileInput.addEventListener('drop', handleDropROM, false)
fileInput.addEventListener('dragover', prevent, false)
function handleDropROM(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;ROMInput(fPath)}}

function IPLROMFile(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'n64' || fileExtension(fPath) === 'v64' || fileExtension(fPath) === 'z64' || fileExtension(fPath) === 'bin' || fileExtension(fPath) === 'rom'){
filePath = fPath;IPLROMText.innerHTML = fPath;localStorage.setItem('IPLROM', fPath)}}}

IPLROMInput.addEventListener('drop', handleDropIPLROM, false)
IPLROMInput.addEventListener('dragover', prevent, false)
function handleDropIPLROM(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;IPLROMFile(fPath)}}

function DiskFile(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'ndd'){
filePath = fPath;DiskText.innerHTML = fPath;localStorage.setItem('Disk', fPath)}}}

DiskInput.addEventListener('drop', handleDropDisk, false)
DiskInput.addEventListener('dragover', prevent, false)
function handleDropDisk(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;DiskFile(fPath)}}

function gbROM1File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
filePath = fPath;gbROM1Text.innerHTML = fPath;localStorage.setItem('gbROM1', fPath)}}}

gbROM1Input.addEventListener('drop', handleDropgbROM1, false)
gbROM1Input.addEventListener('dragover', prevent, false)
function handleDropgbROM1(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM1File(fPath)}}

function gbROM2File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
filePath = fPath;gbROM2Text.innerHTML = fPath;localStorage.setItem('gbROM2', fPath)}}}

gbROM2Input.addEventListener('drop', handleDropgbROM2, false)
gbROM2Input.addEventListener('dragover', prevent, false)
function handleDropgbROM2(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM2File(fPath)}}

function gbROM3File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
filePath = fPath;gbROM3Text.innerHTML = fPath;localStorage.setItem('gbROM3', fPath)}}}

gbROM3Input.addEventListener('drop', handleDropgbROM3, false)
gbROM3Input.addEventListener('dragover', prevent, false)
function handleDropgbROM3(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM3File(fPath)}}

function gbROM4File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
filePath = fPath;gbROM4Text.innerHTML = fPath;localStorage.setItem('gbROM4', fPath)}}}

gbROM4Input.addEventListener('drop', handleDropgbROM4, false)
gbROM4Input.addEventListener('dragover', prevent, false)
function handleDropgbROM4(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM4File(fPath)}}

function gbRAM1File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
filePath = fPath;gbRAM1Text.innerHTML = fPath;localStorage.setItem('gbRAM1', fPath)}}}

gbRAM1Input.addEventListener('drop', handleDropgbRAM1, false)
gbRAM1Input.addEventListener('dragover', prevent, false)
function handleDropgbRAM1(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM1File(fPath)}}

function gbRAM2File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
filePath = fPath;gbRAM2Text.innerHTML = fPath;localStorage.setItem('gbRAM2', fPath)}}}

gbRAM2Input.addEventListener('drop', handleDropgbRAM2, false)
gbRAM2Input.addEventListener('dragover', prevent, false)
function handleDropgbRAM2(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM2File(fPath)}}

function gbRAM3File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
filePath = fPath;gbRAM3Text.innerHTML = fPath;localStorage.setItem('gbRAM3', fPath)}}}

gbRAM3Input.addEventListener('drop', handleDropgbRAM3, false)
gbRAM3Input.addEventListener('dragover', prevent, false)
function handleDropgbRAM3(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM3File(fPath)}}

function gbRAM4File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
filePath = fPath;gbRAM4Text.innerHTML = fPath;localStorage.setItem('gbRAM4', fPath)}}}

gbRAM4Input.addEventListener('drop', handleDropgbRAM4, false)
gbRAM4Input.addEventListener('dragover', prevent, false)
function handleDropgbRAM4(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM4File(fPath)}}



var jstestChild;

// joydata[0] = Device Name, joydata[1] = Device Number, joydata[2] = Pressed Key
function joystick(joyinput,joyvalue,joyfilter,joydata,joyhotkey,jstestConfig){
if(jstestChild != undefined)jstestChild.kill('SIGTERM');
if(joyinput.id.includes('1')){jstestConfig = ['-e', '0']}
if(joyinput.id.includes('2')){jstestConfig = ['-e', '1']}
if(joyinput.id.includes('3')){jstestConfig = ['-e', '2']}
if(joyinput.id.includes('4')){jstestConfig = ['-e', '3']}
jstestChild = jstestSpawn(jstestConfig);
jstestChild.stdout.on('data', (data) => {
joyfilter = `${data}`.replace(regremove,'');
joydata = joyfilter.split('\n');
if(joyinput.id.includes('JoyMapping')){
if(joydata[2].includes('button')){
joyhotkey = joydata[2].replace(reghk,'');
if(!joyinput.value.includes('B') || joyinput.value.includes('/')){joyvalue = 'B' + joyhotkey}
if('B' + joyhotkey != joyinput.value && joyinput.value.includes('B') && !joyinput.value.includes('/')){joyvalue = joyinput.value + '/B' + joyhotkey}}}
else{
if(joyinput.id.includes('1')){name1Input.value = joydata[0];localStorage.setItem('name1',joydata[0])}
if(joyinput.id.includes('2')){name2Input.value = joydata[0];localStorage.setItem('name2',joydata[0])}
if(joyinput.id.includes('3')){name3Input.value = joydata[0];localStorage.setItem('name3',joydata[0])}
if(joyinput.id.includes('4')){name4Input.value = joydata[0];localStorage.setItem('name4',joydata[0])}
if(joydata[2].includes('button')){joyvalue = joydata[2]};
if(joydata[2].includes('axis')){
if(joydata[2].includes('-')){joyvalue = joydata[2].replace(regaxis,'-)')}
else{joyvalue = joydata[2].replace(regaxis,'+)')}}
if(joydata[2].includes('hat')){
if(joydata[2] === 'hat(0 1)'){joyvalue = 'hat(0 Up)'}
if(joydata[2] === 'hat(0 2)'){joyvalue = 'hat(0 Right)'}
if(joydata[2] === 'hat(0 4)'){joyvalue = 'hat(0 Down)'}
if(joydata[2] === 'hat(0 8)'){joyvalue = 'hat(0 Left)'}}}
if(joyvalue != undefined){joyinput.value = joyvalue;localStorage.setItem(joyinput.id,joyvalue)}})
joyinput.onblur = function(){jstestChild.kill('SIGTERM')};
jstestChild.on('close', (code) => {joyinput.blur()})}

StickU1cBox.addEventListener('focus', function(){joystick(StickU1cBox)})
StickU1cbBox.addEventListener('focus', function(){joystick(StickU1cbBox)})
if(localStorage.getItem('StickU1c') != null){StickU1cBox.value = localStorage.getItem('StickU1c')}
if(localStorage.getItem('StickU1cb') != null){StickU1cbBox.value = localStorage.getItem('StickU1cb')}
document.getElementById('clearStickU1c').addEventListener('click', function(){StickU1c.value = '';localStorage.removeItem('StickU1c');StickU1cb.value = '';localStorage.removeItem('StickU1cb')})

StickL1cBox.addEventListener('focus', function(){joystick(StickL1cBox)})
StickL1cbBox.addEventListener('focus', function(){joystick(StickL1cbBox)})
if(localStorage.getItem('StickL1c') != null){StickL1cBox.value = localStorage.getItem('StickL1c')}
if(localStorage.getItem('StickL1cb') != null){StickL1cbBox.value = localStorage.getItem('StickL1cb')}
document.getElementById('clearStickL1c').addEventListener('click', function(){StickL1c.value = '';localStorage.removeItem('StickL1c');StickL1cb.value = '';localStorage.removeItem('StickL1cb')})

StickR1cBox.addEventListener('focus', function(){joystick(StickR1cBox)})
StickR1cbBox.addEventListener('focus', function(){joystick(StickR1cbBox)})
if(localStorage.getItem('StickR1c') != null){StickR1cBox.value = localStorage.getItem('StickR1c')}
if(localStorage.getItem('StickR1cb') != null){StickR1cbBox.value = localStorage.getItem('StickR1cb')}
document.getElementById('clearStickR1c').addEventListener('click', function(){StickR1c.value = '';localStorage.removeItem('StickR1c');StickR1cb.value = '';localStorage.removeItem('StickR1cb')})

StickD1cBox.addEventListener('focus', function(){joystick(StickD1cBox)})
StickD1cbBox.addEventListener('focus', function(){joystick(StickD1cbBox)})
if(localStorage.getItem('StickD1c') != null){StickD1cBox.value = localStorage.getItem('StickD1c')}
if(localStorage.getItem('StickD1cb') != null){StickD1cbBox.value = localStorage.getItem('StickD1cb')}
document.getElementById('clearStickD1c').addEventListener('click', function(){StickD1c.value = '';localStorage.removeItem('StickD1c');StickD1cb.value = '';localStorage.removeItem('StickD1cb')})

CButtonU1cBox.addEventListener('focus', function(){joystick(CButtonU1cBox)})
CButtonU1cbBox.addEventListener('focus', function(){joystick(CButtonU1cbBox)})
if(localStorage.getItem('CButtonU1c') != null){CButtonU1cBox.value = localStorage.getItem('CButtonU1c')}
if(localStorage.getItem('CButtonU1cb') != null){CButtonU1cbBox.value = localStorage.getItem('CButtonU1cb')}
document.getElementById('clearCButtonU1c').addEventListener('click', function(){CButtonU1c.value = '';localStorage.removeItem('CButtonU1c');CButtonU1cb.value = '';localStorage.removeItem('CButtonU1cb')})

CButtonL1cBox.addEventListener('focus', function(){joystick(CButtonL1cBox)})
CButtonL1cbBox.addEventListener('focus', function(){joystick(CButtonL1cbBox)})
if(localStorage.getItem('CButtonL1c') != null){CButtonL1cBox.value = localStorage.getItem('CButtonL1c')}
if(localStorage.getItem('CButtonL1cb') != null){CButtonL1cbBox.value = localStorage.getItem('CButtonL1cb')}
document.getElementById('clearCButtonL1c').addEventListener('click', function(){CButtonL1c.value = '';localStorage.removeItem('CButtonL1c');CButtonL1cb.value = '';localStorage.removeItem('CButtonL1cb')})

CButtonR1cBox.addEventListener('focus', function(){joystick(CButtonR1cBox)})
CButtonR1cbBox.addEventListener('focus', function(){joystick(CButtonR1cbBox)})
if(localStorage.getItem('CButtonR1c') != null){CButtonR1cBox.value = localStorage.getItem('CButtonR1c')}
if(localStorage.getItem('CButtonR1cb') != null){CButtonR1cbBox.value = localStorage.getItem('CButtonR1cb')}
document.getElementById('clearCButtonR1c').addEventListener('click', function(){CButtonR1c.value = '';localStorage.removeItem('CButtonR1c');CButtonR1cb.value = '';localStorage.removeItem('CButtonR1cb')})

CButtonD1cBox.addEventListener('focus', function(){joystick(CButtonD1cBox)})
CButtonD1cbBox.addEventListener('focus', function(){joystick(CButtonD1cbBox)})
if(localStorage.getItem('CButtonD1c') != null){CButtonD1cBox.value = localStorage.getItem('CButtonD1c')}
if(localStorage.getItem('CButtonD1cb') != null){CButtonD1cbBox.value = localStorage.getItem('CButtonD1cb')}
document.getElementById('clearCButtonD1c').addEventListener('click', function(){CButtonD1c.value = '';localStorage.removeItem('CButtonD1c');CButtonD1cb.value = '';localStorage.removeItem('CButtonD1cb')})

DPadU1cBox.addEventListener('focus', function(){joystick(DPadU1cBox)})
DPadU1cbBox.addEventListener('focus', function(){joystick(DPadU1cbBox)})
if(localStorage.getItem('DPadU1c') != null){DPadU1cBox.value = localStorage.getItem('DPadU1c')}
if(localStorage.getItem('DPadU1cb') != null){DPadU1cbBox.value = localStorage.getItem('DPadU1cb')}
document.getElementById('clearDPadU1c').addEventListener('click', function(){DPadU1c.value = '';localStorage.removeItem('DPadU1c');DPadU1cb.value = '';localStorage.removeItem('DPadU1cb')})

DPadL1cBox.addEventListener('focus', function(){joystick(DPadL1cBox)})
DPadL1cbBox.addEventListener('focus', function(){joystick(DPadL1cbBox)})
if(localStorage.getItem('DPadL1c') != null){DPadL1cBox.value = localStorage.getItem('DPadL1c')}
if(localStorage.getItem('DPadL1cb') != null){DPadL1cbBox.value = localStorage.getItem('DPadL1cb')}
document.getElementById('clearDPadL1c').addEventListener('click', function(){DPadL1c.value = '';localStorage.removeItem('DPadL1c');DPadL1cb.value = '';localStorage.removeItem('DPadL1cb')})

DPadR1cBox.addEventListener('focus', function(){joystick(DPadR1cBox)})
DPadR1cbBox.addEventListener('focus', function(){joystick(DPadR1cbBox)})
if(localStorage.getItem('DPadR1c') != null){DPadR1cBox.value = localStorage.getItem('DPadR1c')}
if(localStorage.getItem('DPadR1cb') != null){DPadR1cBox.value = localStorage.getItem('DPadR1cb')}
document.getElementById('clearDPadR1c').addEventListener('click', function(){DPadR1c.value = '';localStorage.removeItem('DPadR1c');DPadR1cb.value = '';localStorage.removeItem('DPadR1cb')})

DPadD1cBox.addEventListener('focus', function(){joystick(DPadD1cBox)})
DPadD1cbBox.addEventListener('focus', function(){joystick(DPadD1cbBox)})
if(localStorage.getItem('DPadD1c') != null){DPadD1cBox.value = localStorage.getItem('DPadD1c')}
if(localStorage.getItem('DPadD1cb') != null){DPadD1cbBox.value = localStorage.getItem('DPadD1cb')}
document.getElementById('clearDPadD1c').addEventListener('click', function(){DPadD1c.value = '';localStorage.removeItem('DPadD1c');DPadD1cb.value = '';localStorage.removeItem('DPadD1cb')})

Start1cBox.addEventListener('focus', function(){joystick(Start1cBox)})
Start1cbBox.addEventListener('focus', function(){joystick(Start1cbBox)})
if(localStorage.getItem('Start1c') != null){Start1cBox.value = localStorage.getItem('Start1c')}
if(localStorage.getItem('Start1cb') != null){Start1cbBox.value = localStorage.getItem('Start1cb')}
document.getElementById('clearStart1c').addEventListener('click', function(){Start1c.value = '';localStorage.removeItem('Start1c');Start1cb.value = '';localStorage.removeItem('Start1cb')})

AButton1cBox.addEventListener('focus', function(){joystick(AButton1cBox)})
AButton1cbBox.addEventListener('focus', function(){joystick(AButton1cbBox)})
if(localStorage.getItem('AButton1c') != null){AButton1cBox.value = localStorage.getItem('AButton1c')}
if(localStorage.getItem('AButton1cb') != null){AButton1cbBox.value = localStorage.getItem('AButton1cb')}
document.getElementById('clearAButton1c').addEventListener('click', function(){AButton1c.value = '';localStorage.removeItem('AButton1c');AButton1cb.value = '';localStorage.removeItem('AButton1cb')})

BButton1cBox.addEventListener('focus', function(){joystick(BButton1cBox)})
BButton1cbBox.addEventListener('focus', function(){joystick(BButton1cbBox)})
if(localStorage.getItem('BButton1c') != null){BButton1cBox.value = localStorage.getItem('BButton1c')}
if(localStorage.getItem('BButton1cb') != null){BButton1cbBox.value = localStorage.getItem('BButton1cb')}
document.getElementById('clearBButton1c').addEventListener('click', function(){BButton1c.value = '';localStorage.removeItem('BButton1c');BButton1cb.value = '';localStorage.removeItem('BButton1cb')})

LTrig1cBox.addEventListener('focus', function(){joystick(LTrig1cBox)})
LTrig1cbBox.addEventListener('focus', function(){joystick(LTrig1cbBox)})
if(localStorage.getItem('LTrig1c') != null){LTrig1cBox.value = localStorage.getItem('LTrig1c')}
if(localStorage.getItem('LTrig1cb') != null){LTrig1cbBox.value = localStorage.getItem('LTrig1cb')}
document.getElementById('clearLTrig1c').addEventListener('click', function(){LTrig1c.value = '';localStorage.removeItem('LTrig1c');LTrig1cb.value = '';localStorage.removeItem('LTrig1cb')})


RTrig1cBox.addEventListener('focus', function(){joystick(RTrig1cBox)})
RTrig1cbBox.addEventListener('focus', function(){joystick(RTrig1cbBox)})
if(localStorage.getItem('RTrig1c') != null){RTrig1cBox.value = localStorage.getItem('RTrig1c')}
if(localStorage.getItem('RTrig1cb') != null){RTrig1cbBox.value = localStorage.getItem('RTrig1cb')}
document.getElementById('clearRTrig1c').addEventListener('click', function(){RTrig1c.value = '';localStorage.removeItem('RTrig1c');RTrig1cb.value = '';localStorage.removeItem('RTrig1cb')})


ZTrig1cBox.addEventListener('focus', function(){joystick(ZTrig1cBox)})
ZTrig1cbBox.addEventListener('focus', function(){joystick(ZTrig1cbBox)})
if(localStorage.getItem('ZTrig1c') != null){ZTrig1cBox.value = localStorage.getItem('ZTrig1c')}
if(localStorage.getItem('ZTrig1cb') != null){ZTrig1cbBox.value = localStorage.getItem('ZTrig1cb')}
document.getElementById('clearZTrig1c').addEventListener('click', function(){ZTrig1c.value = '';localStorage.removeItem('ZTrig1c');ZTrig1cb.value = '';localStorage.removeItem('ZTrig1cb')})

MempakSwitch1cBox.addEventListener('focus', function(){joystick(MempakSwitch1cBox)})
MempakSwitch1cbBox.addEventListener('focus', function(){joystick(MempakSwitch1cbBox)})
if(localStorage.getItem('MempakSwitch1c') != null){MempakSwitch1cBox.value = localStorage.getItem('MempakSwitch1c')}
if(localStorage.getItem('MempakSwitch1cb') != null){MempakSwitch1cbBox.value = localStorage.getItem('MempakSwitch1cb')}
document.getElementById('clearMempakSwitch1c').addEventListener('click', function(){MempakSwitch1c.value = '';localStorage.removeItem('MempakSwitch1c');MempakSwitch1cb.value = '';localStorage.removeItem('MempakSwitch1cb')})

RumblepakSwitch1cBox.addEventListener('focus', function(){joystick(RumblepakSwitch1cBox)})
RumblepakSwitch1cbBox.addEventListener('focus', function(){joystick(RumblepakSwitch1cbBox)})
if(localStorage.getItem('RumblepakSwitch1c') != null){RumblepakSwitch1cBox.value = localStorage.getItem('RumblepakSwitch1c')}
if(localStorage.getItem('RumblepakSwitch1cb') != null){RumblepakSwitch1cbBox.value = localStorage.getItem('RumblepakSwitch1cb')}
document.getElementById('clearRumblepakSwitch1c').addEventListener('click', function(){RumblepakSwitch1c.value = '';localStorage.removeItem('RumblepakSwitch1c');RumblepakSwitch1cb.value = '';localStorage.removeItem('RumblepakSwitch1cb')})



StickU2cBox.addEventListener('focus', function(){joystick(StickU2cBox)})
StickU2cbBox.addEventListener('focus', function(){joystick(StickU2cbBox)})
if(localStorage.getItem('StickU2c') != null){StickU2cBox.value = localStorage.getItem('StickU2c')}
if(localStorage.getItem('StickU2cb') != null){StickU2cbBox.value = localStorage.getItem('StickU2cb')}
document.getElementById('clearStickU2c').addEventListener('click', function(){StickU2c.value = '';localStorage.removeItem('StickU2c');StickU2cb.value = '';localStorage.removeItem('StickU2cb')})


StickL2cBox.addEventListener('focus', function(){joystick(StickL2cBox)})
StickL2cbBox.addEventListener('focus', function(){joystick(StickL2cbBox)})
if(localStorage.getItem('StickL2c') != null){StickL2cBox.value = localStorage.getItem('StickL2c')}
if(localStorage.getItem('StickL2cb') != null){StickL2cbBox.value = localStorage.getItem('StickL2cb')}
document.getElementById('clearStickL2c').addEventListener('click', function(){StickL2c.value = '';localStorage.removeItem('StickL2c');StickL2cb.value = '';localStorage.removeItem('StickL2cb')})


StickR2cBox.addEventListener('focus', function(){joystick(StickR2cBox)})
StickR2cbBox.addEventListener('focus', function(){joystick(StickR2cbBox)})
if(localStorage.getItem('StickR2c') != null){StickR2cBox.value = localStorage.getItem('StickR2c')}
if(localStorage.getItem('StickR2cb') != null){StickR2cbBox.value = localStorage.getItem('StickR2cb')}
document.getElementById('clearStickR2c').addEventListener('click', function(){StickR2c.value = '';localStorage.removeItem('StickR2c');StickR2cb.value = '';localStorage.removeItem('StickR2cb')})

StickD2cBox.addEventListener('focus', function(){joystick(StickD2cBox)})
StickD2cbBox.addEventListener('focus', function(){joystick(StickD2cbBox)})
if(localStorage.getItem('StickD2c') != null){StickD2cBox.value = localStorage.getItem('StickD2c')}
if(localStorage.getItem('StickD2cb') != null){StickD2cbBox.value = localStorage.getItem('StickD2cb')}
document.getElementById('clearStickD2c').addEventListener('click', function(){StickD2c.value = '';localStorage.removeItem('StickD2c');StickD2cb.value = '';localStorage.removeItem('StickD2cb')})

CButtonU2cBox.addEventListener('focus', function(){joystick(CButtonU2cBox)})
CButtonU2cbBox.addEventListener('focus', function(){joystick(CButtonU2cbBox)})
if(localStorage.getItem('CButtonU2c') != null){CButtonU2cBox.value = localStorage.getItem('CButtonU2c')}
if(localStorage.getItem('CButtonU2cb') != null){CButtonU2cbBox.value = localStorage.getItem('CButtonU2cb')}
document.getElementById('clearCButtonU2c').addEventListener('click', function(){CButtonU2c.value = '';localStorage.removeItem('CButtonU2c');CButtonU2cb.value = '';localStorage.removeItem('CButtonU2cb')})

CButtonL2cBox.addEventListener('focus', function(){joystick(CButtonL2cBox)})
CButtonL2cbBox.addEventListener('focus', function(){joystick(CButtonL2cbBox)})
if(localStorage.getItem('CButtonL2c') != null){CButtonL2cBox.value = localStorage.getItem('CButtonL2c')}
if(localStorage.getItem('CButtonL2cb') != null){CButtonL2cbBox.value = localStorage.getItem('CButtonL2cb')}
document.getElementById('clearCButtonL2c').addEventListener('click', function(){CButtonL2c.value = '';localStorage.removeItem('CButtonL2c');CButtonL2cb.value = '';localStorage.removeItem('CButtonL2cb')})

CButtonR2cBox.addEventListener('focus', function(){joystick(CButtonR2cBox)})
CButtonR2cbBox.addEventListener('focus', function(){joystick(CButtonR2cbBox)})
if(localStorage.getItem('CButtonR2c') != null){CButtonR2cBox.value = localStorage.getItem('CButtonR2c')}
if(localStorage.getItem('CButtonR2cb') != null){CButtonR2cbBox.value = localStorage.getItem('CButtonR2cb')}
document.getElementById('clearCButtonR2c').addEventListener('click', function(){CButtonR2c.value = '';localStorage.removeItem('CButtonR2c');CButtonR2cb.value = '';localStorage.removeItem('CButtonR2cb')})

CButtonD2cBox.addEventListener('focus', function(){joystick(CButtonD2cBox)})
CButtonD2cbBox.addEventListener('focus', function(){joystick(CButtonD2cbBox)})
if(localStorage.getItem('CButtonD2c') != null){CButtonD2cBox.value = localStorage.getItem('CButtonD2c')}
if(localStorage.getItem('CButtonD2cb') != null){CButtonD2cbBox.value = localStorage.getItem('CButtonD2cb')}
document.getElementById('clearCButtonD2c').addEventListener('click', function(){CButtonD2c.value = '';localStorage.removeItem('CButtonD2c');CButtonD2cb.value = '';localStorage.removeItem('CButtonD2cb')})

DPadU2cBox.addEventListener('focus', function(){joystick(DPadU2cBox)})
DPadU2cbBox.addEventListener('focus', function(){joystick(DPadU2cbBox)})
if(localStorage.getItem('DPadU2c') != null){DPadU2cBox.value = localStorage.getItem('DPadU2c')}
if(localStorage.getItem('DPadU2cb') != null){DPadU2cbBox.value = localStorage.getItem('DPadU2cb')}
document.getElementById('clearDPadU2c').addEventListener('click', function(){DPadU2c.value = '';localStorage.removeItem('DPadU2c');DPadU2cb.value = '';localStorage.removeItem('DPadU2cb')})

DPadL2cBox.addEventListener('focus', function(){joystick(DPadL2cBox)})
DPadL2cbBox.addEventListener('focus', function(){joystick(DPadL2cbBox)})
if(localStorage.getItem('DPadL2c') != null){DPadL2cBox.value = localStorage.getItem('DPadL2c')}
if(localStorage.getItem('DPadL2cb') != null){DPadL2cbBox.value = localStorage.getItem('DPadL2cb')}
document.getElementById('clearDPadL2c').addEventListener('click', function(){DPadL2c.value = '';localStorage.removeItem('DPadL2c');DPadL2cb.value = '';localStorage.removeItem('DPadL2cb')})

DPadR2cBox.addEventListener('focus', function(){joystick(DPadR2cBox)})
DPadR2cbBox.addEventListener('focus', function(){joystick(DPadR2cbBox)})
if(localStorage.getItem('DPadR2c') != null){DPadR2cBox.value = localStorage.getItem('DPadR2c')}
if(localStorage.getItem('DPadR2cb') != null){DPadR2cBox.value = localStorage.getItem('DPadR2cb')}
document.getElementById('clearDPadR2c').addEventListener('click', function(){DPadR2c.value = '';localStorage.removeItem('DPadR2c');DPadR2cb.value = '';localStorage.removeItem('DPadR2cb')})

DPadD2cBox.addEventListener('focus', function(){joystick(DPadD2cBox)})
DPadD2cbBox.addEventListener('focus', function(){joystick(DPadD2cbBox)})
if(localStorage.getItem('DPadD2c') != null){DPadD2cBox.value = localStorage.getItem('DPadD2c')}
if(localStorage.getItem('DPadD2cb') != null){DPadD2cbBox.value = localStorage.getItem('DPadD2cb')}
document.getElementById('clearDPadD2c').addEventListener('click', function(){DPadD2c.value = '';localStorage.removeItem('DPadD2c');DPadD2cb.value = '';localStorage.removeItem('DPadD2cb')})

Start2cBox.addEventListener('focus', function(){joystick(Start2cBox)})
Start2cbBox.addEventListener('focus', function(){joystick(Start2cbBox)})
if(localStorage.getItem('Start2c') != null){Start2cBox.value = localStorage.getItem('Start2c')}
if(localStorage.getItem('Start2cb') != null){Start2cbBox.value = localStorage.getItem('Start2cb')}
document.getElementById('clearStart2c').addEventListener('click', function(){Start2c.value = '';localStorage.removeItem('Start2c');Start2cb.value = '';localStorage.removeItem('Start2cb')})

AButton2cBox.addEventListener('focus', function(){joystick(AButton2cBox)})
AButton2cbBox.addEventListener('focus', function(){joystick(AButton2cbBox)})
if(localStorage.getItem('AButton2c') != null){AButton2cBox.value = localStorage.getItem('AButton2c')}
if(localStorage.getItem('AButton2cb') != null){AButton2cbBox.value = localStorage.getItem('AButton2cb')}
document.getElementById('clearAButton2c').addEventListener('click', function(){AButton2c.value = '';localStorage.removeItem('AButton2c');AButton2cb.value = '';localStorage.removeItem('AButton2cb')})

BButton2cBox.addEventListener('focus', function(){joystick(BButton2cBox)})
BButton2cbBox.addEventListener('focus', function(){joystick(BButton2cbBox)})
if(localStorage.getItem('BButton2c') != null){BButton2cBox.value = localStorage.getItem('BButton2c')}
if(localStorage.getItem('BButton2cb') != null){BButton2cbBox.value = localStorage.getItem('BButton2cb')}
document.getElementById('clearBButton2c').addEventListener('click', function(){BButton2c.value = '';localStorage.removeItem('BButton2c');BButton2cb.value = '';localStorage.removeItem('BButton2cb')})

LTrig2cBox.addEventListener('focus', function(){joystick(LTrig2cBox)})
LTrig2cbBox.addEventListener('focus', function(){joystick(LTrig2cbBox)})
if(localStorage.getItem('LTrig2c') != null){LTrig2cBox.value = localStorage.getItem('LTrig2c')}
if(localStorage.getItem('LTrig2cb') != null){LTrig2cbBox.value = localStorage.getItem('LTrig2cb')}
document.getElementById('clearLTrig2c').addEventListener('click', function(){LTrig2c.value = '';localStorage.removeItem('LTrig2c');LTrig2cb.value = '';localStorage.removeItem('LTrig2cb')})

RTrig2cBox.addEventListener('focus', function(){joystick(RTrig2cBox)})
RTrig2cbBox.addEventListener('focus', function(){joystick(RTrig2cbBox)})
if(localStorage.getItem('RTrig2c') != null){RTrig2cBox.value = localStorage.getItem('RTrig2c')}
if(localStorage.getItem('RTrig2cb') != null){RTrig2cbBox.value = localStorage.getItem('RTrig2cb')}
document.getElementById('clearRTrig2c').addEventListener('click', function(){RTrig2c.value = '';localStorage.removeItem('RTrig2c');RTrig2cb.value = '';localStorage.removeItem('RTrig2cb')})

ZTrig2cBox.addEventListener('focus', function(){joystick(ZTrig2cBox)})
ZTrig2cbBox.addEventListener('focus', function(){joystick(ZTrig2cbBox)})
if(localStorage.getItem('ZTrig2c') != null){ZTrig2cBox.value = localStorage.getItem('ZTrig2c')}
if(localStorage.getItem('ZTrig2cb') != null){ZTrig2cbBox.value = localStorage.getItem('ZTrig2cb')}
document.getElementById('clearZTrig2c').addEventListener('click', function(){ZTrig2c.value = '';localStorage.removeItem('ZTrig2c');ZTrig2cb.value = '';localStorage.removeItem('ZTrig2cb')})

MempakSwitch2cBox.addEventListener('focus', function(){joystick(MempakSwitch2cBox)})
MempakSwitch2cbBox.addEventListener('focus', function(){joystick(MempakSwitch2cbBox)})
if(localStorage.getItem('MempakSwitch2c') != null){MempakSwitch2cBox.value = localStorage.getItem('MempakSwitch2c')}
if(localStorage.getItem('MempakSwitch2cb') != null){MempakSwitch2cbBox.value = localStorage.getItem('MempakSwitch2cb')}
document.getElementById('clearMempakSwitch2c').addEventListener('click', function(){MempakSwitch2c.value = '';localStorage.removeItem('MempakSwitch2c');MempakSwitch2cb.value = '';localStorage.removeItem('MempakSwitch2cb')})

RumblepakSwitch2cBox.addEventListener('focus', function(){joystick(RumblepakSwitch2cBox)})
RumblepakSwitch2cbBox.addEventListener('focus', function(){joystick(RumblepakSwitch2cbBox)})
if(localStorage.getItem('RumblepakSwitch2c') != null){RumblepakSwitch2cBox.value = localStorage.getItem('RumblepakSwitch2c')}
if(localStorage.getItem('RumblepakSwitch2cb') != null){RumblepakSwitch2cbBox.value = localStorage.getItem('RumblepakSwitch2cb')}
document.getElementById('clearRumblepakSwitch2c').addEventListener('click', function(){RumblepakSwitch2c.value = '';localStorage.removeItem('RumblepakSwitch2c');RumblepakSwitch2cb.value = '';localStorage.removeItem('RumblepakSwitch2cb')})



StickU3cBox.addEventListener('focus', function(){joystick(StickU3cBox)})
StickU3cbBox.addEventListener('focus', function(){joystick(StickU3cbBox)})
if(localStorage.getItem('StickU3c') != null){StickU3cBox.value = localStorage.getItem('StickU3c')}
if(localStorage.getItem('StickU3cb') != null){StickU3cbBox.value = localStorage.getItem('StickU3cb')}
document.getElementById('clearStickU3c').addEventListener('click', function(){StickU3c.value = '';localStorage.removeItem('StickU3c');StickU3cb.value = '';localStorage.removeItem('StickU3cb')})

StickL3cBox.addEventListener('focus', function(){joystick(StickL3cBox)})
StickL3cbBox.addEventListener('focus', function(){joystick(StickL3cbBox)})
if(localStorage.getItem('StickL3c') != null){StickL3cBox.value = localStorage.getItem('StickL3c')}
if(localStorage.getItem('StickL3cb') != null){StickL3cbBox.value = localStorage.getItem('StickL3cb')}
document.getElementById('clearStickL3c').addEventListener('click', function(){StickL3c.value = '';localStorage.removeItem('StickL3c');StickL3cb.value = '';localStorage.removeItem('StickL3cb')})

StickR3cBox.addEventListener('focus', function(){joystick(StickR3cBox)})
StickR3cbBox.addEventListener('focus', function(){joystick(StickR3cbBox)})
if(localStorage.getItem('StickR3c') != null){StickR3cBox.value = localStorage.getItem('StickR3c')}
if(localStorage.getItem('StickR3cb') != null){StickR3cbBox.value = localStorage.getItem('StickR3cb')}
document.getElementById('clearStickR3c').addEventListener('click', function(){StickR3c.value = '';localStorage.removeItem('StickR3c');StickR3cb.value = '';localStorage.removeItem('StickR3cb')})

StickD3cBox.addEventListener('focus', function(){joystick(StickD3cBox)})
StickD3cbBox.addEventListener('focus', function(){joystick(StickD3cbBox)})
if(localStorage.getItem('StickD3c') != null){StickD3cBox.value = localStorage.getItem('StickD3c')}
if(localStorage.getItem('StickD3cb') != null){StickD3cbBox.value = localStorage.getItem('StickD3cb')}
document.getElementById('clearStickD3c').addEventListener('click', function(){StickD3c.value = '';localStorage.removeItem('StickD3c');StickD3cb.value = '';localStorage.removeItem('StickD3cb')})

CButtonU3cBox.addEventListener('focus', function(){joystick(CButtonU3cBox)})
CButtonU3cbBox.addEventListener('focus', function(){joystick(CButtonU3cbBox)})
if(localStorage.getItem('CButtonU3c') != null){CButtonU3cBox.value = localStorage.getItem('CButtonU3c')}
if(localStorage.getItem('CButtonU3cb') != null){CButtonU3cbBox.value = localStorage.getItem('CButtonU3cb')}
document.getElementById('clearCButtonU3c').addEventListener('click', function(){CButtonU3c.value = '';localStorage.removeItem('CButtonU3c');CButtonU3cb.value = '';localStorage.removeItem('CButtonU3cb')})

CButtonL3cBox.addEventListener('focus', function(){joystick(CButtonL3cBox)})
CButtonL3cbBox.addEventListener('focus', function(){joystick(CButtonL3cbBox)})
if(localStorage.getItem('CButtonL3c') != null){CButtonL3cBox.value = localStorage.getItem('CButtonL3c')}
if(localStorage.getItem('CButtonL3cb') != null){CButtonL3cbBox.value = localStorage.getItem('CButtonL3cb')}
document.getElementById('clearCButtonL3c').addEventListener('click', function(){CButtonL3c.value = '';localStorage.removeItem('CButtonL3c');CButtonL3cb.value = '';localStorage.removeItem('CButtonL3cb')})

CButtonR3cBox.addEventListener('focus', function(){joystick(CButtonR3cBox)})
CButtonR3cbBox.addEventListener('focus', function(){joystick(CButtonR3cbBox)})
if(localStorage.getItem('CButtonR3c') != null){CButtonR3cBox.value = localStorage.getItem('CButtonR3c')}
if(localStorage.getItem('CButtonR3cb') != null){CButtonR3cbBox.value = localStorage.getItem('CButtonR3cb')}
document.getElementById('clearCButtonR3c').addEventListener('click', function(){CButtonR3c.value = '';localStorage.removeItem('CButtonR3c');CButtonR3cb.value = '';localStorage.removeItem('CButtonR3cb')})

CButtonD3cBox.addEventListener('focus', function(){joystick(CButtonD3cBox)})
CButtonD3cbBox.addEventListener('focus', function(){joystick(CButtonD3cbBox)})
if(localStorage.getItem('CButtonD3c') != null){CButtonD3cBox.value = localStorage.getItem('CButtonD3c')}
if(localStorage.getItem('CButtonD3cb') != null){CButtonD3cbBox.value = localStorage.getItem('CButtonD3cb')}
document.getElementById('clearCButtonD3c').addEventListener('click', function(){CButtonD3c.value = '';localStorage.removeItem('CButtonD3c');CButtonD3cb.value = '';localStorage.removeItem('CButtonD3cb')})

DPadU3cBox.addEventListener('focus', function(){joystick(DPadU3cBox)})
DPadU3cbBox.addEventListener('focus', function(){joystick(DPadU3cbBox)})
if(localStorage.getItem('DPadU3c') != null){DPadU3cBox.value = localStorage.getItem('DPadU3c')}
if(localStorage.getItem('DPadU3cb') != null){DPadU3cbBox.value = localStorage.getItem('DPadU3cb')}
document.getElementById('clearDPadU3c').addEventListener('click', function(){DPadU3c.value = '';localStorage.removeItem('DPadU3c');DPadU3cb.value = '';localStorage.removeItem('DPadU3cb')})

DPadL3cBox.addEventListener('focus', function(){joystick(DPadL3cBox)})
DPadL3cbBox.addEventListener('focus', function(){joystick(DPadL3cbBox)})
if(localStorage.getItem('DPadL3c') != null){DPadL3cBox.value = localStorage.getItem('DPadL3c')}
if(localStorage.getItem('DPadL3cb') != null){DPadL3cbBox.value = localStorage.getItem('DPadL3cb')}
document.getElementById('clearDPadL3c').addEventListener('click', function(){DPadL3c.value = '';localStorage.removeItem('DPadL3c');DPadL3cb.value = '';localStorage.removeItem('DPadL3cb')})

DPadR3cBox.addEventListener('focus', function(){joystick(DPadR3cBox)})
DPadR3cbBox.addEventListener('focus', function(){joystick(DPadR3cbBox)})
if(localStorage.getItem('DPadR3c') != null){DPadR3cBox.value = localStorage.getItem('DPadR3c')}
if(localStorage.getItem('DPadR3cb') != null){DPadR3cBox.value = localStorage.getItem('DPadR3cb')}
document.getElementById('clearDPadR3c').addEventListener('click', function(){DPadR3c.value = '';localStorage.removeItem('DPadR3c');DPadR3cb.value = '';localStorage.removeItem('DPadR3cb')})

DPadD3cBox.addEventListener('focus', function(){joystick(DPadD3cBox)})
DPadD3cbBox.addEventListener('focus', function(){joystick(DPadD3cbBox)})
if(localStorage.getItem('DPadD3c') != null){DPadD3cBox.value = localStorage.getItem('DPadD3c')}
if(localStorage.getItem('DPadD3cb') != null){DPadD3cbBox.value = localStorage.getItem('DPadD3cb')}
document.getElementById('clearDPadD3c').addEventListener('click', function(){DPadD3c.value = '';localStorage.removeItem('DPadD3c');DPadD3cb.value = '';localStorage.removeItem('DPadD3cb')})

Start3cBox.addEventListener('focus', function(){joystick(Start3cBox)})
Start3cbBox.addEventListener('focus', function(){joystick(Start3cbBox)})
if(localStorage.getItem('Start3c') != null){Start3cBox.value = localStorage.getItem('Start3c')}
if(localStorage.getItem('Start3cb') != null){Start3cbBox.value = localStorage.getItem('Start3cb')}
document.getElementById('clearStart3c').addEventListener('click', function(){Start3c.value = '';localStorage.removeItem('Start3c');Start3cb.value = '';localStorage.removeItem('Start3cb')})

AButton3cBox.addEventListener('focus', function(){joystick(AButton3cBox)})
AButton3cbBox.addEventListener('focus', function(){joystick(AButton3cbBox)})
if(localStorage.getItem('AButton3c') != null){AButton3cBox.value = localStorage.getItem('AButton3c')}
if(localStorage.getItem('AButton3cb') != null){AButton3cbBox.value = localStorage.getItem('AButton3cb')}
document.getElementById('clearAButton3c').addEventListener('click', function(){AButton3c.value = '';localStorage.removeItem('AButton3c');AButton3cb.value = '';localStorage.removeItem('AButton3cb')})

BButton3cBox.addEventListener('focus', function(){joystick(BButton3cBox)})
BButton3cbBox.addEventListener('focus', function(){joystick(BButton3cbBox)})
if(localStorage.getItem('BButton3c') != null){BButton3cBox.value = localStorage.getItem('BButton3c')}
if(localStorage.getItem('BButton3cb') != null){BButton3cbBox.value = localStorage.getItem('BButton3cb')}
document.getElementById('clearBButton3c').addEventListener('click', function(){BButton3c.value = '';localStorage.removeItem('BButton3c');BButton3cb.value = '';localStorage.removeItem('BButton3cb')})

LTrig3cBox.addEventListener('focus', function(){joystick(LTrig3cBox)})
LTrig3cbBox.addEventListener('focus', function(){joystick(LTrig3cbBox)})
if(localStorage.getItem('LTrig3c') != null){LTrig3cBox.value = localStorage.getItem('LTrig3c')}
if(localStorage.getItem('LTrig3cb') != null){LTrig3cbBox.value = localStorage.getItem('LTrig3cb')}
document.getElementById('clearLTrig3c').addEventListener('click', function(){LTrig3c.value = '';localStorage.removeItem('LTrig3c');LTrig3cb.value = '';localStorage.removeItem('LTrig3cb')})

RTrig3cBox.addEventListener('focus', function(){joystick(RTrig3cBox)})
RTrig3cbBox.addEventListener('focus', function(){joystick(RTrig3cbBox)})
if(localStorage.getItem('RTrig3c') != null){RTrig3cBox.value = localStorage.getItem('RTrig3c')}
if(localStorage.getItem('RTrig3cb') != null){RTrig3cbBox.value = localStorage.getItem('RTrig3cb')}
document.getElementById('clearRTrig3c').addEventListener('click', function(){RTrig3c.value = '';localStorage.removeItem('RTrig3c');RTrig3cb.value = '';localStorage.removeItem('RTrig3cb')})

ZTrig3cBox.addEventListener('focus', function(){joystick(ZTrig3cBox)})
ZTrig3cbBox.addEventListener('focus', function(){joystick(ZTrig3cbBox)})
if(localStorage.getItem('ZTrig3c') != null){ZTrig3cBox.value = localStorage.getItem('ZTrig3c')}
if(localStorage.getItem('ZTrig3cb') != null){ZTrig3cbBox.value = localStorage.getItem('ZTrig3cb')}
document.getElementById('clearZTrig3c').addEventListener('click', function(){ZTrig3c.value = '';localStorage.removeItem('ZTrig3c');ZTrig3cb.value = '';localStorage.removeItem('ZTrig3cb')})

MempakSwitch3cBox.addEventListener('focus', function(){joystick(MempakSwitch3cBox)})
MempakSwitch3cbBox.addEventListener('focus', function(){joystick(MempakSwitch3cbBox)})
if(localStorage.getItem('MempakSwitch3c') != null){MempakSwitch3cBox.value = localStorage.getItem('MempakSwitch3c')}
if(localStorage.getItem('MempakSwitch3cb') != null){MempakSwitch3cbBox.value = localStorage.getItem('MempakSwitch3cb')}
document.getElementById('clearMempakSwitch3c').addEventListener('click', function(){MempakSwitch3c.value = '';localStorage.removeItem('MempakSwitch3c');MempakSwitch3cb.value = '';localStorage.removeItem('MempakSwitch3cb')})

RumblepakSwitch3cBox.addEventListener('focus', function(){joystick(RumblepakSwitch3cBox)})
RumblepakSwitch3cbBox.addEventListener('focus', function(){joystick(RumblepakSwitch3cbBox)})
if(localStorage.getItem('RumblepakSwitch3c') != null){RumblepakSwitch3cBox.value = localStorage.getItem('RumblepakSwitch3c')}
if(localStorage.getItem('RumblepakSwitch3cb') != null){RumblepakSwitch3cbBox.value = localStorage.getItem('RumblepakSwitch3cb')}
document.getElementById('clearRumblepakSwitch3c').addEventListener('click', function(){RumblepakSwitch3c.value = '';localStorage.removeItem('RumblepakSwitch3c');RumblepakSwitch3cb.value = '';localStorage.removeItem('RumblepakSwitch3cb')})



StickU4cBox.addEventListener('focus', function(){joystick(StickU4cBox)})
StickU4cbBox.addEventListener('focus', function(){joystick(StickU4cbBox)})
if(localStorage.getItem('StickU4c') != null){StickU4cBox.value = localStorage.getItem('StickU4c')}
if(localStorage.getItem('StickU4cb') != null){StickU4cbBox.value = localStorage.getItem('StickU4cb')}
document.getElementById('clearStickU4c').addEventListener('click', function(){StickU4c.value = '';localStorage.removeItem('StickU4c');StickU4cb.value = '';localStorage.removeItem('StickU4cb')})

StickL4cBox.addEventListener('focus', function(){joystick(StickL4cBox)})
StickL4cbBox.addEventListener('focus', function(){joystick(StickL4cbBox)})
if(localStorage.getItem('StickL4c') != null){StickL4cBox.value = localStorage.getItem('StickL4c')}
if(localStorage.getItem('StickL4cb') != null){StickL4cbBox.value = localStorage.getItem('StickL4cb')}
document.getElementById('clearStickL4c').addEventListener('click', function(){StickL4c.value = '';localStorage.removeItem('StickL4c');StickL4cb.value = '';localStorage.removeItem('StickL4cb')})

StickR4cBox.addEventListener('focus', function(){joystick(StickR4cBox)})
StickR4cbBox.addEventListener('focus', function(){joystick(StickR4cbBox)})
if(localStorage.getItem('StickR4c') != null){StickR4cBox.value = localStorage.getItem('StickR4c')}
if(localStorage.getItem('StickR4cb') != null){StickR4cbBox.value = localStorage.getItem('StickR4cb')}
document.getElementById('clearStickR4c').addEventListener('click', function(){StickR4c.value = '';localStorage.removeItem('StickR4c');StickR4cb.value = '';localStorage.removeItem('StickR4cb')})

StickD4cBox.addEventListener('focus', function(){joystick(StickD4cBox)})
StickD4cbBox.addEventListener('focus', function(){joystick(StickD4cbBox)})
if(localStorage.getItem('StickD4c') != null){StickD4cBox.value = localStorage.getItem('StickD4c')}
if(localStorage.getItem('StickD4cb') != null){StickD4cbBox.value = localStorage.getItem('StickD4cb')}
document.getElementById('clearStickD4c').addEventListener('click', function(){StickD4c.value = '';localStorage.removeItem('StickD4c');StickD4cb.value = '';localStorage.removeItem('StickD4cb')})

CButtonU4cBox.addEventListener('focus', function(){joystick(CButtonU4cBox)})
CButtonU4cbBox.addEventListener('focus', function(){joystick(CButtonU4cbBox)})
if(localStorage.getItem('CButtonU4c') != null){CButtonU4cBox.value = localStorage.getItem('CButtonU4c')}
if(localStorage.getItem('CButtonU4cb') != null){CButtonU4cbBox.value = localStorage.getItem('CButtonU4cb')}
document.getElementById('clearCButtonU4c').addEventListener('click', function(){CButtonU4c.value = '';localStorage.removeItem('CButtonU4c');CButtonU4cb.value = '';localStorage.removeItem('CButtonU4cb')})

CButtonL4cBox.addEventListener('focus', function(){joystick(CButtonL4cBox)})
CButtonL4cbBox.addEventListener('focus', function(){joystick(CButtonL4cbBox)})
if(localStorage.getItem('CButtonL4c') != null){CButtonL4cBox.value = localStorage.getItem('CButtonL4c')}
if(localStorage.getItem('CButtonL4cb') != null){CButtonL4cbBox.value = localStorage.getItem('CButtonL4cb')}
document.getElementById('clearCButtonL4c').addEventListener('click', function(){CButtonL4c.value = '';localStorage.removeItem('CButtonL4c');CButtonL4cb.value = '';localStorage.removeItem('CButtonL4cb')})

CButtonR4cBox.addEventListener('focus', function(){joystick(CButtonR4cBox)})
CButtonR4cbBox.addEventListener('focus', function(){joystick(CButtonR4cbBox)})
if(localStorage.getItem('CButtonR4c') != null){CButtonR4cBox.value = localStorage.getItem('CButtonR4c')}
if(localStorage.getItem('CButtonR4cb') != null){CButtonR4cbBox.value = localStorage.getItem('CButtonR4cb')}
document.getElementById('clearCButtonR4c').addEventListener('click', function(){CButtonR4c.value = '';localStorage.removeItem('CButtonR4c');CButtonR4cb.value = '';localStorage.removeItem('CButtonR4cb')})

CButtonD4cBox.addEventListener('focus', function(){joystick(CButtonD4cBox)})
CButtonD4cbBox.addEventListener('focus', function(){joystick(CButtonD4cbBox)})
if(localStorage.getItem('CButtonD4c') != null){CButtonD4cBox.value = localStorage.getItem('CButtonD4c')}
if(localStorage.getItem('CButtonD4cb') != null){CButtonD4cbBox.value = localStorage.getItem('CButtonD4cb')}
document.getElementById('clearCButtonD4c').addEventListener('click', function(){CButtonD4c.value = '';localStorage.removeItem('CButtonD4c');CButtonD4cb.value = '';localStorage.removeItem('CButtonD4cb')})

DPadU4cBox.addEventListener('focus', function(){joystick(DPadU4cBox)})
DPadU4cbBox.addEventListener('focus', function(){joystick(DPadU4cbBox)})
if(localStorage.getItem('DPadU4c') != null){DPadU4cBox.value = localStorage.getItem('DPadU4c')}
if(localStorage.getItem('DPadU4cb') != null){DPadU4cbBox.value = localStorage.getItem('DPadU4cb')}
document.getElementById('clearDPadU4c').addEventListener('click', function(){DPadU4c.value = '';localStorage.removeItem('DPadU4c');DPadU4cb.value = '';localStorage.removeItem('DPadU4cb')})

DPadL4cBox.addEventListener('focus', function(){joystick(DPadL4cBox)})
DPadL4cbBox.addEventListener('focus', function(){joystick(DPadL4cbBox)})
if(localStorage.getItem('DPadL4c') != null){DPadL4cBox.value = localStorage.getItem('DPadL4c')}
if(localStorage.getItem('DPadL4cb') != null){DPadL4cbBox.value = localStorage.getItem('DPadL4cb')}
document.getElementById('clearDPadL4c').addEventListener('click', function(){DPadL4c.value = '';localStorage.removeItem('DPadL4c');DPadL4cb.value = '';localStorage.removeItem('DPadL4cb')})

DPadR4cBox.addEventListener('focus', function(){joystick(DPadR4cBox)})
DPadR4cbBox.addEventListener('focus', function(){joystick(DPadR4cbBox)})
if(localStorage.getItem('DPadR4c') != null){DPadR4cBox.value = localStorage.getItem('DPadR4c')}
if(localStorage.getItem('DPadR4cb') != null){DPadR4cBox.value = localStorage.getItem('DPadR4cb')}
document.getElementById('clearDPadR4c').addEventListener('click', function(){DPadR4c.value = '';localStorage.removeItem('DPadR4c');DPadR4cb.value = '';localStorage.removeItem('DPadR4cb')})

DPadD4cBox.addEventListener('focus', function(){joystick(DPadD4cBox)})
DPadD4cbBox.addEventListener('focus', function(){joystick(DPadD4cbBox)})
if(localStorage.getItem('DPadD4c') != null){DPadD4cBox.value = localStorage.getItem('DPadD4c')}
if(localStorage.getItem('DPadD4cb') != null){DPadD4cbBox.value = localStorage.getItem('DPadD4cb')}
document.getElementById('clearDPadD4c').addEventListener('click', function(){DPadD4c.value = '';localStorage.removeItem('DPadD4c');DPadD4cb.value = '';localStorage.removeItem('DPadD4cb')})

Start4cBox.addEventListener('focus', function(){joystick(Start4cBox)})
Start4cbBox.addEventListener('focus', function(){joystick(Start4cbBox)})
if(localStorage.getItem('Start4c') != null){Start4cBox.value = localStorage.getItem('Start4c')}
if(localStorage.getItem('Start4cb') != null){Start4cbBox.value = localStorage.getItem('Start4cb')}
document.getElementById('clearStart4c').addEventListener('click', function(){Start4c.value = '';localStorage.removeItem('Start4c');Start4cb.value = '';localStorage.removeItem('Start4cb')})

AButton4cBox.addEventListener('focus', function(){joystick(AButton4cBox)})
AButton4cbBox.addEventListener('focus', function(){joystick(AButton4cbBox)})
if(localStorage.getItem('AButton4c') != null){AButton4cBox.value = localStorage.getItem('AButton4c')}
if(localStorage.getItem('AButton4cb') != null){AButton4cbBox.value = localStorage.getItem('AButton4cb')}
document.getElementById('clearAButton4c').addEventListener('click', function(){AButton4c.value = '';localStorage.removeItem('AButton4c');AButton4cb.value = '';localStorage.removeItem('AButton4cb')})

BButton4cBox.addEventListener('focus', function(){joystick(BButton4cBox)})
BButton4cbBox.addEventListener('focus', function(){joystick(BButton4cbBox)})
if(localStorage.getItem('BButton4c') != null){BButton4cBox.value = localStorage.getItem('BButton4c')}
if(localStorage.getItem('BButton4cb') != null){BButton4cbBox.value = localStorage.getItem('BButton4cb')}
document.getElementById('clearBButton4c').addEventListener('click', function(){BButton4c.value = '';localStorage.removeItem('BButton4c');BButton4cb.value = '';localStorage.removeItem('BButton4cb')})

LTrig4cBox.addEventListener('focus', function(){joystick(LTrig4cBox)})
LTrig4cbBox.addEventListener('focus', function(){joystick(LTrig4cbBox)})
if(localStorage.getItem('LTrig4c') != null){LTrig4cBox.value = localStorage.getItem('LTrig4c')}
if(localStorage.getItem('LTrig4cb') != null){LTrig4cbBox.value = localStorage.getItem('LTrig4cb')}
document.getElementById('clearLTrig4c').addEventListener('click', function(){LTrig4c.value = '';localStorage.removeItem('LTrig4c');LTrig4cb.value = '';localStorage.removeItem('LTrig4cb')})

RTrig4cBox.addEventListener('focus', function(){joystick(RTrig4cBox)})
RTrig4cbBox.addEventListener('focus', function(){joystick(RTrig4cbBox)})
if(localStorage.getItem('RTrig4c') != null){RTrig4cBox.value = localStorage.getItem('RTrig4c')}
if(localStorage.getItem('RTrig4cb') != null){RTrig4cbBox.value = localStorage.getItem('RTrig4cb')}
document.getElementById('clearRTrig4c').addEventListener('click', function(){RTrig4c.value = '';localStorage.removeItem('RTrig4c');RTrig4cb.value = '';localStorage.removeItem('RTrig4cb')})

ZTrig4cBox.addEventListener('focus', function(){joystick(ZTrig4cBox)})
ZTrig4cbBox.addEventListener('focus', function(){joystick(ZTrig4cbBox)})
if(localStorage.getItem('ZTrig4c') != null){ZTrig4cBox.value = localStorage.getItem('ZTrig4c')}
if(localStorage.getItem('ZTrig4cb') != null){ZTrig4cbBox.value = localStorage.getItem('ZTrig4cb')}
document.getElementById('clearZTrig4c').addEventListener('click', function(){ZTrig4c.value = '';localStorage.removeItem('ZTrig4c');ZTrig4cb.value = '';localStorage.removeItem('ZTrig4cb')})

MempakSwitch4cBox.addEventListener('focus', function(){joystick(MempakSwitch4cBox)})
MempakSwitch4cbBox.addEventListener('focus', function(){joystick(MempakSwitch4cbBox)})
if(localStorage.getItem('MempakSwitch4c') != null){MempakSwitch4cBox.value = localStorage.getItem('MempakSwitch4c')}
if(localStorage.getItem('MempakSwitch4cb') != null){MempakSwitch4cbBox.value = localStorage.getItem('MempakSwitch4cb')}
document.getElementById('clearMempakSwitch4c').addEventListener('click', function(){MempakSwitch4c.value = '';localStorage.removeItem('MempakSwitch4c');MempakSwitch4cb.value = '';localStorage.removeItem('MempakSwitch4cb')})

RumblepakSwitch4cBox.addEventListener('focus', function(){joystick(RumblepakSwitch4cBox)})
RumblepakSwitch4cbBox.addEventListener('focus', function(){joystick(RumblepakSwitch4cbBox)})
if(localStorage.getItem('RumblepakSwitch4c') != null){RumblepakSwitch4cBox.value = localStorage.getItem('RumblepakSwitch4c')}
if(localStorage.getItem('RumblepakSwitch4cb') != null){RumblepakSwitch4cbBox.value = localStorage.getItem('RumblepakSwitch4cb')}
document.getElementById('clearRumblepakSwitch4c').addEventListener('click', function(){RumblepakSwitch4c.value = '';localStorage.removeItem('RumblepakSwitch4c');RumblepakSwitch4cb.value = '';localStorage.removeItem('RumblepakSwitch4cb')})



JoyMappingStop1Box.addEventListener('focus', function(){joystick(JoyMappingStop1Box)})
if(localStorage.getItem('JoyMappingStop1') != null){JoyMappingStop1Box.value = localStorage.getItem('JoyMappingStop1')}
document.getElementById('clearJoyMappingStop1').addEventListener('click', function(){JoyMappingStop1.value = '';localStorage.removeItem('JoyMappingStop1')})

JoyMappingFullscreen1Box.addEventListener('focus', function(){joystick(JoyMappingFullscreen1Box)})
if(localStorage.getItem('JoyMappingFullscreen1') != null){JoyMappingFullscreen1Box.value = localStorage.getItem('JoyMappingFullscreen1')}
document.getElementById('clearJoyMappingFullscreen1').addEventListener('click', function(){JoyMappingFullscreen1.value = '';localStorage.removeItem('JoyMappingFullscreen1')})

JoyMappingSaveState1Box.addEventListener('focus', function(){joystick(JoyMappingSaveState1Box)})
if(localStorage.getItem('JoyMappingSaveState1') != null){JoyMappingSaveState1Box.value = localStorage.getItem('JoyMappingSaveState1')}
document.getElementById('clearJoyMappingSaveState1').addEventListener('click', function(){JoyMappingSaveState1.value = '';localStorage.removeItem('JoyMappingSaveState1')})

JoyMappingLoadState1Box.addEventListener('focus', function(){joystick(JoyMappingLoadState1Box)})
if(localStorage.getItem('JoyMappingLoadState1') != null){JoyMappingLoadState1Box.value = localStorage.getItem('JoyMappingLoadState1')}
document.getElementById('clearJoyMappingLoadState1').addEventListener('click', function(){JoyMappingLoadState1.value = '';localStorage.removeItem('JoyMappingLoadState1')})

JoyMappingIncrementSlot1Box.addEventListener('focus', function(){joystick(JoyMappingIncrementSlot1Box)})
if(localStorage.getItem('JoyMappingIncrementSlot1') != null){JoyMappingIncrementSlot1Box.value = localStorage.getItem('JoyMappingIncrementSlot1')}
document.getElementById('clearJoyMappingIncrementSlot1').addEventListener('click', function(){JoyMappingIncrementSlot1.value = '';localStorage.removeItem('JoyMappingIncrementSlot1')})

JoyMappingReset1Box.addEventListener('focus', function(){joystick(JoyMappingReset1Box)})
if(localStorage.getItem('JoyMappingReset1') != null){JoyMappingReset1Box.value = localStorage.getItem('JoyMappingReset1')}
document.getElementById('clearJoyMappingReset1').addEventListener('click', function(){JoyMappingReset1.value = '';localStorage.removeItem('JoyMappingReset1')})

JoyMappingSpeedDown1Box.addEventListener('focus', function(){joystick(JoyMappingSpeedDown1Box)})
if(localStorage.getItem('JoyMappingSpeedDown1') != null){JoyMappingSpeedDown1Box.value = localStorage.getItem('JoyMappingSpeedDown1')}
document.getElementById('clearJoyMappingSpeedDown1').addEventListener('click', function(){JoyMappingSpeedDown1.value = '';localStorage.removeItem('JoyMappingSpeedDown1')})

JoyMappingSpeedUp1Box.addEventListener('focus', function(){joystick(JoyMappingSpeedUp1Box)})
if(localStorage.getItem('JoyMappingSpeedUp1') != null){JoyMappingSpeedUp1Box.value = localStorage.getItem('JoyMappingSpeedUp1')}
document.getElementById('clearJoyMappingSpeedUp1').addEventListener('click', function(){JoyMappingSpeedUp1.value = '';localStorage.removeItem('JoyMappingSpeedUp1')})

JoyMappingScreenshot1Box.addEventListener('focus', function(){joystick(JoyMappingScreenshot1Box)})
if(localStorage.getItem('JoyMappingScreenshot1') != null){JoyMappingScreenshot1Box.value = localStorage.getItem('JoyMappingScreenshot1')}
document.getElementById('clearJoyMappingScreenshot1').addEventListener('click', function(){JoyMappingScreenshot1.value = '';localStorage.removeItem('JoyMappingScreenshot1')})

JoyMappingPause1Box.addEventListener('focus', function(){joystick(JoyMappingPause1Box)})
if(localStorage.getItem('JoyMappingPause1') != null){JoyMappingPause1Box.value = localStorage.getItem('JoyMappingPause1')}
document.getElementById('clearJoyMappingPause1').addEventListener('click', function(){JoyMappingPause1.value = '';localStorage.removeItem('JoyMappingPause1')})

JoyMappingMute1Box.addEventListener('focus', function(){joystick(JoyMappingMute1Box)})
if(localStorage.getItem('JoyMappingMute1') != null){JoyMappingMute1Box.value = localStorage.getItem('JoyMappingMute1')}
document.getElementById('clearJoyMappingMute1').addEventListener('click', function(){JoyMappingMute1.value = '';localStorage.removeItem('JoyMappingMute1')})

JoyMappingIncreaseVolume1Box.addEventListener('focus', function(){joystick(JoyMappingIncreaseVolume1Box)})
if(localStorage.getItem('JoyMappingIncreaseVolume1') != null){JoyMappingIncreaseVolume1Box.value = localStorage.getItem('JoyMappingIncreaseVolume1')}
document.getElementById('clearJoyMappingIncreaseVolume1').addEventListener('click', function(){JoyMappingIncreaseVolume1.value = '';localStorage.removeItem('JoyMappingIncreaseVolume1')})

JoyMappingDecreaseVolume1Box.addEventListener('focus', function(){joystick(JoyMappingDecreaseVolume1Box)})
if(localStorage.getItem('JoyMappingDecreaseVolume1') != null){JoyMappingDecreaseVolume1Box.value = localStorage.getItem('JoyMappingDecreaseVolume1')}
document.getElementById('clearJoyMappingDecreaseVolume1').addEventListener('click', function(){JoyMappingDecreaseVolume1.value = '';localStorage.removeItem('JoyMappingDecreaseVolume1')})

JoyMappingFastForward1Box.addEventListener('focus', function(){joystick(JoyMappingFastForward1Box)})
if(localStorage.getItem('JoyMappingFastForward1') != null){JoyMappingFastForward1Box.value = localStorage.getItem('JoyMappingFastForward1')}
document.getElementById('clearJoyMappingFastForward1').addEventListener('click', function(){JoyMappingFastForward1.value = '';localStorage.removeItem('JoyMappingFastForward1')})

JoyMappingFrameAdvance1Box.addEventListener('focus', function(){joystick(JoyMappingFrameAdvance1Box)})
if(localStorage.getItem('JoyMappingFrameAdvance1') != null){JoyMappingFrameAdvance1Box.value = localStorage.getItem('JoyMappingFrameAdvance1')}
document.getElementById('clearJoyMappingFrameAdvance1').addEventListener('click', function(){JoyMappingFrameAdvance1.value = '';localStorage.removeItem('JoyMappingFrameAdvance1')})

JoyMappingGameshark1Box.addEventListener('focus', function(){joystick(JoyMappingGameshark1Box)})
if(localStorage.getItem('JoyMappingGameshark1') != null){JoyMappingGameshark1Box.value = localStorage.getItem('JoyMappingGameshark1')}
document.getElementById('clearJoyMappingGameshark1').addEventListener('click', function(){JoyMappingGameshark1.value = '';localStorage.removeItem('JoyMappingGameshark1')})



JoyMappingStop2Box.addEventListener('focus', function(){joystick(JoyMappingStop2Box)})
if(localStorage.getItem('JoyMappingStop2') != null){JoyMappingStop2Box.value = localStorage.getItem('JoyMappingStop2')}
document.getElementById('clearJoyMappingStop2').addEventListener('click', function(){JoyMappingStop2.value = '';localStorage.removeItem('JoyMappingStop2')})

JoyMappingFullscreen2Box.addEventListener('focus', function(){joystick(JoyMappingFullscreen2Box)})
if(localStorage.getItem('JoyMappingFullscreen2') != null){JoyMappingFullscreen2Box.value = localStorage.getItem('JoyMappingFullscreen2')}
document.getElementById('clearJoyMappingFullscreen2').addEventListener('click', function(){JoyMappingFullscreen2.value = '';localStorage.removeItem('JoyMappingFullscreen2')})

JoyMappingSaveState2Box.addEventListener('focus', function(){joystick(JoyMappingSaveState2Box)})
if(localStorage.getItem('JoyMappingSaveState2') != null){JoyMappingSaveState2Box.value = localStorage.getItem('JoyMappingSaveState2')}
document.getElementById('clearJoyMappingSaveState2').addEventListener('click', function(){JoyMappingSaveState2.value = '';localStorage.removeItem('JoyMappingSaveState2')})

JoyMappingLoadState2Box.addEventListener('focus', function(){joystick(JoyMappingLoadState2Box)})
if(localStorage.getItem('JoyMappingLoadState2') != null){JoyMappingLoadState2Box.value = localStorage.getItem('JoyMappingLoadState2')}
document.getElementById('clearJoyMappingLoadState2').addEventListener('click', function(){JoyMappingLoadState2.value = '';localStorage.removeItem('JoyMappingLoadState2')})

JoyMappingIncrementSlot2Box.addEventListener('focus', function(){joystick(JoyMappingIncrementSlot2Box)})
if(localStorage.getItem('JoyMappingIncrementSlot2') != null){JoyMappingIncrementSlot2Box.value = localStorage.getItem('JoyMappingIncrementSlot2')}
document.getElementById('clearJoyMappingIncrementSlot2').addEventListener('click', function(){JoyMappingIncrementSlot2.value = '';localStorage.removeItem('JoyMappingIncrementSlot2')})

JoyMappingReset2Box.addEventListener('focus', function(){joystick(JoyMappingReset2Box)})
if(localStorage.getItem('JoyMappingReset2') != null){JoyMappingReset2Box.value = localStorage.getItem('JoyMappingReset2')}
document.getElementById('clearJoyMappingReset2').addEventListener('click', function(){JoyMappingReset2.value = '';localStorage.removeItem('JoyMappingReset2')})

JoyMappingSpeedDown2Box.addEventListener('focus', function(){joystick(JoyMappingSpeedDown2Box)})
if(localStorage.getItem('JoyMappingSpeedDown2') != null){JoyMappingSpeedDown2Box.value = localStorage.getItem('JoyMappingSpeedDown2')}
document.getElementById('clearJoyMappingSpeedDown2').addEventListener('click', function(){JoyMappingSpeedDown2.value = '';localStorage.removeItem('JoyMappingSpeedDown2')})

JoyMappingSpeedUp2Box.addEventListener('focus', function(){joystick(JoyMappingSpeedUp2Box)})
if(localStorage.getItem('JoyMappingSpeedUp2') != null){JoyMappingSpeedUp2Box.value = localStorage.getItem('JoyMappingSpeedUp2')}
document.getElementById('clearJoyMappingSpeedUp2').addEventListener('click', function(){JoyMappingSpeedUp2.value = '';localStorage.removeItem('JoyMappingSpeedUp2')})

JoyMappingScreenshot2Box.addEventListener('focus', function(){joystick(JoyMappingScreenshot2Box)})
if(localStorage.getItem('JoyMappingScreenshot2') != null){JoyMappingScreenshot2Box.value = localStorage.getItem('JoyMappingScreenshot2')}
document.getElementById('clearJoyMappingScreenshot2').addEventListener('click', function(){JoyMappingScreenshot2.value = '';localStorage.removeItem('JoyMappingScreenshot2')})

JoyMappingPause2Box.addEventListener('focus', function(){joystick(JoyMappingPause2Box)})
if(localStorage.getItem('JoyMappingPause2') != null){JoyMappingPause2Box.value = localStorage.getItem('JoyMappingPause2')}
document.getElementById('clearJoyMappingPause2').addEventListener('click', function(){JoyMappingPause2.value = '';localStorage.removeItem('JoyMappingPause2')})

JoyMappingMute2Box.addEventListener('focus', function(){joystick(JoyMappingMute2Box)})
if(localStorage.getItem('JoyMappingMute2') != null){JoyMappingMute2Box.value = localStorage.getItem('JoyMappingMute2')}
document.getElementById('clearJoyMappingMute2').addEventListener('click', function(){JoyMappingMute2.value = '';localStorage.removeItem('JoyMappingMute2')})

JoyMappingIncreaseVolume2Box.addEventListener('focus', function(){joystick(JoyMappingIncreaseVolume2Box)})
if(localStorage.getItem('JoyMappingIncreaseVolume2') != null){JoyMappingIncreaseVolume2Box.value = localStorage.getItem('JoyMappingIncreaseVolume2')}
document.getElementById('clearJoyMappingIncreaseVolume2').addEventListener('click', function(){JoyMappingIncreaseVolume2.value = '';localStorage.removeItem('JoyMappingIncreaseVolume2')})

JoyMappingDecreaseVolume2Box.addEventListener('focus', function(){joystick(JoyMappingDecreaseVolume2Box)})
if(localStorage.getItem('JoyMappingDecreaseVolume2') != null){JoyMappingDecreaseVolume2Box.value = localStorage.getItem('JoyMappingDecreaseVolume2')}
document.getElementById('clearJoyMappingDecreaseVolume2').addEventListener('click', function(){JoyMappingDecreaseVolume2.value = '';localStorage.removeItem('JoyMappingDecreaseVolume2')})

JoyMappingFastForward2Box.addEventListener('focus', function(){joystick(JoyMappingFastForward2Box)})
if(localStorage.getItem('JoyMappingFastForward2') != null){JoyMappingFastForward2Box.value = localStorage.getItem('JoyMappingFastForward2')}
document.getElementById('clearJoyMappingFastForward2').addEventListener('click', function(){JoyMappingFastForward2.value = '';localStorage.removeItem('JoyMappingFastForward2')})

JoyMappingFrameAdvance2Box.addEventListener('focus', function(){joystick(JoyMappingFrameAdvance2Box)})
if(localStorage.getItem('JoyMappingFrameAdvance2') != null){JoyMappingFrameAdvance2Box.value = localStorage.getItem('JoyMappingFrameAdvance2')}
document.getElementById('clearJoyMappingFrameAdvance2').addEventListener('click', function(){JoyMappingFrameAdvance2.value = '';localStorage.removeItem('JoyMappingFrameAdvance2')})

JoyMappingGameshark2Box.addEventListener('focus', function(){joystick(JoyMappingGameshark2Box)})
if(localStorage.getItem('JoyMappingGameshark2') != null){JoyMappingGameshark2Box.value = localStorage.getItem('JoyMappingGameshark2')}
document.getElementById('clearJoyMappingGameshark2').addEventListener('click', function(){JoyMappingGameshark2.value = '';localStorage.removeItem('JoyMappingGameshark2')})



JoyMappingStop3Box.addEventListener('focus', function(){joystick(JoyMappingStop3Box)})
if(localStorage.getItem('JoyMappingStop3') != null){JoyMappingStop3Box.value = localStorage.getItem('JoyMappingStop3')}
document.getElementById('clearJoyMappingStop3').addEventListener('click', function(){JoyMappingStop3.value = '';localStorage.removeItem('JoyMappingStop3')})

JoyMappingFullscreen3Box.addEventListener('focus', function(){joystick(JoyMappingFullscreen3Box)})
if(localStorage.getItem('JoyMappingFullscreen3') != null){JoyMappingFullscreen3Box.value = localStorage.getItem('JoyMappingFullscreen3')}
document.getElementById('clearJoyMappingFullscreen3').addEventListener('click', function(){JoyMappingFullscreen3.value = '';localStorage.removeItem('JoyMappingFullscreen3')})

JoyMappingSaveState3Box.addEventListener('focus', function(){joystick(JoyMappingSaveState3Box)})
if(localStorage.getItem('JoyMappingSaveState3') != null){JoyMappingSaveState3Box.value = localStorage.getItem('JoyMappingSaveState3')}
document.getElementById('clearJoyMappingSaveState3').addEventListener('click', function(){JoyMappingSaveState3.value = '';localStorage.removeItem('JoyMappingSaveState3')})

JoyMappingLoadState3Box.addEventListener('focus', function(){joystick(JoyMappingLoadState3Box)})
if(localStorage.getItem('JoyMappingLoadState3') != null){JoyMappingLoadState3Box.value = localStorage.getItem('JoyMappingLoadState3')}
document.getElementById('clearJoyMappingLoadState3').addEventListener('click', function(){JoyMappingLoadState3.value = '';localStorage.removeItem('JoyMappingLoadState3')})

JoyMappingIncrementSlot3Box.addEventListener('focus', function(){joystick(JoyMappingIncrementSlot3Box)})
if(localStorage.getItem('JoyMappingIncrementSlot3') != null){JoyMappingIncrementSlot3Box.value = localStorage.getItem('JoyMappingIncrementSlot3')}
document.getElementById('clearJoyMappingIncrementSlot3').addEventListener('click', function(){JoyMappingIncrementSlot3.value = '';localStorage.removeItem('JoyMappingIncrementSlot3')})

JoyMappingReset3Box.addEventListener('focus', function(){joystick(JoyMappingReset3Box)})
if(localStorage.getItem('JoyMappingReset3') != null){JoyMappingReset3Box.value = localStorage.getItem('JoyMappingReset3')}
document.getElementById('clearJoyMappingReset3').addEventListener('click', function(){JoyMappingReset3.value = '';localStorage.removeItem('JoyMappingReset3')})

JoyMappingSpeedDown3Box.addEventListener('focus', function(){joystick(JoyMappingSpeedDown3Box)})
if(localStorage.getItem('JoyMappingSpeedDown3') != null){JoyMappingSpeedDown3Box.value = localStorage.getItem('JoyMappingSpeedDown3')}
document.getElementById('clearJoyMappingSpeedDown3').addEventListener('click', function(){JoyMappingSpeedDown3.value = '';localStorage.removeItem('JoyMappingSpeedDown3')})

JoyMappingSpeedUp3Box.addEventListener('focus', function(){joystick(JoyMappingSpeedUp3Box)})
if(localStorage.getItem('JoyMappingSpeedUp3') != null){JoyMappingSpeedUp3Box.value = localStorage.getItem('JoyMappingSpeedUp3')}
document.getElementById('clearJoyMappingSpeedUp3').addEventListener('click', function(){JoyMappingSpeedUp3.value = '';localStorage.removeItem('JoyMappingSpeedUp3')})

JoyMappingScreenshot3Box.addEventListener('focus', function(){joystick(JoyMappingScreenshot3Box)})
if(localStorage.getItem('JoyMappingScreenshot3') != null){JoyMappingScreenshot3Box.value = localStorage.getItem('JoyMappingScreenshot3')}
document.getElementById('clearJoyMappingScreenshot3').addEventListener('click', function(){JoyMappingScreenshot3.value = '';localStorage.removeItem('JoyMappingScreenshot3')})

JoyMappingPause3Box.addEventListener('focus', function(){joystick(JoyMappingPause3Box)})
if(localStorage.getItem('JoyMappingPause3') != null){JoyMappingPause3Box.value = localStorage.getItem('JoyMappingPause3')}
document.getElementById('clearJoyMappingPause3').addEventListener('click', function(){JoyMappingPause3.value = '';localStorage.removeItem('JoyMappingPause3')})

JoyMappingMute3Box.addEventListener('focus', function(){joystick(JoyMappingMute3Box)})
if(localStorage.getItem('JoyMappingMute3') != null){JoyMappingMute3Box.value = localStorage.getItem('JoyMappingMute3')}
document.getElementById('clearJoyMappingMute3').addEventListener('click', function(){JoyMappingMute3.value = '';localStorage.removeItem('JoyMappingMute3')})

JoyMappingIncreaseVolume3Box.addEventListener('focus', function(){joystick(JoyMappingIncreaseVolume3Box)})
if(localStorage.getItem('JoyMappingIncreaseVolume3') != null){JoyMappingIncreaseVolume3Box.value = localStorage.getItem('JoyMappingIncreaseVolume3')}
document.getElementById('clearJoyMappingIncreaseVolume3').addEventListener('click', function(){JoyMappingIncreaseVolume3.value = '';localStorage.removeItem('JoyMappingIncreaseVolume3')})

JoyMappingDecreaseVolume3Box.addEventListener('focus', function(){joystick(JoyMappingDecreaseVolume3Box)})
if(localStorage.getItem('JoyMappingDecreaseVolume3') != null){JoyMappingDecreaseVolume3Box.value = localStorage.getItem('JoyMappingDecreaseVolume3')}
document.getElementById('clearJoyMappingDecreaseVolume3').addEventListener('click', function(){JoyMappingDecreaseVolume3.value = '';localStorage.removeItem('JoyMappingDecreaseVolume3')})

JoyMappingFastForward3Box.addEventListener('focus', function(){joystick(JoyMappingFastForward3Box)})
if(localStorage.getItem('JoyMappingFastForward3') != null){JoyMappingFastForward3Box.value = localStorage.getItem('JoyMappingFastForward3')}
document.getElementById('clearJoyMappingFastForward3').addEventListener('click', function(){JoyMappingFastForward3.value = '';localStorage.removeItem('JoyMappingFastForward3')})

JoyMappingFrameAdvance3Box.addEventListener('focus', function(){joystick(JoyMappingFrameAdvance3Box)})
if(localStorage.getItem('JoyMappingFrameAdvance3') != null){JoyMappingFrameAdvance3Box.value = localStorage.getItem('JoyMappingFrameAdvance3')}
document.getElementById('clearJoyMappingFrameAdvance3').addEventListener('click', function(){JoyMappingFrameAdvance3.value = '';localStorage.removeItem('JoyMappingFrameAdvance3')})

JoyMappingGameshark3Box.addEventListener('focus', function(){joystick(JoyMappingGameshark3Box)})
if(localStorage.getItem('JoyMappingGameshark3') != null){JoyMappingGameshark3Box.value = localStorage.getItem('JoyMappingGameshark3')}
document.getElementById('clearJoyMappingGameshark3').addEventListener('click', function(){JoyMappingGameshark3.value = '';localStorage.removeItem('JoyMappingGameshark3')})



JoyMappingStop4Box.addEventListener('focus', function(){joystick(JoyMappingStop4Box)})
if(localStorage.getItem('JoyMappingStop4') != null){JoyMappingStop4Box.value = localStorage.getItem('JoyMappingStop4')}
document.getElementById('clearJoyMappingStop4').addEventListener('click', function(){JoyMappingStop4.value = '';localStorage.removeItem('JoyMappingStop4')})

JoyMappingFullscreen4Box.addEventListener('focus', function(){joystick(JoyMappingFullscreen4Box)})
if(localStorage.getItem('JoyMappingFullscreen4') != null){JoyMappingFullscreen4Box.value = localStorage.getItem('JoyMappingFullscreen4')}
document.getElementById('clearJoyMappingFullscreen4').addEventListener('click', function(){JoyMappingFullscreen4.value = '';localStorage.removeItem('JoyMappingFullscreen4')})

JoyMappingSaveState4Box.addEventListener('focus', function(){joystick(JoyMappingSaveState4Box)})
if(localStorage.getItem('JoyMappingSaveState4') != null){JoyMappingSaveState4Box.value = localStorage.getItem('JoyMappingSaveState4')}
document.getElementById('clearJoyMappingSaveState4').addEventListener('click', function(){JoyMappingSaveState4.value = '';localStorage.removeItem('JoyMappingSaveState4')})

JoyMappingLoadState4Box.addEventListener('focus', function(){joystick(JoyMappingLoadState4Box)})
if(localStorage.getItem('JoyMappingLoadState4') != null){JoyMappingLoadState4Box.value = localStorage.getItem('JoyMappingLoadState4')}
document.getElementById('clearJoyMappingLoadState4').addEventListener('click', function(){JoyMappingLoadState4.value = '';localStorage.removeItem('JoyMappingLoadState4')})

JoyMappingIncrementSlot4Box.addEventListener('focus', function(){joystick(JoyMappingIncrementSlot4Box)})
if(localStorage.getItem('JoyMappingIncrementSlot4') != null){JoyMappingIncrementSlot4Box.value = localStorage.getItem('JoyMappingIncrementSlot4')}
document.getElementById('clearJoyMappingIncrementSlot4').addEventListener('click', function(){JoyMappingIncrementSlot4.value = '';localStorage.removeItem('JoyMappingIncrementSlot4')})

JoyMappingReset4Box.addEventListener('focus', function(){joystick(JoyMappingReset4Box)})
if(localStorage.getItem('JoyMappingReset4') != null){JoyMappingReset4Box.value = localStorage.getItem('JoyMappingReset4')}
document.getElementById('clearJoyMappingReset4').addEventListener('click', function(){JoyMappingReset4.value = '';localStorage.removeItem('JoyMappingReset4')})

JoyMappingSpeedDown4Box.addEventListener('focus', function(){joystick(JoyMappingSpeedDown4Box)})
if(localStorage.getItem('JoyMappingSpeedDown4') != null){JoyMappingSpeedDown4Box.value = localStorage.getItem('JoyMappingSpeedDown4')}
document.getElementById('clearJoyMappingSpeedDown4').addEventListener('click', function(){JoyMappingSpeedDown4.value = '';localStorage.removeItem('JoyMappingSpeedDown4')})

JoyMappingSpeedUp4Box.addEventListener('focus', function(){joystick(JoyMappingSpeedUp4Box)})
if(localStorage.getItem('JoyMappingSpeedUp4') != null){JoyMappingSpeedUp4Box.value = localStorage.getItem('JoyMappingSpeedUp4')}
document.getElementById('clearJoyMappingSpeedUp4').addEventListener('click', function(){JoyMappingSpeedUp4.value = '';localStorage.removeItem('JoyMappingSpeedUp4')})

JoyMappingScreenshot4Box.addEventListener('focus', function(){joystick(JoyMappingScreenshot4Box)})
if(localStorage.getItem('JoyMappingScreenshot4') != null){JoyMappingScreenshot4Box.value = localStorage.getItem('JoyMappingScreenshot4')}
document.getElementById('clearJoyMappingScreenshot4').addEventListener('click', function(){JoyMappingScreenshot4.value = '';localStorage.removeItem('JoyMappingScreenshot4')})

JoyMappingPause4Box.addEventListener('focus', function(){joystick(JoyMappingPause4Box)})
if(localStorage.getItem('JoyMappingPause4') != null){JoyMappingPause4Box.value = localStorage.getItem('JoyMappingPause4')}
document.getElementById('clearJoyMappingPause4').addEventListener('click', function(){JoyMappingPause4.value = '';localStorage.removeItem('JoyMappingPause4')})

JoyMappingMute4Box.addEventListener('focus', function(){joystick(JoyMappingMute4Box)})
if(localStorage.getItem('JoyMappingMute4') != null){JoyMappingMute4Box.value = localStorage.getItem('JoyMappingMute4')}
document.getElementById('clearJoyMappingMute4').addEventListener('click', function(){JoyMappingMute4.value = '';localStorage.removeItem('JoyMappingMute4')})

JoyMappingIncreaseVolume4Box.addEventListener('focus', function(){joystick(JoyMappingIncreaseVolume4Box)})
if(localStorage.getItem('JoyMappingIncreaseVolume4') != null){JoyMappingIncreaseVolume4Box.value = localStorage.getItem('JoyMappingIncreaseVolume4')}
document.getElementById('clearJoyMappingIncreaseVolume4').addEventListener('click', function(){JoyMappingIncreaseVolume4.value = '';localStorage.removeItem('JoyMappingIncreaseVolume4')})

JoyMappingDecreaseVolume4Box.addEventListener('focus', function(){joystick(JoyMappingDecreaseVolume4Box)})
if(localStorage.getItem('JoyMappingDecreaseVolume4') != null){JoyMappingDecreaseVolume4Box.value = localStorage.getItem('JoyMappingDecreaseVolume4')}
document.getElementById('clearJoyMappingDecreaseVolume4').addEventListener('click', function(){JoyMappingDecreaseVolume4.value = '';localStorage.removeItem('JoyMappingDecreaseVolume4')})

JoyMappingFastForward4Box.addEventListener('focus', function(){joystick(JoyMappingFastForward4Box)})
if(localStorage.getItem('JoyMappingFastForward4') != null){JoyMappingFastForward4Box.value = localStorage.getItem('JoyMappingFastForward4')}
document.getElementById('clearJoyMappingFastForward4').addEventListener('click', function(){JoyMappingFastForward4.value = '';localStorage.removeItem('JoyMappingFastForward4')})

JoyMappingFrameAdvance4Box.addEventListener('focus', function(){joystick(JoyMappingFrameAdvance4Box)})
if(localStorage.getItem('JoyMappingFrameAdvance4') != null){JoyMappingFrameAdvance4Box.value = localStorage.getItem('JoyMappingFrameAdvance4')}
document.getElementById('clearJoyMappingFrameAdvance4').addEventListener('click', function(){JoyMappingFrameAdvance4.value = '';localStorage.removeItem('JoyMappingFrameAdvance4')})

JoyMappingGameshark4Box.addEventListener('focus', function(){joystick(JoyMappingGameshark4Box)})
if(localStorage.getItem('JoyMappingGameshark4') != null){JoyMappingGameshark4Box.value = localStorage.getItem('JoyMappingGameshark4')}
document.getElementById('clearJoyMappingGameshark4').addEventListener('click', function(){JoyMappingGameshark4.value = '';localStorage.removeItem('JoyMappingGameshark4')})



if(localStorage.getItem('hkULActive') != null && localStorage.getItem('hkDIVActive') != null){
currentHK(document.getElementById(localStorage.getItem('hkULActive')),document.getElementById(localStorage.getItem('hkDIVActive')))}

function currentHK(currentUL,currentDIV){
if(ul_hk_keyboard.classList.contains('active'))ul_hk_keyboard.classList.remove('active');
if(ul_hk_controller1.classList.contains('active'))ul_hk_controller1.classList.remove('active');
if(ul_hk_controller2.classList.contains('active'))ul_hk_controller2.classList.remove('active');
if(ul_hk_controller3.classList.contains('active'))ul_hk_controller3.classList.remove('active');
if(ul_hk_controller4.classList.contains('active'))ul_hk_controller4.classList.remove('active');
if(!hk_keyboard.classList.contains('hide'))hk_keyboard.classList.add('hide');
if(!hk_controller1.classList.contains('hide'))hk_controller1.classList.add('hide');
if(!hk_controller2.classList.contains('hide'))hk_controller2.classList.add('hide');
if(!hk_controller3.classList.contains('hide'))hk_controller3.classList.add('hide');
if(!hk_controller4.classList.contains('hide'))hk_controller4.classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('hkULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('hkDIVActive',currentDIV.id)}

ul_hk_keyboard.addEventListener('click', function(){currentHK(ul_hk_keyboard,hk_keyboard)})
ul_hk_controller1.addEventListener('click', function(){currentHK(ul_hk_controller1,hk_controller1)})
ul_hk_controller2.addEventListener('click', function(){currentHK(ul_hk_controller2,hk_controller2)})
ul_hk_controller3.addEventListener('click', function(){currentHK(ul_hk_controller3,hk_controller3)})
ul_hk_controller4.addEventListener('click', function(){currentHK(ul_hk_controller4,hk_controller4)})



if(localStorage.getItem('cULActive1') != null && localStorage.getItem('cDIVActive1') != null){
currentController(document.getElementById(localStorage.getItem('cULActive1')),document.getElementById(localStorage.getItem('cDIVActive1')))}
if(localStorage.getItem('cULActive2') != null && localStorage.getItem('cDIVActive2') != null){
currentController(document.getElementById(localStorage.getItem('cULActive2')),document.getElementById(localStorage.getItem('cDIVActive2')))}
if(localStorage.getItem('cULActive3') != null && localStorage.getItem('cDIVActive3') != null){
currentController(document.getElementById(localStorage.getItem('cULActive3')),document.getElementById(localStorage.getItem('cDIVActive3')))}
if(localStorage.getItem('cULActive4') != null && localStorage.getItem('cDIVActive4') != null){
currentController(document.getElementById(localStorage.getItem('cULActive4')),document.getElementById(localStorage.getItem('cDIVActive4')))}

function currentController(currentUL,currentDIV){
if(currentUL.id.includes('1')){
if(ul_c1_keyboard.classList.contains('active'))ul_c1_keyboard.classList.remove('active');
if(ul_c1_controller.classList.contains('active'))ul_c1_controller.classList.remove('active');
if(!c1_keyboard.classList.contains('hide'))c1_keyboard.classList.add('hide');
if(!c1_controller.classList.contains('hide'))c1_controller.classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive1',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive1',currentDIV.id)}
if(currentUL.id.includes('2')){
if(ul_c2_keyboard.classList.contains('active'))ul_c2_keyboard.classList.remove('active');
if(ul_c2_controller.classList.contains('active'))ul_c2_controller.classList.remove('active');
if(!c2_keyboard.classList.contains('hide'))c2_keyboard.classList.add('hide');
if(!c2_controller.classList.contains('hide'))c2_controller.classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive2',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive2',currentDIV.id)}
if(currentUL.id.includes('3')){
if(ul_c3_keyboard.classList.contains('active'))ul_c3_keyboard.classList.remove('active');
if(ul_c3_controller.classList.contains('active'))ul_c3_controller.classList.remove('active');
if(!c3_keyboard.classList.contains('hide'))c3_keyboard.classList.add('hide');
if(!c3_controller.classList.contains('hide'))c3_controller.classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive3',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive3',currentDIV.id)}
if(currentUL.id.includes('4')){
if(ul_c4_keyboard.classList.contains('active'))ul_c4_keyboard.classList.remove('active');
if(ul_c4_controller.classList.contains('active'))ul_c4_controller.classList.remove('active');
if(!c4_keyboard.classList.contains('hide'))c4_keyboard.classList.add('hide');
if(!c4_controller.classList.contains('hide'))c4_controller.classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive4',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive4',currentDIV.id)}}

ul_c1_keyboard.addEventListener('click', function(){currentController(ul_c1_keyboard,c1_keyboard)})
ul_c2_keyboard.addEventListener('click', function(){currentController(ul_c2_keyboard,c2_keyboard)})
ul_c3_keyboard.addEventListener('click', function(){currentController(ul_c3_keyboard,c3_keyboard)})
ul_c4_keyboard.addEventListener('click', function(){currentController(ul_c4_keyboard,c4_keyboard)})
ul_c1_controller.addEventListener('click', function(){currentController(ul_c1_controller,c1_controller)})
ul_c2_controller.addEventListener('click', function(){currentController(ul_c2_controller,c2_controller)})
ul_c3_controller.addEventListener('click', function(){currentController(ul_c3_controller,c3_controller)})
ul_c4_controller.addEventListener('click', function(){currentController(ul_c4_controller,c4_controller)})

})