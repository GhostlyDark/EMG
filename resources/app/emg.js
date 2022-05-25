document.addEventListener('DOMContentLoaded', function() {
var cheatRadio,filePath,fileResult,txPath,txPathResult,txCachePath,txCachePathResult,txDumpPath,txDumpPathResult,workingDirectory,workingDirectoryResult,PIF,PIFResult,IPLROM,IPLROMResult,Disk,DiskResult,ScreenshotPath,ScreenshotPathResult,SaveStatePath,SaveStatePathResult,SaveSRAMPath,SaveSRAMPathResult,stPath,stResult,gbROM1,gbROM1Result,gbROM2,gbROM2Result,gbROM3,gbROM3Result,gbROM4,gbROM4Result,gbRAM1,gbRAM1Result,gbRAM2,gbRAM2Result,gbRAM3,gbRAM3Result,gbRAM4,gbRAM4Result,recentFiles = [];

const textInputs = document.querySelectorAll("input[type='text']"),

regjoy = /axis|button|hat|\(|\)/g, regsplit = /\s*\n/, regradio = /^\s\s\s/g, regbox = /_.*/g, regkb = /key\(\)/g, regkbaxis = /key\(,\)/g, regc = /\:/g, regid = /^\d: |^\d\d: /,

keyScroll = {32:1,33:1,34:1,35:1,36:1,37:1,38:1,39:1,40:1}, /* spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40 */

keyCodes = {0:'',3:'break',8:'backspace',9:'tab',12:'clear',13:'enter',16:'shift',17:'ctrl',18:'alt',19:'pause',20:'caps lock',27:'escape',32:'spacebar',33:'page up',34:'page down',35:'end',36:'home',37:'left arrow',38:'up arrow',39:'right arrow',40:'down arrow',45:'insert',46:'delete',47:'help',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',96:'numpad 0',97:'numpad 1',98:'numpad 2',99:'numpad 3',100:'numpad 4',101:'numpad 5',102:'numpad 6',103:'numpad 7',104:'numpad 8',105:'numpad 9',106:'numpad *',107:'numpad +',109:'numpad -',111:'numpad /',112:'f1',113:'f2',114:'f3',115:'f4',116:'f5',117:'f6',118:'f7',119:'f8',120:'f9',121:'f10',122:'f11',123:'f12',144:'num lock'}, /* HTML DOM keycodes to text */

keySyms = {0:0,3:318,8:8,9:9,12:12,13:13,16:304,17:306,18:308,19:19,20:301,27:27,32:32,33:280,34:281,35:279,36:278,37:276,38:273,39:275,40:274,45:277,46:127,47:315,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,65:97,66:98,67:99,68:100,69:101,70:102,71:103,72:104,73:105,74:106,75:107,76:108,77:109,78:110,79:111,80:112,81:113,82:114,83:115,84:116,85:117,86:118,87:119,88:120,89:121,90:122,96:256,97:257,98:258,99:259,100:260,101:261,102:262,103:263,104:264,105:265,106:268,107:270,109:269,111:267,112:282,113:283,114:284,115:285,116:286,117:287,118:288,119:289,120:290,121:291,122:292,123:293,144:300}, /* HTML DOM keycodes to SDL keysyms for mupen64plus hotkeys */

hotKeys = {0:'',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z'}, /* HTML DOM keycodes to GLideN64 hotkeys */

n64Ext = ['*.n64','*.v64','*.z64'], nddExt = ['*.d64','*.ndd'], gbExt = ['*.gb','*.gbc'], saveExt = ['*.sav'], biosExt = ['*.bin','*.rom',...n64Ext],
n64 = ['n64','v64','z64'], ndd = ['d64','ndd'], gb = ['gb','gbc'], save = ['sav'], bios = [...n64,'bin','rom'], zip = ['7z','bz2','gz','rar','xz','zip'],
st = ['st0','st1','st2','st3','st4','st5','st6','st7','st8','st9','state'],
n64Type = [...n64,...zip], nddType = [...ndd,...zip], gbType = [...gb,...zip], saveType = [...save,...zip], biosType = [...bios,...zip],

dragDrop = ['fileInput','PIF','IPLROM','Disk','st','gbROM1','gbROM2','gbROM3','gbROM4','gbRAM1','gbRAM2','gbRAM3','gbRAM4'],
hk = ['hk_keyboard','hk_controller1','hk_controller2','hk_controller3','hk_controller4'],
menu = ['main','input','video','gliden64','rice','glide64mk2'],

n64_buttons = ['AButton1','AButton2','AButton3','AButton4','BButton1','BButton2','BButton3','BButton4','LTrig1','LTrig2','LTrig3','LTrig4','RTrig1','RTrig2','RTrig3','RTrig4','ZTrig1','ZTrig2','ZTrig3','ZTrig4','Start1','Start2','Start3','Start4','DPadU1','DPadU2','DPadU3','DPadU4','DPadD1','DPadD2','DPadD3','DPadD4','DPadL1','DPadL2','DPadL3','DPadL4','DPadR1','DPadR2','DPadR3','DPadR4','StickU1','StickU2','StickU3','StickU4','StickD1','StickD2','StickD3','StickD4','StickL1','StickL2','StickL3','StickL4','StickR1','StickR2','StickR3','StickR4','CButtonU1','CButtonU2','CButtonU3','CButtonU4','CButtonD1','CButtonD2','CButtonD3','CButtonD4','CButtonL1','CButtonL2','CButtonL3','CButtonL4','CButtonR1','CButtonR2','CButtonR3','CButtonR4','MempakSwitch1','MempakSwitch2','MempakSwitch3','MempakSwitch4','RumblepakSwitch1','RumblepakSwitch2','RumblepakSwitch3','RumblepakSwitch4'],

gliden64_hotkeys = ['hkTexDump','hkHdTexReload','hkHdTexToggle','hkInaccurateTexCords','hkVsync','hkFBEmulation','hkN64DepthCompare','hkOsdVis','hkOsdFps','hkOsdPercent','hkOsdInternalResolution','hkOsdRenderingResolution','hkTexCoordBounds','hkNativeResTexrects','hkForceGammaCorrection'],

m64p_hotkeys = ['KbdMappingStop','KbdMappingSlot0','KbdMappingSlot1','KbdMappingSlot2','KbdMappingSlot3','KbdMappingSlot4','KbdMappingSlot5','KbdMappingSlot6','KbdMappingSlot7','KbdMappingSlot8','KbdMappingSlot9','KbdMappingFullscreen','KbdMappingSaveState','KbdMappingLoadState','KbdMappingIncrementSlot','KbdMappingReset','KbdMappingSpeedDown','KbdMappingSpeedUp','KbdMappingScreenshot','KbdMappingPause','KbdMappingMute','KbdMappingIncreaseVolume','KbdMappingDecreaseVolume','KbdMappingFastForward','KbdMappingFrameAdvance','KbdMappingGameshark'],

m64p_joykeys = [
'JoyMappingStop1','JoyMappingFullscreen1','JoyMappingSaveState1','JoyMappingLoadState1','JoyMappingIncrementSlot1','JoyMappingReset1','JoyMappingSpeedDown1','JoyMappingSpeedUp1','JoyMappingScreenshot1','JoyMappingPause1','JoyMappingMute1','JoyMappingIncreaseVolume1','JoyMappingDecreaseVolume1','JoyMappingFastForward1','JoyMappingFrameAdvance1','JoyMappingGameshark1',
'JoyMappingStop2','JoyMappingFullscreen2','JoyMappingSaveState2','JoyMappingLoadState2','JoyMappingIncrementSlot2','JoyMappingReset2','JoyMappingSpeedDown2','JoyMappingSpeedUp2','JoyMappingScreenshot2','JoyMappingPause2','JoyMappingMute2','JoyMappingIncreaseVolume2','JoyMappingDecreaseVolume2','JoyMappingFastForward2','JoyMappingFrameAdvance2','JoyMappingGameshark2',
'JoyMappingStop3','JoyMappingFullscreen3','JoyMappingSaveState3','JoyMappingLoadState3','JoyMappingIncrementSlot3','JoyMappingReset3','JoyMappingSpeedDown3','JoyMappingSpeedUp3','JoyMappingScreenshot3','JoyMappingPause3','JoyMappingMute3','JoyMappingIncreaseVolume3','JoyMappingDecreaseVolume3','JoyMappingFastForward3','JoyMappingFrameAdvance3','JoyMappingGameshark3',
'JoyMappingStop4','JoyMappingFullscreen4','JoyMappingSaveState4','JoyMappingLoadState4','JoyMappingIncrementSlot4','JoyMappingReset4','JoyMappingSpeedDown4','JoyMappingSpeedUp4','JoyMappingScreenshot4','JoyMappingPause4','JoyMappingMute4','JoyMappingIncreaseVolume4','JoyMappingDecreaseVolume4','JoyMappingFastForward4','JoyMappingFrameAdvance4','JoyMappingGameshark4'],

sliders = ['MouseSensitivity1X','MouseSensitivity1Y','MouseSensitivity2X','MouseSensitivity2Y','MouseSensitivity3X','MouseSensitivity3Y','MouseSensitivity4X','MouseSensitivity4Y','AnalogDeadzone1X','AnalogDeadzone1Y','AnalogDeadzone2X','AnalogDeadzone2Y','AnalogDeadzone3X','AnalogDeadzone3Y','AnalogDeadzone4X','AnalogDeadzone4Y','AnalogPeak1X','AnalogPeak1Y','AnalogPeak2X','AnalogPeak2Y','AnalogPeak3X','AnalogPeak3Y','AnalogPeak4X','AnalogPeak4Y','control_stick_deadzone','control_stick_sensitivity','c_stick_deadzone','trigger_threshold'],

numbers = ['OverscanNtscTop','OverscanNtscLeft','OverscanNtscRight','OverscanNtscBottom','OverscanPalTop','OverscanPalLeft','OverscanPalRight','OverscanPalBottom','NumWorkers','ParallelCropOverscan','txCacheSize','txHiresVramLimit','GammaCorrectionLevel','fontSize','CountPerOp','CountPerOpDenomPot','SiDmaDuration','CurrentStateSlot','VOLUME_ADJUST','VOLUME_DEFAULT','PolygonOffsetFactor','PolygonOffsetUnits','polygon_offset_factor','polygon_offset_units','ghq_cache_size'],

dropdowns = [
'emumode','resolution','SaveDiskFormat', /* mupen64plus */
'gfx','audio','input','rsp','RspFallback', /* mupen64plus plugins */
'plugin1','plugin2','plugin3','plugin4','mode1','mode2','mode3','mode4','c1','c2','c3','c4',
'mouse1_1','mouse1_2','mouse1_3','mouse2_1','mouse2_2','mouse2_3','mouse3_1','mouse3_2','mouse3_3','mouse4_1','mouse4_2','mouse4_3', // mupen64plus-input
'DEFAULT_FREQUENCY','SECONDARY_BUFFER_SIZE','RESAMPLE', /* mupen64plus-audio */
'a','b','x','y','start','z','l','r','d_pad_left','d_pad_right','d_pad_down','d_pad_up','c_stick_left','c_stick_right','c_stick_down','c_stick_up', /* mupen64plus-input-gca */
'msaa','aspectRatio','bufferSwapMode','CountersPos','useNativeResolutionFactor','anisotropy','cache','RDRAMImageDitheringMode','CorrectTexrectCoords','EnableNativeResTexrects','BackgroundsMode','EnableN64DepthCompare','EnableCopyColorToRDRAM','EnableCopyDepthToRDRAM','txFilterMode','txEnhancementMode', /* GLideN64 */
'ViMode','ViInterpolation','DpCompat', /* Angrylion-Plus */
'ParallelUpscaling','ParallelDeinterlace','ParallelDownScale', /* Parallel */
'FrameBufferWriteBackControl','RenderToTexture','ScreenUpdateSetting','Mipmapping','ForceTextureFilter','TextureEnhancement','TextureEnhancementControl','TextureQuality','OpenGLDepthBufferSetting','RiceMultiSampling','ColorQuality','AnisotropicFiltering','wrpAntiAliasing', /* Rice */
'show_fps','ghq_fltr','ghq_cmpr','ghq_enht','alt_tex_size','use_sts1_only','force_calc_sphere','correct_viewport','increase_texrect_edge','decrease_fillrect_edge','texture_correction','pal230','force_microcheck','force_quad3d','clip_zmin','clip_zmax','fast_crc','adjust_aspect','zmode_compare_less','old_style_adither','n64_z_scale','optimize_texrect','ignore_aux_copy','hires_buf_clear','fb_read_alpha','useless_is_useless','fb_crc_mode','filtering','fog','buff_clear','swapmode','aspect','lodmode','fb_smart','fb_hires','fb_read_always','read_back_to_screen','detect_cpu_write','fb_get_info','fb_render' /* Glide64 MK2 */];



['c1','c2','c3','c4'].forEach(c => { // initialize SDL device dropdowns
if(localStorage.getItem(c+'Element') != null)id(c).innerHTML = localStorage.getItem(c+'Element')
id('refresh'+c).addEventListener('click', function(){refresh(id(c))})})

function refresh(drop){ // update SDL device dropdown
Array.from(drop.querySelectorAll('.generated')).forEach(generated => generated.remove());
let list = jsrefresh();
var datasplit = list.split(regsplit);
datasplit.forEach(device => update(device));

function update(device){
if(device === '' || device === 'No joysticks were found' || device === null || device === undefined)return
localStorage.removeItem(drop.id)
var newDevice = document.createElement('option');
newDevice.value = device;
newDevice.innerHTML = device;
newDevice.className = 'generated';
drop.appendChild(newDevice)}

localStorage.setItem(drop.id+'Element',(drop.innerHTML))}



n64_buttons.forEach(n64_button => { // controller input
var n64_button_c = n64_button+'c',
n64_button_cb = n64_button+'cb',
box = id(n64_button),
box_c = id(n64_button_c),
box_cb = id(n64_button_cb);

box_c.addEventListener('click', function(){jstest(box_c)}) // joystick input
box_cb.addEventListener('click', function(){jstest(box_cb)})
if(localStorage.getItem(n64_button_c) != null){box_c.value = localStorage.getItem(n64_button_c)}
if(localStorage.getItem(n64_button_cb) != null){box_cb.value = localStorage.getItem(n64_button_cb)}
id('clear'+n64_button_c).addEventListener('click', function(){box_c.value = '';localStorage.removeItem(n64_button_c);box_cb.value = '';localStorage.removeItem(n64_button_cb)})

if(localStorage.getItem(n64_button) != null){ // keyboard input
box.value = keyCodes[localStorage.getItem(n64_button)];
box.dataset.key = keySyms[localStorage.getItem(n64_button)]}
box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
box.value = keyCodes[e.keyCode];
box.dataset.key = keySyms[e.keyCode];
localStorage.setItem(n64_button, e.keyCode)}})
id('clear'+n64_button).addEventListener('click', function(){box.value = '';box.dataset.key = '0';localStorage.removeItem(n64_button)})})

gliden64_hotkeys.forEach(gliden64_hotkey => { // GLideN64 hotkeys
var box = id(gliden64_hotkey);
id('clear'+gliden64_hotkey).addEventListener('click', function(){
box.value = '';
localStorage.removeItem(gliden64_hotkey)})
if(localStorage.getItem(gliden64_hotkey) != null){
box.value = hotKeys[localStorage.getItem(gliden64_hotkey)]}
box.addEventListener('keyup', function(e){
if(hotKeys[e.keyCode] != undefined){
box.value = hotKeys[e.keyCode];
localStorage.setItem(gliden64_hotkey, e.keyCode)}})})

m64p_hotkeys.forEach(m64p_hotkey => { // mupen64plus keyboard hotkeys
var box = id(m64p_hotkey);
id('clear'+m64p_hotkey).addEventListener('click', function(){
box.value = '';
box.dataset.key = '0';
localStorage.removeItem(m64p_hotkey)})
if(localStorage.getItem(m64p_hotkey) != null){
box.value = keyCodes[localStorage.getItem(m64p_hotkey)];
box.dataset.key = keySyms[localStorage.getItem(m64p_hotkey)]}
box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
box.value = keyCodes[e.keyCode];
box.dataset.key = keySyms[e.keyCode];
localStorage.setItem(m64p_hotkey, e.keyCode)}})})

m64p_joykeys.forEach(joykey => { // mupen64plus joystick hotkeys
var box = id(joykey);
box.addEventListener('click', function(){jstest(box)})
if(localStorage.getItem(joykey) != null){box.value = localStorage.getItem(joykey)}
id('clear'+joykey).addEventListener('click', function(){box.value = '';localStorage.removeItem(joykey)})})

dropdowns.forEach(dropdown => { // dropdown inputs
var drop = id(dropdown);
if(localStorage.getItem(dropdown) != null){drop.value = localStorage.getItem(dropdown)}
if(drop.selectedIndex === -1){drop.selectedIndex = 0;localStorage.removeItem(dropdown)}
drop.addEventListener('change', function(){localStorage.setItem(dropdown, drop.value)})})

sliders.forEach(slider => { // slider inputs
var slider_input = id(slider),
slider_reset = id('reset'+slider),
slider_text = id(slider+'Text'),
slider_value = slider_reset.dataset.value;

slider_reset.addEventListener('click', function(){slider_input.value = slider_value;localStorage.removeItem(slider);slider_text.innerHTML = slider_input.value})
if(localStorage.getItem(slider) != null){slider_input.value = localStorage.getItem(slider);slider_text.innerHTML = slider_input.value}
slider_input.addEventListener('input', function(){localStorage.setItem(slider, slider_input.value);slider_text.innerHTML = slider_input.value})})

id('NumWorkers').max = navigator.hardwareConcurrency;
numbers.forEach(number => { // number inputs
var number_input = id(number),
number_reset = id('reset'+number),
number_value = number_reset.dataset.value,
number_decrease = id('decrease'+number),
number_increase = id('increase'+number),
digits = 0;
if(number_input.step.includes('.'))digits=2;

number_reset.addEventListener('click', function(){number_input.value = number_value;localStorage.removeItem(number)})

if(localStorage.getItem(number) != null){number_input.value = localStorage.getItem(number)}
number_input.addEventListener('change', function(){localStorage.setItem(number, number_input.value)})
number_input.addEventListener('keydown', function(e){e.preventDefault()})

number_decrease.addEventListener('click', function(){
if(number_input.disabled)return
if(number_input.value != number_input.min){
if(number_input.id === 'SiDmaDuration' && number_input.value === '0'){number_input.value = '-1'}
else{number_input.value = (parseFloat(number_input.value) - number_input.step*1).toFixed(digits)}
localStorage.setItem(number, number_input.value)}})

number_increase.addEventListener('click', function(){
if(number_input.disabled)return
if(number_input.value != number_input.max){
if(number_input.id === 'SiDmaDuration' && number_input.value === '-1'){number_input.value = '0'}
else{number_input.value = (parseFloat(number_input.value) + number_input.step*1).toFixed(digits)}
localStorage.setItem(number, number_input.value)}})})



function rspDropdownDisable(){ // disable or hide inputs
if(id('rsp').value.includes('rsp-hle')){id('RspFallback').disabled = false;id('rspGFX').disabled = true;id('rspAudio').disabled = false}
else if(id('rsp').value.includes('rsp-cxd4')){id('RspFallback').disabled = true;id('rspGFX').disabled = false;id('rspAudio').disabled = false}
else if(id('rsp').value.includes('rsp-parallel')){id('RspFallback').disabled = true;id('rspGFX').disabled = true;id('rspAudio').disabled = true}}
id('rsp').addEventListener('change', rspDropdownDisable)
rspDropdownDisable()

function EnableFBEmulationDisable(){if(id('EnableFBEmulation').checked){id('EnableCopyColorFromRDRAM').disabled = false;id('EnableCopyDepthToMainDepthBuffer').disabled = false;id('EnableCopyAuxiliaryToRDRAM').disabled = false;id('ForceDepthBufferClear').disabled = false;id('FBInfoReadColorChunk').disabled = false;id('FBInfoReadDepthChunk').disabled = false}else{id('EnableCopyColorFromRDRAM').disabled = true;id('EnableCopyDepthToMainDepthBuffer').disabled = true;id('EnableCopyAuxiliaryToRDRAM').disabled = true;id('ForceDepthBufferClear').disabled = true;id('FBInfoReadColorChunk').disabled = true;id('FBInfoReadDepthChunk').disabled = true}}
id('EnableFBEmulation').addEventListener('change', EnableFBEmulationDisable)
EnableFBEmulationDisable()

function msaaDisable(){if(id('fxaa').checked || id('EnableN64DepthCompare').selectedIndex != '0'){id('msaa').disabled = true}else{id('msaa').disabled = false}}
id('fxaa').addEventListener('change', msaaDisable)
id('EnableN64DepthCompare').addEventListener('change', msaaDisable)
msaaDisable()

function ForceGammaCorrectionDisable(){if(id('ForceGammaCorrection').checked){id('GammaCorrectionLevel').disabled = false}else{id('GammaCorrectionLevel').disabled = true}}
id('ForceGammaCorrection').addEventListener('change', ForceGammaCorrectionDisable)
ForceGammaCorrectionDisable()

function EnableOverscanDisable(){if(id('EnableOverscan').checked){id('OverscanNtscTop').disabled = false;id('OverscanNtscLeft').disabled = false;id('OverscanNtscRight').disabled = false;id('OverscanNtscBottom').disabled = false;id('OverscanPalTop').disabled = false;id('OverscanPalLeft').disabled = false;id('OverscanPalRight').disabled = false;id('OverscanPalBottom').disabled = false}else{id('OverscanNtscTop').disabled = true;id('OverscanNtscLeft').disabled = true;id('OverscanNtscRight').disabled = true;id('OverscanNtscBottom').disabled = true;id('OverscanPalTop').disabled = true;id('OverscanPalLeft').disabled = true;id('OverscanPalRight').disabled = true;id('OverscanPalBottom').disabled = true}}
id('EnableOverscan').addEventListener('change', EnableOverscanDisable)
EnableOverscanDisable()

function txNoTextureFileStorageDisable(){if(id('txNoTextureFileStorage').checked){id('cache').disabled = true}else{id('cache').disabled = false}}
id('txNoTextureFileStorage').addEventListener('change', txNoTextureFileStorageDisable)
txNoTextureFileStorageDisable()

function txHiresEnableDisable(){if(id('txHiresEnable').checked){id('txDump').disabled = false;id('txHiresFullAlphaChannel').disabled = false;id('txHresAltCRC').disabled = false;id('txCacheCompression').disabled = false;id('txForce16bpp').disabled = false;id('txSaveCache').disabled = false;id('txNoTextureFileStorage').disabled = false}else{id('txDump').disabled = true;id('txHiresFullAlphaChannel').disabled = true;id('txHresAltCRC').disabled = true;id('txCacheCompression').disabled = true;id('txForce16bpp').disabled = true;id('txSaveCache').disabled = true;id('txNoTextureFileStorage').disabled = true}}
id('txHiresEnable').addEventListener('change', txHiresEnableDisable)
txHiresEnableDisable()

function ForcePolygonOffsetDisable(){if(id('ForcePolygonOffset').checked){id('PolygonOffsetFactor').disabled = false;id('PolygonOffsetUnits').disabled = false}else{id('PolygonOffsetFactor').disabled = true;id('PolygonOffsetUnits').disabled = true}}
id('ForcePolygonOffset').addEventListener('change', ForcePolygonOffsetDisable)
ForcePolygonOffsetDisable()

function force_polygon_offsetDisable(){if(id('force_polygon_offset').checked){id('polygon_offset_factor').disabled = false;id('polygon_offset_units').disabled = false}else{id('polygon_offset_factor').disabled = true;id('polygon_offset_units').disabled = true}}
id('force_polygon_offset').addEventListener('change', force_polygon_offsetDisable)
force_polygon_offsetDisable()

function clockDisable(){if(id('clock').checked){id('clock_24_hr').disabled = false}else{id('clock_24_hr').disabled = true}}
id('clock').addEventListener('change', clockDisable)
clockDisable()

function ghq_hirsDisable(){if(id('ghq_hirs').checked){id('ghq_hirs_cmpr').disabled = false;id('ghq_hirs_tile').disabled = false;id('ghq_hirs_f16bpp').disabled = false;id('ghq_hirs_gz').disabled = false;id('ghq_hirs_altcrc').disabled = false;id('ghq_cache_save').disabled = false;id('ghq_hirs_let_texartists_fly').disabled = false}else{id('ghq_hirs_cmpr').disabled = true;id('ghq_hirs_tile').disabled = true;id('ghq_hirs_f16bpp').disabled = true;id('ghq_hirs_gz').disabled = true;id('ghq_hirs_altcrc').disabled = true;id('ghq_cache_save').disabled = true;id('ghq_hirs_let_texartists_fly').disabled = true}}
id('ghq_hirs').addEventListener('change', ghq_hirsDisable)
ghq_hirsDisable()

function mode1Disable(){
if(id('mode1').value === 'Input-SDL-Control1[mode]=0'){id('manual1').classList.replace('hide','show')}else{id('manual1').classList.replace('show','hide')}}
id('mode1').addEventListener('change', mode1Disable)
mode1Disable()

function mode2Disable(){
if(id('mode2').value === 'Input-SDL-Control2[mode]=0'){id('manual2').classList.replace('hide','show')}else{id('manual2').classList.replace('show','hide')}}
id('mode2').addEventListener('change', mode2Disable)
mode2Disable()

function mode3Disable(){
if(id('mode3').value === 'Input-SDL-Control3[mode]=0'){id('manual3').classList.replace('hide','show')}else{id('manual3').classList.replace('show','hide')}}
id('mode3').addEventListener('change', mode3Disable)
mode3Disable()

function mode4Disable(){
if(id('mode4').value === 'Input-SDL-Control4[mode]=0'){id('manual4').classList.replace('hide','show')}else{id('manual4').classList.replace('show','hide')}}
id('mode4').addEventListener('change', mode4Disable)
mode4Disable()

function c1Disable(){
if(id('c1').value === 'Keyboard'){id('c1_keyboard').classList.replace('hide','show');id('c1_controller').classList.replace('show','hide');id('analog1').classList.replace('show','hide')}
else{id('c1_keyboard').classList.replace('show','hide');id('c1_controller').classList.replace('hide','show');id('analog1').classList.replace('hide','show')}}
id('c1').addEventListener('change', c1Disable)
c1Disable()

function c2Disable(){
if(id('c2').value === 'Keyboard'){id('c2_keyboard').classList.replace('hide','show');id('c2_controller').classList.replace('show','hide');id('analog2').classList.replace('show','hide')}
else{id('c2_keyboard').classList.replace('show','hide');id('c2_controller').classList.replace('hide','show');id('analog2').classList.replace('hide','show')}}
id('c2').addEventListener('change', c2Disable)
c2Disable()

function c3Disable(){
if(id('c3').value === 'Keyboard'){id('c3_keyboard').classList.replace('hide','show');id('c3_controller').classList.replace('show','hide');id('analog3').classList.replace('show','hide')}
else{id('c3_keyboard').classList.replace('show','hide');id('c3_controller').classList.replace('hide','show');id('analog3').classList.replace('hide','show')}}
id('c3').addEventListener('change', c3Disable)
c3Disable()

function c4Disable(){
if(id('c4').value === 'Keyboard'){id('c4_keyboard').classList.replace('hide','show');id('c4_controller').classList.replace('show','hide');id('analog4').classList.replace('show','hide')}
else{id('c4_keyboard').classList.replace('show','hide');id('c4_controller').classList.replace('hide','show');id('analog4').classList.replace('hide','show')}}
id('c4').addEventListener('change', c4Disable)
c4Disable()

function c1_controlsDisable(){
if(!id('plugged1').checked){id('c1_controls').classList.replace('show','hide')}
else{id('c1_controls').classList.replace('hide','show')}}
id('plugged1').addEventListener('change', c1_controlsDisable)
c1_controlsDisable()

function c2_controlsDisable(){
if(!id('plugged2').checked){id('c2_controls').classList.replace('show','hide')}
else{id('c2_controls').classList.replace('hide','show')}}
id('plugged2').addEventListener('change', c2_controlsDisable)
c2_controlsDisable()

function c3_controlsDisable(){
if(!id('plugged3').checked){id('c3_controls').classList.replace('show','hide')}
else{id('c3_controls').classList.replace('hide','show')}}
id('plugged3').addEventListener('change', c3_controlsDisable)
c3_controlsDisable()

function c4_controlsDisable(){
if(!id('plugged4').checked){id('c4_controls').classList.replace('show','hide')}
else{id('c4_controls').classList.replace('hide','show')}}
id('plugged4').addEventListener('change', c4_controlsDisable)
c4_controlsDisable()

function mouse1Disable(){
if(id('mouse1').checked){id('mouse1options').classList.replace('hide','show')}
else{id('mouse1options').classList.replace('show','hide')}}
id('mouse1').addEventListener('change', mouse1Disable)
mouse1Disable()

function mouse2Disable(){
if(id('mouse2').checked){id('mouse2options').classList.replace('hide','show')}
else{id('mouse2options').classList.replace('show','hide')}}
id('mouse2').addEventListener('change', mouse2Disable)
mouse2Disable()

function mouse3Disable(){
if(id('mouse3').checked){id('mouse3options').classList.replace('hide','show')}
else{id('mouse3options').classList.replace('show','hide')}}
id('mouse3').addEventListener('change', mouse3Disable)
mouse3Disable()

function mouse4Disable(){
if(id('mouse4').checked){id('mouse4options').classList.replace('hide','show')}
else{id('mouse4options').classList.replace('show','hide')}}
id('mouse4').addEventListener('change', mouse4Disable)
mouse4Disable()



if(localStorage.getItem('recentFiles') != null){recentFiles = JSON.parse(localStorage.getItem('recentFiles'))}

function recentFilesUpdate(){ // recent N64 ROM files
id('optionDefault').selected = true;
recentFiles.forEach(rf => {var i = recentFiles.indexOf(rf);if(recentFiles[i] != null){id('option'+i).value = recentFiles[i];id('option'+i).innerHTML = i + 1 + '. ' + recentFiles[i]}})}
recentFilesUpdate()

id('recent').addEventListener('change', function(){
if(id('recent').value != null && id('recent').value != ''){filePath = id('recent').value;id('fileText').innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath))recentFiles.unshift(filePath);recentFiles.splice(10);localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}})

id('clearRecent').addEventListener('click', function(){
recentFiles = [];
localStorage.removeItem('recentFiles');
id('optionDefault').selected = true;
Array.from(id('recent').getElementsByTagName('option')).forEach(opt => {if(opt.innerHTML != 'Recent Files'){opt.value = '';opt.innerHTML = ''}})})



function extract(fpath,ext){ // reading and extracting archives
let list = listArchive(fpath,ext);
if(list === ''){alert('No file (' + ext.toString().replace(/\*/g,'').replace(/,\./g,', .') + ') in archive found.');return}
var datastring = list.replace(/.*  /g,''),
datasplit = datastring.split(regsplit);
if(datasplit.length > 2){alert('Archives with multiple files unsupported.');return}
extractArchive(fpath,workingDirectory,ext);
if(datasplit[0] != ''){return returnPath(workingDirectory,datasplit[0])}}



id('listCheats').addEventListener('click', function(){ // generate cheat list
var cheats = '';
id('cheatList').innerHTML = '';
const parameters = ['--cheats','list',filePath],
child = showCheats(parameters);
if(child.includes('AttachCoreLib() Error:') || child === ''){id('cheatList').innerHTML = 'Failed to open Mupen64Plus.';return}
if(child.includes("couldn't open ROM file")){id('cheatList').innerHTML = 'Unable to open ROM file.';return}
var datastring = child.replace(/^((?!UI-Console\:\s\s\s\s*\d).)*$/gm,''),
datafilter = datastring.replace(/UI-Console\:\s\s\s\s/gm,''),
dataremove = datafilter.replace(/\r/gm,''),
datasplit = dataremove.split(regsplit);
datasplit.forEach(e => cheat(e));
function cheat(e){if(e != ''){
var cheatCheckbox = e.replace(/\:.*/g,'');
if(!e.match(regradio)){cheatRadio = cheatCheckbox}
if(e.match(regradio)){cheatCheckbox = cheatCheckbox.replace(regradio,cheatRadio + '_')}
cheats += "<input id='" + cheatCheckbox + "' type='checkbox'><label for='" + cheatCheckbox + "'>" + e.replace(regradio,'') + "</label><br><br>"}}
id('cheatList').innerHTML = cheats
let radioBoxes = id('cheatList').querySelectorAll('input[id*=_]');
for (var i = 0; i < radioBoxes.length; i++){var box = radioBoxes[i];if(box.id.includes('_')){id(box.id.replace(regbox,'')).disabled = true}}
if(id('cheatList').innerHTML === ''){id('cheatList').innerHTML = 'No cheats for this ROM found.'}})

id('cheatList').addEventListener('change', function(e){
if(e.target.id.includes('_')){
let radioBoxes = id('cheatList').querySelectorAll('input[id*=_]');
for (var i = 0; i < radioBoxes.length; i++){var box = radioBoxes[i];if(box.id.includes(e.target.id.replace(regbox,'_'))){if(box.id != e.target.id)box.checked = false}}}})



if(localStorage.getItem('hkULActive') != null && localStorage.getItem('hkDIVActive') != null){ // mupen64plus hotkey tabs
currentHK(id(localStorage.getItem('hkULActive')),id(localStorage.getItem('hkDIVActive')))}

function currentHK(currentUL,currentDIV){hk.forEach(hk => {
if(id('ul_'+hk).classList.contains('active'))id('ul_'+hk).classList.remove('active')
if(!id(hk).classList.contains('hide'))id(hk).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('hkULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('hkDIVActive',currentDIV.id)}

hk.forEach(hk => {id('ul_'+hk).addEventListener('click', function(){currentHK(id('ul_'+hk),id(hk))})})



function noScroll(e){if(keyScroll[e.keyCode]){e.preventDefault();return false}} // prevent scrolling while focusing text inputs
for (var i = 0; i < textInputs.length; i++){var textInput = textInputs[i];preventScroll(textInput)}
function preventScroll(textInput){
textInput.addEventListener('focus',(e) => {html.addEventListener('keydown',noScroll,false)})
textInput.addEventListener('blur',(e) => {html.removeEventListener('keydown',noScroll,false)})}



function currentGFX(){ // top navigation
if(!id('angrylion').classList.contains('hide'))id('angrylion').classList.add('hide')
if(!id('gliden64').classList.contains('hide'))id('gliden64').classList.add('hide')
if(!id('parallel').classList.contains('hide'))id('parallel').classList.add('hide')
if(!id('rice').classList.contains('hide'))id('rice').classList.add('hide')
if(!id('glide64mk2').classList.contains('hide'))id('glide64mk2').classList.add('hide')
if(id('gfx').value.includes('angrylion'))id('angrylion').classList.remove('hide')
if(id('gfx').value.includes('GLideN64'))id('gliden64').classList.remove('hide')
if(id('gfx').value.includes('parallel'))id('parallel').classList.remove('hide')
if(id('gfx').value.includes('rice'))id('rice').classList.remove('hide')
if(id('gfx').value.includes('glide64mk2'))id('glide64mk2').classList.remove('hide')}
id('gfx').addEventListener('change', currentGFX)
currentGFX()

function removeShow(){menu.forEach(menu => {
if(id(menu+'Settings').classList.contains('active'))id(menu+'Settings').classList.remove('active');
if(id(menu+'SettingsDropdown').classList.contains('show'))id(menu+'SettingsDropdown').classList.remove('show')})}

menu.forEach(menu => {id(menu+'Settings').addEventListener('click', function(){
removeShow();if(!id(menu+'SettingsDropdown').classList.contains('show')){id(menu+'SettingsDropdown').classList.toggle('show');id(menu+'Settings').classList.toggle('active')}})})

html.addEventListener('click', function(e){if(!e.target.matches('.dropbutton')){removeShow()}})



dragDrop.forEach(inp => {id(inp).addEventListener('dragover', prevent, false)}) // prevent dragover event
function prevent(e){e.preventDefault();e.stopPropagation()}
function fileExtension(fpath){return fpath.slice((fpath.lastIndexOf('.') - 1 >>> 0) + 2)} // return file extension

id('fileInput').addEventListener('drop', function(e){ // drag and drop for file inputs
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){filePath = extract(fPath,n64Ext)}
else if(n64.includes(fileExtension(fPath))){filePath = fPath}
if(filePath != undefined){id('fileText').innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath))recentFiles.unshift(filePath);recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}}})

id('PIF').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){PIF = extract(fPath,biosExt)}
else if(bios.includes(fileExtension(fPath))){PIF = fPath}
if(PIF != undefined){id('PIFText').innerHTML = PIF;localStorage.setItem('PIF', PIF)}}})

id('IPLROM').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){IPLROM = extract(fPath,biosExt)}
else if(bios.includes(fileExtension(fPath))){IPLROM = fPath}
if(IPLROM != undefined){id('IPLROMText').innerHTML = IPLROM;localStorage.setItem('IPLROM', IPLROM)}}})

id('Disk').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){Disk = extract(fPath,nddExt)}
else if(ndd.includes(fileExtension(fPath))){Disk = fPath}
if(Disk != undefined){id('DiskText').innerHTML = Disk;localStorage.setItem('Disk', Disk)}}})

id('st').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(st.includes(fileExtension(fPath))){stPath = fPath}
if(stPath != undefined){id('stText').innerHTML = stPath;localStorage.setItem('st', stPath)}}})

id('gbROM1').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbROM1 = extract(fPath,gbExt)}
else if(gb.includes(fileExtension(fPath))){gbROM1 = fPath}
if(gbROM1 != undefined){id('gbROM1Text').innerHTML = gbROM1;localStorage.setItem('gbROM1', gbROM1)}}})

id('gbROM2').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbROM2 = extract(fPath,gbExt)}
else if(gb.includes(fileExtension(fPath))){gbROM2 = fPath}
if(gbROM2 != undefined){id('gbROM2Text').innerHTML = gbROM2;localStorage.setItem('gbROM2', gbROM2)}}})

id('gbROM3').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbROM3 = extract(fPath,gbExt)}
else if(gb.includes(fileExtension(fPath))){gbROM3 = fPath}
if(gbROM3 != undefined){id('gbROM3Text').innerHTML = gbROM3;localStorage.setItem('gbROM3', gbROM3)}}})

id('gbROM4').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbROM4 = extract(fPath,gbExt)}
else if(gb.includes(fileExtension(fPath))){gbROM4 = fPath}
if(gbROM4 != undefined){id('gbROM4Text').innerHTML = gbROM4;localStorage.setItem('gbROM4', gbROM4)}}})

id('gbRAM1').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbRAM1 = extract(fPath,saveExt)}
else if(save.includes(fileExtension(fPath))){gbRAM1 = fPath}
if(gbRAM1 != undefined){id('gbRAM1Text').innerHTML = gbRAM1;localStorage.setItem('gbRAM1', gbRAM1)}}})

id('gbRAM2').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbRAM2 = extract(fPath,saveExt)}
else if(save.includes(fileExtension(fPath))){gbRAM2 = fPath}
if(gbRAM2 != undefined){id('gbRAM2Text').innerHTML = gbRAM2;localStorage.setItem('gbRAM2', gbRAM2)}}})

id('gbRAM3').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbRAM3 = extract(fPath,saveExt)}
else if(save.includes(fileExtension(fPath))){gbRAM3 = fPath}
if(gbRAM3 != undefined){id('gbRAM3Text').innerHTML = gbRAM3;localStorage.setItem('gbRAM3', gbRAM3)}}})

id('gbRAM4').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(zip.includes(fileExtension(fPath))){gbRAM4 = extract(fPath,saveExt)}
else if(save.includes(fileExtension(fPath))){gbRAM4 = fPath}
if(gbRAM4 != undefined){id('gbRAM4Text').innerHTML = gbRAM4;localStorage.setItem('gbRAM4', gbRAM4)}}})



if(localStorage.getItem('filePath') != null){filePath = localStorage.getItem('filePath');id('fileText').innerHTML = filePath}
id('fileInput').addEventListener('click', function(){ // click event for file inputs
fileResult = dialogFile({name:'N64 ROM',extensions:n64Type});
if(fileResult != undefined){
if(zip.includes(fileExtension(fileResult.toString()))){filePath = extract(fileResult,n64Ext)}
else{filePath = fileResult}
if(filePath != undefined){id('fileText').innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath.toString()))recentFiles.unshift(filePath.toString());recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}}})

id('clearPIF').addEventListener('click', function(){PIF = '';id('PIFText').innerHTML = '';localStorage.removeItem('PIF')})
if(localStorage.getItem('PIF') === null){PIF = '';id('PIFText').innerHTML = PIF}
if(localStorage.getItem('PIF') != null){PIF = localStorage.getItem('PIF');id('PIFText').innerHTML = PIF}
id('PIF').addEventListener('click', function(){
PIFResult = dialogFile({name:'64DD IPL',extensions:biosType})
if(PIFResult != undefined){
if(zip.includes(fileExtension(PIFResult.toString()))){PIF = extract(PIFResult,biosExt)}
else{PIF = PIFResult.toString()}
if(PIF != undefined){id('PIFText').innerHTML = PIF;localStorage.setItem('PIF', PIF)}}})

id('clearIPLROM').addEventListener('click', function(){IPLROM = '';id('IPLROMText').innerHTML = '';localStorage.removeItem('IPLROM')})
if(localStorage.getItem('IPLROM') === null){IPLROM = '';id('IPLROMText').innerHTML = IPLROM}
if(localStorage.getItem('IPLROM') != null){IPLROM = localStorage.getItem('IPLROM');id('IPLROMText').innerHTML = IPLROM}
id('IPLROM').addEventListener('click', function(){
IPLROMResult = dialogFile({name:'64DD IPL',extensions:biosType})
if(IPLROMResult != undefined){
if(zip.includes(fileExtension(IPLROMResult.toString()))){IPLROM = extract(IPLROMResult,biosExt)}
else{IPLROM = IPLROMResult.toString()}
if(IPLROM != undefined){id('IPLROMText').innerHTML = IPLROM;localStorage.setItem('IPLROM', IPLROM)}}})

id('clearDisk').addEventListener('click', function(){Disk = '';id('DiskText').innerHTML = '';localStorage.removeItem('Disk')})
if(localStorage.getItem('Disk') === null){Disk = '';id('DiskText').innerHTML = Disk}
if(localStorage.getItem('Disk') != null){Disk = localStorage.getItem('Disk');id('DiskText').innerHTML = Disk}
id('Disk').addEventListener('click', function(){
DiskResult = dialogFile({name:'64DD Disk',extensions:nddType})
if(DiskResult != undefined){
if(zip.includes(fileExtension(DiskResult.toString()))){Disk = extract(DiskResult,nddExt)}
else{Disk = DiskResult.toString()}
if(Disk != undefined){id('DiskText').innerHTML = Disk;localStorage.setItem('Disk', Disk)}}})

id('clearst').addEventListener('click', function(){stPath = '';id('stText').innerHTML = '';localStorage.removeItem('st')})
if(localStorage.getItem('st') === null){stPath = '';id('stText').innerHTML = stPath}
if(localStorage.getItem('st') != null){stPath = localStorage.getItem('st');id('stText').innerHTML = stPath}
id('st').addEventListener('click', function(){
stResult = dialogFile({name:'Savestate',extensions:st})
if(stResult != undefined){stPath = stResult.toString()}
if(stPath != undefined){id('stText').innerHTML = stPath;localStorage.setItem('st', stPath)}})

id('cleargbROM1').addEventListener('click', function(){gbROM1 = '';id('gbROM1Text').innerHTML = '';localStorage.removeItem('gbROM1')})
if(localStorage.getItem('gbROM1') === null){gbROM1 = '';id('gbROM1Text').innerHTML = gbROM1}
if(localStorage.getItem('gbROM1') != null){gbROM1 = localStorage.getItem('gbROM1');id('gbROM1Text').innerHTML = gbROM1}
id('gbROM1').addEventListener('click', function(){
gbROM1Result = dialogFile({name:'GB ROM',extensions:gbType})
if(gbROM1Result != undefined){
if(zip.includes(fileExtension(gbROM1Result.toString()))){gbROM1 = extract(gbROM1Result,gbExt)}
else{gbROM1 = gbROM1Result.toString()}
if(gbROM1 != undefined){id('gbROM1Text').innerHTML = gbROM1;localStorage.setItem('gbROM1', gbROM1)}}})

id('cleargbROM2').addEventListener('click', function(){gbROM2 = '';id('gbROM2Text').innerHTML = '';localStorage.removeItem('gbROM2')})
if(localStorage.getItem('gbROM2') === null){gbROM2 = '';id('gbROM2Text').innerHTML = gbROM2}
if(localStorage.getItem('gbROM2') != null){gbROM2 = localStorage.getItem('gbROM2');id('gbROM2Text').innerHTML = gbROM2}
id('gbROM2').addEventListener('click', function(){
gbROM2Result = dialogFile({name:'GB ROM',extensions:gbType})
if(gbROM2Result != undefined){
if(zip.includes(fileExtension(gbROM2Result.toString()))){gbROM2 = extract(gbROM2Result,gbExt)}
else{gbROM2 = gbROM2Result.toString()}
if(gbROM2 != undefined){id('gbROM2Text').innerHTML = gbROM2;localStorage.setItem('gbROM2', gbROM2)}}})

id('cleargbROM3').addEventListener('click', function(){gbROM3 = '';id('gbROM3Text').innerHTML = '';localStorage.removeItem('gbROM3')})
if(localStorage.getItem('gbROM3') === null){gbROM3 = '';id('gbROM3Text').innerHTML = gbROM3}
if(localStorage.getItem('gbROM3') != null){gbROM3 = localStorage.getItem('gbROM3');id('gbROM3Text').innerHTML = gbROM3}
id('gbROM3').addEventListener('click', function(){
gbROM3Result = dialogFile({name:'GB ROM',extensions:gbType})
if(gbROM3Result != undefined){
if(zip.includes(fileExtension(gbROM3Result.toString()))){gbROM3 = extract(gbROM3Result,gbExt)}
else{gbROM3 = gbROM3Result.toString()}
if(gbROM3 != undefined){id('gbROM3Text').innerHTML = gbROM3;localStorage.setItem('gbROM3', gbROM3)}}})

id('cleargbROM4').addEventListener('click', function(){gbROM4 = '';id('gbROM4Text').innerHTML = '';localStorage.removeItem('gbROM4')})
if(localStorage.getItem('gbROM4') === null){gbROM4 = '';id('gbROM4Text').innerHTML = gbROM4}
if(localStorage.getItem('gbROM4') != null){gbROM4 = localStorage.getItem('gbROM4');id('gbROM4Text').innerHTML = gbROM4}
id('gbROM4').addEventListener('click', function(){
gbROM4Result = dialogFile({name:'GB ROM',extensions:gbType})
if(gbROM4Result != undefined){
if(zip.includes(fileExtension(gbROM4Result.toString()))){gbROM4 = extract(gbROM4Result,gbExt)}
else{gbROM4 = gbROM4Result.toString()}
if(gbROM4 != undefined){id('gbROM4Text').innerHTML = gbROM4;localStorage.setItem('gbROM4', gbROM4)}}})

id('cleargbRAM1').addEventListener('click', function(){gbRAM1 = '';id('gbRAM1Text').innerHTML = '';localStorage.removeItem('gbRAM1')})
if(localStorage.getItem('gbRAM1') === null){gbRAM1 = '';id('gbRAM1Text').innerHTML = gbRAM1}
if(localStorage.getItem('gbRAM1') != null){gbRAM1 = localStorage.getItem('gbRAM1');id('gbRAM1Text').innerHTML = gbRAM1}
id('gbRAM1').addEventListener('click', function(){
gbRAM1Result = dialogFile({name:'GB Save File',extensions:saveType})
if(gbRAM1Result != undefined){
if(zip.includes(fileExtension(gbRAM1Result.toString()))){gbRAM1 = extract(gbRAM1Result,saveExt)}
else{gbRAM1 = gbRAM1Result.toString()}
if(gbRAM1 != undefined){id('gbRAM1Text').innerHTML = gbRAM1;localStorage.setItem('gbRAM1', gbRAM1)}}})

id('cleargbRAM2').addEventListener('click', function(){gbRAM2 = '';id('gbRAM2Text').innerHTML = '';localStorage.removeItem('gbRAM2')})
if(localStorage.getItem('gbRAM2') === null){gbRAM2 = '';id('gbRAM2Text').innerHTML = gbRAM2}
if(localStorage.getItem('gbRAM2') != null){gbRAM2 = localStorage.getItem('gbRAM2');id('gbRAM2Text').innerHTML = gbRAM2}
id('gbRAM2').addEventListener('click', function(){
gbRAM2Result = dialogFile({name:'GB Save File',extensions:saveType})
if(gbRAM2Result != undefined){
if(zip.includes(fileExtension(gbRAM2Result.toString()))){gbRAM2 = extract(gbRAM2Result,saveExt)}
else{gbRAM2 = gbRAM2Result.toString()}
if(gbRAM2 != undefined){id('gbRAM2Text').innerHTML = gbRAM2;localStorage.setItem('gbRAM2', gbRAM2)}}})

id('cleargbRAM3').addEventListener('click', function(){gbRAM3 = '';id('gbRAM3Text').innerHTML = '';localStorage.removeItem('gbRAM3')})
if(localStorage.getItem('gbRAM3') === null){gbRAM3 = '';id('gbRAM3Text').innerHTML = gbRAM3}
if(localStorage.getItem('gbRAM3') != null){gbRAM3 = localStorage.getItem('gbRAM3');id('gbRAM3Text').innerHTML = gbRAM3}
id('gbRAM3').addEventListener('click', function(){
gbRAM3Result = dialogFile({name:'GB Save File',extensions:saveType})
if(gbRAM3Result != undefined){
if(zip.includes(fileExtension(gbRAM3Result.toString()))){gbRAM3 = extract(gbRAM3Result,saveExt)}
else{gbRAM3 = gbRAM3Result.toString()}
if(gbRAM3 != undefined){id('gbRAM3Text').innerHTML = gbRAM3;localStorage.setItem('gbRAM3', gbRAM3)}}})

id('cleargbRAM4').addEventListener('click', function(){gbRAM4 = '';id('gbRAM4Text').innerHTML = '';localStorage.removeItem('gbRAM4')})
if(localStorage.getItem('gbRAM4') === null){gbRAM4 = '';id('gbRAM4Text').innerHTML = gbRAM4}
if(localStorage.getItem('gbRAM4') != null){gbRAM4 = localStorage.getItem('gbRAM4');id('gbRAM4Text').innerHTML = gbRAM4}
id('gbRAM4').addEventListener('click', function(){
gbRAM4Result = dialogFile({name:'GB Save File',extensions:saveType})
if(gbRAM4Result != undefined){
if(zip.includes(fileExtension(gbRAM4Result.toString()))){gbRAM4 = extract(gbRAM4Result,saveExt)}
else{gbRAM4 = gbRAM4Result.toString()}
if(gbRAM4 != undefined){id('gbRAM4Text').innerHTML = gbRAM4;localStorage.setItem('gbRAM4', gbRAM4)}}})



id('resetScreenshotPath').addEventListener('click', function(){ScreenshotPath = '';id('ScreenshotPathText').innerHTML = '';localStorage.removeItem('ScreenshotPath')})
if(localStorage.getItem('ScreenshotPath') === null){ScreenshotPath = '';id('ScreenshotPathText').innerHTML = ScreenshotPath}
if(localStorage.getItem('ScreenshotPath') != null){ScreenshotPath = localStorage.getItem('ScreenshotPath');id('ScreenshotPathText').innerHTML = ScreenshotPath}
id('ScreenshotPath').addEventListener('click', function(){ // choosing and resetting directories
ScreenshotPathResult = dialogDirectory()
if(ScreenshotPathResult != undefined){ScreenshotPath = ScreenshotPathResult.toString();id('ScreenshotPathText').innerHTML = ScreenshotPath;localStorage.setItem('ScreenshotPath', ScreenshotPath)}})

id('resetSaveStatePath').addEventListener('click', function(){SaveStatePath = '';id('SaveStatePathText').innerHTML = '';localStorage.removeItem('SaveStatePath')})
if(localStorage.getItem('SaveStatePath') === null){SaveStatePath = '';id('SaveStatePathText').innerHTML = SaveStatePath}
if(localStorage.getItem('SaveStatePath') != null){SaveStatePath = localStorage.getItem('SaveStatePath');id('SaveStatePathText').innerHTML = SaveStatePath}
id('SaveStatePath').addEventListener('click', function(){
SaveStatePathResult = dialogDirectory()
if(SaveStatePathResult != undefined){SaveStatePath = SaveStatePathResult.toString();id('SaveStatePathText').innerHTML = SaveStatePath;localStorage.setItem('SaveStatePath', SaveStatePath)}})

id('resetSaveSRAMPath').addEventListener('click', function(){SaveSRAMPath = '';id('SaveSRAMPathText').innerHTML = '';localStorage.removeItem('SaveSRAMPath')})
if(localStorage.getItem('SaveSRAMPath') === null){SaveSRAMPath = '';id('SaveSRAMPathText').innerHTML = SaveSRAMPath}
if(localStorage.getItem('SaveSRAMPath') != null){SaveSRAMPath = localStorage.getItem('SaveSRAMPath');id('SaveSRAMPathText').innerHTML = SaveSRAMPath}
id('SaveSRAMPath').addEventListener('click', function(){
SaveSRAMPathResult = dialogDirectory()
if(SaveSRAMPathResult != undefined){SaveSRAMPath = SaveSRAMPathResult.toString();id('SaveSRAMPathText').innerHTML = SaveSRAMPath;localStorage.setItem('SaveSRAMPath', SaveSRAMPath)}})

id('resetworkingDirectory').addEventListener('click', function(){workingDirectory = working_directory;id('workingDirectoryText').innerHTML = workingDirectory;localStorage.removeItem('workingDirectory')})
if(localStorage.getItem('workingDirectory') === null){workingDirectory = working_directory;id('workingDirectoryText').innerHTML = workingDirectory}
if(localStorage.getItem('workingDirectory') != null){workingDirectory = localStorage.getItem('workingDirectory');id('workingDirectoryText').innerHTML = workingDirectory}
id('workingDirectory').addEventListener('click', function(){
workingDirectoryResult = dialogDirectory()
if(workingDirectoryResult != undefined){workingDirectory = workingDirectoryResult.toString();id('workingDirectoryText').innerHTML = workingDirectory;localStorage.setItem('workingDirectory', workingDirectory)}})

id('resetTxPath').addEventListener('click', function(){txPath = hires_texture;id('txPathText').innerHTML = txPath;localStorage.removeItem('txPath')})
if(localStorage.getItem('txPath') === null){txPath = hires_texture;id('txPathText').innerHTML = txPath}
if(localStorage.getItem('txPath') != null){txPath = localStorage.getItem('txPath');id('txPathText').innerHTML = txPath}
id('txPath').addEventListener('click', function(){
txPathResult = dialogDirectory()
if(txPathResult != undefined){txPath = txPathResult.toString();id('txPathText').innerHTML = txPath;localStorage.setItem('txPath', txPath)}})

id('resetTxCachePath').addEventListener('click', function(){txCachePath = cache;id('txCachePathText').innerHTML = txCachePath;localStorage.removeItem('txCachePath')})
if(localStorage.getItem('txCachePath') === null){txCachePath = cache;id('txCachePathText').innerHTML = txCachePath}
if(localStorage.getItem('txCachePath') != null){txCachePath = localStorage.getItem('txCachePath');id('txCachePathText').innerHTML = txCachePath}
id('txCachePath').addEventListener('click', function(){
txCachePathResult = dialogDirectory()
if(txCachePathResult != undefined){txCachePath = txCachePathResult.toString();id('txCachePathText').innerHTML = txCachePath;localStorage.setItem('txCachePath', txCachePath)}})

id('resetTxDumpPath').addEventListener('click', function(){txDumpPath = texture_dump;id('txDumpPathText').innerHTML = txDumpPath;localStorage.removeItem('txDumpPath')})
if(localStorage.getItem('txDumpPath') === null){txDumpPath = texture_dump;id('txDumpPathText').innerHTML = txDumpPath}
if(localStorage.getItem('txDumpPath') != null){txDumpPath = localStorage.getItem('txDumpPath');id('txDumpPathText').innerHTML = txDumpPath}
id('txDumpPath').addEventListener('click', function(){
txDumpPathResult = dialogDirectory()
if(txDumpPathResult != undefined){txDumpPath = txDumpPathResult.toString();id('txDumpPathText').innerHTML = txDumpPath;localStorage.setItem('txDumpPath', txDumpPath)}})

id('resetfontColor').addEventListener('click', function(){fontColor = id('resetfontColor').dataset.value;id('fontColor').value = id('resetfontColor').dataset.value;localStorage.removeItem('fontColor')})
if(localStorage.getItem('fontColor') != null){id('fontColor').value = localStorage.getItem('fontColor')}
id('fontColor').addEventListener('change', function(){localStorage.setItem('fontColor', id('fontColor').value)})



id('launch').addEventListener('click', function(){
var exp = 'Core[DisableExtraMem]=' + id('exp').checked,
SharedDataPath = 'Core[SharedDataPath]=',
nospeedlimit = id('nospeedlimit').checked ? '--nospeedlimit' : [],
osd = id('osd').checked ? '--osd' : '--noosd',
verbose = id('verbose').checked ? '--verbose' : [],
savestate = stPath != '' ? ['--savestate',stPath] : [],
PIFROM = PIF != '' ? ['--pif',PIF] : [],
fullscreen = id('fullscreen').checked ? '--fullscreen' : '--windowed',
ParallelFullscreen = 'Video-Parallel[Fullscreen]=' + id('fullscreen').checked,
vsync = 'Video-General[VerticalSync]=' + id('vsync').checked,
Glide64VSync = 'Video-Glide64mk2[vsync]=' + id('vsync').checked,
m64pGFX = 'Rsp-HLE[DisplayListToGraphicsPlugin]=True',
cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=' + id('rspGFX').checked,
cxd4Audio = 'rsp-cxd4[AudioListToAudioPlugin]=' + id('rspAudio').checked,
m64pAudio = 'Rsp-HLE[AudioListToAudioPlugin]=' + id('rspAudio').checked,
WaitForCPUHost = 'rsp-cxd4[WaitForCPUHost]=False',
SupportCPUSemaphoreLock = 'rsp-cxd4[SupportCPUSemaphoreLock]=False',
threadedVideo = 'Video-GLideN64[threadedVideo]=False',
bilinearMode = 'Video-GLideN64[bilinearMode]=' + id('bilinearMode').checked,
fxaa = 'Video-GLideN64[fxaa]=' + id('fxaa').checked,
enableHalosRemoval = 'Video-GLideN64[enableHalosRemoval]=' + id('enableHalosRemoval').checked,
txDump = 'Video-GLideN64[txDump]=' + id('txDump').checked,
txHiresEnable = 'Video-GLideN64[txHiresEnable]=' + id('txHiresEnable').checked,
txNoTextureFileStorage = 'Video-GLideN64[txNoTextureFileStorage]=' + id('txNoTextureFileStorage').checked,
EnableInaccurateTextureCoordinates = 'Video-GLideN64[EnableInaccurateTextureCoordinates]=' + id('EnableInaccurateTextureCoordinates').checked,
EnableDitheringPattern = 'Video-GLideN64[EnableDitheringPattern]=' + id('EnableDitheringPattern').checked,
EnableHiresNoiseDithering = 'Video-GLideN64[EnableHiresNoiseDithering]=' + id('EnableHiresNoiseDithering').checked,
DitheringQuantization = 'Video-GLideN64[DitheringQuantization]=' + id('DitheringQuantization').checked,
EnableHWLighting = 'Video-GLideN64[EnableHWLighting]=' + id('EnableHWLighting').checked,
EnableCoverage = 'Video-GLideN64[EnableCoverage]=' + id('EnableCoverage').checked,
EnableClipping = 'Video-GLideN64[EnableClipping]=' + id('EnableClipping').checked,
EnableShadersStorage = 'Video-GLideN64[EnableShadersStorage]=' + id('EnableShadersStorage').checked,
EnableLegacyBlending = 'Video-GLideN64[EnableLegacyBlending]=' + id('EnableLegacyBlending').checked,
EnableHybridFilter = 'Video-GLideN64[EnableHybridFilter]=' + id('EnableHybridFilter').checked,
EnableFragmentDepthWrite = 'Video-GLideN64[EnableFragmentDepthWrite]=' + id('EnableFragmentDepthWrite').checked,
EnableCustomSettings = 'Video-GLideN64[EnableCustomSettings]=' + id('EnableCustomSettings').checked,
EnableTexCoordBounds = 'Video-GLideN64[EnableTexCoordBounds]=' + (id('EnableTexCoordBounds').checked ? '1' : '0'),
EnableLOD = 'Video-GLideN64[EnableLOD]=' + id('EnableLOD').checked,
EnableFBEmulation = 'Video-GLideN64[EnableFBEmulation]=' + id('EnableFBEmulation').checked,
EnableCopyAuxiliaryToRDRAM = 'Video-GLideN64[EnableCopyAuxiliaryToRDRAM]=' + id('EnableCopyAuxiliaryToRDRAM').checked,
ForceDepthBufferClear = 'Video-GLideN64[ForceDepthBufferClear]=' + id('ForceDepthBufferClear').checked,
DisableFBInfo = 'Video-GLideN64[DisableFBInfo]=' + id('DisableFBInfo').checked,
FBInfoReadColorChunk = 'Video-GLideN64[FBInfoReadColorChunk]=' + id('FBInfoReadColorChunk').checked,
FBInfoReadDepthChunk = 'Video-GLideN64[FBInfoReadDepthChunk]=' + id('FBInfoReadDepthChunk').checked,
EnableCopyColorFromRDRAM = 'Video-GLideN64[EnableCopyColorFromRDRAM]=' + id('EnableCopyColorFromRDRAM').checked,
EnableCopyDepthToMainDepthBuffer = 'Video-GLideN64[EnableCopyDepthToMainDepthBuffer]=' + id('EnableCopyDepthToMainDepthBuffer').checked,
EnableOverscan = 'Video-GLideN64[EnableOverscan]=' + id('EnableOverscan').checked,
txDeposterize = 'Video-GLideN64[txDeposterize]=' + id('txDeposterize').checked,
txFilterIgnoreBG = 'Video-GLideN64[txFilterIgnoreBG]=' + id('txFilterIgnoreBG').checked,
txHiresFullAlphaChannel = 'Video-GLideN64[txHiresFullAlphaChannel]=' + id('txHiresFullAlphaChannel').checked,
txHresAltCRC = 'Video-GLideN64[txHresAltCRC]=' + id('txHresAltCRC').checked,
txCacheCompression = 'Video-GLideN64[txCacheCompression]=' + id('txCacheCompression').checked,
txForce16bpp = 'Video-GLideN64[txForce16bpp]=' + id('txForce16bpp').checked,
txSaveCache = 'Video-GLideN64[txSaveCache]=' + id('txSaveCache').checked,
ForceGammaCorrection = 'Video-GLideN64[ForceGammaCorrection]=' + id('ForceGammaCorrection').checked,
ShowFPS = 'Video-GLideN64[ShowFPS]=' + id('ShowFPS').checked,
ShowVIS = 'Video-GLideN64[ShowVIS]=' + id('ShowVIS').checked,
ShowPercent = 'Video-GLideN64[ShowPercent]=' + id('ShowPercent').checked,
ShowInternalResolution = 'Video-GLideN64[ShowInternalResolution]=' + id('ShowInternalResolution').checked,
ShowRenderingResolution = 'Video-GLideN64[ShowRenderingResolution]=' + id('ShowRenderingResolution').checked,
ShowStatistics = 'Video-GLideN64[ShowStatistics]=' + id('ShowStatistics').checked,

NoCompiledJump = 'Core[NoCompiledJump]=' + id('NoCompiledJump').checked,
AutoStateSlotIncrement = 'Core[AutoStateSlotIncrement]=' + id('AutoStateSlotIncrement').checked,
RandomizeInterrupt = 'Core[RandomizeInterrupt]=' + id('RandomizeInterrupt').checked,
SWAP_CHANNELS = 'Audio-SDL[SWAP_CHANNELS]=' + id('SWAP_CHANNELS').checked,
AUDIO_SYNC = 'Audio-SDL[AUDIO_SYNC]=' + id('AUDIO_SYNC').checked,

Parallel = 'Video-AngrylionPlus[Parallel]=' + id('Parallel').checked,
BusyLoop = 'Video-AngrylionPlus[BusyLoop]=' + id('BusyLoop').checked,
ViWidescreen = 'Video-AngrylionPlus[ViWidescreen]=' + id('ViWidescreen').checked,
ViHideOverscan = 'Video-AngrylionPlus[ViHideOverscan]=' + id('ViHideOverscan').checked,
ViIntegerScaling = 'Video-AngrylionPlus[ViIntegerScaling]=' + id('ViIntegerScaling').checked,

ParallelSuperscaledReads = 'Video-Parallel[SuperscaledReads]=' + id('ParallelSuperscaledReads').checked,
ParallelSuperscaledDither = 'Video-Parallel[SuperscaledDither]=' + id('ParallelSuperscaledDither').checked,
ParallelIntegerScale = 'Video-Parallel[IntegerScale]=' + id('ParallelIntegerScale').checked,
ParallelVIAA = 'Video-Parallel[VIAA]=' + id('ParallelVIAA').checked,
ParallelDivot = 'Video-Parallel[Divot]=' + id('ParallelDivot').checked,
ParallelGammaDither = 'Video-Parallel[GammaDither]=' + id('ParallelGammaDither').checked,
ParallelVIBilerp = 'Video-Parallel[VIBilerp]=' + id('ParallelVIBilerp').checked,
ParallelVIDither = 'Video-Parallel[VIDither]=' + id('ParallelVIDither').checked,
ParallelNativeTextLOD = 'Video-Parallel[NativeTextLOD]=' + id('ParallelNativeTextLOD').checked,
ParallelNativeTextRECT = 'Video-Parallel[NativeTextRECT]=' + id('ParallelNativeTextRECT').checked,
ParallelWidescreenStretch = 'Video-Parallel[WidescreenStretch]=' + id('ParallelWidescreenStretch').checked,

FrameBufferSetting = 'Video-Rice[FrameBufferSetting]=' + (id('FrameBufferSetting').checked ? '1' : '0'),
NormalAlphaBlender = 'Video-Rice[NormalAlphaBlender]=' + id('NormalAlphaBlender').checked,
FastTextureLoading = 'Video-Rice[FastTextureLoading]=' + id('FastTextureLoading').checked,
AccurateTextureMapping = 'Video-Rice[AccurateTextureMapping]=' + id('AccurateTextureMapping').checked,
InN64Resolution = 'Video-Rice[InN64Resolution]=' + id('InN64Resolution').checked,
SaveVRAM = 'Video-Rice[SaveVRAM]=' + id('SaveVRAM').checked,
DoubleSizeForSmallTxtrBuf = 'Video-Rice[DoubleSizeForSmallTxtrBuf]=' + id('DoubleSizeForSmallTxtrBuf').checked,
DefaultCombinerDisable = 'Video-Rice[DefaultCombinerDisable]=' + id('DefaultCombinerDisable').checked,
EnableHacks = 'Video-Rice[EnableHacks]=' + id('EnableHacks').checked,
WinFrameMode = 'Video-Rice[WinFrameMode]=' + id('WinFrameMode').checked,
FullTMEMEmulation = 'Video-Rice[FullTMEMEmulation]=' + id('FullTMEMEmulation').checked,
OpenGLVertexClipper = 'Video-Rice[OpenGLVertexClipper]=' + id('OpenGLVertexClipper').checked,
EnableSSE = 'Video-Rice[EnableSSE]=' + id('EnableSSE').checked,
SkipFrame = 'Video-Rice[SkipFrame]=' + id('SkipFrame').checked,
TexRectOnly = 'Video-Rice[TexRectOnly]=' + id('TexRectOnly').checked,
SmallTextureOnly = 'Video-Rice[SmallTextureOnly]=' + id('SmallTextureOnly').checked,
LoadHiResCRCOnly = 'Video-Rice[LoadHiResCRCOnly]=' + id('LoadHiResCRCOnly').checked,
LoadHiResTextures = 'Video-Rice[LoadHiResTextures]=' + id('LoadHiResTextures').checked,
DumpTexturesToFiles = 'Video-Rice[DumpTexturesToFiles]=' + id('DumpTexturesToFiles').checked,
RiceShowFPS = 'Video-Rice[RiceShowFPS]=' + id('RiceShowFPS').checked,
FogMethod = 'Video-Rice[FogMethod]=' + (id('FogMethod').checked ? '1' : '0'),
OpenGLRenderSetting = 'Video-Rice[OpenGLRenderSetting]=' + (id('OpenGLRenderSetting').checked ? '1' : '0'),
ForcePolygonOffset = 'Video-Rice[ForcePolygonOffset]=' + id('ForcePolygonOffset').checked,

force_polygon_offset = 'Video-Glide64mk2[force_polygon_offset]=' + id('force_polygon_offset').checked,
clock = 'Video-Glide64mk2[clock]=' + id('clock').checked,
clock_24_hr = 'Video-Glide64mk2[clock_24_hr]=' + id('clock_24_hr').checked,
wrpFBO = 'Video-Glide64mk2[wrpFBO]=' + id('wrpFBO').checked,
wrpAnisotropic = 'Video-Glide64mk2[wrpAnisotropic]=' + id('wrpAnisotropic').checked,
ghq_hirs = 'Video-Glide64mk2[ghq_hirs]=' + (id('ghq_hirs').checked ? '1' : '0'),
ghq_enht_cmpr = 'Video-Glide64mk2[ghq_enht_cmpr]=' + id('ghq_enht_cmpr').checked,
ghq_enht_tile = 'Video-Glide64mk2[ghq_enht_tile]=' + (id('ghq_enht_tile').checked ? '1' : '0'),
ghq_enht_f16bpp = 'Video-Glide64mk2[ghq_enht_f16bpp]=' + id('ghq_enht_f16bpp').checked,
ghq_enht_gz = 'Video-Glide64mk2[ghq_enht_gz]=' + id('ghq_enht_gz').checked,
ghq_enht_nobg = 'Video-Glide64mk2[ghq_enht_nobg]=' + id('ghq_enht_nobg').checked,
ghq_hirs_cmpr = 'Video-Glide64mk2[ghq_hirs_cmpr]=' + id('ghq_hirs_cmpr').checked,
ghq_hirs_tile = 'Video-Glide64mk2[ghq_hirs_tile]=' + id('ghq_hirs_tile').checked,
ghq_hirs_f16bpp = 'Video-Glide64mk2[ghq_hirs_f16bpp]=' + id('ghq_hirs_f16bpp').checked,
ghq_hirs_gz = 'Video-Glide64mk2[ghq_hirs_gz]=' + id('ghq_hirs_gz').checked,
ghq_hirs_altcrc = 'Video-Glide64mk2[ghq_hirs_altcrc]=' + id('ghq_hirs_altcrc').checked,
ghq_cache_save = 'Video-Glide64mk2[ghq_cache_save]=' + id('ghq_cache_save').checked,
ghq_hirs_let_texartists_fly = 'Video-Glide64mk2[ghq_hirs_let_texartists_fly]=' + id('ghq_hirs_let_texartists_fly').checked,
ghq_hirs_dump = 'Video-Glide64mk2[ghq_hirs_dump]=' + id('ghq_hirs_dump').checked,

resolution = id('resolution').value,
ParallelScreenWidth = 'Video-Parallel[ScreenWidth]=' + id('resolution').options[id('resolution').selectedIndex].dataset.width,
ParallelScreenHeight = 'Video-Parallel[ScreenHeight]=' + id('resolution').options[id('resolution').selectedIndex].dataset.height,
gfx = id('gfx').value,
audio = id('audio').value,
input = id('input').value,
rsp = id('rsp').value,
RspFallback = id('RspFallback').value,
emumode = id('emumode').value,
plugin1 = id('plugin1').value,
plugin2 = id('plugin2').value,
plugin3 = id('plugin3').value,
plugin4 = id('plugin4').value,
mode1 = id('mode1').value,
mode2 = id('mode2').value,
mode3 = id('mode3').value,
mode4 = id('mode4').value,
msaa = id('msaa').value,
aspectRatio = id('aspectRatio').value,
bufferSwapMode = id('bufferSwapMode').value,
useNativeResolutionFactor = id('useNativeResolutionFactor').value,
anisotropy = id('anisotropy').value,
cache = id('cache').value,
RDRAMImageDitheringMode = id('RDRAMImageDitheringMode').value,
CorrectTexrectCoords = id('CorrectTexrectCoords').value,
EnableNativeResTexrects = id('EnableNativeResTexrects').value,
BackgroundsMode = id('BackgroundsMode').value,
EnableN64DepthCompare = id('EnableN64DepthCompare').value,
EnableCopyColorToRDRAM = id('EnableCopyColorToRDRAM').value,
EnableCopyDepthToRDRAM = id('EnableCopyDepthToRDRAM').value,
txFilterMode = id('txFilterMode').value,
txEnhancementMode = id('txEnhancementMode').value,
ViMode = id('ViMode').value,
ViInterpolation = id('ViInterpolation').value,
DpCompat = id('DpCompat').value,
ParallelUpscaling = id('ParallelUpscaling').value,
ParallelDeinterlace = id('ParallelDeinterlace').value,
ParallelDownScale = id('ParallelDownScale').value,
CountersPos = id('CountersPos').value,
SaveDiskFormat = id('SaveDiskFormat').value,
DEFAULT_FREQUENCY = id('DEFAULT_FREQUENCY').value,
PRIMARY_BUFFER_TARGET = id('SECONDARY_BUFFER_SIZE').options[id('SECONDARY_BUFFER_SIZE').selectedIndex].dataset.buffer,
SECONDARY_BUFFER_SIZE = id('SECONDARY_BUFFER_SIZE').value,
RESAMPLE = id('RESAMPLE').value,
FrameBufferWriteBackControl = id('FrameBufferWriteBackControl').value,
RenderToTexture = id('RenderToTexture').value,
ScreenUpdateSetting = id('ScreenUpdateSetting').value,
Mipmapping = id('Mipmapping').value,
ForceTextureFilter = id('ForceTextureFilter').value,
TextureEnhancement = id('TextureEnhancement').value,
TextureEnhancementControl = id('TextureEnhancementControl').value,
TextureQuality = id('TextureQuality').value,
OpenGLDepthBufferSetting = id('OpenGLDepthBufferSetting').value,
RiceMultiSampling = id('RiceMultiSampling').value,
ColorQuality = id('ColorQuality').value,
AnisotropicFiltering = id('AnisotropicFiltering').value,
wrpAntiAliasing = id('wrpAntiAliasing').value,
show_fps = id('show_fps').value,
ghq_fltr = id('ghq_fltr').value,
ghq_cmpr = id('ghq_cmpr').value,
ghq_enht = id('ghq_enht').value,
alt_tex_size = id('alt_tex_size').value,
use_sts1_only = id('use_sts1_only').value,
force_calc_sphere = id('force_calc_sphere').value,
correct_viewport = id('correct_viewport').value,
increase_texrect_edge = id('increase_texrect_edge').value,
decrease_fillrect_edge = id('decrease_fillrect_edge').value,
texture_correction = id('texture_correction').value,
pal230 = id('pal230').value,
force_microcheck = id('force_microcheck').value,
force_quad3d = id('force_quad3d').value,
clip_zmin = id('clip_zmin').value,
clip_zmax = id('clip_zmax').value,
fast_crc = id('fast_crc').value,
adjust_aspect = id('adjust_aspect').value,
zmode_compare_less = id('zmode_compare_less').value,
old_style_adither = id('old_style_adither').value,
n64_z_scale = id('n64_z_scale').value,
optimize_texrect = id('optimize_texrect').value,
ignore_aux_copy = id('ignore_aux_copy').value,
hires_buf_clear = id('hires_buf_clear').value,
fb_read_alpha = id('fb_read_alpha').value,
useless_is_useless = id('useless_is_useless').value,
fb_crc_mode = id('fb_crc_mode').value,
filtering = id('filtering').value,
fog = id('fog').value,
buff_clear = id('buff_clear').value,
swapmode = id('swapmode').value,
aspect = id('aspect').value,
lodmode = id('lodmode').value,
fb_smart = id('fb_smart').value,
fb_hires = id('fb_hires').value,
fb_read_always = id('fb_read_always').value,
read_back_to_screen = id('read_back_to_screen').value,
detect_cpu_write = id('detect_cpu_write').value,
fb_get_info = id('fb_get_info').value,
fb_render = id('fb_render').value,

OverscanNtscTop = 'Video-GLideN64[OverscanNtscTop]=' + id('OverscanNtscTop').value,
OverscanNtscLeft = 'Video-GLideN64[OverscanNtscLeft]=' + id('OverscanNtscLeft').value,
OverscanNtscRight = 'Video-GLideN64[OverscanNtscRight]=' + id('OverscanNtscRight').value,
OverscanNtscBottom = 'Video-GLideN64[OverscanNtscBottom]=' + id('OverscanNtscBottom').value,
OverscanPalTop = 'Video-GLideN64[OverscanPalTop]=' + id('OverscanPalTop').value,
OverscanPalLeft = 'Video-GLideN64[OverscanPalLeft]=' + id('OverscanPalLeft').value,
OverscanPalRight = 'Video-GLideN64[OverscanPalRight]=' + id('OverscanPalRight').value,
OverscanPalBottom = 'Video-GLideN64[OverscanPalBottom]=' + id('OverscanPalBottom').value,
ParallelCropOverscan = 'Video-Parallel[CropOverscan]=' + id('ParallelCropOverscan').value,
txCacheSize = 'Video-GLideN64[txCacheSize]=' + id('txCacheSize').value,
txHiresVramLimit = 'Video-GLideN64[txHiresVramLimit]=' + id('txHiresVramLimit').value,
GammaCorrectionLevel = 'Video-GLideN64[GammaCorrectionLevel]=' + id('GammaCorrectionLevel').value,
fontSize = 'Video-GLideN64[fontSize]=' + id('fontSize').value,
fontColor = 'Video-GLideN64[fontColor]=' + id('fontColor').value.substring(1),
NumWorkers = 'Video-AngrylionPlus[NumWorkers]=' + id('NumWorkers').value,
CountPerOp = 'Core[CountPerOp]=' + id('CountPerOp').value,
CountPerOpDenomPot = 'Core[CountPerOpDenomPot]=' + id('CountPerOpDenomPot').value,
SiDmaDuration = 'Core[SiDmaDuration]=' + id('SiDmaDuration').value,
CurrentStateSlot = 'Core[CurrentStateSlot]=' + id('CurrentStateSlot').value,
device1 = 'Input-SDL-Control1[device]=' + id('c1').value.substring(0,2).replace(regc,''),
device2 = 'Input-SDL-Control2[device]=' + id('c2').value.substring(0,2).replace(regc,''),
device3 = 'Input-SDL-Control3[device]=' + id('c3').value.substring(0,2).replace(regc,''),
device4 = 'Input-SDL-Control4[device]=' + id('c4').value.substring(0,2).replace(regc,''),
name1 = 'Input-SDL-Control1[name]=' + id('c1').value.replace(regid,''),
name2 = 'Input-SDL-Control2[name]=' + id('c2').value.replace(regid,''),
name3 = 'Input-SDL-Control3[name]=' + id('c3').value.replace(regid,''),
name4 = 'Input-SDL-Control4[name]=' + id('c4').value.replace(regid,''),
VOLUME_ADJUST = 'Audio-SDL[VOLUME_ADJUST]=' + id('VOLUME_ADJUST').value,
VOLUME_DEFAULT = 'Audio-SDL[VOLUME_DEFAULT]=' + id('VOLUME_DEFAULT').value,
PolygonOffsetFactor = 'Video-Rice[PolygonOffsetFactor]=' + id('PolygonOffsetFactor').value,
PolygonOffsetUnits = 'Video-Rice[PolygonOffsetUnits]=' + id('PolygonOffsetUnits').value,
polygon_offset_factor = 'Video-Glide64mk2[polygon_offset_factor]=' + id('polygon_offset_factor').value,
polygon_offset_units = 'Video-Glide64mk2[polygon_offset_units]=' + id('polygon_offset_units').value,
ghq_cache_size = 'Video-Glide64mk2[ghq_cache_size]=' + id('ghq_cache_size').value,

IPLROMSetting = '64DD[IPL-ROM]=' + IPLROM,
DiskSetting = '64DD[Disk]=' + Disk,
txPathSetting = 'Video-GLideN64[txPath]=' + txPath,
txCachePathSetting = 'Video-GLideN64[txCachePath]=' + txCachePath,
txDumpPathSetting = 'Video-GLideN64[txDumpPath]=' + txDumpPath,
ScreenshotPathSetting = 'Core[ScreenshotPath]=' + ScreenshotPath,
SaveStatePathSetting = 'Core[SaveStatePath]=' + SaveStatePath,
SaveSRAMPathSetting = 'Core[SaveSRAMPath]=' + SaveSRAMPath,
gbROM1Setting = 'Transferpak[GB-rom-1]=' + gbROM1,
gbROM2Setting = 'Transferpak[GB-rom-2]=' + gbROM2,
gbROM3Setting = 'Transferpak[GB-rom-3]=' + gbROM3,
gbROM4Setting = 'Transferpak[GB-rom-4]=' + gbROM4,
gbRAM1Setting = 'Transferpak[GB-ram-1]=' + gbRAM1,
gbRAM2Setting = 'Transferpak[GB-ram-2]=' + gbRAM2,
gbRAM3Setting = 'Transferpak[GB-ram-3]=' + gbRAM3,
gbRAM4Setting = 'Transferpak[GB-ram-4]=' + gbRAM4,

KbdMappingStop = 'CoreEvents[Kbd Mapping Stop]=' + id('KbdMappingStop').dataset.key,
KbdMappingSlot0 = 'CoreEvents[Kbd Mapping Slot 0]=' + id('KbdMappingSlot0').dataset.key,
KbdMappingSlot1 = 'CoreEvents[Kbd Mapping Slot 1]=' + id('KbdMappingSlot1').dataset.key,
KbdMappingSlot2 = 'CoreEvents[Kbd Mapping Slot 2]=' + id('KbdMappingSlot2').dataset.key,
KbdMappingSlot3 = 'CoreEvents[Kbd Mapping Slot 3]=' + id('KbdMappingSlot3').dataset.key,
KbdMappingSlot4 = 'CoreEvents[Kbd Mapping Slot 4]=' + id('KbdMappingSlot4').dataset.key,
KbdMappingSlot5 = 'CoreEvents[Kbd Mapping Slot 5]=' + id('KbdMappingSlot5').dataset.key,
KbdMappingSlot6 = 'CoreEvents[Kbd Mapping Slot 6]=' + id('KbdMappingSlot6').dataset.key,
KbdMappingSlot7 = 'CoreEvents[Kbd Mapping Slot 7]=' + id('KbdMappingSlot7').dataset.key,
KbdMappingSlot8 = 'CoreEvents[Kbd Mapping Slot 8]=' + id('KbdMappingSlot8').dataset.key,
KbdMappingSlot9 = 'CoreEvents[Kbd Mapping Slot 9]=' + id('KbdMappingSlot9').dataset.key,
KbdMappingFullscreen = 'CoreEvents[Kbd Mapping Fullscreen]=' + id('KbdMappingFullscreen').dataset.key,
KbdMappingSaveState = 'CoreEvents[Kbd Mapping Save State]=' + id('KbdMappingSaveState').dataset.key,
KbdMappingLoadState = 'CoreEvents[Kbd Mapping Load State]=' + id('KbdMappingLoadState').dataset.key,
KbdMappingIncrementSlot = 'CoreEvents[Kbd Mapping Increment Slot]=' + id('KbdMappingIncrementSlot').dataset.key,
KbdMappingReset = 'CoreEvents[Kbd Mapping Reset]=' + id('KbdMappingReset').dataset.key,
KbdMappingSpeedDown = 'CoreEvents[Kbd Mapping Speed Down]=' + id('KbdMappingSpeedDown').dataset.key,
KbdMappingSpeedUp = 'CoreEvents[Kbd Mapping Speed Up]=' + id('KbdMappingSpeedUp').dataset.key,
KbdMappingScreenshot = 'CoreEvents[Kbd Mapping Screenshot]=' + id('KbdMappingScreenshot').dataset.key,
KbdMappingPause = 'CoreEvents[Kbd Mapping Pause]=' + id('KbdMappingPause').dataset.key,
KbdMappingMute = 'CoreEvents[Kbd Mapping Mute]=' + id('KbdMappingMute').dataset.key,
KbdMappingIncreaseVolume = 'CoreEvents[Kbd Mapping Increase Volume]=' + id('KbdMappingIncreaseVolume').dataset.key,
KbdMappingDecreaseVolume = 'CoreEvents[Kbd Mapping Decrease Volume]=' + id('KbdMappingDecreaseVolume').dataset.key,
KbdMappingFastForward = 'CoreEvents[Kbd Mapping Fast Forward]=' + id('KbdMappingFastForward').dataset.key,
KbdMappingFrameAdvance = 'CoreEvents[Kbd Mapping Frame Advance]=' + id('KbdMappingFrameAdvance').dataset.key,
KbdMappingGameshark = 'CoreEvents[Kbd Mapping Gameshark]=' + id('KbdMappingGameshark').dataset.key,

JoyMappingStop = 'CoreEvents[Joy Mapping Stop]=J0' + id('JoyMappingStop1').value + ',J1' + id('JoyMappingStop2').value + ',J2' + id('JoyMappingStop3').value + ',J3' + id('JoyMappingStop4').value,
JoyMappingFullscreen = 'CoreEvents[Joy Mapping Fullscreen]=J0' + id('JoyMappingFullscreen1').value + ',J1' + id('JoyMappingFullscreen2').value + ',J2' + id('JoyMappingFullscreen3').value + ',J3' + id('JoyMappingFullscreen4').value,
JoyMappingSaveState = 'CoreEvents[Joy Mapping Save State]=J0' + id('JoyMappingSaveState1').value + ',J1' + id('JoyMappingSaveState2').value + ',J2' + id('JoyMappingSaveState3').value + ',J3' + id('JoyMappingSaveState4').value,
JoyMappingLoadState = 'CoreEvents[Joy Mapping Load State]=J0' + id('JoyMappingLoadState1').value + ',J1' + id('JoyMappingLoadState2').value + ',J2' + id('JoyMappingLoadState3').value + ',J3' + id('JoyMappingLoadState4').value,
JoyMappingIncrementSlot = 'CoreEvents[Joy Mapping Increment Slot]=J0' + id('JoyMappingIncrementSlot1').value + ',J1' + id('JoyMappingIncrementSlot2').value + ',J2' + id('JoyMappingIncrementSlot3').value + ',J3' + id('JoyMappingIncrementSlot4').value,
JoyMappingReset = 'CoreEvents[Joy Mapping Reset]=J0' + id('JoyMappingReset1').value + ',J1' + id('JoyMappingReset2').value + ',J2' + id('JoyMappingReset3').value + ',J3' + id('JoyMappingReset4').value,
JoyMappingSpeedDown = 'CoreEvents[Joy Mapping Speed Down]=J0' + id('JoyMappingSpeedDown1').value + ',J1' + id('JoyMappingSpeedDown2').value + ',J2' + id('JoyMappingSpeedDown3').value + ',J3' + id('JoyMappingSpeedDown4').value,
JoyMappingSpeedUp = 'CoreEvents[Joy Mapping Speed Up]=J0' + id('JoyMappingSpeedUp1').value + ',J1' + id('JoyMappingSpeedUp2').value + ',J2' + id('JoyMappingSpeedUp3').value + ',J3' + id('JoyMappingSpeedUp4').value,
JoyMappingScreenshot = 'CoreEvents[Joy Mapping Screenshot]=J0' + id('JoyMappingScreenshot1').value + ',J1' + id('JoyMappingScreenshot2').value + ',J2' + id('JoyMappingScreenshot3').value + ',J3' + id('JoyMappingScreenshot4').value,
JoyMappingPause = 'CoreEvents[Joy Mapping Pause]=J0' + id('JoyMappingPause1').value + ',J1' + id('JoyMappingPause2').value + ',J2' + id('JoyMappingPause3').value + ',J3' + id('JoyMappingPause4').value,
JoyMappingMute = 'CoreEvents[Joy Mapping Mute]=J0' + id('JoyMappingMute1').value + ',J1' + id('JoyMappingMute2').value + ',J2' + id('JoyMappingMute3').value + ',J3' + id('JoyMappingMute4').value,
JoyMappingIncreaseVolume = 'CoreEvents[Joy Mapping Increase Volume]=J0' + id('JoyMappingIncreaseVolume1').value + ',J1' + id('JoyMappingIncreaseVolume2').value + ',J2' + id('JoyMappingIncreaseVolume3').value + ',J3' + id('JoyMappingIncreaseVolume4').value,
JoyMappingDecreaseVolume = 'CoreEvents[Joy Mapping Decrease Volume]=J0' + id('JoyMappingDecreaseVolume1').value + ',J1' + id('JoyMappingDecreaseVolume2').value + ',J2' + id('JoyMappingDecreaseVolume3').value + ',J3' + id('JoyMappingDecreaseVolume4').value,
JoyMappingFastForward = 'CoreEvents[Joy Mapping Fast Forward]=J0' + id('JoyMappingFastForward1').value + ',J1' + id('JoyMappingFastForward2').value + ',J2' + id('JoyMappingFastForward3').value + ',J3' + id('JoyMappingFastForward4').value,
JoyMappingFrameAdvance = 'CoreEvents[Joy Mapping Frame Advance]=J0' + id('JoyMappingFrameAdvance1').value + ',J1' + id('JoyMappingFrameAdvance2').value + ',J2' + id('JoyMappingFrameAdvance3').value + ',J3' + id('JoyMappingFrameAdvance4').value,
JoyMappingGameshark = 'CoreEvents[Joy Mapping Gameshark]=J0' + id('JoyMappingGameshark1').value + ',J1' + id('JoyMappingGameshark2').value + ',J2' + id('JoyMappingGameshark3').value + ',J3' + id('JoyMappingGameshark4').value,

hkTexDump = 'Video-GLideN64[hkTexDump]=' + id('hkTexDump').value,
hkHdTexReload = 'Video-GLideN64[hkHdTexReload]=' + id('hkHdTexReload').value,
hkHdTexToggle = 'Video-GLideN64[hkHdTexToggle]=' + id('hkHdTexToggle').value,
hkInaccurateTexCords = 'Video-GLideN64[hkInaccurateTexCords]=' + id('hkInaccurateTexCords').value,
hkVsync = 'Video-GLideN64[hkVsync]=' + id('hkVsync').value,
hkFBEmulation = 'Video-GLideN64[hkFBEmulation]=' + id('hkFBEmulation').value,
hkN64DepthCompare = 'Video-GLideN64[hkN64DepthCompare]=' + id('hkN64DepthCompare').value,
hkOsdVis = 'Video-GLideN64[hkOsdVis]=' + id('hkOsdVis').value,
hkOsdFps = 'Video-GLideN64[hkOsdFps]=' + id('hkOsdFps').value,
hkOsdPercent = 'Video-GLideN64[hkOsdPercent]=' + id('hkOsdPercent').value,
hkOsdInternalResolution = 'Video-GLideN64[hkOsdInternalResolution]=' + id('hkOsdInternalResolution').value,
hkOsdRenderingResolution = 'Video-GLideN64[hkOsdRenderingResolution]=' + id('hkOsdRenderingResolution').value,
hkTexCoordBounds = 'Video-GLideN64[hkTexCoordBounds]=' + id('hkTexCoordBounds').value,
hkNativeResTexrects = 'Video-GLideN64[hkNativeResTexrects]=' + id('hkNativeResTexrects').value,
hkForceGammaCorrection = 'Video-GLideN64[hkForceGammaCorrection]=' + id('hkForceGammaCorrection').value,

plugged1 = 'Input-SDL-Control1[plugged]=' + id('plugged1').checked,
plugged2 = 'Input-SDL-Control2[plugged]=' + id('plugged2').checked,
plugged3 = 'Input-SDL-Control3[plugged]=' + id('plugged3').checked,
plugged4 = 'Input-SDL-Control4[plugged]=' + id('plugged4').checked,
mouse1 = 'Input-SDL-Control1[mouse]=' + id('mouse1').checked,
mouse2 = 'Input-SDL-Control2[mouse]=' + id('mouse2').checked,
mouse3 = 'Input-SDL-Control3[mouse]=' + id('mouse3').checked,
mouse4 = 'Input-SDL-Control4[mouse]=' + id('mouse4').checked,
mouse1_1 = id('mouse1_1').value,
mouse1_2 = id('mouse1_2').value,
mouse1_3 = id('mouse1_3').value,
mouse2_1 = id('mouse2_1').value,
mouse2_2 = id('mouse2_2').value,
mouse2_3 = id('mouse2_3').value,
mouse3_1 = id('mouse3_1').value,
mouse3_2 = id('mouse3_2').value,
mouse3_3 = id('mouse3_3').value,
mouse4_1 = id('mouse4_1').value,
mouse4_2 = id('mouse4_2').value,
mouse4_3 = id('mouse4_3').value,
msensitivity1 = 'Input-SDL-Control1[MouseSensitivity]=' + MouseSensitivity1X.value + ',' + MouseSensitivity1Y.value,
msensitivity2 = 'Input-SDL-Control2[MouseSensitivity]=' + MouseSensitivity2X.value + ',' + MouseSensitivity2Y.value,
msensitivity3 = 'Input-SDL-Control3[MouseSensitivity]=' + MouseSensitivity3X.value + ',' + MouseSensitivity3Y.value,
msensitivity4 = 'Input-SDL-Control4[MouseSensitivity]=' + MouseSensitivity4X.value + ',' + MouseSensitivity4Y.value,
analogdeadzone1 = 'Input-SDL-Control1[AnalogDeadzone]=' + AnalogDeadzone1X.value + ',' + AnalogDeadzone1Y.value,
analogdeadzone2 = 'Input-SDL-Control2[AnalogDeadzone]=' + AnalogDeadzone2X.value + ',' + AnalogDeadzone2Y.value,
analogdeadzone3 = 'Input-SDL-Control3[AnalogDeadzone]=' + AnalogDeadzone3X.value + ',' + AnalogDeadzone3Y.value,
analogdeadzone4 = 'Input-SDL-Control4[AnalogDeadzone]=' + AnalogDeadzone4X.value + ',' + AnalogDeadzone4Y.value,
analogpeak1 = 'Input-SDL-Control1[AnalogPeak]=' + AnalogPeak1X.value + ',' + AnalogPeak1Y.value,
analogpeak2 = 'Input-SDL-Control2[AnalogPeak]=' + AnalogPeak2X.value + ',' + AnalogPeak2Y.value,
analogpeak3 = 'Input-SDL-Control3[AnalogPeak]=' + AnalogPeak3X.value + ',' + AnalogPeak3Y.value,
analogpeak4 = 'Input-SDL-Control4[AnalogPeak]=' + AnalogPeak4X.value + ',' + AnalogPeak4Y.value,

AButton1 = 'Input-SDL-Control1[A Button]=',
AButton2 = 'Input-SDL-Control2[A Button]=',
AButton3 = 'Input-SDL-Control3[A Button]=',
AButton4 = 'Input-SDL-Control4[A Button]=',
BButton1 = 'Input-SDL-Control1[B Button]=',
BButton2 = 'Input-SDL-Control2[B Button]=',
BButton3 = 'Input-SDL-Control3[B Button]=',
BButton4 = 'Input-SDL-Control4[B Button]=',
LTrig1 = 'Input-SDL-Control1[L Trig]=',
LTrig2 = 'Input-SDL-Control2[L Trig]=',
LTrig3 = 'Input-SDL-Control3[L Trig]=',
LTrig4 = 'Input-SDL-Control4[L Trig]=',
RTrig1 = 'Input-SDL-Control1[R Trig]=',
RTrig2 = 'Input-SDL-Control2[R Trig]=',
RTrig3 = 'Input-SDL-Control3[R Trig]=',
RTrig4 = 'Input-SDL-Control4[R Trig]=',
ZTrig1 = 'Input-SDL-Control1[Z Trig]=',
ZTrig2 = 'Input-SDL-Control2[Z Trig]=',
ZTrig3 = 'Input-SDL-Control3[Z Trig]=',
ZTrig4 = 'Input-SDL-Control4[Z Trig]=',
Start1 = 'Input-SDL-Control1[Start]=',
Start2 = 'Input-SDL-Control2[Start]=',
Start3 = 'Input-SDL-Control3[Start]=',
Start4 = 'Input-SDL-Control4[Start]=',
DPadU1 = 'Input-SDL-Control1[DPad U]=',
DPadU2 = 'Input-SDL-Control2[DPad U]=',
DPadU3 = 'Input-SDL-Control3[DPad U]=',
DPadU4 = 'Input-SDL-Control4[DPad U]=',
DPadL1 = 'Input-SDL-Control1[DPad L]=',
DPadL2 = 'Input-SDL-Control2[DPad L]=',
DPadL3 = 'Input-SDL-Control3[DPad L]=',
DPadL4 = 'Input-SDL-Control4[DPad L]=',
DPadR1 = 'Input-SDL-Control1[DPad R]=',
DPadR2 = 'Input-SDL-Control2[DPad R]=',
DPadR3 = 'Input-SDL-Control3[DPad R]=',
DPadR4 = 'Input-SDL-Control4[DPad R]=',
DPadD1 = 'Input-SDL-Control1[DPad D]=',
DPadD2 = 'Input-SDL-Control2[DPad D]=',
DPadD3 = 'Input-SDL-Control3[DPad D]=',
DPadD4 = 'Input-SDL-Control4[DPad D]=',
CButtonU1 = 'Input-SDL-Control1[C Button U]=',
CButtonU2 = 'Input-SDL-Control2[C Button U]=',
CButtonU3 = 'Input-SDL-Control3[C Button U]=',
CButtonU4 = 'Input-SDL-Control4[C Button U]=',
CButtonL1 = 'Input-SDL-Control1[C Button L]=',
CButtonL2 = 'Input-SDL-Control2[C Button L]=',
CButtonL3 = 'Input-SDL-Control3[C Button L]=',
CButtonL4 = 'Input-SDL-Control4[C Button L]=',
CButtonR1 = 'Input-SDL-Control1[C Button R]=',
CButtonR2 = 'Input-SDL-Control2[C Button R]=',
CButtonR3 = 'Input-SDL-Control3[C Button R]=',
CButtonR4 = 'Input-SDL-Control4[C Button R]=',
CButtonD1 = 'Input-SDL-Control1[C Button D]=',
CButtonD2 = 'Input-SDL-Control2[C Button D]=',
CButtonD3 = 'Input-SDL-Control3[C Button D]=',
CButtonD4 = 'Input-SDL-Control4[C Button D]=',
MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=',
MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=',
MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=',
MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=',
RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=',
RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=',
RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=',
RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=',
XAxis1 = 'Input-SDL-Control1[X Axis]=',
XAxis2 = 'Input-SDL-Control2[X Axis]=',
XAxis3 = 'Input-SDL-Control3[X Axis]=',
XAxis4 = 'Input-SDL-Control4[X Axis]=',
YAxis1 = 'Input-SDL-Control1[Y Axis]=',
YAxis2 = 'Input-SDL-Control2[Y Axis]=',
YAxis3 = 'Input-SDL-Control3[Y Axis]=',
YAxis4 = 'Input-SDL-Control4[Y Axis]=',

gcaSettings = 'control_stick_deadzone = ' +  id('control_stick_deadzone').value + '\n' + 'control_stick_sensitivity = ' + id('control_stick_sensitivity').value + '\n' + 'c_stick_deadzone = ' + id('c_stick_deadzone').value + '\n' + 'trigger_threshold = ' + id('trigger_threshold').value + '\n\n' + '[controller_mapping]' + '\n' + 'a = ' + id('a').value + '\n' + 'b = ' + id('b').value + '\n' + 'x = ' + id('x').value + '\n' + 'y = ' + id('y').value + '\n' + 'start = ' + id('start').value + '\n' + 'z = ' + id('z').value + '\n' + 'l = ' + id('l').value + '\n' + 'r = ' + id('r').value + '\n' + 'd_pad_left = ' + id('d_pad_left').value + '\n' + 'd_pad_right = ' + id('d_pad_right').value + '\n' + 'd_pad_down = ' + id('d_pad_down').value + '\n' + 'd_pad_up = ' + id('d_pad_up').value + '\n' + 'c_stick_left = ' + id('c_stick_left').value + '\n' + 'c_stick_right = ' + id('c_stick_right').value + '\n' + 'c_stick_down = ' + id('c_stick_down').value + '\n' + 'c_stick_up = ' + id('c_stick_up').value;

if(isLinux){RspFallback = './' + RspFallback + '.so'}
if(id('nospeedlimit').checked){audio = 'dummy';vsync = 'Video-General[VerticalSync]=False';Glide64VSync = 'Video-Glide64mk2[vsync]=False'} // force muted audio and disabled V-Sync
if(gfx.includes('angrylion') || gfx.includes('parallel')){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=False';cxd4Audio = 'rsp-cxd4[DisplayListToAudioPlugin]=False'} // prevent crashes caused by wrong RSP settings
else if(gfx.includes('rice') || gfx.includes('glide64mk2')){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=True'}
if(gfx.includes('angrylion') && rsp.includes('rsp-hle')){rsp = 'mupen64plus-rsp-cxd4-sse2'}
else if(gfx.includes('parallel') && rsp.includes('rsp-hle')){rsp = 'mupen64plus-rsp-parallel'}
else if((gfx.includes('rice') || gfx.includes('glide64mk2')) && rsp.includes('rsp-parallel')){rsp = 'mupen64plus-rsp-hle'}



if(name1.includes('Keyboard')){ // controller input
device1 = 'Input-SDL-Control1[device]=-1';
AButton1 += 'key(' + id('AButton1').dataset.key + ')';
BButton1 += 'key(' + id('BButton1').dataset.key + ')';
LTrig1 += 'key(' + id('LTrig1').dataset.key + ')';
RTrig1 += 'key(' + id('RTrig1').dataset.key + ')';
ZTrig1 += 'key(' + id('ZTrig1').dataset.key + ')';
Start1 += 'key(' + id('Start1').dataset.key + ')';
DPadU1 += 'key(' + id('DPadU1').dataset.key + ')';
DPadL1 += 'key(' + id('DPadL1').dataset.key + ')';
DPadR1 += 'key(' + id('DPadR1').dataset.key + ')';
DPadD1 += 'key(' + id('DPadD1').dataset.key + ')';
CButtonU1 += 'key(' + id('CButtonU1').dataset.key + ')';
CButtonL1 += 'key(' + id('CButtonL1').dataset.key + ')';
CButtonR1 += 'key(' + id('CButtonR1').dataset.key + ')';
CButtonD1 += 'key(' + id('CButtonD1').dataset.key + ')';
MempakSwitch1 += 'key(' + id('MempakSwitch1').dataset.key + ')';
RumblepakSwitch1 += 'key(' + id('RumblepakSwitch1').dataset.key + ')';
XAxis1 += 'key(' + id('StickL1').dataset.key + ',' + id('StickR1').dataset.key + ')';
YAxis1 += 'key(' + id('StickU1').dataset.key + ',' + id('StickD1').dataset.key + ')';
if(id('mouse1').checked && mouse1_1 != ''){
if(mouse1_1 === 'a'){AButton1 += ' mouse(1)'}
if(mouse1_1 === 'b'){BButton1 += ' mouse(1)'}
if(mouse1_1 === 'l'){LTrig1 += ' mouse(1)'}
if(mouse1_1 === 'r'){RTrig1 += ' mouse(1)'}
if(mouse1_1 === 'z'){ZTrig1 += ' mouse(1)'}
if(mouse1_1 === 'cr'){CButtonR1 += ' mouse(1)'}
if(mouse1_1 === 'cl'){CButtonL1 += ' mouse(1)'}
if(mouse1_1 === 'cd'){CButtonD1 += ' mouse(1)'}
if(mouse1_1 === 'cu'){CButtonU1 += ' mouse(1)'}
if(mouse1_1 === 'dpadr'){DPadR1 += ' mouse(1)'}
if(mouse1_1 === 'dpadl'){DPadL1 += ' mouse(1)'}
if(mouse1_1 === 'dpadd'){DPadD1 += ' mouse(1)'}
if(mouse1_1 === 'dpadu'){DPadU1 += ' mouse(1)'}
if(mouse1_1 === 'start'){Start1 += ' mouse(1)'}
if(mouse1_1 === 'ms'){MempakSwitch1 += ' mouse(1)'}
if(mouse1_1 === 'rs'){RumblepakSwitch1 += ' mouse(1)'}}
if(id('mouse1').checked && mouse1_2 != ''){
if(mouse1_2 === 'a'){AButton1 += ' mouse(2)'}
if(mouse1_2 === 'b'){BButton1 += ' mouse(2)'}
if(mouse1_2 === 'l'){LTrig1 += ' mouse(2)'}
if(mouse1_2 === 'r'){RTrig1 += ' mouse(2)'}
if(mouse1_2 === 'z'){ZTrig1 += ' mouse(2)'}
if(mouse1_2 === 'cr'){CButtonR1 += ' mouse(2)'}
if(mouse1_2 === 'cl'){CButtonL1 += ' mouse(2)'}
if(mouse1_2 === 'cd'){CButtonD1 += ' mouse(2)'}
if(mouse1_2 === 'cu'){CButtonU1 += ' mouse(2)'}
if(mouse1_2 === 'dpadr'){DPadR1 += ' mouse(2)'}
if(mouse1_2 === 'dpadl'){DPadL1 += ' mouse(2)'}
if(mouse1_2 === 'dpadd'){DPadD1 += ' mouse(2)'}
if(mouse1_2 === 'dpadu'){DPadU1 += ' mouse(2)'}
if(mouse1_2 === 'start'){Start1 += ' mouse(2)'}
if(mouse1_2 === 'ms'){MempakSwitch1 += ' mouse(2)'}
if(mouse1_2 === 'rs'){RumblepakSwitch1 += ' mouse(2)'}}
if(id('mouse1').checked && mouse1_3 != ''){
if(mouse1_3 === 'a'){AButton1 += ' mouse(3)'}
if(mouse1_3 === 'b'){BButton1 += ' mouse(3)'}
if(mouse1_3 === 'l'){LTrig1 += ' mouse(3)'}
if(mouse1_3 === 'r'){RTrig1 += ' mouse(3)'}
if(mouse1_3 === 'z'){ZTrig1 += ' mouse(3)'}
if(mouse1_3 === 'cr'){CButtonR1 += ' mouse(3)'}
if(mouse1_3 === 'cl'){CButtonL1 += ' mouse(3)'}
if(mouse1_3 === 'cd'){CButtonD1 += ' mouse(3)'}
if(mouse1_3 === 'cu'){CButtonU1 += ' mouse(3)'}
if(mouse1_3 === 'dpadr'){DPadR1 += ' mouse(3)'}
if(mouse1_3 === 'dpadl'){DPadL1 += ' mouse(3)'}
if(mouse1_3 === 'dpadd'){DPadD1 += ' mouse(3)'}
if(mouse1_3 === 'dpadu'){DPadU1 += ' mouse(3)'}
if(mouse1_3 === 'start'){Start1 += ' mouse(3)'}
if(mouse1_3 === 'ms'){MempakSwitch1 += ' mouse(3)'}
if(mouse1_3 === 'rs'){RumblepakSwitch1 += ' mouse(3)'}}
}else{
var buttonType = '', buttonTypeB = '';
if(id('StickU1c').value.includes('axis') || id('StickL1c').value.includes('axis') || id('StickR1c').value.includes('axis') || id('StickD1c').value.includes('axis')){buttonType = 'axis'}
if(id('StickU1cb').value.includes('axis') || id('StickL1cb').value.includes('axis') || id('StickR1cb').value.includes('axis') || id('StickD1cb').value.includes('axis')){buttonTypeB = 'axis'}
if(id('StickU1c').value.includes('button') || id('StickL1c').value.includes('button') || id('StickR1c').value.includes('button') || id('StickD1c').value.includes('button')){buttonType = 'button'}
if(id('StickU1cb').value.includes('button') || id('StickL1cb').value.includes('button') || id('StickR1cb').value.includes('button') || id('StickD1cb').value.includes('button')){buttonTypeB = 'button'}
if(id('StickU1c').value.includes('hat') || id('StickL1c').value.includes('hat') || id('StickR1c').value.includes('hat') || id('StickD1c').value.includes('hat')){buttonType = 'hat'}
if(id('StickU1cb').value.includes('hat') || id('StickL1cb').value.includes('hat') || id('StickR1cb').value.includes('hat') || id('StickD1cb').value.includes('hat')){buttonTypeB = 'hat'}
var StickU1value = id('StickU1c').value.replace(regjoy,''),
StickL1value = id('StickL1c').value.replace(regjoy,''),
StickR1value = id('StickR1c').value.replace(regjoy,''),
StickD1value = id('StickD1c').value.replace(regjoy,''),
StickU1bvalue = id('StickU1cb').value.replace(regjoy,''),
StickL1bvalue = id('StickL1cb').value.replace(regjoy,''),
StickR1bvalue = id('StickR1cb').value.replace(regjoy,''),
StickD1bvalue = id('StickD1cb').value.replace(regjoy,'');
AButton1 += id('AButton1c').value + ' ' + id('AButton1cb').value;
BButton1 += id('BButton1c').value + ' ' + id('BButton1cb').value;
LTrig1 +=  id('LTrig1c').value + ' ' + id('LTrig1cb').value;
RTrig1 += id('RTrig1c').value + ' ' + id('RTrig1cb').value;
ZTrig1 += id('ZTrig1c').value + ' ' + id('ZTrig1cb').value;
Start1 += id('Start1c').value + ' ' + id('Start1cb').value;
DPadU1 += id('DPadU1c').value + ' ' + id('DPadU1cb').value;
DPadL1 += id('DPadL1c').value + ' ' + id('DPadL1cb').value;
DPadR1 += id('DPadR1c').value + ' ' + id('DPadR1cb').value;
DPadD1 += id('DPadD1c').value + ' ' + id('DPadD1cb').value;
CButtonU1 += id('CButtonU1c').value + ' ' + id('CButtonU1cb').value;
CButtonL1 += id('CButtonL1c').value + ' ' + id('CButtonL1cb').value;
CButtonR1 += id('CButtonR1c').value + ' ' + id('CButtonR1cb').value;
CButtonD1 += id('CButtonD1c').value + ' ' + id('CButtonD1cb').value;
MempakSwitch1 += id('MempakSwitch1c').value + ' ' + id('MempakSwitch1cb').value;
RumblepakSwitch1 += id('RumblepakSwitch1c').value + ' ' + id('RumblepakSwitch1cb').value;
XAxis1 += buttonType + '(' + StickL1value + ',' + StickR1value + ')' + ' ' + buttonTypeB + '(' + StickL1bvalue + ',' + StickR1bvalue + ')';
YAxis1 += buttonType + '(' + StickU1value + ',' + StickD1value + ')' + ' ' + buttonTypeB + '(' + StickU1bvalue + ',' + StickD1bvalue + ')';
if(id('mouse1').checked && mouse1_1 != ''){
if(mouse1_1 === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=' + id('AButton1c').value + ' mouse(1)'}
if(mouse1_1 === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=' + id('BButton1c').value + ' mouse(1)'}
if(mouse1_1 === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=' + id('LTrig1c').value + ' mouse(1)'}
if(mouse1_1 === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=' + id('RTrig1c').value + ' mouse(1)'}
if(mouse1_1 === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + id('ZTrig1c').value + ' mouse(1)'}
if(mouse1_1 === 'cr'){CButtonR1 = 'Input-SDL-Control1[C Button R]=' + id('CButtonR1c').value + ' mouse(1)'}
if(mouse1_1 === 'cl'){CButtonR1 = 'Input-SDL-Control1[C Button L]=' + id('CButtonL1c').value + ' mouse(1)'}
if(mouse1_1 === 'cd'){CButtonR1 = 'Input-SDL-Control1[C Button D]=' + id('CButtonD1c').value + ' mouse(1)'}
if(mouse1_1 === 'cu'){CButtonR1 = 'Input-SDL-Control1[C Button U]=' + id('CButtonU1c').value + ' mouse(1)'}
if(mouse1_1 === 'dpadr'){DPadR1 = 'Input-SDL-Control1[DPad R]=' + id('DPadR1c').value + ' mouse(1)'}
if(mouse1_1 === 'dpadl'){DPadR1 = 'Input-SDL-Control1[DPad L]=' + id('DPadL1c').value + ' mouse(1)'}
if(mouse1_1 === 'dpadd'){DPadR1 = 'Input-SDL-Control1[DPad D]=' + id('DPadD1c').value + ' mouse(1)'}
if(mouse1_1 === 'dpadu'){DPadR1 = 'Input-SDL-Control1[DPad U]=' + id('DPadU1c').value + ' mouse(1)'}
if(mouse1_1 === 'start'){Start1 = 'Input-SDL-Control1[Start]=' + id('Start1c').value + ' mouse(1)'}
if(mouse1_1 === 'ms'){MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + id('MempakSwitch1c').value + ' mouse(1)'}
if(mouse1_1 === 'rs'){RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + id('RumblepakSwitch1c').value + ' mouse(1)'}}
if(id('mouse1').checked && mouse1_2 != ''){
if(mouse1_2 === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=' + id('AButton1c').value + ' mouse(2)'}
if(mouse1_2 === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=' + id('BButton1c').value + ' mouse(2)'}
if(mouse1_2 === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=' + id('LTrig1c').value + ' mouse(2)'}
if(mouse1_2 === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=' + id('RTrig1c').value + ' mouse(2)'}
if(mouse1_2 === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + id('ZTrig1c').value + ' mouse(2)'}
if(mouse1_2 === 'cr'){CButtonR1 = 'Input-SDL-Control1[C Button R]=' + id('CButtonR1c').value + ' mouse(2)'}
if(mouse1_2 === 'cl'){CButtonL1 = 'Input-SDL-Control1[C Button L]=' + id('CButtonL1c').value + ' mouse(2)'}
if(mouse1_2 === 'cd'){CButtonD1 = 'Input-SDL-Control1[C Button D]=' + id('CButtonD1c').value + ' mouse(2)'}
if(mouse1_2 === 'cu'){CButtonU1 = 'Input-SDL-Control1[C Button U]=' + id('CButtonU1c').value + ' mouse(2)'}
if(mouse1_2 === 'dpadr'){DPadR1 = 'Input-SDL-Control1[DPad R]=' + id('DPadR1c').value + ' mouse(2)'}
if(mouse1_2 === 'dpadl'){DPadL1 = 'Input-SDL-Control1[DPad L]=' + id('DPadL1c').value + ' mouse(2)'}
if(mouse1_2 === 'dpadd'){DPadD1 = 'Input-SDL-Control1[DPad D]=' + id('DPadD1c').value + ' mouse(2)'}
if(mouse1_2 === 'dpadu'){DPadU1 = 'Input-SDL-Control1[DPad U]=' + id('DPadU1c').value + ' mouse(2)'}
if(mouse1_2 === 'start'){Start1 = 'Input-SDL-Control1[Start]=' + id('Start1c').value + ' mouse(2)'}
if(mouse1_2 === 'ms'){MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + id('MempakSwitch1c').value + ' mouse(2)'}
if(mouse1_2 === 'rs'){RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + id('RumblepakSwitch1c').value + ' mouse(2)'}}
if(id('mouse1').checked && mouse1_3 != ''){
if(mouse1_3 === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=' + id('AButton1c').value + ' mouse(3)'}
if(mouse1_3 === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=' + id('BButton1c').value + ' mouse(3)'}
if(mouse1_3 === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=' + id('LTrig1c').value + ' mouse(3)'}
if(mouse1_3 === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=' + id('RTrig1c').value + ' mouse(3)'}
if(mouse1_3 === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + id('ZTrig1c').value + ' mouse(3)'}
if(mouse1_3 === 'cr'){CButtonR1 = 'Input-SDL-Control1[C Button R]=' + id('CButtonR1c').value + ' mouse(3)'}
if(mouse1_3 === 'cl'){CButtonL1 = 'Input-SDL-Control1[C Button L]=' + id('CButtonL1c').value + ' mouse(3)'}
if(mouse1_3 === 'cd'){CButtonD1 = 'Input-SDL-Control1[C Button D]=' + id('CButtonD1c').value + ' mouse(3)'}
if(mouse1_3 === 'cu'){CButtonU1 = 'Input-SDL-Control1[C Button U]=' + id('CButtonU1c').value + ' mouse(3)'}
if(mouse1_3 === 'dpadr'){DPadR1 = 'Input-SDL-Control1[DPad R]=' + id('DPadR1c').value + ' mouse(3)'}
if(mouse1_3 === 'dpadl'){DPadL1 = 'Input-SDL-Control1[DPad L]=' + id('DPadL1c').value + ' mouse(3)'}
if(mouse1_3 === 'dpadd'){DPadD1 = 'Input-SDL-Control1[DPad D]=' + id('DPadD1c').value + ' mouse(3)'}
if(mouse1_3 === 'dpadu'){DPadU1 = 'Input-SDL-Control1[DPad U]=' + id('DPadU1c').value + ' mouse(3)'}
if(mouse1_3 === 'start'){Start1 = 'Input-SDL-Control1[Start]=' + id('Start1c').value + ' mouse(3)'}
if(mouse1_3 === 'ms'){MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + id('MempakSwitch1c').value + ' mouse(3)'}
if(mouse1_3 === 'rs'){RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + id('RumblepakSwitch1c').value + ' mouse(3)'}}}

if(name2.includes('Keyboard')){
device2 = 'Input-SDL-Control2[device]=-1';
AButton2 += 'key(' + id('AButton2').dataset.key + ')';
BButton2 += 'key(' + id('BButton2').dataset.key + ')';
LTrig2 += 'key(' + id('LTrig2').dataset.key + ')';
RTrig2 += 'key(' + id('RTrig2').dataset.key + ')';
ZTrig2 += 'key(' + id('ZTrig2').dataset.key + ')';
Start2 += 'key(' + id('Start2').dataset.key + ')';
DPadU2 += 'key(' + id('DPadU2').dataset.key + ')';
DPadL2 += 'key(' + id('DPadL2').dataset.key + ')';
DPadR2 += 'key(' + id('DPadR2').dataset.key + ')';
DPadD2 += 'key(' + id('DPadD2').dataset.key + ')';
CButtonU2 += 'key(' + id('CButtonU2').dataset.key + ')';
CButtonL2 += 'key(' + id('CButtonL2').dataset.key + ')';
CButtonR2 += 'key(' + id('CButtonR2').dataset.key + ')';
CButtonD2 += 'key(' + id('CButtonD2').dataset.key + ')';
MempakSwitch2 += 'key(' + id('MempakSwitch2').dataset.key + ')';
RumblepakSwitch2 += 'key(' + id('RumblepakSwitch2').dataset.key + ')';
XAxis2 += 'key(' + id('StickL2').dataset.key + ',' + id('StickR2').dataset.key + ')';
YAxis2 += 'key(' + id('StickU2').dataset.key + ',' + id('StickD2').dataset.key + ')';
if(id('mouse2').checked && mouse2_1 != ''){
if(mouse2_1 === 'a'){AButton2 += ' mouse(1)'}
if(mouse2_1 === 'b'){BButton2 += ' mouse(1)'}
if(mouse2_1 === 'l'){LTrig2 += ' mouse(1)'}
if(mouse2_1 === 'r'){RTrig2 += ' mouse(1)'}
if(mouse2_1 === 'z'){ZTrig2 += ' mouse(1)'}
if(mouse2_1 === 'cr'){CButtonR2 += ' mouse(1)'}
if(mouse2_1 === 'cl'){CButtonL2 += ' mouse(1)'}
if(mouse2_1 === 'cd'){CButtonD2 += ' mouse(1)'}
if(mouse2_1 === 'cu'){CButtonU2 += ' mouse(1)'}
if(mouse2_1 === 'dpadr'){DPadR2 += ' mouse(1)'}
if(mouse2_1 === 'dpadl'){DPadL2 += ' mouse(1)'}
if(mouse2_1 === 'dpadd'){DPadD2 += ' mouse(1)'}
if(mouse2_1 === 'dpadu'){DPadU2 += ' mouse(1)'}
if(mouse2_1 === 'start'){Start2 += ' mouse(1)'}
if(mouse2_1 === 'ms'){MempakSwitch2 += ' mouse(1)'}
if(mouse2_1 === 'rs'){RumblepakSwitch2 += ' mouse(1)'}}
if(id('mouse2').checked && mouse2_2 != ''){
if(mouse2_2 === 'a'){AButton2 += ' mouse(2)'}
if(mouse2_2 === 'b'){BButton2 += ' mouse(2)'}
if(mouse2_2 === 'l'){LTrig2 += ' mouse(2)'}
if(mouse2_2 === 'r'){RTrig2 += ' mouse(2)'}
if(mouse2_2 === 'z'){ZTrig2 += ' mouse(2)'}
if(mouse2_2 === 'cr'){CButtonR2 += ' mouse(2)'}
if(mouse2_2 === 'cl'){CButtonL2 += ' mouse(2)'}
if(mouse2_2 === 'cd'){CButtonD2 += ' mouse(2)'}
if(mouse2_2 === 'cu'){CButtonU2 += ' mouse(2)'}
if(mouse2_2 === 'dpadr'){DPadR2 += ' mouse(2)'}
if(mouse2_2 === 'dpadl'){DPadL2 += ' mouse(2)'}
if(mouse2_2 === 'dpadd'){DPadD2 += ' mouse(2)'}
if(mouse2_2 === 'dpadu'){DPadU2 += ' mouse(2)'}
if(mouse2_2 === 'start'){Start2 += ' mouse(2)'}
if(mouse2_2 === 'ms'){MempakSwitch2 += ' mouse(2)'}
if(mouse2_2 === 'rs'){RumblepakSwitch2 += ' mouse(2)'}}
if(id('mouse2').checked && mouse2_3 != ''){
if(mouse2_3 === 'a'){AButton2 += ' mouse(3)'}
if(mouse2_3 === 'b'){BButton2 += ' mouse(3)'}
if(mouse2_3 === 'l'){LTrig2 += ' mouse(3)'}
if(mouse2_3 === 'r'){RTrig2 += ' mouse(3)'}
if(mouse2_3 === 'z'){ZTrig2 += ' mouse(3)'}
if(mouse2_3 === 'cr'){CButtonR2 += ' mouse(3)'}
if(mouse2_3 === 'cl'){CButtonL2 += ' mouse(3)'}
if(mouse2_3 === 'cd'){CButtonD2 += ' mouse(3)'}
if(mouse2_3 === 'cu'){CButtonU2 += ' mouse(3)'}
if(mouse2_3 === 'dpadr'){DPadR2 += ' mouse(3)'}
if(mouse2_3 === 'dpadl'){DPadL2 += ' mouse(3)'}
if(mouse2_3 === 'dpadd'){DPadD2 += ' mouse(3)'}
if(mouse2_3 === 'dpadu'){DPadU2 += ' mouse(3)'}
if(mouse2_3 === 'start'){Start2 += ' mouse(3)'}
if(mouse2_3 === 'ms'){MempakSwitch2 += ' mouse(3)'}
if(mouse2_3 === 'rs'){RumblepakSwitch2 += ' mouse(3)'}}
}else{
var buttonType = '', buttonTypeB = '';
if(id('StickU2c').value.includes('axis') || id('StickL2c').value.includes('axis') || id('StickR2c').value.includes('axis') || id('StickD2c').value.includes('axis')){buttonType = 'axis'}
if(id('StickU2cb').value.includes('axis') || id('StickL2cb').value.includes('axis') || id('StickR2cb').value.includes('axis') || id('StickD2cb').value.includes('axis')){buttonTypeB = 'axis'}
if(id('StickU2c').value.includes('button') || id('StickL2c').value.includes('button') || id('StickR2c').value.includes('button') || id('StickD2c').value.includes('button')){buttonType = 'button'}
if(id('StickU2cb').value.includes('button') || id('StickL2cb').value.includes('button') || id('StickR2cb').value.includes('button') || id('StickD2cb').value.includes('button')){buttonTypeB = 'button'}
if(id('StickU2c').value.includes('hat') || id('StickL2c').value.includes('hat') || id('StickR2c').value.includes('hat') || id('StickD2c').value.includes('hat')){buttonType = 'hat'}
if(id('StickU2cb').value.includes('hat') || id('StickL2cb').value.includes('hat') || id('StickR2cb').value.includes('hat') || id('StickD2cb').value.includes('hat')){buttonTypeB = 'hat'}
var StickU2value = id('StickU2c').value.replace(regjoy,''),
StickL2value = id('StickL2c').value.replace(regjoy,''),
StickR2value = id('StickR2c').value.replace(regjoy,''),
StickD2value = id('StickD2c').value.replace(regjoy,''),
StickU2bvalue = id('StickU2cb').value.replace(regjoy,''),
StickL2bvalue = id('StickL2cb').value.replace(regjoy,''),
StickR2bvalue = id('StickR2cb').value.replace(regjoy,''),
StickD2bvalue = id('StickD2cb').value.replace(regjoy,'');
AButton2 += id('AButton2c').value + ' ' + id('AButton2cb').value;
BButton2 += id('BButton2c').value + ' ' + id('BButton2cb').value;
LTrig2 += id('LTrig2c').value + ' ' + id('LTrig2cb').value;
RTrig2 += id('RTrig2c').value + ' ' + id('RTrig2cb').value;
ZTrig2 += id('ZTrig2c').value + ' ' + id('ZTrig2cb').value;
Start2 += id('Start2c').value + ' ' + id('Start2cb').value;
DPadU2 += id('DPadU2c').value + ' ' + id('DPadU2cb').value;
DPadL2 += id('DPadL2c').value + ' ' + id('DPadL2cb').value;
DPadR2 += id('DPadR2c').value + ' ' + id('DPadR2cb').value;
DPadD2 += id('DPadD2c').value + ' ' + id('DPadD2cb').value;
CButtonU2 += id('CButtonU2c').value + ' ' + id('CButtonU2cb').value;
CButtonL2 += id('CButtonL2c').value + ' ' + id('CButtonL2cb').value;
CButtonR2 += id('CButtonR2c').value + ' ' + id('CButtonR2cb').value;
CButtonD2 += id('CButtonD2c').value + ' ' + id('CButtonD2cb').value;
MempakSwitch2 += id('MempakSwitch2c').value + ' ' + id('MempakSwitch2cb').value;
RumblepakSwitch2 += id('RumblepakSwitch2c').value + ' ' + id('RumblepakSwitch2cb').value;
XAxis2 += buttonType + '(' + StickL2value + ',' + StickR2value + ')' + ' ' + buttonTypeB + '(' + StickL2bvalue + ',' + StickR2bvalue + ')';
YAxis2 += buttonType + '(' + StickU2value + ',' + StickD2value + ')' + ' ' + buttonTypeB + '(' + StickU2bvalue + ',' + StickD2bvalue + ')';
if(id('mouse2').checked && mouse2_1 != ''){
if(mouse2_1 === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=' + id('AButton2c').value + ' mouse(1)'}
if(mouse2_1 === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=' + id('BButton2c').value + ' mouse(1)'}
if(mouse2_1 === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=' + id('LTrig2c').value + ' mouse(1)'}
if(mouse2_1 === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=' + id('RTrig2c').value + ' mouse(1)'}
if(mouse2_1 === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + id('ZTrig2c').value + ' mouse(1)'}
if(mouse2_1 === 'cr'){CButtonR2 = 'Input-SDL-Control2[C Button R]=' + id('CButtonR2c').value + ' mouse(1)'}
if(mouse2_1 === 'cl'){CButtonL2 = 'Input-SDL-Control2[C Button L]=' + id('CButtonL2c').value + ' mouse(1)'}
if(mouse2_1 === 'cd'){CButtonD2 = 'Input-SDL-Control2[C Button D]=' + id('CButtonD2c').value + ' mouse(1)'}
if(mouse2_1 === 'cu'){CButtonU2 = 'Input-SDL-Control2[C Button U]=' + id('CButtonU2c').value + ' mouse(1)'}
if(mouse2_1 === 'dpadr'){DPadR2 = 'Input-SDL-Control2[DPad R]=' + id('DPadR2c').value + ' mouse(1)'}
if(mouse2_1 === 'dpadl'){DPadL2 = 'Input-SDL-Control2[DPad L]=' + id('DPadL2c').value + ' mouse(1)'}
if(mouse2_1 === 'dpadd'){DPadD2 = 'Input-SDL-Control2[DPad D]=' + id('DPadD2c').value + ' mouse(1)'}
if(mouse2_1 === 'dpadu'){DPadU2 = 'Input-SDL-Control2[DPad U]=' + id('DPadU2c').value + ' mouse(1)'}
if(mouse2_1 === 'start'){Start2 = 'Input-SDL-Control2[Start]=' + id('Start2c').value + ' mouse(1)'}
if(mouse2_1 === 'ms'){MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + id('MempakSwitch2c').value + ' mouse(1)'}
if(mouse2_1 === 'rs'){RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + id('RumblepakSwitch2c').value + ' mouse(1)'}}
if(id('mouse2').checked && mouse2_2 != ''){
if(mouse2_2 === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=' + id('AButton2c').value + ' mouse(2)'}
if(mouse2_2 === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=' + id('BButton2c').value + ' mouse(2)'}
if(mouse2_2 === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=' + id('LTrig2c').value + ' mouse(2)'}
if(mouse2_2 === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=' + id('RTrig2c').value + ' mouse(2)'}
if(mouse2_2 === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + id('ZTrig2c').value + ' mouse(2)'}
if(mouse2_2 === 'cr'){CButtonR2 = 'Input-SDL-Control2[C Button R]=' + id('CButtonR2c').value + ' mouse(2)'}
if(mouse2_2 === 'cl'){CButtonL2 = 'Input-SDL-Control2[C Button L]=' + id('CButtonL2c').value + ' mouse(2)'}
if(mouse2_2 === 'cd'){CButtonD2 = 'Input-SDL-Control2[C Button D]=' + id('CButtonD2c').value + ' mouse(2)'}
if(mouse2_2 === 'cu'){CButtonU2 = 'Input-SDL-Control2[C Button U]=' + id('CButtonU2c').value + ' mouse(2)'}
if(mouse2_2 === 'dpadr'){DPadR2 = 'Input-SDL-Control2[DPad R]=' + id('DPadR2c').value + ' mouse(2)'}
if(mouse2_2 === 'dpadl'){DPadL2 = 'Input-SDL-Control2[DPad L]=' + id('DPadL2c').value + ' mouse(2)'}
if(mouse2_2 === 'dpadd'){DPadD2 = 'Input-SDL-Control2[DPad D]=' + id('DPadD2c').value + ' mouse(2)'}
if(mouse2_2 === 'dpadu'){DPadU2 = 'Input-SDL-Control2[DPad U]=' + id('DPadU2c').value + ' mouse(2)'}
if(mouse2_2 === 'start'){Start2 = 'Input-SDL-Control2[Start]=' + id('Start2c').value + ' mouse(2)'}
if(mouse2_2 === 'ms'){MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + id('MempakSwitch2c').value + ' mouse(2)'}
if(mouse2_2 === 'rs'){RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + id('RumblepakSwitch2c').value + ' mouse(2)'}}
if(id('mouse2').checked && mouse2_3 != ''){
if(mouse2_3 === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=' + id('AButton2c').value + ' mouse(3)'}
if(mouse2_3 === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=' + id('BButton2c').value + ' mouse(3)'}
if(mouse2_3 === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=' + id('LTrig2c').value + ' mouse(3)'}
if(mouse2_3 === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=' + id('RTrig2c').value + ' mouse(3)'}
if(mouse2_3 === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + id('ZTrig2c').value + ' mouse(3)'}
if(mouse2_3 === 'cr'){CButtonR2 = 'Input-SDL-Control2[C Button R]=' + id('CButtonR2c').value + ' mouse(3)'}
if(mouse2_3 === 'cl'){CButtonL2 = 'Input-SDL-Control2[C Button L]=' + id('CButtonL2c').value + ' mouse(3)'}
if(mouse2_3 === 'cd'){CButtonD2 = 'Input-SDL-Control2[C Button D]=' + id('CButtonD2c').value + ' mouse(3)'}
if(mouse2_3 === 'cu'){CButtonU2 = 'Input-SDL-Control2[C Button U]=' + id('CButtonU2c').value + ' mouse(3)'}
if(mouse2_3 === 'dpadr'){DPadR2 = 'Input-SDL-Control2[DPad R]=' + id('DPadR2c').value + ' mouse(3)'}
if(mouse2_3 === 'dpadl'){DPadL2 = 'Input-SDL-Control2[DPad L]=' + id('DPadL2c').value + ' mouse(3)'}
if(mouse2_3 === 'dpadd'){DPadD2 = 'Input-SDL-Control2[DPad D]=' + id('DPadD2c').value + ' mouse(3)'}
if(mouse2_3 === 'dpadu'){DPadU2 = 'Input-SDL-Control2[DPad U]=' + id('DPadU2c').value + ' mouse(3)'}
if(mouse2_3 === 'start'){Start2 = 'Input-SDL-Control2[Start]=' + id('Start2c').value + ' mouse(3)'}
if(mouse2_3 === 'ms'){MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + id('MempakSwitch2c').value + ' mouse(3)'}
if(mouse2_3 === 'rs'){RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + id('RumblepakSwitch2c').value + ' mouse(3)'}}}

if(name3.includes('Keyboard')){
device3 = 'Input-SDL-Control3[device]=-1';
AButton3 += 'key(' + id('AButton3').dataset.key + ')';
BButton3 += 'key(' + id('BButton3').dataset.key + ')';
LTrig3 += 'key(' + id('LTrig3').dataset.key + ')';
RTrig3 += 'key(' + id('RTrig3').dataset.key + ')';
ZTrig3 += 'key(' + id('ZTrig3').dataset.key + ')';
Start3 += 'key(' + id('Start3').dataset.key + ')';
DPadU3 += 'key(' + id('DPadU3').dataset.key + ')';
DPadL3 += 'key(' + id('DPadL3').dataset.key + ')';
DPadR3 += 'key(' + id('DPadR3').dataset.key + ')';
DPadD3 += 'key(' + id('DPadD3').dataset.key + ')';
CButtonU3 += 'key(' + id('CButtonU3').dataset.key + ')';
CButtonL3 += 'key(' + id('CButtonL3').dataset.key + ')';
CButtonR3 += 'key(' + id('CButtonR3').dataset.key + ')';
CButtonD3 += 'key(' + id('CButtonD3').dataset.key + ')';
MempakSwitch3 += 'key(' + id('MempakSwitch3').dataset.key + ')';
RumblepakSwitch3 += 'key(' + id('RumblepakSwitch3').dataset.key + ')';
XAxis3 += 'Input-SDL-Control3[X Axis]=' + 'key(' + id('StickL3').dataset.key + ',' + id('StickR3').dataset.key + ')';
YAxis3 += 'Input-SDL-Control3[Y Axis]=' + 'key(' + id('StickU3').dataset.key + ',' + id('StickD3').dataset.key + ')';
if(id('mouse3').checked && mouse3_1 != ''){
if(mouse3_1 === 'a'){AButton3 += ' mouse(1)'}
if(mouse3_1 === 'b'){BButton3 += ' mouse(1)'}
if(mouse3_1 === 'l'){LTrig3 += ' mouse(1)'}
if(mouse3_1 === 'r'){RTrig3 += ' mouse(1)'}
if(mouse3_1 === 'z'){ZTrig3 += ' mouse(1)'}
if(mouse3_1 === 'cr'){CButtonR3 += ' mouse(1)'}
if(mouse3_1 === 'cl'){CButtonL3 += ' mouse(1)'}
if(mouse3_1 === 'cd'){CButtonD3 += ' mouse(1)'}
if(mouse3_1 === 'cu'){CButtonU3 += ' mouse(1)'}
if(mouse3_1 === 'dpadr'){DPadR3 += ' mouse(1)'}
if(mouse3_1 === 'dpadl'){DPadL3 += ' mouse(1)'}
if(mouse3_1 === 'dpadd'){DPadD3 += ' mouse(1)'}
if(mouse3_1 === 'dpadu'){DPadU3 += ' mouse(1)'}
if(mouse3_1 === 'start'){Start3 += ' mouse(1)'}
if(mouse3_1 === 'ms'){MempakSwitch3 += ' mouse(1)'}
if(mouse3_1 === 'rs'){RumblepakSwitch3 += ' mouse(1)'}}
if(id('mouse3').checked && mouse3_2 != ''){
if(mouse3_2 === 'a'){AButton3 += ' mouse(2)'}
if(mouse3_2 === 'b'){BButton3 += ' mouse(2)'}
if(mouse3_2 === 'l'){LTrig3 += ' mouse(2)'}
if(mouse3_2 === 'r'){RTrig3 += ' mouse(2)'}
if(mouse3_2 === 'z'){ZTrig3 += ' mouse(2)'}
if(mouse3_2 === 'cr'){CButtonR3 += ' mouse(2)'}
if(mouse3_2 === 'cl'){CButtonL3 += ' mouse(2)'}
if(mouse3_2 === 'cd'){CButtonD3 += ' mouse(2)'}
if(mouse3_2 === 'cu'){CButtonU3 += ' mouse(2)'}
if(mouse3_2 === 'dpadr'){DPadR3 += ' mouse(2)'}
if(mouse3_2 === 'dpadl'){DPadL3 += ' mouse(2)'}
if(mouse3_2 === 'dpadd'){DPadD3 += ' mouse(2)'}
if(mouse3_2 === 'dpadu'){DPadU3 += ' mouse(2)'}
if(mouse3_2 === 'start'){Start3 += ' mouse(2)'}
if(mouse3_2 === 'ms'){MempakSwitch3 += ' mouse(2)'}
if(mouse3_2 === 'rs'){RumblepakSwitch3 += ' mouse(2)'}}
if(id('mouse3').checked && mouse3_3 != ''){
if(mouse3_3 === 'a'){AButton3 += ' mouse(3)'}
if(mouse3_3 === 'b'){BButton3 += ' mouse(3)'}
if(mouse3_3 === 'l'){LTrig3 += ' mouse(3)'}
if(mouse3_3 === 'r'){RTrig3 += ' mouse(3)'}
if(mouse3_3 === 'z'){ZTrig3 += ' mouse(3)'}
if(mouse3_3 === 'cr'){CButtonR3 += ' mouse(3)'}
if(mouse3_3 === 'cl'){CButtonL3 += ' mouse(3)'}
if(mouse3_3 === 'cd'){CButtonD3 += ' mouse(3)'}
if(mouse3_3 === 'cu'){CButtonU3 += ' mouse(3)'}
if(mouse3_3 === 'dpadr'){DPadR3 += ' mouse(3)'}
if(mouse3_3 === 'dpadl'){DPadL3 += ' mouse(3)'}
if(mouse3_3 === 'dpadd'){DPadD3 += ' mouse(3)'}
if(mouse3_3 === 'dpadu'){DPadU3 += ' mouse(3)'}
if(mouse3_3 === 'start'){Start3 += ' mouse(3)'}
if(mouse3_3 === 'ms'){MempakSwitch3 += ' mouse(3)'}
if(mouse3_3 === 'rs'){RumblepakSwitch3 += ' mouse(3)'}}
}else{
var buttonType = '', buttonTypeB = '';
if(id('StickU3c').value.includes('axis') || id('StickL3c').value.includes('axis') || id('StickR3c').value.includes('axis') || id('StickD3c').value.includes('axis')){buttonType = 'axis'}
if(id('StickU3cb').value.includes('axis') || id('StickL3cb').value.includes('axis') || id('StickR3cb').value.includes('axis') || id('StickD3cb').value.includes('axis')){buttonTypeB = 'axis'}
if(id('StickU3c').value.includes('button') || id('StickL3c').value.includes('button') || id('StickR3c').value.includes('button') || id('StickD3c').value.includes('button')){buttonType = 'button'}
if(id('StickU3cb').value.includes('button') || id('StickL3cb').value.includes('button') || id('StickR3cb').value.includes('button') || id('StickD3cb').value.includes('button')){buttonTypeB = 'button'}
if(id('StickU3c').value.includes('hat') || id('StickL3c').value.includes('hat') || id('StickR3c').value.includes('hat') || id('StickD3c').value.includes('hat')){buttonType = 'hat'}
if(id('StickU3cb').value.includes('hat') || id('StickL3cb').value.includes('hat') || id('StickR3cb').value.includes('hat') || id('StickD3cb').value.includes('hat')){buttonTypeB = 'hat'}
var StickU3value = id('StickU3c').value.replace(regjoy,''),
StickL3value = id('StickL3c').value.replace(regjoy,''),
StickR3value = id('StickR3c').value.replace(regjoy,''),
StickD3value = id('StickD3c').value.replace(regjoy,''),
StickU3bvalue = id('StickU3cb').value.replace(regjoy,''),
StickL3bvalue = id('StickL3cb').value.replace(regjoy,''),
StickR3bvalue = id('StickR3cb').value.replace(regjoy,''),
StickD3bvalue = id('StickD3cb').value.replace(regjoy,'');
AButton3 += id('AButton3c').value + ' ' + id('AButton3cb').value;
BButton3 += id('BButton3c').value + ' ' + id('BButton3cb').value;
LTrig3 += id('LTrig3c').value + ' ' + id('LTrig3cb').value;
RTrig3 += id('RTrig3c').value + ' ' + id('RTrig3cb').value;
ZTrig3 += id('ZTrig3c').value + ' ' + id('ZTrig3cb').value;
Start3 += id('Start3c').value + ' ' + id('Start3cb').value;
DPadU3 += id('DPadU3c').value + ' ' + id('DPadU3cb').value;
DPadL3 += id('DPadL3c').value + ' ' + id('DPadL3cb').value;
DPadR3 += id('DPadR3c').value + ' ' + id('DPadR3cb').value;
DPadD3 += id('DPadD3c').value + ' ' + id('DPadD3cb').value;
CButtonU3 += id('CButtonU3c').value + ' ' + id('CButtonU3cb').value;
CButtonL3 += id('CButtonL3c').value + ' ' + id('CButtonL3cb').value;
CButtonR3 += id('CButtonR3c').value + ' ' + id('CButtonR3cb').value;
CButtonD3 += id('CButtonD3c').value + ' ' + id('CButtonD3cb').value;
MempakSwitch3 += id('MempakSwitch3c').value + ' ' + id('MempakSwitch3cb').value;
RumblepakSwitch3 += id('RumblepakSwitch3c').value + ' ' + id('RumblepakSwitch3cb').value;
XAxis3 += buttonType + '(' + StickL3value + ',' + StickR3value + ')' + ' ' + buttonTypeB + '(' + StickL3bvalue + ',' + StickR3bvalue + ')';
YAxis3 += buttonType + '(' + StickU3value + ',' + StickD3value + ')' + ' ' + buttonTypeB + '(' + StickU3bvalue + ',' + StickD3bvalue + ')';
if(id('mouse3').checked && mouse3_1 != ''){
if(mouse3_1 === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=' + id('AButton3c').value + ' mouse(1)'}
if(mouse3_1 === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=' + id('BButton3c').value + ' mouse(1)'}
if(mouse3_1 === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=' + id('LTrig3c').value + ' mouse(1)'}
if(mouse3_1 === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=' + id('RTrig3c').value + ' mouse(1)'}
if(mouse3_1 === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + id('ZTrig3c').value + ' mouse(1)'}
if(mouse3_1 === 'cr'){CButtonR3 = 'Input-SDL-Control3[C Button R]=' + id('CButtonR3c').value + ' mouse(1)'}
if(mouse3_1 === 'cl'){CButtonL3 = 'Input-SDL-Control3[C Button L]=' + id('CButtonL3c').value + ' mouse(1)'}
if(mouse3_1 === 'cd'){CButtonD3 = 'Input-SDL-Control3[C Button D]=' + id('CButtonD3c').value + ' mouse(1)'}
if(mouse3_1 === 'cu'){CButtonU3 = 'Input-SDL-Control3[C Button U]=' + id('CButtonU3c').value + ' mouse(1)'}
if(mouse3_1 === 'dpadr'){DPadR3 = 'Input-SDL-Control3[DPad R]=' + id('DPadR3c').value + ' mouse(1)'}
if(mouse3_1 === 'dpadl'){DPadL3 = 'Input-SDL-Control3[DPad L]=' + id('DPadL3c').value + ' mouse(1)'}
if(mouse3_1 === 'dpadd'){DPadD3 = 'Input-SDL-Control3[DPad D]=' + id('DPadD3c').value + ' mouse(1)'}
if(mouse3_1 === 'dpadu'){DPadU3 = 'Input-SDL-Control3[DPad U]=' + id('DPadU3c').value + ' mouse(1)'}
if(mouse3_1 === 'start'){Start3 = 'Input-SDL-Control3[Start]=' + id('Start3c').value + ' mouse(1)'}
if(mouse3_1 === 'ms'){MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + id('MempakSwitch3c').value + ' mouse(1)'}
if(mouse3_1 === 'rs'){RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + id('RumblepakSwitch3c').value + ' mouse(1)'}}
if(id('mouse3').checked && mouse3_2 != ''){
if(mouse3_2 === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=' + id('AButton3c').value + ' mouse(2)'}
if(mouse3_2 === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=' + id('BButton3c').value + ' mouse(2)'}
if(mouse3_2 === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=' + id('LTrig3c').value + ' mouse(2)'}
if(mouse3_2 === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=' + id('RTrig3c').value + ' mouse(2)'}
if(mouse3_2 === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + id('ZTrig3c').value + ' mouse(2)'}
if(mouse3_2 === 'cr'){CButtonL3 = 'Input-SDL-Control3[C Button R]=' + id('CButtonR3c').value + ' mouse(2)'}
if(mouse3_2 === 'cl'){CButtonD3 = 'Input-SDL-Control3[C Button L]=' + id('CButtonL3c').value + ' mouse(2)'}
if(mouse3_2 === 'cd'){CButtonU3 = 'Input-SDL-Control3[C Button D]=' + id('CButtonD3c').value + ' mouse(2)'}
if(mouse3_2 === 'cu'){CButtonR3 = 'Input-SDL-Control3[C Button U]=' + id('CButtonU3c').value + ' mouse(2)'}
if(mouse3_2 === 'dpadr'){DPadR3 = 'Input-SDL-Control3[DPad R]=' + id('DPadR3c').value + ' mouse(2)'}
if(mouse3_2 === 'dpadl'){DPadL3 = 'Input-SDL-Control3[DPad L]=' + id('DPadL3c').value + ' mouse(2)'}
if(mouse3_2 === 'dpadd'){DPadD3 = 'Input-SDL-Control3[DPad D]=' + id('DPadD3c').value + ' mouse(2)'}
if(mouse3_2 === 'dpadu'){DPadU3 = 'Input-SDL-Control3[DPad U]=' + id('DPadU3c').value + ' mouse(2)'}
if(mouse3_2 === 'start'){Start3 = 'Input-SDL-Control3[Start]=' + id('Start3c').value + ' mouse(2)'}
if(mouse3_2 === 'ms'){MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + id('MempakSwitch3c').value + ' mouse(2)'}
if(mouse3_2 === 'rs'){RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + id('RumblepakSwitch3c').value + ' mouse(2)'}}
if(id('mouse3').checked && mouse3_3 != ''){
if(mouse3_3 === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=' + id('AButton3c').value + ' mouse(3)'}
if(mouse3_3 === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=' + id('BButton3c').value + ' mouse(3)'}
if(mouse3_3 === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=' + id('LTrig3c').value + ' mouse(3)'}
if(mouse3_3 === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=' + id('RTrig3c').value + ' mouse(3)'}
if(mouse3_3 === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + id('ZTrig3c').value + ' mouse(3)'}
if(mouse3_3 === 'cr'){CButtonR3 = 'Input-SDL-Control3[C Button R]=' + id('CButtonR3c').value + ' mouse(3)'}
if(mouse3_3 === 'cl'){CButtonL3 = 'Input-SDL-Control3[C Button L]=' + id('CButtonL3c').value + ' mouse(3)'}
if(mouse3_3 === 'cd'){CButtonD3 = 'Input-SDL-Control3[C Button D]=' + id('CButtonD3c').value + ' mouse(3)'}
if(mouse3_3 === 'cu'){CButtonU3 = 'Input-SDL-Control3[C Button U]=' + id('CButtonU3c').value + ' mouse(3)'}
if(mouse3_3 === 'dpadr'){DPadR3 = 'Input-SDL-Control3[DPad R]=' + id('DPadR3c').value + ' mouse(3)'}
if(mouse3_3 === 'dpadl'){DPadL3 = 'Input-SDL-Control3[DPad L]=' + id('DPadL3c').value + ' mouse(3)'}
if(mouse3_3 === 'dpadd'){DPadD3 = 'Input-SDL-Control3[DPad D]=' + id('DPadD3c').value + ' mouse(3)'}
if(mouse3_3 === 'dpadu'){DPadU3 = 'Input-SDL-Control3[DPad U]=' + id('DPadU3c').value + ' mouse(3)'}
if(mouse3_3 === 'start'){Start3 = 'Input-SDL-Control3[Start]=' + id('Start3c').value + ' mouse(3)'}
if(mouse3_3 === 'ms'){MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + id('MempakSwitch3c').value + ' mouse(3)'}
if(mouse3_3 === 'rs'){RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + id('RumblepakSwitch3c').value + ' mouse(3)'}}}

if(name4.includes('Keyboard')){
device4 = 'Input-SDL-Control4[device]=-1';
AButton4 += 'key(' + id('AButton4').dataset.key + ')';
BButton4 += 'key(' + id('BButton4').dataset.key + ')';
LTrig4 += 'key(' + id('LTrig4').dataset.key + ')';
RTrig4 += 'key(' + id('RTrig4').dataset.key + ')';
ZTrig4 += 'key(' + id('ZTrig4').dataset.key + ')';
Start4 += 'key(' + id('Start4').dataset.key + ')';
DPadU4 += 'key(' + id('DPadU4').dataset.key + ')';
DPadL4 += 'key(' + id('DPadL4').dataset.key + ')';
DPadR4 += 'key(' + id('DPadR4').dataset.key + ')';
DPadD4 += 'key(' + id('DPadD4').dataset.key + ')';
CButtonU4 += 'key(' + id('CButtonU4').dataset.key + ')';
CButtonL4 += 'key(' + id('CButtonL4').dataset.key + ')';
CButtonR4 += 'key(' + id('CButtonR4').dataset.key + ')';
CButtonD4 += 'key(' + id('CButtonD4').dataset.key + ')';
MempakSwitch4 += 'key(' + id('MempakSwitch4').dataset.key + ')';
RumblepakSwitch4 += 'key(' + id('RumblepakSwitch4').dataset.key + ')';
XAxis4 += 'key(' + id('StickL4').dataset.key + ',' + id('StickR4').dataset.key + ')';
YAxis4 += 'key(' + id('StickU4').dataset.key + ',' + id('StickD4').dataset.key + ')';
if(id('mouse4').checked && mouse4_1 != ''){
if(mouse4_1 === 'a'){AButton4 += ' mouse(1)'}
if(mouse4_1 === 'b'){BButton4 += ' mouse(1)'}
if(mouse4_1 === 'l'){LTrig4 += ' mouse(1)'}
if(mouse4_1 === 'r'){RTrig4 += ' mouse(1)'}
if(mouse4_1 === 'z'){ZTrig4 += ' mouse(1)'}
if(mouse4_1 === 'cr'){CButtonR4 += ' mouse(1)'}
if(mouse4_1 === 'cl'){CButtonL4 += ' mouse(1)'}
if(mouse4_1 === 'cd'){CButtonD4 += ' mouse(1)'}
if(mouse4_1 === 'cu'){CButtonU4 += ' mouse(1)'}
if(mouse4_1 === 'dpadr'){DPadR4 += ' mouse(1)'}
if(mouse4_1 === 'dpadl'){DPadL4 += ' mouse(1)'}
if(mouse4_1 === 'dpadd'){DPadD4 += ' mouse(1)'}
if(mouse4_1 === 'dpadu'){DPadU4 += ' mouse(1)'}
if(mouse4_1 === 'start'){Start4 += ' mouse(1)'}
if(mouse4_1 === 'ms'){MempakSwitch4 += ' mouse(1)'}
if(mouse4_1 === 'rs'){RumblepakSwitch4 += ' mouse(1)'}}
if(id('mouse4').checked && mouse4_2 != ''){
if(mouse4_2 === 'a'){AButton4 += ' mouse(2)'}
if(mouse4_2 === 'b'){BButton4 += ' mouse(2)'}
if(mouse4_2 === 'l'){LTrig4 += ' mouse(2)'}
if(mouse4_2 === 'r'){RTrig4 += ' mouse(2)'}
if(mouse4_2 === 'z'){ZTrig4 += ' mouse(2)'}
if(mouse4_2 === 'cr'){CButtonR4 += ' mouse(2)'}
if(mouse4_2 === 'cl'){CButtonL4 += ' mouse(2)'}
if(mouse4_2 === 'cd'){CButtonD4 += ' mouse(2)'}
if(mouse4_2 === 'cu'){CButtonU4 += ' mouse(2)'}
if(mouse4_2 === 'dpadr'){DPadR4 += ' mouse(2)'}
if(mouse4_2 === 'dpadl'){DPadL4 += ' mouse(2)'}
if(mouse4_2 === 'dpadd'){DPadD4 += ' mouse(2)'}
if(mouse4_2 === 'dpadu'){DPadU4 += ' mouse(2)'}
if(mouse4_2 === 'start'){Start4 += ' mouse(2)'}
if(mouse4_2 === 'ms'){MempakSwitch4 += ' mouse(2)'}
if(mouse4_2 === 'rs'){RumblepakSwitch4 += ' mouse(2)'}}
if(id('mouse4').checked && mouse4_3 != ''){
if(mouse4_3 === 'a'){AButton4 += ' mouse(3)'}
if(mouse4_3 === 'b'){BButton4 += ' mouse(3)'}
if(mouse4_3 === 'l'){LTrig4 += ' mouse(3)'}
if(mouse4_3 === 'r'){RTrig4 += ' mouse(3)'}
if(mouse4_3 === 'z'){ZTrig4 += ' mouse(3)'}
if(mouse4_3 === 'cr'){CButtonR4 += ' mouse(3)'}
if(mouse4_3 === 'cl'){CButtonL4 += ' mouse(3)'}
if(mouse4_3 === 'cd'){CButtonD4 += ' mouse(3)'}
if(mouse4_3 === 'cu'){CButtonU4 += ' mouse(3)'}
if(mouse4_3 === 'dpadr'){DPadR4 += ' mouse(3)'}
if(mouse4_3 === 'dpadl'){DPadL4 += ' mouse(3)'}
if(mouse4_3 === 'dpadd'){DPadD4 += ' mouse(3)'}
if(mouse4_3 === 'dpadu'){DPadU4 += ' mouse(3)'}
if(mouse4_3 === 'start'){Start4 += ' mouse(3)'}
if(mouse4_3 === 'ms'){MempakSwitch4 += ' mouse(3)'}
if(mouse4_3 === 'rs'){RumblepakSwitch4 += ' mouse(3)'}}
}else{
var buttonType = '', buttonTypeB = '';
if(id('StickU4c').value.includes('axis') || id('StickL4c').value.includes('axis') || id('StickR4c').value.includes('axis') || id('StickD4c').value.includes('axis')){buttonType = 'axis'}
if(id('StickU4cb').value.includes('axis') || id('StickL4cb').value.includes('axis') || id('StickR4cb').value.includes('axis') || id('StickD4cb').value.includes('axis')){buttonTypeB = 'axis'}
if(id('StickU4c').value.includes('button') || id('StickL4c').value.includes('button') || id('StickR4c').value.includes('button') || id('StickD4c').value.includes('button')){buttonType = 'button'}
if(id('StickU4cb').value.includes('button') || id('StickL4cb').value.includes('button') || id('StickR4cb').value.includes('button') || id('StickD4cb').value.includes('button')){buttonTypeB = 'button'}
if(id('StickU4c').value.includes('hat') || id('StickL4c').value.includes('hat') || id('StickR4c').value.includes('hat') || id('StickD4c').value.includes('hat')){buttonType = 'hat'}
if(id('StickU4cb').value.includes('hat') || id('StickL4cb').value.includes('hat') || id('StickR4cb').value.includes('hat') || id('StickD4cb').value.includes('hat')){buttonTypeB = 'hat'}
var StickU4value = id('StickU4c').value.replace(regjoy,''),
StickL4value = id('StickL4c').value.replace(regjoy,''),
StickR4value = id('StickR4c').value.replace(regjoy,''),
StickD4value = id('StickD4c').value.replace(regjoy,''),
StickU4bvalue = id('StickU4cb').value.replace(regjoy,''),
StickL4bvalue = id('StickL4cb').value.replace(regjoy,''),
StickR4bvalue = id('StickR4cb').value.replace(regjoy,''),
StickD4bvalue = id('StickD4cb').value.replace(regjoy,'');
AButton4 += id('AButton4c').value + ' ' + id('AButton4cb').value;
BButton4 += id('BButton4c').value + ' ' + id('BButton4cb').value;
LTrig4 += id('LTrig4c').value + ' ' + id('LTrig4cb').value;
RTrig4 += id('RTrig4c').value + ' ' + id('RTrig4cb').value;
ZTrig4 += id('ZTrig4c').value + ' ' + id('ZTrig4cb').value;
Start4 += id('Start4c').value + ' ' + id('Start4cb').value;
DPadU4 += id('DPadU4c').value + ' ' + id('DPadU4cb').value;
DPadL4 += id('DPadL4c').value + ' ' + id('DPadL4cb').value;
DPadR4 += id('DPadR4c').value + ' ' + id('DPadR4cb').value;
DPadD4 += id('DPadD4c').value + ' ' + id('DPadD4cb').value;
CButtonU4 += id('CButtonU4c').value + ' ' + id('CButtonU4cb').value;
CButtonL4 += id('CButtonL4c').value + ' ' + id('CButtonL4cb').value;
CButtonR4 += id('CButtonR4c').value + ' ' + id('CButtonR4cb').value;
CButtonD4 += id('CButtonD4c').value + ' ' + id('CButtonD4cb').value;
MempakSwitch4 += id('MempakSwitch4c').value + ' ' + id('MempakSwitch4cb').value;
RumblepakSwitch4 += id('RumblepakSwitch4c').value + ' ' + id('RumblepakSwitch4cb').value;
XAxis4 += buttonType + '(' + StickL4value + ',' + StickR4value + ')' + ' ' + buttonTypeB + '(' + StickL4bvalue + ',' + StickR4bvalue + ')';
YAxis4 += buttonType + '(' + StickU4value + ',' + StickD4value + ')' + ' ' + buttonTypeB + '(' + StickU4bvalue + ',' + StickD4bvalue + ')';
if(id('mouse4').checked && mouse4_1 != ''){
if(mouse4_1 === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=' + id('AButton4c').value + ' mouse(1)'}
if(mouse4_1 === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=' + id('BButton4c').value + ' mouse(1)'}
if(mouse4_1 === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=' + id('LTrig4c').value + ' mouse(1)'}
if(mouse4_1 === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=' + id('RTrig4c').value + ' mouse(1)'}
if(mouse4_1 === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + id('ZTrig4c').value + ' mouse(1)'}
if(mouse4_1 === 'cr'){CButtonR4 = 'Input-SDL-Control4[C Button R]=' + id('CButtonR4c').value + ' mouse(1)'}
if(mouse4_1 === 'cl'){CButtonL4 = 'Input-SDL-Control4[C Button L]=' + id('CButtonL4c').value + ' mouse(1)'}
if(mouse4_1 === 'cd'){CButtonD4 = 'Input-SDL-Control4[C Button D]=' + id('CButtonD4c').value + ' mouse(1)'}
if(mouse4_1 === 'cu'){CButtonU4 = 'Input-SDL-Control4[C Button U]=' + id('CButtonU4c').value + ' mouse(1)'}
if(mouse4_1 === 'dpadr'){DPadR4 = 'Input-SDL-Control4[DPad R]=' + id('DPadR4c').value + ' mouse(1)'}
if(mouse4_1 === 'dpadl'){DPadL4 = 'Input-SDL-Control4[DPad L]=' + id('DPadL4c').value + ' mouse(1)'}
if(mouse4_1 === 'dpadd'){DPadD4 = 'Input-SDL-Control4[DPad D]=' + id('DPadD4c').value + ' mouse(1)'}
if(mouse4_1 === 'dpadu'){DPadU4 = 'Input-SDL-Control4[DPad U]=' + id('DPadU4c').value + ' mouse(1)'}
if(mouse4_1 === 'start'){Start4 = 'Input-SDL-Control4[Start]=' + id('Start4c').value + ' mouse(1)'}
if(mouse4_1 === 'ms'){MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + id('MempakSwitch4c').value + ' mouse(1)'}
if(mouse4_1 === 'rs'){RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + id('RumblepakSwitch4c').value + ' mouse(1)'}}
if(id('mouse4').checked && mouse4_2 != ''){
if(mouse4_2 === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=' + id('AButton4c').value + ' mouse(2)'}
if(mouse4_2 === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=' + id('BButton4c').value + ' mouse(2)'}
if(mouse4_2 === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=' + id('LTrig4c').value + ' mouse(2)'}
if(mouse4_2 === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=' + id('RTrig4c').value + ' mouse(2)'}
if(mouse4_2 === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + id('ZTrig4c').value + ' mouse(2)'}
if(mouse4_2 === 'cr'){CButtonR4 = 'Input-SDL-Control4[C Button R]=' + id('CButtonR4c').value + ' mouse(2)'}
if(mouse4_2 === 'cl'){CButtonL4 = 'Input-SDL-Control4[C Button L]=' + id('CButtonL4c').value + ' mouse(2)'}
if(mouse4_2 === 'cd'){CButtonD4 = 'Input-SDL-Control4[C Button D]=' + id('CButtonD4c').value + ' mouse(2)'}
if(mouse4_2 === 'cu'){CButtonU4 = 'Input-SDL-Control4[C Button U]=' + id('CButtonU4c').value + ' mouse(2)'}
if(mouse4_2 === 'dpadr'){DPadR4 = 'Input-SDL-Control4[DPad R]=' + id('DPadR4c').value + ' mouse(2)'}
if(mouse4_2 === 'dpadl'){DPadL4 = 'Input-SDL-Control4[DPad L]=' + id('DPadL4c').value + ' mouse(2)'}
if(mouse4_2 === 'dpadd'){DPadD4 = 'Input-SDL-Control4[DPad D]=' + id('DPadD4c').value + ' mouse(2)'}
if(mouse4_2 === 'dpadu'){DPadU4 = 'Input-SDL-Control4[DPad U]=' + id('DPadU4c').value + ' mouse(2)'}
if(mouse4_2 === 'start'){Start4 = 'Input-SDL-Control4[Start]=' + id('Start4c').value + ' mouse(2)'}
if(mouse4_2 === 'ms'){MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + id('MempakSwitch4c').value + ' mouse(2)'}
if(mouse4_2 === 'rs'){RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + id('RumblepakSwitch4c').value + ' mouse(2)'}}
if(id('mouse4').checked && mouse4_3 != ''){
if(mouse4_3 === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=' + id('AButton4c').value + ' mouse(3)'}
if(mouse4_3 === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=' + id('BButton4c').value + ' mouse(3)'}
if(mouse4_3 === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=' + id('LTrig4c').value + ' mouse(3)'}
if(mouse4_3 === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=' + id('RTrig4c').value + ' mouse(3)'}
if(mouse4_3 === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + id('ZTrig4c').value + ' mouse(3)'}
if(mouse4_3 === 'cr'){CButtonR4 = 'Input-SDL-Control4[C Button R]=' + id('CButtonR4c').value + ' mouse(3)'}
if(mouse4_3 === 'cl'){CButtonL4 = 'Input-SDL-Control4[C Button L]=' + id('CButtonL4c').value + ' mouse(3)'}
if(mouse4_3 === 'cd'){CButtonD4 = 'Input-SDL-Control4[C Button D]=' + id('CButtonD4c').value + ' mouse(3)'}
if(mouse4_3 === 'cu'){CButtonU4 = 'Input-SDL-Control4[C Button U]=' + id('CButtonU4c').value + ' mouse(3)'}
if(mouse4_3 === 'dpadr'){DPadR4 = 'Input-SDL-Control4[DPad R]=' + id('DPadR4c').value + ' mouse(3)'}
if(mouse4_3 === 'dpadl'){DPadL4 = 'Input-SDL-Control4[DPad L]=' + id('DPadL4c').value + ' mouse(3)'}
if(mouse4_3 === 'dpadd'){DPadD4 = 'Input-SDL-Control4[DPad D]=' + id('DPadD4c').value + ' mouse(3)'}
if(mouse4_3 === 'dpadu'){DPadU4 = 'Input-SDL-Control4[DPad U]=' + id('DPadU4c').value + ' mouse(3)'}
if(mouse4_3 === 'start'){Start4 = 'Input-SDL-Control4[Start]=' + id('Start4c').value + ' mouse(3)'}
if(mouse4_3 === 'ms'){MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + id('MempakSwitch4c').value + ' mouse(3)'}
if(mouse4_3 === 'rs'){RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + id('RumblepakSwitch4c').value + ' mouse(3)'}}}



function kb(kb){ // prevent empty keyboard keys from causing warnings
if(kb.match(regkb))kb = kb.replace(regkb,'key(0)')
if(kb.match(regkbaxis))kb = kb.replace(regkbaxis,'key(0,0)')
return kb}

AButton1 = kb(AButton1);
BButton1 = kb(BButton1);
LTrig1 = kb(LTrig1);
RTrig1 = kb(RTrig1);
ZTrig1 = kb(ZTrig1);
Start1 = kb(Start1);
DPadU1 = kb(DPadU1);
DPadL1 = kb(DPadL1);
DPadR1 = kb(DPadR1);
DPadD1 = kb(DPadD1);
CButtonU1 = kb(CButtonU1);
CButtonL1 = kb(CButtonL1);
CButtonR1 = kb(CButtonR1);
CButtonD1 = kb(CButtonD1);
MempakSwitch1 = kb(MempakSwitch1);
RumblepakSwitch1 = kb(RumblepakSwitch1);
XAxis1 = kb(XAxis1);
YAxis1 = kb(YAxis1);

AButton2 = kb(AButton2);
BButton2 = kb(BButton2);
LTrig2 = kb(LTrig2);
RTrig2 = kb(RTrig2);
ZTrig2 = kb(ZTrig2);
Start2 = kb(Start2);
DPadU2 = kb(DPadU2);
DPadL2 = kb(DPadL2);
DPadR2 = kb(DPadR2);
DPadD2 = kb(DPadD2);
CButtonU2 = kb(CButtonU2);
CButtonL2 = kb(CButtonL2);
CButtonR2 = kb(CButtonR2);
CButtonD2 = kb(CButtonD2);
MempakSwitch2 = kb(MempakSwitch2);
RumblepakSwitch2 = kb(RumblepakSwitch2);
XAxis2 = kb(XAxis2);
YAxis2 = kb(YAxis2);

AButton3 = kb(AButton3);
BButton3 = kb(BButton3);
LTrig3 = kb(LTrig3);
RTrig3 = kb(RTrig3);
ZTrig3 = kb(ZTrig3);
Start3 = kb(Start3);
DPadU3 = kb(DPadU3);
DPadL3 = kb(DPadL3);
DPadR3 = kb(DPadR3);
DPadD3 = kb(DPadD3);
CButtonU3 = kb(CButtonU3);
CButtonL3 = kb(CButtonL3);
CButtonR3 = kb(CButtonR3);
CButtonD3 = kb(CButtonD3);
MempakSwitch3 = kb(MempakSwitch3);
RumblepakSwitch3 = kb(RumblepakSwitch3);
XAxis3 = kb(XAxis3);
YAxis3 = kb(YAxis3);

AButton4 = kb(AButton4);
BButton4 = kb(BButton4);
LTrig4 = kb(LTrig4);
RTrig4 = kb(RTrig4);
ZTrig4 = kb(ZTrig4);
Start4 = kb(Start4);
DPadU4 = kb(DPadU4);
DPadL4 = kb(DPadL4);
DPadR4 = kb(DPadR4);
DPadD4 = kb(DPadD4);
CButtonU4 = kb(CButtonU4);
CButtonL4 = kb(CButtonL4);
CButtonR4 = kb(CButtonR4);
CButtonD4 = kb(CButtonD4);
MempakSwitch4 = kb(MempakSwitch4);
RumblepakSwitch4 = kb(RumblepakSwitch4);
XAxis4 = kb(XAxis4);
YAxis4 = kb(YAxis4);



var core = ['--corelib','mupen64plus','--plugindir','.',osd,fullscreen,'--resolution',resolution,'--gfx',gfx,'--audio',audio,'--input',input,'--rsp',rsp,'--set',RspFallback,'--emumode',emumode,'--set',exp,'--set',vsync,'--set',cxd4GFX,'--set',m64pGFX,'--set',IPLROMSetting,'--set',DiskSetting,'--set',NoCompiledJump,'--set',CountPerOp,'--set',CountPerOpDenomPot,'--set',SiDmaDuration,'--set',AutoStateSlotIncrement,'--set',CurrentStateSlot,'--set',SharedDataPath,'--set',ScreenshotPathSetting,'--set',SaveStatePathSetting,'--set',SaveSRAMPathSetting,'--set',RandomizeInterrupt,'--set',SaveDiskFormat,'--set',WaitForCPUHost,'--set',SupportCPUSemaphoreLock,'--set',DEFAULT_FREQUENCY,'--set',SWAP_CHANNELS,'--set',PRIMARY_BUFFER_TARGET,'--set',SECONDARY_BUFFER_SIZE,'--set',RESAMPLE,'--set',VOLUME_ADJUST,'--set',VOLUME_DEFAULT,'--set',AUDIO_SYNC,'--set',KbdMappingSlot0,'--set',KbdMappingSlot1,'--set',KbdMappingSlot2,'--set',KbdMappingSlot3,'--set',KbdMappingSlot4,'--set',KbdMappingSlot5,'--set',KbdMappingSlot6,'--set',KbdMappingSlot7,'--set',KbdMappingSlot8,'--set',KbdMappingSlot9,'--set',KbdMappingStop,'--set',KbdMappingFullscreen,'--set',KbdMappingSaveState,'--set',KbdMappingLoadState,'--set',KbdMappingIncrementSlot,'--set',KbdMappingReset,'--set',KbdMappingSpeedDown,'--set',KbdMappingSpeedUp,'--set',KbdMappingScreenshot,'--set',KbdMappingPause,'--set',KbdMappingMute,'--set',KbdMappingIncreaseVolume,'--set',KbdMappingDecreaseVolume,'--set',KbdMappingFastForward,'--set',KbdMappingFrameAdvance,'--set',KbdMappingGameshark],

controls = ['--set',JoyMappingStop,'--set',JoyMappingFullscreen,'--set',JoyMappingSaveState,'--set',JoyMappingLoadState,'--set',JoyMappingIncrementSlot,'--set',JoyMappingReset,'--set',JoyMappingSpeedDown,'--set',JoyMappingSpeedUp,'--set',JoyMappingScreenshot,'--set',JoyMappingPause,'--set',JoyMappingMute,'--set',JoyMappingIncreaseVolume,'--set',JoyMappingDecreaseVolume,'--set',JoyMappingFastForward,'--set',JoyMappingFrameAdvance,'--set',JoyMappingGameshark,'--set',mode1,'--set',mode2,'--set',mode3,'--set',mode4,'--set',plugin1,'--set',plugin2,'--set',plugin3,'--set',plugin4,'--set',plugged1,'--set',plugged2,'--set',plugged3,'--set',plugged4,'--set',name1,'--set',name2,'--set',name3,'--set',name4,'--set',device1,'--set',device2,'--set',device3,'--set',device4,'--set',gbROM1Setting,'--set',gbROM2Setting,'--set',gbROM3Setting,'--set',gbROM4Setting,'--set',gbRAM1Setting,'--set',gbRAM2Setting,'--set',gbRAM3Setting,'--set',gbRAM4Setting],

controller1 = ['--set',AButton1,'--set',BButton1,'--set',LTrig1,'--set',RTrig1,'--set',ZTrig1,'--set',Start1,'--set',DPadU1,'--set',DPadL1,'--set',DPadR1,'--set',DPadD1,'--set',CButtonU1,'--set',CButtonL1,'--set',CButtonR1,'--set',CButtonD1,'--set',MempakSwitch1,'--set',RumblepakSwitch1,'--set',XAxis1,'--set',YAxis1,'--set',analogdeadzone1,'--set',analogpeak1,'--set',mouse1,'--set',msensitivity1],

controller2 = ['--set',AButton2,'--set',BButton2,'--set',LTrig2,'--set',RTrig2,'--set',ZTrig2,'--set',Start2,'--set',DPadU2,'--set',DPadL2,'--set',DPadR2,'--set',DPadD2,'--set',CButtonU2,'--set',CButtonL2,'--set',CButtonR2,'--set',CButtonD2,'--set',MempakSwitch2,'--set',RumblepakSwitch2,'--set',XAxis2,'--set',YAxis2,'--set',analogdeadzone2,'--set',analogpeak2,'--set',mouse2,'--set',msensitivity2],

controller3 = ['--set',AButton3,'--set',BButton3,'--set',LTrig3,'--set',RTrig3,'--set',ZTrig3,'--set',Start3,'--set',DPadU3,'--set',DPadL3,'--set',DPadR3,'--set',DPadD3,'--set',CButtonU3,'--set',CButtonL3,'--set',CButtonR3,'--set',CButtonD3,'--set',MempakSwitch3,'--set',RumblepakSwitch3,'--set',XAxis3,'--set',YAxis3,'--set',analogdeadzone3,'--set',analogpeak3,'--set',mouse3,'--set',msensitivity3],

controller4 = ['--set',AButton4,'--set',BButton4,'--set',LTrig4,'--set',RTrig4,'--set',ZTrig4,'--set',Start4,'--set',DPadU4,'--set',DPadL4,'--set',DPadR4,'--set',DPadD4,'--set',CButtonU4,'--set',CButtonL4,'--set',CButtonR4,'--set',CButtonD4,'--set',MempakSwitch4,'--set',RumblepakSwitch4,'--set',XAxis4,'--set',YAxis4,'--set',analogdeadzone4,'--set',analogpeak4,'--set',mouse4,'--set',msensitivity4],

Angrylion = ['--set',Parallel,'--set',NumWorkers,'--set',BusyLoop,'--set',ViMode,'--set',ViInterpolation,'--set',ViWidescreen,'--set',ViHideOverscan,'--set',ViIntegerScaling,'--set',DpCompat],

GLideN64 = ['--set',threadedVideo,'--set',msaa,'--set',fxaa,'--set',aspectRatio,'--set',bufferSwapMode,'--set',useNativeResolutionFactor,'--set',bilinearMode,'--set',enableHalosRemoval,'--set',anisotropy,'--set',cache,'--set',txDump,'--set',txHiresEnable,'--set',txNoTextureFileStorage,'--set',EnableInaccurateTextureCoordinates,'--set',EnableDitheringPattern,'--set',EnableHiresNoiseDithering,'--set',DitheringQuantization,'--set',RDRAMImageDitheringMode,'--set',EnableLOD,'--set',EnableHWLighting,'--set',EnableCoverage,'--set',EnableClipping,'--set',EnableShadersStorage,'--set',EnableLegacyBlending,'--set',EnableHybridFilter,'--set',EnableCustomSettings,'--set',CorrectTexrectCoords,'--set',EnableNativeResTexrects,'--set',BackgroundsMode,'--set',EnableTexCoordBounds,'--set',EnableFBEmulation,'--set',EnableCopyAuxiliaryToRDRAM,'--set',EnableN64DepthCompare,'--set',ForceDepthBufferClear,'--set',DisableFBInfo,'--set',FBInfoReadColorChunk,'--set',FBInfoReadDepthChunk,'--set',EnableCopyColorToRDRAM,'--set',EnableCopyDepthToRDRAM,'--set',EnableCopyColorFromRDRAM,'--set',EnableCopyDepthToMainDepthBuffer,'--set',EnableOverscan,'--set',OverscanNtscTop,'--set',OverscanNtscLeft,'--set',OverscanNtscRight,'--set',OverscanNtscBottom,'--set',OverscanPalTop,'--set',OverscanPalLeft,'--set',OverscanPalRight,'--set',OverscanPalBottom,'--set',txFilterMode,'--set',txEnhancementMode,'--set',txDeposterize,'--set',txFilterIgnoreBG,'--set',txCacheSize,'--set',txHiresVramLimit,'--set',txHiresFullAlphaChannel,'--set',txHresAltCRC,'--set',txCacheCompression, '--set',txForce16bpp, '--set',txSaveCache,'--set',txPathSetting,'--set',txCachePathSetting,'--set',txDumpPathSetting,'--set',hkTexDump,'--set',hkHdTexReload,'--set',hkHdTexToggle,'--set',hkInaccurateTexCords,'--set',hkVsync,'--set',hkFBEmulation,'--set',hkN64DepthCompare,'--set',hkOsdVis,'--set',hkOsdFps,'--set',hkOsdPercent,'--set',hkOsdInternalResolution,'--set',hkOsdRenderingResolution,'--set',hkTexCoordBounds,'--set',hkNativeResTexrects,'--set',hkForceGammaCorrection,'--set',ForceGammaCorrection,'--set',GammaCorrectionLevel,'--set',fontSize,'--set',fontColor,'--set',ShowFPS,'--set',ShowVIS,'--set',ShowPercent,'--set',ShowInternalResolution,'--set',ShowRenderingResolution,'--set',ShowStatistics,'--set',CountersPos],

Parallel = ['--set',ParallelFullscreen,'--set',ParallelUpscaling,'--set',ParallelScreenWidth,'--set',ParallelScreenHeight,'--set',ParallelSuperscaledReads,'--set',ParallelSuperscaledDither,'--set',ParallelDeinterlace,'--set',ParallelIntegerScale,'--set',ParallelCropOverscan,'--set',ParallelVIAA,'--set',ParallelDivot,'--set',ParallelGammaDither,'--set',ParallelVIBilerp,'--set',ParallelVIDither,'--set',ParallelDownScale,'--set',ParallelNativeTextLOD,'--set',ParallelNativeTextRECT,'--set',ParallelWidescreenStretch],

Rice = ['--set',FrameBufferSetting,'--set',FrameBufferWriteBackControl,'--set',RenderToTexture,'--set',ScreenUpdateSetting,'--set',NormalAlphaBlender,'--set',FastTextureLoading,'--set',AccurateTextureMapping,'--set',InN64Resolution,'--set',SaveVRAM,'--set',DoubleSizeForSmallTxtrBuf,'--set',DefaultCombinerDisable,'--set',EnableHacks,'--set',WinFrameMode,'--set',FullTMEMEmulation,'--set',OpenGLVertexClipper,'--set',EnableSSE,'--set',SkipFrame,'--set',TexRectOnly,'--set',SmallTextureOnly,'--set',LoadHiResCRCOnly,'--set',LoadHiResTextures,'--set',DumpTexturesToFiles,'--set',RiceShowFPS,'--set',Mipmapping,'--set',FogMethod,'--set',ForceTextureFilter,'--set',TextureEnhancement,'--set',TextureEnhancementControl,'--set',TextureQuality,'--set',OpenGLDepthBufferSetting,'--set',RiceMultiSampling,'--set',ColorQuality,'--set',OpenGLRenderSetting,'--set',AnisotropicFiltering,'--set',ForcePolygonOffset,'--set',PolygonOffsetFactor,'--set',PolygonOffsetUnits],

Glide64MK2 = ['--set',Glide64VSync,'--set',wrpAntiAliasing,'--set',force_polygon_offset,'--set',polygon_offset_factor,'--set',polygon_offset_units,'--set',show_fps,'--set',clock,'--set',clock_24_hr,'--set',wrpFBO,'--set',wrpAnisotropic,'--set',ghq_fltr,'--set',ghq_cmpr,'--set',ghq_enht,'--set',ghq_hirs,'--set',ghq_enht_cmpr,'--set',ghq_enht_tile,'--set',ghq_enht_f16bpp,'--set',ghq_enht_gz,'--set',ghq_enht_nobg,'--set',ghq_hirs_cmpr,'--set',ghq_hirs_tile,'--set',ghq_hirs_f16bpp,'--set',ghq_hirs_gz,'--set',ghq_hirs_altcrc,'--set',ghq_cache_save,'--set',ghq_cache_size,'--set',ghq_hirs_let_texartists_fly,'--set',ghq_hirs_dump,'--set',alt_tex_size,'--set',use_sts1_only,'--set',force_calc_sphere,'--set',correct_viewport,'--set',increase_texrect_edge,'--set',decrease_fillrect_edge,'--set',texture_correction,'--set',pal230,'--set',force_microcheck,'--set',force_quad3d,'--set',clip_zmin,'--set',clip_zmax,'--set',fast_crc,'--set',adjust_aspect,'--set',zmode_compare_less,'--set',old_style_adither,'--set',n64_z_scale,'--set',optimize_texrect,'--set',ignore_aux_copy,'--set',hires_buf_clear,'--set',fb_read_alpha,'--set',useless_is_useless,'--set',fb_crc_mode,'--set',filtering,'--set',fog,'--set',buff_clear,'--set',swapmode,'--set',aspect,'--set',lodmode,'--set',fb_smart,'--set',fb_hires,'--set',fb_read_always,'--set',read_back_to_screen,'--set',detect_cpu_write,'--set',fb_get_info,'--set',fb_render],

graphics = [], cheats = [], activeCheats = '';

if(id('cheatList').innerHTML != ''){ // activate cheats
var cheatInputs = id('cheatList').querySelectorAll("input[type='checkbox']");
for (var i = 0; i < cheatInputs.length; i++){var cheatInput = cheatInputs[i];checkCheats(cheatInput)}
function checkCheats(cheatInput){if(cheatInput.checked){var id = cheatInput.id.replace('_','-');activeCheats += id + ','}}
cheats = ['--cheats',activeCheats]}

if(!input.includes('input-sdl')){controls = []; controller1 = []; controller2 = []; controller3 = []; controller4 = []} // reduce number of parameters
if(mode1 === 'Input-SDL-Control1[mode]=2' || (mode1 === 'Input-SDL-Control1[mode]=0' && !id('plugged1').checked))controller1 = []
if(mode2 === 'Input-SDL-Control2[mode]=2' || (mode2 === 'Input-SDL-Control2[mode]=0' && !id('plugged2').checked))controller2 = []
if(mode3 === 'Input-SDL-Control3[mode]=2' || (mode3 === 'Input-SDL-Control3[mode]=0' && !id('plugged3').checked))controller3 = []
if(mode4 === 'Input-SDL-Control4[mode]=2' || (mode4 === 'Input-SDL-Control4[mode]=0' && !id('plugged4').checked))controller4 = []
if(gfx.includes('angrylion'))graphics = Angrylion
if(gfx.includes('glide64mk2'))graphics = Glide64MK2
if(gfx.includes('GLideN64'))graphics = GLideN64
if(gfx.includes('parallel'))graphics = Parallel
if(gfx.includes('rice'))graphics = Rice

if(input.includes('input-gca')){ // write GameCube Adapter settings to file
try {writeGCA(gcaSettings)}
catch (e) {console.warn(e)}}

const parameters = core.concat(PIFROM,savestate,nospeedlimit,verbose,cheats,controls,controller1,controller2,controller3,controller4,graphics,filePath), // launch parameters
child = emuLaunch(parameters);

})
})