document.addEventListener('DOMContentLoaded', function() {

var cheatRadio,filePath,fileResult,RomPath,RomPathResult,txPath,txPathResult,txCachePath,txCachePathResult,txDumpPath,txDumpPathResult,IPLROM,IPLROMResult,Disk,DiskResult,ConfigPath,ConfigPathResult,ScreenshotPath,ScreenshotPathResult,SaveStatePath,SaveStatePathResult,SaveSRAMPath,SaveSRAMPathResult,gbROM1,gbROM1Result,gbROM2,gbROM2Result,gbROM3,gbROM3Result,gbROM4,gbROM4Result,gbRAM1,gbRAM1Result,gbRAM2,gbRAM2Result,gbRAM3,gbRAM3Result,gbRAM4,gbRAM4Result,

ext = isLinux ? '.so' : '.dll',

corelib = './mupen64plus' + ext,

recentFiles = [];

const textInputs = document.querySelectorAll('input[type=text]'),

regjoy = /axis|button|hat|\(|\)/g, regsplit = /\s*\n/, regradio = /^\s\s\s/g, regbox = /_.*/g, regc = /\:/g, regid = /^\d: |^\d\d: /,

keyScroll = {32:1,33:1,34:1,35:1,36:1,37:1,38:1,39:1,40:1}, /* spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40 */

keyCodes = {0:'',3:'break',8:'backspace',9:'tab',12:'clear',13:'enter',16:'shift',17:'ctrl',18:'alt',19:'pause',20:'caps lock',27:'escape',32:'spacebar',33:'page up',34:'page down',35:'end',36:'home',37:'left arrow',38:'up arrow',39:'right arrow',40:'down arrow',45:'insert',46:'delete',47:'help',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',96:'numpad 0',97:'numpad 1',98:'numpad 2',99:'numpad 3',100:'numpad 4',101:'numpad 5',102:'numpad 6',103:'numpad 7',104:'numpad 8',105:'numpad 9',106:'numpad *',107:'numpad +',109:'numpad -',111:'numpad /',112:'f1',113:'f2',114:'f3',115:'f4',116:'f5',117:'f6',118:'f7',119:'f8',120:'f9',121:'f10',122:'f11',123:'f12',144:'num lock'}, /* HTML DOM keycodes to text */

keySyms = {0:0,3:318,8:8,9:9,12:12,13:13,16:304,17:306,18:308,19:19,20:301,27:27,32:32,33:280,34:281,35:279,36:278,37:276,38:273,39:275,40:274,45:277,46:127,47:315,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,65:97,66:98,67:99,68:100,69:101,70:102,71:103,72:104,73:105,74:106,75:107,76:108,77:109,78:110,79:111,80:112,81:113,82:114,83:115,84:116,85:117,86:118,87:119,88:120,89:121,90:122,96:256,97:257,98:258,99:259,100:260,101:261,102:262,103:263,104:264,105:265,106:268,107:270,109:269,111:267,112:282,113:283,114:284,115:285,116:286,117:287,118:288,119:289,120:290,121:291,122:292,123:293,144:300}, /* HTML DOM keycodes to SDL keysyms for mupen64plus hotkeys */

hotKeys = {0:'',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z'}, /* HTML DOM keycodes to GLideN64 hotkeys */

n64Ext = ['*.n64','*.v64','*.z64'], nddExt = ['*.d64','*.ndd'], gbExt = ['*.gb','*.gbc'], saveExt = ['*.sav'], biosExt = ['*.bin','*.rom',...n64Ext],
n64 = ['n64','v64','z64'], ndd = ['d64','ndd'], gb = ['gb','gbc'], save = ['sav'], bios = ['bin','rom',...n64],

dragDrop = ['fileInput','IPLROM','Disk','gbROM1','gbROM2','gbROM3','gbROM4','gbRAM1','gbRAM2','gbRAM3','gbRAM4'],
core_main = ['core_rom','core_cheat','core_plugins','core_core','core_advanced','core_audio','core_directories','core_64dd'],
input_controller = ['input_controller1','input_controller2','input_controller3','input_controller4','input_gca','input_mouse'],
hk = ['hk_keyboard','hk_controller1','hk_controller2','hk_controller3','hk_controller4'],
gliden64_setting = ['gliden64_video','gliden64_overscan','gliden64_emulation','gliden64_framebuffer','gliden64_textures','gliden64_osd','gliden64_hotkeys'],
parallel_setting = ['parallel_video','parallel_emulation'],
rice_setting = ['rice_video','rice_emulation','rice_textures'],
glide_setting = ['glide_video','glide_emulation','glide_textures'],

n64_buttons = ['AButton1','AButton2','AButton3','AButton4','BButton1','BButton2','BButton3','BButton4','LTrig1','LTrig2','LTrig3','LTrig4','RTrig1','RTrig2','RTrig3','RTrig4','ZTrig1','ZTrig2','ZTrig3','ZTrig4','Start1','Start2','Start3','Start4','DPadU1','DPadU2','DPadU3','DPadU4','DPadD1','DPadD2','DPadD3','DPadD4','DPadL1','DPadL2','DPadL3','DPadL4','DPadR1','DPadR2','DPadR3','DPadR4','StickU1','StickU2','StickU3','StickU4','StickD1','StickD2','StickD3','StickD4','StickL1','StickL2','StickL3','StickL4','StickR1','StickR2','StickR3','StickR4','CButtonU1','CButtonU2','CButtonU3','CButtonU4','CButtonD1','CButtonD2','CButtonD3','CButtonD4','CButtonL1','CButtonL2','CButtonL3','CButtonL4','CButtonR1','CButtonR2','CButtonR3','CButtonR4','MempakSwitch1','MempakSwitch2','MempakSwitch3','MempakSwitch4','RumblepakSwitch1','RumblepakSwitch2','RumblepakSwitch3','RumblepakSwitch4'],

mappingArray = ['a','b','dpdown','dpleft','dpright','dpup','leftshoulder','lefttrigger','leftx','lefty','rightshoulder','righttrigger','rightx','righty','start','x','y'],

gliden64_hotkeys = ['hkTexDump','hkStrongCRC','hkHdTexReload','hkHdTexToggle','hkInaccurateTexCords','hkVsync','hkFBEmulation','hkN64DepthCompare','hkOsdVis','hkOsdFps','hkOsdPercent','hkOsdInternalResolution','hkOsdRenderingResolution','hkTexCoordBounds','hkNativeResTexrects','hkForceGammaCorrection'],

m64p_hotkeys = ['KbdMappingStop','KbdMappingSlot0','KbdMappingSlot1','KbdMappingSlot2','KbdMappingSlot3','KbdMappingSlot4','KbdMappingSlot5','KbdMappingSlot6','KbdMappingSlot7','KbdMappingSlot8','KbdMappingSlot9','KbdMappingFullscreen','KbdMappingSaveState','KbdMappingLoadState','KbdMappingIncrementSlot','KbdMappingReset','KbdMappingSpeedDown','KbdMappingSpeedUp','KbdMappingScreenshot','KbdMappingPause','KbdMappingMute','KbdMappingIncreaseVolume','KbdMappingDecreaseVolume','KbdMappingFastForward','KbdMappingSpeedLimiterToggle','KbdMappingFrameAdvance','KbdMappingGameshark'],

m64p_joykeys = [
'JoyMappingStop1','JoyMappingFullscreen1','JoyMappingSaveState1','JoyMappingLoadState1','JoyMappingIncrementSlot1','JoyMappingReset1','JoyMappingSpeedDown1','JoyMappingSpeedUp1','JoyMappingScreenshot1','JoyMappingPause1','JoyMappingMute1','JoyMappingIncreaseVolume1','JoyMappingDecreaseVolume1','JoyMappingFastForward1','JoyMappingFrameAdvance1','JoyMappingGameshark1',
'JoyMappingStop2','JoyMappingFullscreen2','JoyMappingSaveState2','JoyMappingLoadState2','JoyMappingIncrementSlot2','JoyMappingReset2','JoyMappingSpeedDown2','JoyMappingSpeedUp2','JoyMappingScreenshot2','JoyMappingPause2','JoyMappingMute2','JoyMappingIncreaseVolume2','JoyMappingDecreaseVolume2','JoyMappingFastForward2','JoyMappingFrameAdvance2','JoyMappingGameshark2',
'JoyMappingStop3','JoyMappingFullscreen3','JoyMappingSaveState3','JoyMappingLoadState3','JoyMappingIncrementSlot3','JoyMappingReset3','JoyMappingSpeedDown3','JoyMappingSpeedUp3','JoyMappingScreenshot3','JoyMappingPause3','JoyMappingMute3','JoyMappingIncreaseVolume3','JoyMappingDecreaseVolume3','JoyMappingFastForward3','JoyMappingFrameAdvance3','JoyMappingGameshark3',
'JoyMappingStop4','JoyMappingFullscreen4','JoyMappingSaveState4','JoyMappingLoadState4','JoyMappingIncrementSlot4','JoyMappingReset4','JoyMappingSpeedDown4','JoyMappingSpeedUp4','JoyMappingScreenshot4','JoyMappingPause4','JoyMappingMute4','JoyMappingIncreaseVolume4','JoyMappingDecreaseVolume4','JoyMappingFastForward4','JoyMappingFrameAdvance4','JoyMappingGameshark4'],

defaultPlugins = ['mupen64plus-audio-sdl','mupen64plus-input-sdl','mupen64plus-input-gca','mupen64plus-input-raphnetraw','mupen64plus-rsp-hle','mupen64plus-rsp-parallel','mupen64plus-rsp-cxd4','mupen64plus-rsp-z64','mupen64plus-video-GLideN64','mupen64plus-video-angrylion-plus','mupen64plus-video-parallel','mupen64plus-video-rice','mupen64plus-video-glide64mk2'],

overscan = ['OverscanNtscTop','OverscanNtscLeft','OverscanNtscRight','OverscanNtscBottom','OverscanPalTop','OverscanPalLeft','OverscanPalRight','OverscanPalBottom'],

overscan_parallel = ['ParallelCropOverscanTop','ParallelCropOverscanLeft','ParallelCropOverscanRight','ParallelCropOverscanBottom'],

sliders = [...overscan,'SiDmaDuration','VOLUME_ADJUST','VOLUME_DEFAULT','AnalogDeadzone1','AnalogDeadzone2','AnalogDeadzone3','AnalogDeadzone4','AnalogPeak1','AnalogPeak2','AnalogPeak3','AnalogPeak4','control_stick_deadzone','control_stick_sensitivity','c_stick_deadzone','trigger_threshold','MouseSensitivityX','MouseSensitivityY','NumWorkers','GammaCorrectionLevel','txCacheSize','txHiresVramLimit','fontSize',...overscan_parallel,'ParallelVerticalStretch','PolygonOffsetFactor','PolygonOffsetUnits','polygon_offset_factor','polygon_offset_units','ghq_cache_size'],

dropdowns = [
'emumode','resolution','CountPerOp','CountPerOpDenomPot','CurrentStateSlot', /* mupen64plus */
'gfx','audio','input','rsp','RspFallback', /* mupen64plus plugins */
'plugin1','plugin2','plugin3','plugin4','c1','c2','c3','c4','mb1','mb2','mb3', /* mupen64plus-input */
'PRIMARY_BUFFER_TARGET','RESAMPLE', /* mupen64plus-audio */
'a','b','x','y','start','z','l','r','d_pad_left','d_pad_right','d_pad_down','d_pad_up','c_stick_left','c_stick_right','c_stick_down','c_stick_up', /* mupen64plus-input-gca */
'msaa','aspectRatio','bufferSwapMode','CountersPos','useNativeResolutionFactor','anisotropy','cache','RDRAMImageDitheringMode','CorrectTexrectCoords','EnableNativeResTexrects','BackgroundsMode','EnableN64DepthCompare','EnableCopyColorToRDRAM','EnableCopyDepthToRDRAM','txFilterMode','txEnhancementMode', /* GLideN64 */
'ViMode','ViInterpolation','DpCompat', /* Angrylion-Plus */
'ParallelUpscaling', /* Parallel */
'FrameBufferWriteBackControl','RenderToTexture','ScreenUpdateSetting','Mipmapping','ForceTextureFilter','RiceMultiSampling','AnisotropicFiltering', /* Rice */
'show_fps','ghq_fltr','ghq_enht','alt_tex_size','use_sts1_only','force_calc_sphere','correct_viewport','increase_texrect_edge','decrease_fillrect_edge','texture_correction','pal230','force_microcheck','force_quad3d','clip_zmin','clip_zmax','fast_crc','adjust_aspect','zmode_compare_less','old_style_adither','n64_z_scale','optimize_texrect','ignore_aux_copy','hires_buf_clear','fb_read_alpha','useless_is_useless','fb_crc_mode','filtering','fog','buff_clear','swapmode','aspect','lodmode','fb_smart','fb_hires','fb_read_always','read_back_to_screen','detect_cpu_write','fb_get_info','fb_render' /* Glide64 MK2 */];



if(isMac){ext = '.dylib';corelib = './mupen64plus' + ext}; /* macOS */
if(!isLinux)id('master_volume').style.display = 'none'; /* hide Linux exclusive settings */



const pluginFiles = pluginDir.filter(name => name.includes(ext)), pluginNames = []; /* add optional and unknown plugins */
pluginFiles.forEach(name => pluginNames.push(name.replace(/\..*/,'')));

const [dirSet,defaultSet] = [new Set(pluginNames), new Set(defaultPlugins)],
newPlugins = [...dirSet].filter(name => !defaultSet.has(name));

newPlugins.forEach(name => addPlugin(name));

function addPlugin(name){
var newPlugin = document.createElement('option');
newPlugin.value = name;
newPlugin.textContent = name.replace(/mupen64plus-audio-|mupen64plus-input-|mupen64plus-rsp-|mupen64plus-video-/,'');
if(name != ''){
if(name.includes('mupen64plus-audio-')){id('audioCustom').appendChild(newPlugin);id('audioCustom').style.display = 'block'}
else if(name.includes('mupen64plus-input-')){id('inputCustom').appendChild(newPlugin);id('inputCustom').style.display = 'block'}
else if(name.includes('mupen64plus-rsp-')){id('rspCustom').appendChild(newPlugin);id('rspCustom').style.display = 'block'}
else if(name.includes('mupen64plus-video-')){
if(newPlugin.textContent === 'rt64'){newPlugin.textContent = 'RT64';id('gfxModern').appendChild(newPlugin)}
else{id('gfxCustom').appendChild(newPlugin);id('gfxCustom').style.display = 'block'}}}}



['c1','c2','c3','c4'].forEach(c => { /* initialize SDL device dropdowns */
if(localStorage.getItem(c+'Element') != null)id(c).innerHTML = localStorage.getItem(c+'Element')
id('refresh'+c).addEventListener('click', function(){refresh(id(c))})})

function refresh(drop){ /* update SDL device dropdown */
Array.from(drop.getElementsByTagName('option')).forEach(opt => {if(opt.textContent != 'Keyboard')opt.remove()})
let list = jsRefresh();
var datasplit = list.split(regsplit);
datasplit.forEach(device => update(device));

function update(device){
if(device === '' || device === 'No joysticks were found' || device === null || device === undefined)return
localStorage.removeItem(drop.id)
var newDevice = document.createElement('option');
newDevice.value = newDevice.textContent = device;
drop.appendChild(newDevice)}

localStorage.setItem(drop.id+'Element',(drop.innerHTML))}



['rumble1','rumble2','rumble3','rumble4'].forEach(rumble => {id(rumble).addEventListener('click', function(){testRumble(id(rumble))})}) /* test rumble */

function testRumble(rumble){
var padId, tId;
if(rumble.id.includes(1))tId = id('c1')
if(rumble.id.includes(2))tId = id('c2')
if(rumble.id.includes(3))tId = id('c3')
if(rumble.id.includes(4))tId = id('c4')
padId = tId.value.substring(0,2).replace(/\:/g,'');
jsRumble(padId)}



['auto1','auto2','auto3','auto4'].forEach(auto => {id(auto).addEventListener('click', function(){autoConfig(id(auto))})}) /* gamepad auto config */

function autoConfig(auto){
var padId, cId, tId;
if(auto.id.includes(1)){tId = id('c1');cId = 1}
if(auto.id.includes(2)){tId = id('c2');cId = 2}
if(auto.id.includes(3)){tId = id('c3');cId = 3}
if(auto.id.includes(4)){tId = id('c4');cId = 4}
padId = tId.value.substring(0,2).replace(/\:/g,'')
var aId = 'AButton' + cId + 'c',
bId = 'CButtonD' + cId + 'cb',
dpdId = 'DPadD' + cId + 'c',
dplId = 'DPadL' + cId + 'c',
dprId = 'DPadR' + cId + 'c',
dpuId = 'DPadU' + cId + 'c',
lsId = 'LTrig' + cId + 'c',
ltId = 'ZTrig' + cId + 'c',
ldId = 'StickD' + cId + 'c',
llId = 'StickL' + cId + 'c',
lrId = 'StickR' + cId + 'c',
luId = 'StickU' + cId + 'c',
rsId = 'RTrig' + cId + 'c',
rtId = 'RTrig' + cId + 'cb',
rdId = 'CButtonD' + cId + 'c',
rlId = 'CButtonL' + cId + 'c',
rrId = 'CButtonR' + cId + 'c',
ruId = 'CButtonU' + cId + 'c',
sId = 'Start' + cId + 'c',
xId = 'BButton' + cId + 'c',
yId = 'CButtonL' + cId + 'cb';
let mapping = jsMapping(padId);
if(mapping === '' || mapping === null || mapping === undefined)return
id('clear_controls'+cId).click()
mapping = '"' + mapping.replace(/hint:(.*):(.*)/,'hint:$1$2').replace(/([^,]*),([^,]*),/,'guid:$1,name:$2,').replace(/\:/g,'":"').replace(/,/g,'","').replace(/\r|\n/g,'') + '"'
mapping = JSON.parse('{' + mapping.replace(/,""/,'') + '}')

mappingArray.forEach(btn => {
if(mapping[btn] != undefined){
var cBtn = mapping[btn].replace(/b(.*)/,'button($1)').replace(/(.)a(\d*)/,'axis($2$1)').replace(/a(?!xis)(\d*)/,'axis($1+)').replace(/h(.)\.(.)/,'hat($1 $2)').replace('hat(0 1)','hat(0 Up)').replace('hat(0 2)','hat(0 Right)').replace('hat(0 4)','hat(0 Down)').replace('hat(0 8)','hat(0 Left)');
if(btn === 'a'){id(aId).value = cBtn;localStorage.setItem(aId,cBtn)}
if(btn === 'b'){id(bId).value = cBtn;localStorage.setItem(bId,cBtn)}
if(btn === 'dpdown'){id(dpdId).value = cBtn;localStorage.setItem(dpdId,cBtn)}
if(btn === 'dpleft'){id(dplId).value = cBtn;localStorage.setItem(dplId,cBtn)}
if(btn === 'dpright'){id(dprId).value = cBtn;localStorage.setItem(dprId,cBtn)}
if(btn === 'dpup'){id(dpuId).value = cBtn;localStorage.setItem(dpuId,cBtn)}
if(btn === 'leftshoulder'){id(lsId).value = cBtn;localStorage.setItem(lsId,cBtn)}
if(btn === 'lefttrigger'){id(ltId).value = cBtn;localStorage.setItem(ltId,cBtn)}
if(btn === 'leftx'){id(llId).value = cBtn.replace('+','-');localStorage.setItem(llId,cBtn.replace('+','-'));id(lrId).value = cBtn;localStorage.setItem(lrId,cBtn)}
if(btn === 'lefty'){id(luId).value = cBtn.replace('+','-');localStorage.setItem(luId,cBtn.replace('+','-'));id(ldId).value = cBtn;localStorage.setItem(ldId,cBtn)}
if(btn === 'rightshoulder'){id(rsId).value = cBtn;localStorage.setItem(rsId,cBtn)}
if(btn === 'righttrigger'){id(rtId).value = cBtn;localStorage.setItem(rtId,cBtn)}
if(btn === 'rightx'){id(rlId).value = cBtn.replace('+','-');localStorage.setItem(rlId,cBtn.replace('+','-'));id(rrId).value = cBtn;localStorage.setItem(rrId,cBtn)}
if(btn === 'righty'){id(ruId).value = cBtn.replace('+','-');localStorage.setItem(ruId,cBtn.replace('+','-'));id(rdId).value = cBtn;localStorage.setItem(rdId,cBtn)}
if(btn === 'start'){id(sId).value = cBtn;localStorage.setItem(sId,cBtn)}
if(btn === 'x'){id(xId).value = cBtn;localStorage.setItem(xId,cBtn)}
if(btn === 'y'){id(yId).value = cBtn;localStorage.setItem(yId,cBtn)}
}})}



function clear_controls(n){n64_buttons.forEach(n64_button => {id('clear'+n64_button.replace(/1|2|3|4/,n)).click()})} /* clear all inputs */
id('clear_controls1').addEventListener('click', function(){clear_controls(1)})
id('clear_controls2').addEventListener('click', function(){clear_controls(2)})
id('clear_controls3').addEventListener('click', function(){clear_controls(3)})
id('clear_controls4').addEventListener('click', function(){clear_controls(4)})

id('restore_hotkeys').addEventListener('click', function(){ /* restore default keyboard hotkeys */
m64p_hotkeys.forEach(m64p_hotkey => {
var box = id(m64p_hotkey);
box.value = box.dataset.restore;
box.dataset.key = keySyms[box.dataset.restore];
localStorage.removeItem(m64p_hotkey)})})

function clear_joymappings(n){m64p_joykeys.forEach(m64p_joykey => {id('clear'+m64p_joykey.replace(/1|2|3|4/,n)).click()})} /* clear all joypad hotkeys */
id('clear_joymappings1').addEventListener('click', function(){clear_joymappings(1)})
id('clear_joymappings2').addEventListener('click', function(){clear_joymappings(2)})
id('clear_joymappings3').addEventListener('click', function(){clear_joymappings(3)})
id('clear_joymappings4').addEventListener('click', function(){clear_joymappings(4)})

id('clear_hk_gliden64').addEventListener('click', function(){gliden64_hotkeys.forEach(hk => {id('clear'+hk).click()})}) /* clear GLideN64 hotkeys */
id('reset_overscan').addEventListener('click', function(){overscan.forEach(os => {id('reset'+os).click()})}) /* reset GLideN64 overscan values */
id('reset_overscan_parallel').addEventListener('click', function(){overscan_parallel.forEach(os => {id('reset'+os).click()})}) /* reset Parallel overscan values */



n64_buttons.forEach(n64_button => { /* controller input */
var n64_button_c = n64_button+'c',
n64_button_cb = n64_button+'cb',
box = id(n64_button),
box_c = id(n64_button_c),
box_cb = id(n64_button_cb);

box_c.addEventListener('click', function(){jstest(box_c)}) /* joystick input */
box_cb.addEventListener('click', function(){jstest(box_cb)})
if(localStorage.getItem(n64_button_c) != null)box_c.value = localStorage.getItem(n64_button_c)
if(localStorage.getItem(n64_button_cb) != null)box_cb.value = localStorage.getItem(n64_button_cb)

if(localStorage.getItem(n64_button) != null){ /* keyboard input */
box.value = keyCodes[localStorage.getItem(n64_button)];
box.dataset.key = keySyms[localStorage.getItem(n64_button)]}
box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
box.value = keyCodes[e.keyCode];
box.dataset.key = keySyms[e.keyCode];
localStorage.setItem(n64_button, e.keyCode)}})

id('clear'+n64_button).addEventListener('click', function(){box.value = box_c.value = box_cb.value = '';box.dataset.key = '0';localStorage.removeItem(n64_button);localStorage.removeItem(n64_button_c);localStorage.removeItem(n64_button_cb)})})

gliden64_hotkeys.forEach(gliden64_hotkey => { /* GLideN64 hotkeys */
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

m64p_hotkeys.forEach(m64p_hotkey => { /* mupen64plus keyboard hotkeys */
var box = id(m64p_hotkey);
id('clear'+m64p_hotkey).addEventListener('click', function(){
box.value = '';
box.dataset.key = '0';
localStorage.setItem(m64p_hotkey, '0')})
if(localStorage.getItem(m64p_hotkey) != null){
box.value = keyCodes[localStorage.getItem(m64p_hotkey)];
box.dataset.key = keySyms[localStorage.getItem(m64p_hotkey)]}
box.addEventListener('keyup', function(e){
if(keyCodes[e.keyCode] != undefined){
box.value = keyCodes[e.keyCode];
box.dataset.key = keySyms[e.keyCode];
localStorage.setItem(m64p_hotkey, e.keyCode)}})})

m64p_joykeys.forEach(joykey => { /* mupen64plus joystick hotkeys */
var box = id(joykey);
box.addEventListener('click', function(){jstest(box)})
if(localStorage.getItem(joykey) != null)box.value = localStorage.getItem(joykey)
id('clear'+joykey).addEventListener('click', function(){box.value = '';localStorage.removeItem(joykey)})})

dropdowns.forEach(dropdown => { /* dropdown inputs */
var drop = id(dropdown);
if(localStorage.getItem(dropdown) != null)drop.value = localStorage.getItem(dropdown)
if(drop.selectedIndex < 0){localStorage.removeItem(dropdown);drop.selectedIndex = 0}
drop.addEventListener('change', function(){localStorage.setItem(dropdown, drop.value)})})

id('NumWorkers').max = navigator.hardwareConcurrency;
sliders.forEach(slider => { /* slider inputs */
var slider_input = id(slider),
slider_reset = id('reset'+slider),
slider_text = id(slider+'Text'),
slider_value = slider_reset.dataset.value,
digits = 0;
if(slider_input.step.includes('.'))digits=2;

slider_reset.addEventListener('click', function(){slider_input.value = slider_value;localStorage.removeItem(slider);slider_text.textContent = parseFloat(slider_input.value).toFixed(digits)})
if(localStorage.getItem(slider) != null){slider_input.value = localStorage.getItem(slider);slider_text.textContent = parseFloat(slider_input.value).toFixed(digits)}
slider_input.addEventListener('input', function(){localStorage.setItem(slider, slider_input.value);slider_text.textContent = parseFloat(slider_input.value).toFixed(digits)})})



function rspDropdownDisable(){ /* disable or hide inputs */
if(id('rsp').value.includes('rsp-hle')){id('RspFallback').disabled = false;id('rspGFX').disabled = true;id('rspJPG').disabled = false}
else{id('RspFallback').disabled = true;id('rspGFX').disabled = false;id('rspJPG').disabled = true}}
id('rsp').addEventListener('change', rspDropdownDisable)
rspDropdownDisable()

function dynarecDisable(){
if(id('emumode').value === '2'){id('newDynarec').disabled = false}
else{id('newDynarec').disabled = true}}
id('emumode').addEventListener('change', dynarecDisable)
dynarecDisable()

function EnableFBEmulationDisable(){
if(id('EnableFBEmulation').checked){id('EnableCopyColorFromRDRAM').disabled = id('EnableCopyDepthToMainDepthBuffer').disabled = id('EnableCopyAuxiliaryToRDRAM').disabled = id('ForceDepthBufferClear').disabled = id('FBInfoReadColorChunk').disabled = id('FBInfoReadDepthChunk').disabled = false}
else{id('EnableCopyColorFromRDRAM').disabled = id('EnableCopyDepthToMainDepthBuffer').disabled = id('EnableCopyAuxiliaryToRDRAM').disabled = id('ForceDepthBufferClear').disabled = id('FBInfoReadColorChunk').disabled = id('FBInfoReadDepthChunk').disabled = true}}
id('EnableFBEmulation').addEventListener('change', EnableFBEmulationDisable)
EnableFBEmulationDisable()

function msaaDisable(){
if(id('fxaa').checked || id('EnableN64DepthCompare').value != 0){id('msaa').disabled = true}
else{id('msaa').disabled = false}}
id('fxaa').addEventListener('change', msaaDisable)
id('EnableN64DepthCompare').addEventListener('change', msaaDisable)
msaaDisable()

function ForceGammaCorrectionDisable(){
if(id('ForceGammaCorrection').checked){id('GammaCorrectionLevel').disabled = false}
else{id('GammaCorrectionLevel').disabled = true}}
id('ForceGammaCorrection').addEventListener('change', ForceGammaCorrectionDisable)
ForceGammaCorrectionDisable()

function EnableOverscanDisable(){
if(id('EnableOverscan').checked){overscan.forEach(os => {id(os).disabled = false})}
else{overscan.forEach(os => {id(os).disabled = true})}}
id('EnableOverscan').addEventListener('change', EnableOverscanDisable)
EnableOverscanDisable()

function EnableParallelOverscanDisable(){
if(id('ParallelCropOverscanEnable').checked){overscan_parallel.forEach(os => {id(os).disabled = false})}
else{overscan_parallel.forEach(os => {id(os).disabled = true})}}
id('ParallelCropOverscanEnable').addEventListener('change', EnableOverscanDisable)
EnableParallelOverscanDisable()

function txNoTextureFileStorageDisable(){
if(id('txNoTextureFileStorage').checked){id('cache').disabled = true}
else{id('cache').disabled = false}}
id('txNoTextureFileStorage').addEventListener('change', txNoTextureFileStorageDisable)
txNoTextureFileStorageDisable()

function txHiresEnableDisable(){
if(id('txHiresEnable').checked){id('txFilterMode').disabled = id('txEnhancementMode').disabled = id('txCacheSize').disabled = id('txDeposterize').disabled = id('txFilterIgnoreBG').disabled = true;
id('txDump').disabled = id('txStrongCRC').disabled = id('txHiresFullAlphaChannel').disabled = id('txHresAltCRC').disabled = id('txCacheCompression').disabled = id('txSaveCache').disabled = id('txNoTextureFileStorage').disabled = false}
else{id('txFilterMode').disabled = id('txEnhancementMode').disabled = id('txCacheSize').disabled = id('txDeposterize').disabled = id('txFilterIgnoreBG').disabled = false;
id('txDump').disabled = id('txStrongCRC').disabled = id('txHiresFullAlphaChannel').disabled = id('txHresAltCRC').disabled = id('txCacheCompression').disabled = id('txSaveCache').disabled = id('txNoTextureFileStorage').disabled = true}}
id('txHiresEnable').addEventListener('change', txHiresEnableDisable)
txHiresEnableDisable()

function NumWorkersDisable(){
if(id('Parallel').checked){id('NumWorkers').disabled = false}
else{id('NumWorkers').disabled = true}}
id('Parallel').addEventListener('change', NumWorkersDisable)
NumWorkersDisable()

function ForcePolygonOffsetDisable(){
if(id('ForcePolygonOffset').checked){id('PolygonOffsetFactor').disabled = id('PolygonOffsetUnits').disabled = false}
else{id('PolygonOffsetFactor').disabled = id('PolygonOffsetUnits').disabled = true}}
id('ForcePolygonOffset').addEventListener('change', ForcePolygonOffsetDisable)
ForcePolygonOffsetDisable()

function force_polygon_offsetDisable(){
if(id('force_polygon_offset').checked){id('polygon_offset_factor').disabled = id('polygon_offset_units').disabled = false}
else{id('polygon_offset_factor').disabled = id('polygon_offset_units').disabled = true}}
id('force_polygon_offset').addEventListener('change', force_polygon_offsetDisable)
force_polygon_offsetDisable()

function clockDisable(){
if(id('clock').checked){id('clock_24_hr').disabled = false}
else{id('clock_24_hr').disabled = true}}
id('clock').addEventListener('change', clockDisable)
clockDisable()

function ghq_hirsDisable(){
if(id('ghq_hirs').checked){
id('ghq_fltr').disabled = id('ghq_enht').disabled = id('ghq_cache_size').disabled = id('ghq_enht_cmpr').disabled = id('ghq_enht_tile').disabled = id('ghq_enht_f16bpp').disabled = id('ghq_enht_gz').disabled = id('ghq_enht_nobg').disabled = true;
id('ghq_hirs_cmpr').disabled = id('ghq_hirs_tile').disabled = id('ghq_hirs_f16bpp').disabled = id('ghq_hirs_gz').disabled = id('ghq_hirs_altcrc').disabled = id('ghq_hirs_let_texartists_fly').disabled = false}
else{id('ghq_fltr').disabled = id('ghq_enht').disabled = id('ghq_cache_size').disabled = id('ghq_enht_cmpr').disabled = id('ghq_enht_tile').disabled = id('ghq_enht_f16bpp').disabled = id('ghq_enht_gz').disabled = id('ghq_enht_nobg').disabled = false;
id('ghq_hirs_cmpr').disabled = id('ghq_hirs_tile').disabled = id('ghq_hirs_f16bpp').disabled = id('ghq_hirs_gz').disabled = id('ghq_hirs_altcrc').disabled = id('ghq_hirs_let_texartists_fly').disabled = true}}
id('ghq_hirs').addEventListener('change', ghq_hirsDisable)
ghq_hirsDisable()

function c1Disable(){
if(id('c1').value === 'Keyboard'){id('AnalogDeadzone1').disabled = id('AnalogPeak1').disabled = true}
else{id('AnalogDeadzone1').disabled = id('AnalogPeak1').disabled = false}}
id('c1').addEventListener('change', c1Disable)
c1Disable()

function c2Disable(){
if(id('c2').value === 'Keyboard'){id('AnalogDeadzone2').disabled = id('AnalogPeak2').disabled = true}
else{id('AnalogDeadzone2').disabled = id('AnalogPeak2').disabled = false}}
id('c2').addEventListener('change', c2Disable)
c2Disable()

function c3Disable(){
if(id('c3').value === 'Keyboard'){id('AnalogDeadzone3').disabled = id('AnalogPeak3').disabled = true}
else{id('AnalogDeadzone3').disabled = id('AnalogPeak3').disabled = false}}
id('c3').addEventListener('change', c3Disable)
c3Disable()

function c4Disable(){
if(id('c4').value === 'Keyboard'){id('AnalogDeadzone4').disabled = id('AnalogPeak4').disabled = true}
else{id('AnalogDeadzone4').disabled = id('AnalogPeak4').disabled = false}}
id('c4').addEventListener('change', c4Disable)
c4Disable()

function c1_controlsDisable(){
if(!id('plugged1').checked){id('c1_controls').classList.add('hide')}
else{id('c1_controls').classList.remove('hide')}}
id('plugged1').addEventListener('change', c1_controlsDisable)
c1_controlsDisable()

function c2_controlsDisable(){
if(!id('plugged2').checked){id('c2_controls').classList.add('hide')}
else{id('c2_controls').classList.remove('hide')}}
id('plugged2').addEventListener('change', c2_controlsDisable)
c2_controlsDisable()

function c3_controlsDisable(){
if(!id('plugged3').checked){id('c3_controls').classList.add('hide')}
else{id('c3_controls').classList.remove('hide')}}
id('plugged3').addEventListener('change', c3_controlsDisable)
c3_controlsDisable()

function c4_controlsDisable(){
if(!id('plugged4').checked){id('c4_controls').classList.add('hide')}
else{id('c4_controls').classList.remove('hide')}}
id('plugged4').addEventListener('change', c4_controlsDisable)
c4_controlsDisable()

function transferPak1Disable(){
if(id('plugin1').value === '4'){id('transferPak1').classList.remove('hide')}
else{id('transferPak1').classList.add('hide')}}
id('plugin1').addEventListener('change', transferPak1Disable)
transferPak1Disable()

function transferPak2Disable(){
if(id('plugin2').value === '4'){id('transferPak2').classList.remove('hide')}
else{id('transferPak2').classList.add('hide')}}
id('plugin2').addEventListener('change', transferPak2Disable)
transferPak2Disable()

function transferPak3Disable(){
if(id('plugin3').value === '4'){id('transferPak3').classList.remove('hide')}
else{id('transferPak3').classList.add('hide')}}
id('plugin3').addEventListener('change', transferPak3Disable)
transferPak3Disable()

function transferPak4Disable(){
if(id('plugin4').value === '4'){id('transferPak4').classList.remove('hide')}
else{id('transferPak4').classList.add('hide')}}
id('plugin4').addEventListener('change', transferPak4Disable)
transferPak4Disable()

function disableVolumeDefault(){
if(id('VOLUME_CONTROL_TYPE').checked){id('VOLUME_DEFAULT').disabled = true}
else{id('VOLUME_DEFAULT').disabled = false}}
id('VOLUME_CONTROL_TYPE').addEventListener('change', disableVolumeDefault)
disableVolumeDefault()

function hideCheats(){
if(id('cheatList').textContent!=''){id('cheatList').textContent=''}}
id('hideCheats').addEventListener('click', function(){hideCheats()})



if(localStorage.getItem('recentFiles') != null)recentFiles = JSON.parse(localStorage.getItem('recentFiles'))

function recentFilesUpdate(){ /* recent N64 ROM files */
id('optionDefault').selected = true;
recentFiles.forEach(rf => {var i = recentFiles.indexOf(rf);if(recentFiles[i] != null){id('option'+i).value = recentFiles[i];id('option'+i).textContent = i + 1 + '. ' + recentFiles[i]}})}
recentFilesUpdate()

id('recent').addEventListener('change', function(){
if(id('recent').value != null && id('recent').value != ''){filePath = id('recent').value;id('fileText').textContent = filePath;localStorage.setItem('filePath', filePath);hideCheats()}})

id('clearRecent').addEventListener('click', function(){
hideCheats();
filePath = testROM;
localStorage.removeItem('filePath');
id('fileText').textContent = filePath;
recentFiles = [];
localStorage.removeItem('recentFiles');
id('optionDefault').selected = true;
Array.from(id('recent').getElementsByTagName('option')).forEach(opt => {if(opt.textContent != 'Recent Files'){opt.value = opt.textContent = ''}})})



id('cheatInfo').addEventListener('click', function(){ /* print ROM info */
const parameters = ['--corelib',corelib,'--datadir','data','--cheats','list',filePath],
child = showCheats(parameters);
if(child.includes('AttachCoreLib() Error:') || child === ''){id('cheatList').textContent = 'Failed to open Mupen64Plus.';return}
if(child.includes("couldn't open ROM file")){id('cheatList').textContent = 'Unable to open ROM file.';return}
var string = child.replace(/^((?!Cheat\:.*).)*$/gm,''),
filter = string.replace(/Cheat\:\s|Core\:\s/gm,''),
print = filter.replace(/\r/gm,'');
id('cheatPrint').innerHTML = 'crc ' + print})

id('listCheats').addEventListener('click', function(){ /* generate cheat list */
var cheats = '';
id('cheatList').textContent = '';
const parameters = ['--corelib',corelib,'--datadir','data','--cheats','list',filePath],
child = showCheats(parameters);
if(child.includes('AttachCoreLib() Error:') || child === ''){id('cheatList').textContent = 'Failed to open Mupen64Plus.';return}
if(child.includes("couldn't open ROM file")){id('cheatList').textContent = 'Unable to open ROM file.';return}
var datastring = child.replace(/^((?!UI-Console\:\s\s\s\s*\d).)*$/gm,''),
datafilter = datastring.replace(/UI-Console\:\s\s\s\s/gm,''),
dataremove = datafilter.replace(/\r/gm,''),
datasplit = dataremove.split(regsplit);
datasplit.forEach(e => cheat(e));
function cheat(e){if(e != ''){
var cheatCheckbox = e.replace(/\:.*/g,'');
if(!e.match(regradio))cheatRadio = cheatCheckbox
if(e.match(regradio))cheatCheckbox = cheatCheckbox.replace(regradio,cheatRadio + '_')
cheats += "<input id='" + cheatCheckbox + "' type='checkbox'><label for='" + cheatCheckbox + "'>" + e.replace(regradio,'') + "</label><br><br>"}}
id('cheatList').innerHTML = cheats
let radioBoxes = id('cheatList').querySelectorAll('input[id*=_]');
for (var i = 0; i < radioBoxes.length; i++){var box = radioBoxes[i];if(box.id.includes('_')){id(box.id.replace(regbox,'')).disabled = true}}
if(id('cheatList').textContent === '')id('cheatList').textContent = 'No cheats for this ROM found.'})

id('cheatList').addEventListener('change', function(e){
if(e.target.id.includes('_')){
let radioBoxes = id('cheatList').querySelectorAll('input[id*=_]');
for (var i = 0; i < radioBoxes.length; i++){var box = radioBoxes[i];if(box.id.includes(e.target.id.replace(regbox,'_'))){if(box.id != e.target.id)box.checked = false}}}})



if(localStorage.getItem('coreULActive') != null && localStorage.getItem('coreDIVActive') != null){ /* Core settings tabs */
if(id(localStorage.getItem('coreULActive')) != null && id(localStorage.getItem('coreDIVActive')) != null){
currentCore(id(localStorage.getItem('coreULActive')),id(localStorage.getItem('coreDIVActive')))}}

function currentCore(currentUL,currentDIV){core_main.forEach(core_main => {
id('ul_'+core_main).classList.remove('active')
id(core_main).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('coreULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('coreDIVActive',currentDIV.id)}

core_main.forEach(core_main => {id('ul_'+core_main).addEventListener('click', function(){currentCore(id('ul_'+core_main),id(core_main))})})



if(localStorage.getItem('inputULActive') != null && localStorage.getItem('inputDIVActive') != null){ /* Controller settings tabs */
if(id(localStorage.getItem('inputULActive')) != null && id(localStorage.getItem('inputDIVActive')) != null){
currentInput(id(localStorage.getItem('inputULActive')),id(localStorage.getItem('inputDIVActive')))}}

function currentInput(currentUL,currentDIV){input_controller.forEach(input_controller => {
id('ul_'+input_controller).classList.remove('active')
id(input_controller).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('inputULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('inputDIVActive',currentDIV.id)}

input_controller.forEach(input_controller => {id('ul_'+input_controller).addEventListener('click', function(){currentInput(id('ul_'+input_controller),id(input_controller))})})



if(localStorage.getItem('hkULActive') != null && localStorage.getItem('hkDIVActive') != null){ /* mupen64plus hotkey tabs */
if(id(localStorage.getItem('hkULActive')) != null && id(localStorage.getItem('hkDIVActive')) != null){
currentHK(id(localStorage.getItem('hkULActive')),id(localStorage.getItem('hkDIVActive')))}}

function currentHK(currentUL,currentDIV){hk.forEach(hk => {
id('ul_'+hk).classList.remove('active')
id(hk).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('hkULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('hkDIVActive',currentDIV.id)}

hk.forEach(hk => {id('ul_'+hk).addEventListener('click', function(){currentHK(id('ul_'+hk),id(hk))})})



if(localStorage.getItem('GLideN64ULActive') != null && localStorage.getItem('GLideN64DIVActive') != null){ /* GLideN64 settings tabs */
if(id(localStorage.getItem('GLideN64ULActive')) != null && id(localStorage.getItem('GLideN64DIVActive')) != null){
currentGLideN64(id(localStorage.getItem('GLideN64ULActive')),id(localStorage.getItem('GLideN64DIVActive')))}}

function currentGLideN64(currentUL,currentDIV){gliden64_setting.forEach(gliden64_setting => {
id('ul_'+gliden64_setting).classList.remove('active')
id(gliden64_setting).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('GLideN64ULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('GLideN64DIVActive',currentDIV.id)}

gliden64_setting.forEach(gliden64_setting => {id('ul_'+gliden64_setting).addEventListener('click', function(){currentGLideN64(id('ul_'+gliden64_setting),id(gliden64_setting))})})



if(localStorage.getItem('ParallelULActive') != null && localStorage.getItem('ParallelDIVActive') != null){ /* Parallel settings tabs */
if(id(localStorage.getItem('ParallelULActive')) != null && id(localStorage.getItem('ParallelDIVActive')) != null){
currentParallel(id(localStorage.getItem('ParallelULActive')),id(localStorage.getItem('ParallelDIVActive')))}}

function currentParallel(currentUL,currentDIV){parallel_setting.forEach(parallel_setting => {
id('ul_'+parallel_setting).classList.remove('active')
id(parallel_setting).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('ParallelULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('ParallelDIVActive',currentDIV.id)}

parallel_setting.forEach(parallel_setting => {id('ul_'+parallel_setting).addEventListener('click', function(){currentParallel(id('ul_'+parallel_setting),id(parallel_setting))})})



if(localStorage.getItem('RiceULActive') != null && localStorage.getItem('RiceDIVActive') != null){ /* Rice settings tabs */
if(id(localStorage.getItem('RiceULActive')) != null && id(localStorage.getItem('RiceDIVActive')) != null){
currentRice(id(localStorage.getItem('RiceULActive')),id(localStorage.getItem('RiceDIVActive')))}}

function currentRice(currentUL,currentDIV){rice_setting.forEach(rice_setting => {
id('ul_'+rice_setting).classList.remove('active')
id(rice_setting).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('RiceULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('RiceDIVActive',currentDIV.id)}

rice_setting.forEach(rice_setting => {id('ul_'+rice_setting).addEventListener('click', function(){currentRice(id('ul_'+rice_setting),id(rice_setting))})})




if(localStorage.getItem('GlideULActive') != null && localStorage.getItem('GlideDIVActive') != null){ /* Glide64 MK2 settings tabs */
if(id(localStorage.getItem('GlideULActive')) != null && id(localStorage.getItem('GlideDIVActive')) != null){
currentGlide(id(localStorage.getItem('GlideULActive')),id(localStorage.getItem('GlideDIVActive')))}}

function currentGlide(currentUL,currentDIV){glide_setting.forEach(glide_setting => {
id('ul_'+glide_setting).classList.remove('active')
id(glide_setting).classList.add('hide')})
currentUL.classList.add('active');localStorage.setItem('GlideULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('GlideDIVActive',currentDIV.id)}

glide_setting.forEach(glide_setting => {id('ul_'+glide_setting).addEventListener('click', function(){currentGlide(id('ul_'+glide_setting),id(glide_setting))})})



function noScroll(e){if(keyScroll[e.keyCode]){e.preventDefault();return false}} /* prevent scroll and tab focus using text inputs */
function preventScroll(textInput){
textInput.addEventListener('focus',(e) => {html.addEventListener('keydown',noScroll,false)})
textInput.addEventListener('blur',(e) => {html.removeEventListener('keydown',noScroll,false)})}
for (var i = 0; i < textInputs.length; i++){var textInput = textInputs[i];preventScroll(textInput);textInput.tabIndex = -1}



dragDrop.forEach(inp => {id(inp).addEventListener('dragover', prevent, false)}) /* prevent dragover event */
function prevent(e){e.preventDefault();e.stopPropagation()}
function fileExtension(fpath){return fpath.slice((fpath.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase()} /* return file extension */

id('fileInput').addEventListener('drop', function(e){ /* drag and drop for file inputs */
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(n64.includes(fileExtension(fPath)))filePath = fPath
if(filePath != undefined){id('fileText').textContent = filePath;localStorage.setItem('filePath', filePath);hideCheats()}}})

id('IPLROM').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(bios.includes(fileExtension(fPath)))IPLROM = fPath
if(IPLROM != undefined){id('IPLROMText').textContent = IPLROM;id('IPLROMText').style.opacity = '';localStorage.setItem('IPLROM', IPLROM)}}})

id('Disk').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(ndd.includes(fileExtension(fPath)))Disk = fPath
if(Disk != undefined){id('DiskText').textContent = Disk;id('DiskText').style.opacity = '';localStorage.setItem('Disk', Disk)}}})

id('gbROM1').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(gb.includes(fileExtension(fPath)))gbROM1 = fPath
if(gbROM1 != undefined){id('gbROM1Text').textContent = gbROM1;id('gbROM1Text').style.opacity = '';localStorage.setItem('gbROM1', gbROM1)}}})

id('gbROM2').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(gb.includes(fileExtension(fPath)))gbROM2 = fPath
if(gbROM2 != undefined){id('gbROM2Text').textContent = gbROM2;id('gbROM2Text').style.opacity = '';localStorage.setItem('gbROM2', gbROM2)}}})

id('gbROM3').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(gb.includes(fileExtension(fPath)))gbROM3 = fPath
if(gbROM3 != undefined){id('gbROM3Text').textContent = gbROM3;id('gbROM3Text').style.opacity = '';localStorage.setItem('gbROM3', gbROM3)}}})

id('gbROM4').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(gb.includes(fileExtension(fPath)))gbROM4 = fPath
if(gbROM4 != undefined){id('gbROM4Text').textContent = gbROM4;id('gbROM4Text').style.opacity = '';localStorage.setItem('gbROM4', gbROM4)}}})

id('gbRAM1').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(save.includes(fileExtension(fPath)))gbRAM1 = fPath
if(gbRAM1 != undefined){id('gbRAM1Text').textContent = gbRAM1;id('gbRAM1Text').style.opacity = '';localStorage.setItem('gbRAM1', gbRAM1)}}})

id('gbRAM2').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(save.includes(fileExtension(fPath)))gbRAM2 = fPath
if(gbRAM2 != undefined){id('gbRAM2Text').textContent = gbRAM2;id('gbRAM2Text').style.opacity = '';localStorage.setItem('gbRAM2', gbRAM2)}}})

id('gbRAM3').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(save.includes(fileExtension(fPath)))gbRAM3 = fPath
if(gbRAM3 != undefined){id('gbRAM3Text').textContent = gbRAM3;id('gbRAM3Text').style.opacity = '';localStorage.setItem('gbRAM3', gbRAM3)}}})

id('gbRAM4').addEventListener('drop', function(e){
prevent(e);if(e.dataTransfer.files[0] === undefined)return
let fPath = e.dataTransfer.files[0].path;
if(fPath != undefined){
if(save.includes(fileExtension(fPath)))gbRAM4 = fPath
if(gbRAM4 != undefined){id('gbRAM4Text').textContent = gbRAM4;id('gbRAM4Text').style.opacity = '';localStorage.setItem('gbRAM4', gbRAM4)}}})



if(localStorage.getItem('filePath') === null){filePath = testROM; id('fileText').textContent = filePath}
if(localStorage.getItem('filePath') != null){filePath = localStorage.getItem('filePath');id('fileText').textContent = filePath}
id('fileInput').addEventListener('click', function(){ /* click event for file inputs */
fileResult = dialogFile({name:'N64 ROM',extensions:n64});
if(fileResult != undefined){filePath = fileResult;
if(filePath != undefined){id('fileText').textContent = filePath;localStorage.setItem('filePath', filePath);hideCheats()}}})

id('clearIPLROM').addEventListener('click', function(){IPLROM = id('IPLROMText').textContent = '.bin, .rom, .n64, .v64, .z64';id('IPLROMText').style.opacity = '0.7';localStorage.removeItem('IPLROM')})
if(localStorage.getItem('IPLROM') === null){IPLROM = '';id('IPLROMText').textContent = '.bin, .rom, .n64, .v64, .z64';id('IPLROMText').style.opacity = '0.7'}
if(localStorage.getItem('IPLROM') != null){IPLROM = localStorage.getItem('IPLROM');id('IPLROMText').textContent = IPLROM;id('IPLROMText').style.opacity = ''}
id('IPLROM').addEventListener('click', function(){
IPLROMResult = dialogFile({name:'64DD IPL',extensions:bios})
if(IPLROMResult != undefined){IPLROM = IPLROMResult.toString();
if(IPLROM != undefined){id('IPLROMText').textContent = IPLROM;id('IPLROMText').style.opacity = '';localStorage.setItem('IPLROM', IPLROM)}}})

id('clearDisk').addEventListener('click', function(){Disk = id('DiskText').textContent = '.d64, .ndd';id('DiskText').style.opacity = '0.7';localStorage.removeItem('Disk')})
if(localStorage.getItem('Disk') === null){Disk = '';id('DiskText').textContent = '.d64, .ndd';id('DiskText').style.opacity = '0.7'}
if(localStorage.getItem('Disk') != null){Disk = localStorage.getItem('Disk');id('DiskText').textContent = Disk;id('DiskText').style.opacity = ''}
id('Disk').addEventListener('click', function(){
DiskResult = dialogFile({name:'64DD Disk',extensions:ndd})
if(DiskResult != undefined){Disk = DiskResult.toString();
if(Disk != undefined){id('DiskText').textContent = Disk;id('DiskText').style.opacity = '';localStorage.setItem('Disk', Disk)}}})

id('cleargbROM1').addEventListener('click', function(){gbROM1 = id('gbROM1Text').textContent = '.gb, .gbc';id('gbROM1Text').style.opacity = '0.7';localStorage.removeItem('gbROM1')})
if(localStorage.getItem('gbROM1') === null){gbROM1 = '';id('gbROM1Text').textContent = '.gb, .gbc';id('gbROM1Text').style.opacity = '0.7'}
if(localStorage.getItem('gbROM1') != null){gbROM1 = localStorage.getItem('gbROM1');id('gbROM1Text').textContent = gbROM1;id('gbROM1Text').style.opacity = ''}
id('gbROM1').addEventListener('click', function(){
gbROM1Result = dialogFile({name:'GB ROM',extensions:gb})
if(gbROM1Result != undefined){gbROM1 = gbROM1Result.toString();
if(gbROM1 != undefined){id('gbROM1Text').textContent = gbROM1;id('gbROM1Text').style.opacity = '';localStorage.setItem('gbROM1', gbROM1)}}})

id('cleargbROM2').addEventListener('click', function(){gbROM2 = id('gbROM2Text').textContent = '.gb, .gbc';id('gbROM2Text').style.opacity = '0.7';localStorage.removeItem('gbROM2')})
if(localStorage.getItem('gbROM2') === null){gbROM2 = '';id('gbROM2Text').textContent = '.gb, .gbc';id('gbROM2Text').style.opacity = '0.7'}
if(localStorage.getItem('gbROM2') != null){gbROM2 = localStorage.getItem('gbROM2');id('gbROM2Text').textContent = gbROM2;id('gbROM2Text').style.opacity = ''}
id('gbROM2').addEventListener('click', function(){
gbROM2Result = dialogFile({name:'GB ROM',extensions:gb})
if(gbROM2Result != undefined){gbROM2 = gbROM2Result.toString();
if(gbROM2 != undefined){id('gbROM2Text').textContent = gbROM2;id('gbROM2Text').style.opacity = '';localStorage.setItem('gbROM2', gbROM2)}}})

id('cleargbROM3').addEventListener('click', function(){gbROM3 = id('gbROM3Text').textContent = '.gb, .gbc';id('gbROM3Text').style.opacity = '0.7';localStorage.removeItem('gbROM3')})
if(localStorage.getItem('gbROM3') === null){gbROM3 = '';id('gbROM3Text').textContent = '.gb, .gbc';id('gbROM3Text').style.opacity = '0.7'}
if(localStorage.getItem('gbROM3') != null){gbROM3 = localStorage.getItem('gbROM3');id('gbROM3Text').textContent = gbROM3;id('gbROM3Text').style.opacity = ''}
id('gbROM3').addEventListener('click', function(){
gbROM3Result = dialogFile({name:'GB ROM',extensions:gb})
if(gbROM3Result != undefined){gbROM3 = gbROM3Result.toString();
if(gbROM3 != undefined){id('gbROM3Text').textContent = gbROM3;id('gbROM3Text').style.opacity = '';localStorage.setItem('gbROM3', gbROM3)}}})

id('cleargbROM4').addEventListener('click', function(){gbROM4 = id('gbROM4Text').textContent = '.gb, .gbc';id('gbROM4Text').style.opacity = '0.7';localStorage.removeItem('gbROM4')})
if(localStorage.getItem('gbROM4') === null){gbROM4 = '';id('gbROM4Text').textContent = '.gb, .gbc';id('gbROM4Text').style.opacity = '0.7'}
if(localStorage.getItem('gbROM4') != null){gbROM4 = localStorage.getItem('gbROM4');id('gbROM4Text').textContent = gbROM4;id('gbROM4Text').style.opacity = ''}
id('gbROM4').addEventListener('click', function(){
gbROM4Result = dialogFile({name:'GB ROM',extensions:gb})
if(gbROM4Result != undefined){gbROM4 = gbROM4Result.toString();
if(gbROM4 != undefined){id('gbROM4Text').textContent = gbROM4;id('gbROM4Text').style.opacity = '';localStorage.setItem('gbROM4', gbROM4)}}})

id('cleargbRAM1').addEventListener('click', function(){gbRAM1 = id('gbRAM1Text').textContent = '.sav';id('gbRAM1Text').style.opacity = '0.7';localStorage.removeItem('gbRAM1')})
if(localStorage.getItem('gbRAM1') === null){gbRAM1 = '';id('gbRAM1Text').textContent = '.sav';id('gbRAM1Text').style.opacity = '0.7'}
if(localStorage.getItem('gbRAM1') != null){gbRAM1 = localStorage.getItem('gbRAM1');id('gbRAM1Text').textContent = gbRAM1;id('gbRAM1Text').style.opacity = ''}
id('gbRAM1').addEventListener('click', function(){
gbRAM1Result = dialogFile({name:'GB Save File',extensions:save})
if(gbRAM1Result != undefined){gbRAM1 = gbRAM1Result.toString();
if(gbRAM1 != undefined){id('gbRAM1Text').textContent = gbRAM1;id('gbRAM1Text').style.opacity = '';localStorage.setItem('gbRAM1', gbRAM1)}}})

id('cleargbRAM2').addEventListener('click', function(){gbRAM2 = id('gbRAM2Text').textContent = '.sav';id('gbRAM2Text').style.opacity = '0.7';localStorage.removeItem('gbRAM2')})
if(localStorage.getItem('gbRAM2') === null){gbRAM2 = '';id('gbRAM2Text').textContent = '.sav';id('gbRAM2Text').style.opacity = '0.7'}
if(localStorage.getItem('gbRAM2') != null){gbRAM2 = localStorage.getItem('gbRAM2');id('gbRAM2Text').textContent = gbRAM2;id('gbRAM2Text').style.opacity = ''}
id('gbRAM2').addEventListener('click', function(){
gbRAM2Result = dialogFile({name:'GB Save File',extensions:save})
if(gbRAM2Result != undefined){gbRAM2 = gbRAM2Result.toString();
if(gbRAM2 != undefined){id('gbRAM2Text').textContent = gbRAM2;id('gbRAM2Text').style.opacity = '';localStorage.setItem('gbRAM2', gbRAM2)}}})

id('cleargbRAM3').addEventListener('click', function(){gbRAM3 = id('gbRAM3Text').textContent = '.sav';id('gbRAM3Text').style.opacity = '0.7';localStorage.removeItem('gbRAM3')})
if(localStorage.getItem('gbRAM3') === null){gbRAM3 = '';id('gbRAM3Text').textContent = '.sav';id('gbRAM3Text').style.opacity = '0.7'}
if(localStorage.getItem('gbRAM3') != null){gbRAM3 = localStorage.getItem('gbRAM3');id('gbRAM3Text').textContent = gbRAM3;id('gbRAM3Text').style.opacity = ''}
id('gbRAM3').addEventListener('click', function(){
gbRAM3Result = dialogFile({name:'GB Save File',extensions:save})
if(gbRAM3Result != undefined){gbRAM3 = gbRAM3Result.toString();
if(gbRAM3 != undefined){id('gbRAM3Text').textContent = gbRAM3;id('gbRAM3Text').style.opacity = '';localStorage.setItem('gbRAM3', gbRAM3)}}})

id('cleargbRAM4').addEventListener('click', function(){gbRAM4 = id('gbRAM4Text').textContent = '.sav';id('gbRAM4Text').style.opacity = '0.7';localStorage.removeItem('gbRAM4')})
if(localStorage.getItem('gbRAM4') === null){gbRAM4 = '';id('gbRAM4Text').textContent = '.sav';id('gbRAM4Text').style.opacity = '0.7'}
if(localStorage.getItem('gbRAM4') != null){gbRAM4 = localStorage.getItem('gbRAM4');id('gbRAM4Text').textContent = gbRAM4;id('gbRAM4Text').style.opacity = ''}
id('gbRAM4').addEventListener('click', function(){
gbRAM4Result = dialogFile({name:'GB Save File',extensions:save})
if(gbRAM4Result != undefined){gbRAM4 = gbRAM4Result.toString();
if(gbRAM4 != undefined){id('gbRAM4Text').textContent = gbRAM4;id('gbRAM4Text').style.opacity = '';localStorage.setItem('gbRAM4', gbRAM4)}}})



id('resetConfigPath').addEventListener('click', function(){ConfigPath = id('ConfigPathText').textContent = config;localStorage.removeItem('ConfigPath')}) /* choose and reset directories */
if(localStorage.getItem('ConfigPath') === null){ConfigPath = id('ConfigPathText').textContent = config}
if(localStorage.getItem('ConfigPath') != null){ConfigPath = localStorage.getItem('ConfigPath');id('ConfigPathText').textContent = ConfigPath}
id('ConfigPath').addEventListener('click', function(){
ConfigPathResult = dialogDirectory()
if(ConfigPathResult != undefined){ConfigPath = ConfigPathResult.toString();id('ConfigPathText').textContent = ConfigPath;localStorage.setItem('ConfigPath', ConfigPath)}})

id('resetScreenshotPath').addEventListener('click', function(){ScreenshotPath = id('ScreenshotPathText').textContent = screenshot;localStorage.removeItem('ScreenshotPath')})
if(localStorage.getItem('ScreenshotPath') === null){ScreenshotPath = id('ScreenshotPathText').textContent = screenshot}
if(localStorage.getItem('ScreenshotPath') != null){ScreenshotPath = localStorage.getItem('ScreenshotPath');id('ScreenshotPathText').textContent = ScreenshotPath}
id('ScreenshotPath').addEventListener('click', function(){
ScreenshotPathResult = dialogDirectory()
if(ScreenshotPathResult != undefined){ScreenshotPath = ScreenshotPathResult.toString();id('ScreenshotPathText').textContent = ScreenshotPath;localStorage.setItem('ScreenshotPath', ScreenshotPath)}})

id('resetSaveStatePath').addEventListener('click', function(){SaveStatePath = id('SaveStatePathText').textContent = savePath;localStorage.removeItem('SaveStatePath')})
if(localStorage.getItem('SaveStatePath') === null){SaveStatePath = id('SaveStatePathText').textContent = savePath}
if(localStorage.getItem('SaveStatePath') != null){SaveStatePath = localStorage.getItem('SaveStatePath');id('SaveStatePathText').textContent = SaveStatePath}
id('SaveStatePath').addEventListener('click', function(){
SaveStatePathResult = dialogDirectory()
if(SaveStatePathResult != undefined){SaveStatePath = SaveStatePathResult.toString();id('SaveStatePathText').textContent = SaveStatePath;localStorage.setItem('SaveStatePath', SaveStatePath)}})

id('resetSaveSRAMPath').addEventListener('click', function(){SaveSRAMPath = id('SaveSRAMPathText').textContent = savePath;localStorage.removeItem('SaveSRAMPath')})
if(localStorage.getItem('SaveSRAMPath') === null){SaveSRAMPath = id('SaveSRAMPathText').textContent = savePath}
if(localStorage.getItem('SaveSRAMPath') != null){SaveSRAMPath = localStorage.getItem('SaveSRAMPath');id('SaveSRAMPathText').textContent = SaveSRAMPath}
id('SaveSRAMPath').addEventListener('click', function(){
SaveSRAMPathResult = dialogDirectory()
if(SaveSRAMPathResult != undefined){SaveSRAMPath = SaveSRAMPathResult.toString();id('SaveSRAMPathText').textContent = SaveSRAMPath;localStorage.setItem('SaveSRAMPath', SaveSRAMPath)}})

id('resetTxPath').addEventListener('click', function(){txPath = id('txPathText').textContent = hires_texture;localStorage.removeItem('txPath')})
if(localStorage.getItem('txPath') === null){txPath = id('txPathText').textContent = hires_texture}
if(localStorage.getItem('txPath') != null){txPath = localStorage.getItem('txPath');id('txPathText').textContent = txPath}
id('txPath').addEventListener('click', function(){
txPathResult = dialogDirectory()
if(txPathResult != undefined){txPath = txPathResult.toString();id('txPathText').textContent = txPath;localStorage.setItem('txPath', txPath)}})

id('resetTxCachePath').addEventListener('click', function(){txCachePath = id('txCachePathText').textContent = cache;localStorage.removeItem('txCachePath')})
if(localStorage.getItem('txCachePath') === null){txCachePath = id('txCachePathText').textContent = cache}
if(localStorage.getItem('txCachePath') != null){txCachePath = localStorage.getItem('txCachePath');id('txCachePathText').textContent = txCachePath}
id('txCachePath').addEventListener('click', function(){
txCachePathResult = dialogDirectory()
if(txCachePathResult != undefined){txCachePath = txCachePathResult.toString();id('txCachePathText').textContent = txCachePath;localStorage.setItem('txCachePath', txCachePath)}})

id('resetTxDumpPath').addEventListener('click', function(){txDumpPath = id('txDumpPathText').textContent = texture_dump;localStorage.removeItem('txDumpPath')})
if(localStorage.getItem('txDumpPath') === null){txDumpPath = id('txDumpPathText').textContent = texture_dump}
if(localStorage.getItem('txDumpPath') != null){txDumpPath = localStorage.getItem('txDumpPath');id('txDumpPathText').textContent = txDumpPath}
id('txDumpPath').addEventListener('click', function(){
txDumpPathResult = dialogDirectory()
if(txDumpPathResult != undefined){txDumpPath = txDumpPathResult.toString();id('txDumpPathText').textContent = txDumpPath;localStorage.setItem('txDumpPath', txDumpPath)}})

id('resetfontColor').addEventListener('click', function(){fontColor = id('resetfontColor').dataset.value;id('fontColor').value = id('resetfontColor').dataset.value;localStorage.removeItem('fontColor')})
if(localStorage.getItem('fontColor') != null){id('fontColor').value = localStorage.getItem('fontColor')}
id('fontColor').addEventListener('change', function(){localStorage.setItem('fontColor', id('fontColor').value)})



id('resetRomPath').addEventListener('click', function(){RomPath = id('RomPathText').textContent = 'Choose a directory';id('RomPathText').style.opacity = '0.7';id('romBrowser').textContent = '';localStorage.removeItem('RomPath')})
if(localStorage.getItem('RomPath') === null){RomPath = '';id('RomPathText').textContent = 'Choose a directory';id('RomPathText').style.opacity = '0.7'}
if(localStorage.getItem('RomPath') != null){RomPath = localStorage.getItem('RomPath');id('RomPathText').textContent = RomPath;id('RomPathText').style.opacity = ''}
id('RomPath').addEventListener('click', function(){
RomPathResult = dialogDirectory()
if(RomPathResult != undefined){RomPath = RomPathResult.toString();id('RomPathText').textContent = RomPath;id('RomPathText').style.opacity = '';localStorage.setItem('RomPath', RomPath);id('loadRomPath').click()}})

function romUpdate(rom){ /* ROM browser */
if(rom === '' || rom === null || rom === undefined)return
var newROM = document.createElement('p');
newROM.dataset.value = newROM.textContent = rom;
id('romBrowser').appendChild(newROM)}

id('loadRomPath').addEventListener('click', function(){
if(RomPath === '' || RomPath === null || RomPath === undefined)return
id('romBrowser').textContent = '';
const romFiles = romDir(RomPath).filter(name => name.match(/\.n64$|\.v64$|\.z64$/));
romFiles.forEach(rom => romUpdate(rom))
const romFile = id('romBrowser').children;
for(var i = 0; i < romFile.length; i++){
romFile[i].onclick = function(){filePath = romDirFile(RomPath,this.dataset.value);id('fileText').textContent = filePath;localStorage.setItem('filePath', filePath);id('optionDefault').selected = true;hideCheats()}
romFile[i].ondblclick = function(){id('launch').click()}}})
id('loadRomPath').click()



id('openRomPath').addEventListener('click', function(){openPath(RomPath)})
id('openPluginFolder').addEventListener('click', function(){openPath(pluginFolder)})
id('openConfigPath').addEventListener('click', function(){openPath(ConfigPath)})
id('openScreenshotPath').addEventListener('click', function(){openPath(ScreenshotPath)})
id('openSaveStatePath').addEventListener('click', function(){openPath(SaveStatePath)})
id('openSaveSRAMPath').addEventListener('click', function(){openPath(SaveSRAMPath)})
id('openTxPath').addEventListener('click', function(){openPath(txPath)})
id('openTxCachePath').addEventListener('click', function(){openPath(txCachePath)})
id('openTxDumpPath').addEventListener('click', function(){openPath(txDumpPath)})

id('showFilePath').addEventListener('click', function(){showInFolder(filePath)})
id('showIPLROM').addEventListener('click', function(){showInFolder(IPLROM)})
id('showDisk').addEventListener('click', function(){showInFolder(Disk)})
id('showgbROM1').addEventListener('click', function(){showInFolder(gbROM1)})
id('showgbRAM1').addEventListener('click', function(){showInFolder(gbRAM1)})
id('showgbROM2').addEventListener('click', function(){showInFolder(gbROM2)})
id('showgbRAM2').addEventListener('click', function(){showInFolder(gbRAM2)})
id('showgbROM3').addEventListener('click', function(){showInFolder(gbROM3)})
id('showgbRAM3').addEventListener('click', function(){showInFolder(gbRAM3)})
id('showgbROM4').addEventListener('click', function(){showInFolder(gbROM4)})
id('showgbRAM4').addEventListener('click', function(){showInFolder(gbRAM4)})
id('showMupencheat').addEventListener('click', function(){showInFolder(mupencheat)})

id('openFile').addEventListener('click', function(){id('fileInput').click()})
document.addEventListener('keyup', function(e){if(e.ctrlKey && e.which == 79){id('fileInput').click()}})
document.addEventListener('keyup', function(e){if(e.ctrlKey && e.which == 76){id('launch').click()}})



id('videoLink').addEventListener('click', function(){
if(id('gfx').value.includes('angrylion')){id('videoLink').href = '#angrylionAnchor'}
else if(id('gfx').value.includes('parallel')){id('videoLink').href = '#parallelAnchor'}
else if(id('gfx').value.includes('rice')){id('videoLink').href = '#riceAnchor'}
else if(id('gfx').value.includes('glide64mk2')){id('videoLink').href = '#glideAnchor'}
else{id('videoLink').href = '#videoAnchor'}})



id('launch').addEventListener('click', function(){
if(filePath.toString() != testROM){
if(recentFiles.includes(filePath.toString())){recentFiles = recentFiles.filter(item => item !== filePath.toString())};
recentFiles.unshift(filePath.toString());recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles))};

if(id('emumode').value === '2')id('newDynarec').checked ? corelib = './mupen64plus-nd' + ext : corelib = './mupen64plus' + ext;

var configdir = ConfigPath,
exp = 'Core[DisableExtraMem]=' + id('exp').checked,
SaveFilenameFormat = 'Core[SaveFilenameFormat]=' + (id('SaveFilenameFormat').checked ? '1' : '0'),
osd = 'Core[OnScreenDisplay]=false',
nospeedlimit = id('nospeedlimit').checked ? '--nospeedlimit' : [],
verbose = id('verbose').checked ? '--verbose' : [],
fullscreen = 'Video-General[Fullscreen]=' + id('fullscreen').checked,
ParallelFullscreen = 'Video-Parallel[Fullscreen]=' + id('fullscreen').checked,
vsync = 'Video-General[VerticalSync]=' + id('vsync').checked,
ViVsync = 'Video-AngrylionPlus[ViVsync]=' + id('vsync').checked,
ParallelVSync = 'Video-Parallel[Vsync]=' + id('vsync').checked,
Glide64VSync = 'Video-Glide64mk2[vsync]=' + id('vsync').checked,
m64pJPG = 'Rsp-HLE[ForwardJPEGTasks]=' + id('rspJPG').checked,
m64pGFX = 'Rsp-HLE[DisplayListToGraphicsPlugin]=true',
cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=' + id('rspGFX').checked,
parallelGFX = 'RSP-Parallel[DisplayListToGraphicsPlugin]=' + id('rspGFX').checked,
z64GFX = 'rsp-z64[DisplayListToGraphicsPlugin]=' + id('rspGFX').checked,
m64pAudio = 'Rsp-HLE[AudioListToAudioPlugin]=false',
cxd4Audio = 'rsp-cxd4[AudioListToAudioPlugin]=false',
parallelAudio = 'RSP-Parallel[AudioListToAudioPlugin]=false',
z64Audio = 'z64-rsp[AudioListToAudioPlugin]=false',
WaitForCPUHost = 'rsp-cxd4[WaitForCPUHost]=false',
SupportCPUSemaphoreLock = 'rsp-cxd4[SupportCPUSemaphoreLock]=false',
threadedVideo = 'Video-GLideN64[threadedVideo]=false',
bilinearMode = 'Video-GLideN64[bilinearMode]=' + id('bilinearMode').checked,
fxaa = 'Video-GLideN64[fxaa]=' + id('fxaa').checked,
enableHalosRemoval = 'Video-GLideN64[enableHalosRemoval]=' + id('enableHalosRemoval').checked,
txDump = 'Video-GLideN64[txDump]=' + id('txDump').checked,
txStrongCRC = 'Video-GLideN64[txStrongCRC]=' + id('txStrongCRC').checked,
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
txForce16bpp = 'Video-GLideN64[txForce16bpp]=false',
txSaveCache = 'Video-GLideN64[txSaveCache]=' + id('txSaveCache').checked,
ForceGammaCorrection = 'Video-GLideN64[ForceGammaCorrection]=' + id('ForceGammaCorrection').checked,
ShowFPS = 'Video-GLideN64[ShowFPS]=' + id('ShowFPS').checked,
ShowVIS = 'Video-GLideN64[ShowVIS]=' + id('ShowVIS').checked,
ShowPercent = 'Video-GLideN64[ShowPercent]=' + id('ShowPercent').checked,
ShowInternalResolution = 'Video-GLideN64[ShowInternalResolution]=' + id('ShowInternalResolution').checked,
ShowRenderingResolution = 'Video-GLideN64[ShowRenderingResolution]=' + id('ShowRenderingResolution').checked,
ShowStatistics = 'Video-GLideN64[ShowStatistics]=' + id('ShowStatistics').checked,

SaveDiskFormat = 'Core[SaveDiskFormat]=' + (id('SaveDiskFormat').checked ? '1' : '0'),
NoCompiledJump = 'Core[NoCompiledJump]=' + id('NoCompiledJump').checked,
AutoStateSlotIncrement = 'Core[AutoStateSlotIncrement]=' + id('AutoStateSlotIncrement').checked,
RandomizeInterrupt = 'Core[RandomizeInterrupt]=' + id('RandomizeInterrupt').checked,
EnableDebugger = 'Core[EnableDebugger]=false',
SWAP_CHANNELS = 'Audio-SDL[SWAP_CHANNELS]=' + id('SWAP_CHANNELS').checked,
AUDIO_SYNC = 'Audio-SDL[AUDIO_SYNC]=' + id('AUDIO_SYNC').checked,
VOLUME_CONTROL_TYPE = id('VOLUME_CONTROL_TYPE').checked ? 'Audio-SDL[VOLUME_CONTROL_TYPE]=2' : 'Audio-SDL[VOLUME_CONTROL_TYPE]=1',

Parallel = 'Video-AngrylionPlus[Parallel]=' + id('Parallel').checked,
BusyLoop = 'Video-AngrylionPlus[BusyLoop]=' + id('BusyLoop').checked,
ViWidescreen = 'Video-AngrylionPlus[ViWidescreen]=' + id('ViWidescreen').checked,
ViHideOverscan = 'Video-AngrylionPlus[ViHideOverscan]=' + id('ViHideOverscan').checked,
ViIntegerScaling = 'Video-AngrylionPlus[ViIntegerScaling]=' + id('ViIntegerScaling').checked,

ParallelSuperscaledReads = 'Video-Parallel[SuperscaledReads]=' + id('ParallelSuperscaledReads').checked,
ParallelSuperscaledDither = 'Video-Parallel[SuperscaledDither]=' + id('ParallelSuperscaledDither').checked,
ParallelVIAA = 'Video-Parallel[VIAA]=' + id('ParallelVIAA').checked,
ParallelDivot = 'Video-Parallel[Divot]=' + id('ParallelDivot').checked,
ParallelGammaDither = 'Video-Parallel[GammaDither]=' + id('ParallelGammaDither').checked,
ParallelVIBilerp = 'Video-Parallel[VIBilerp]=' + id('ParallelVIBilerp').checked,
ParallelVIDither = 'Video-Parallel[VIDither]=' + id('ParallelVIDither').checked,
ParallelNativeTextLOD = 'Video-Parallel[NativeTextLOD]=' + id('ParallelNativeTextLOD').checked,
ParallelNativeTextRECT = 'Video-Parallel[NativeTextRECT]=' + id('ParallelNativeTextRECT').checked,
ParallelSynchronousRDP = 'Video-Parallel[SynchronousRDP]=' + id('ParallelSynchronousRDP').checked,
ParallelWidescreenStretch = 'Video-Parallel[WidescreenStretch]=' + id('ParallelWidescreenStretch').checked,
ParallelCropOverscanEnable = 'Video-Parallel[CropOverscanEnable]=' + id('ParallelCropOverscanEnable').checked,

FrameBufferSetting = 'Video-Rice[FrameBufferSetting]=' + (id('FrameBufferSetting').checked ? '1' : '0'),
NormalAlphaBlender = 'Video-Rice[NormalAlphaBlender]=false',
FastTextureLoading = 'Video-Rice[FastTextureLoading]=' + id('FastTextureLoading').checked,
AccurateTextureMapping = 'Video-Rice[AccurateTextureMapping]=' + id('AccurateTextureMapping').checked,
InN64Resolution = 'Video-Rice[InN64Resolution]=' + id('InN64Resolution').checked,
SaveVRAM = 'Video-Rice[SaveVRAM]=false',
DoubleSizeForSmallTxtrBuf = 'Video-Rice[DoubleSizeForSmallTxtrBuf]=' + id('DoubleSizeForSmallTxtrBuf').checked,
DefaultCombinerDisable = 'Video-Rice[DefaultCombinerDisable]=false',
EnableHacks = 'Video-Rice[EnableHacks]=' + id('EnableHacks').checked,
WinFrameMode = 'Video-Rice[WinFrameMode]=false',
FullTMEMEmulation = 'Video-Rice[FullTMEMEmulation]=false',
OpenGLVertexClipper = 'Video-Rice[OpenGLVertexClipper]=' + id('OpenGLVertexClipper').checked,
EnableSSE = 'Video-Rice[EnableSSE]=true',
SkipFrame = 'Video-Rice[SkipFrame]=false',
TexRectOnly = 'Video-Rice[TexRectOnly]=false',
SmallTextureOnly = 'Video-Rice[SmallTextureOnly]=false',
LoadHiResCRCOnly = 'Video-Rice[LoadHiResCRCOnly]=' + id('LoadHiResCRCOnly').checked,
LoadHiResTextures = 'Video-Rice[LoadHiResTextures]=' + id('LoadHiResTextures').checked,
DumpTexturesToFiles = 'Video-Rice[DumpTexturesToFiles]=' + id('DumpTexturesToFiles').checked,
RiceShowFPS = 'Video-Rice[ShowFPS]=' + id('RiceShowFPS').checked,
FogMethod = 'Video-Rice[FogMethod]=' + (id('FogMethod').checked ? '1' : '0'),
OpenGLRenderSetting = 'Video-Rice[OpenGLRenderSetting]=0',
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
ghq_hirs_let_texartists_fly = 'Video-Glide64mk2[ghq_hirs_let_texartists_fly]=' + id('ghq_hirs_let_texartists_fly').checked,

ScreenWidth = 'Video-General[ScreenWidth]=' + id('resolution').value,
ScreenHeight = 'Video-General[ScreenHeight]=' + id('resolution').value*0.75,
ParallelScreenWidth = 'Video-Parallel[ScreenWidth]=' + id('resolution').value,
ParallelScreenHeight = 'Video-Parallel[ScreenHeight]=' + id('resolution').value*0.75,

gfx = id('gfx').value + ext,
audio = id('audio').value + ext,
input = id('input').value + ext,
rsp = id('rsp').value + ext,
RspFallback = 'Rsp-HLE[RspFallback]=plugin/' + id('RspFallback').value + ext,
emumode = 'Core[R4300Emulator]=' + id('emumode').value,
plugin1 = 'Input-SDL-Control1[plugin]=' + id('plugin1').value,
plugin2 = 'Input-SDL-Control2[plugin]=' + id('plugin2').value,
plugin3 = 'Input-SDL-Control3[plugin]=' + id('plugin3').value,
plugin4 = 'Input-SDL-Control4[plugin]=' + id('plugin4').value,
mode1 = 'Input-SDL-Control1[mode]=0',
mode2 = 'Input-SDL-Control2[mode]=0',
mode3 = 'Input-SDL-Control3[mode]=0',
mode4 = 'Input-SDL-Control4[mode]=0',
msaa = 'Video-GLideN64[MultiSampling]=' + id('msaa').value,
aspectRatio = 'Video-GLideN64[AspectRatio]=' + id('aspectRatio').value,
bufferSwapMode = 'Video-GLideN64[BufferSwapMode]=' + id('bufferSwapMode').value,
useNativeResolutionFactor = 'Video-GLideN64[UseNativeResolutionFactor]=' + id('useNativeResolutionFactor').value,
anisotropy = 'Video-GLideN64[anisotropy]=' + id('anisotropy').value,
cache = 'Video-GLideN64[txHiresTextureFileStorage]=' + id('cache').value,
RDRAMImageDitheringMode = 'Video-GLideN64[RDRAMImageDitheringMode]=' + id('RDRAMImageDitheringMode').value,
CorrectTexrectCoords = 'Video-GLideN64[CorrectTexrectCoords]=' + id('CorrectTexrectCoords').value,
EnableNativeResTexrects = 'Video-GLideN64[EnableNativeResTexrects]=' + id('EnableNativeResTexrects').value,
BackgroundsMode = 'Video-GLideN64[BackgroundsMode]=' + id('BackgroundsMode').value,
EnableN64DepthCompare = 'Video-GLideN64[EnableN64DepthCompare]=' + id('EnableN64DepthCompare').value,
EnableCopyColorToRDRAM = 'Video-GLideN64[EnableCopyColorToRDRAM]=' + id('EnableCopyColorToRDRAM').value,
EnableCopyDepthToRDRAM = 'Video-GLideN64[EnableCopyDepthToRDRAM]=' + id('EnableCopyDepthToRDRAM').value,
txFilterMode = 'Video-GLideN64[txFilterMode]=' + id('txFilterMode').value,
txEnhancementMode = 'Video-GLideN64[txEnhancementMode]=' + id('txEnhancementMode').value,
ViMode = 'Video-AngrylionPlus[ViMode]=' + id('ViMode').value,
ViInterpolation = 'Video-AngrylionPlus[ViInterpolation]=' + id('ViInterpolation').value,
DpCompat = 'Video-AngrylionPlus[DpCompat]=' + id('DpCompat').value,
ParallelUpscaling = 'Video-Parallel[Upscaling]=' + id('ParallelUpscaling').value,
ParallelDeinterlaceMode = 'Video-Parallel[DeinterlaceMode]=true',
ParallelDownScale = 'Video-Parallel[DownScale]=0',
CountersPos = 'Video-GLideN64[CountersPos]=' + id('CountersPos').value,
DEFAULT_FREQUENCY = 'Audio-SDL[DEFAULT_FREQUENCY]=33600',
PRIMARY_BUFFER_SIZE = 'Audio-SDL[PRIMARY_BUFFER_SIZE]=16384',
PRIMARY_BUFFER_TARGET = 'Audio-SDL[PRIMARY_BUFFER_TARGET]=' + id('PRIMARY_BUFFER_TARGET').value,
SECONDARY_BUFFER_SIZE = 'Audio-SDL[SECONDARY_BUFFER_SIZE]=1024',
RESAMPLE = 'Audio-SDL[RESAMPLE]=' + id('RESAMPLE').value,

FrameBufferWriteBackControl = 'Video-Rice[FrameBufferWriteBackControl]=' + id('FrameBufferWriteBackControl').value,
RenderToTexture = 'Video-Rice[RenderToTexture]=' + id('RenderToTexture').value,
ScreenUpdateSetting = 'Video-Rice[ScreenUpdateSetting]=' + id('ScreenUpdateSetting').value,
Mipmapping = 'Video-Rice[Mipmapping]=' + id('Mipmapping').value,
ForceTextureFilter = 'Video-Rice[ForceTextureFilter]=' + id('ForceTextureFilter').value,
TextureEnhancement = 'Video-Rice[TextureEnhancement]=0',
TextureEnhancementControl = 'Video-Rice[TextureEnhancementControl]=0',
TextureQuality = 'Video-Rice[TextureQuality]=0',
OpenGLDepthBufferSetting = 'Video-Rice[OpenGLDepthBufferSetting]=24',
RiceMultiSampling = 'Video-Rice[MultiSampling]=' + id('RiceMultiSampling').value,
ColorQuality = 'Video-Rice[ColorQuality]=0',
AnisotropicFiltering = 'Video-Rice[AnisotropicFiltering]=' + id('AnisotropicFiltering').value,

wrpAntiAliasing = id('wrpAntiAliasing').value,
show_fps = id('show_fps').value,
ghq_fltr = id('ghq_fltr').value,
ghq_cmpr = 'Video-Glide64mk2[ghq_cmpr]=0',
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
ParallelCropOverscanTop = 'Video-Parallel[CropOverscanTop]=' + id('ParallelCropOverscanTop').value,
ParallelCropOverscanLeft = 'Video-Parallel[CropOverscanLeft]=' + id('ParallelCropOverscanLeft').value,
ParallelCropOverscanRight = 'Video-Parallel[CropOverscanRight]=' + id('ParallelCropOverscanRight').value,
ParallelCropOverscanBottom = 'Video-Parallel[CropOverscanBottom]=' + id('ParallelCropOverscanBottom').value,
ParallelVerticalStretch = 'Video-Parallel[VerticalStretch]=' + id('ParallelVerticalStretch').value,
txCacheSize = 'Video-GLideN64[txCacheSize]=' + id('txCacheSize').value,
txHiresVramLimit = 'Video-GLideN64[txHiresVramLimit]=' + id('txHiresVramLimit').value,
GammaCorrectionLevel = 'Video-GLideN64[GammaCorrectionLevel]=' + id('GammaCorrectionLevel').value,
fontName = 'Video-GLideN64[fontName]=font.ttf',
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
SharedDataPath = 'Core[SharedDataPath]=data',
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
KbdMappingSpeedLimiterToggle = 'CoreEvents[Kbd Mapping Speed Limiter Toggle]=' + id('KbdMappingSpeedLimiterToggle').dataset.key,
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
hkStrongCRC = 'Video-GLideN64[hkStrongCRC]=' + id('hkStrongCRC').value,
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
analogdeadzone1 = 'Input-SDL-Control1[AnalogDeadzone]=' + AnalogDeadzone1.value + ',' + AnalogDeadzone1.value,
analogdeadzone2 = 'Input-SDL-Control2[AnalogDeadzone]=' + AnalogDeadzone2.value + ',' + AnalogDeadzone2.value,
analogdeadzone3 = 'Input-SDL-Control3[AnalogDeadzone]=' + AnalogDeadzone3.value + ',' + AnalogDeadzone3.value,
analogdeadzone4 = 'Input-SDL-Control4[AnalogDeadzone]=' + AnalogDeadzone4.value + ',' + AnalogDeadzone4.value,
analogpeak1 = 'Input-SDL-Control1[AnalogPeak]=' + AnalogPeak1.value + ',' + AnalogPeak1.value,
analogpeak2 = 'Input-SDL-Control2[AnalogPeak]=' + AnalogPeak2.value + ',' + AnalogPeak2.value,
analogpeak3 = 'Input-SDL-Control3[AnalogPeak]=' + AnalogPeak3.value + ',' + AnalogPeak3.value,
analogpeak4 = 'Input-SDL-Control4[AnalogPeak]=' + AnalogPeak4.value + ',' + AnalogPeak4.value,
mouse1 = 'Input-SDL-Control1[mouse]=' + id('mouse1').checked,
mouse2 = 'Input-SDL-Control2[mouse]=' + id('mouse2').checked,
mouse3 = 'Input-SDL-Control3[mouse]=' + id('mouse3').checked,
mouse4 = 'Input-SDL-Control4[mouse]=' + id('mouse4').checked,
mb1 = id('mb1').value,
mb2 = id('mb2').value,
mb3 = id('mb3').value,
msensitivity1 = 'Input-SDL-Control1[MouseSensitivity]=' + MouseSensitivityX.value + ',' + MouseSensitivityY.value,
msensitivity2 = 'Input-SDL-Control2[MouseSensitivity]=' + MouseSensitivityX.value + ',' + MouseSensitivityY.value,
msensitivity3 = 'Input-SDL-Control3[MouseSensitivity]=' + MouseSensitivityX.value + ',' + MouseSensitivityY.value,
msensitivity4 = 'Input-SDL-Control4[MouseSensitivity]=' + MouseSensitivityX.value + ',' + MouseSensitivityY.value,

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

StickU1value = id('StickU1c').value.replace(regjoy,''),
StickL1value = id('StickL1c').value.replace(regjoy,''),
StickR1value = id('StickR1c').value.replace(regjoy,''),
StickD1value = id('StickD1c').value.replace(regjoy,''),
StickU1bvalue = id('StickU1cb').value.replace(regjoy,''),
StickL1bvalue = id('StickL1cb').value.replace(regjoy,''),
StickR1bvalue = id('StickR1cb').value.replace(regjoy,''),
StickD1bvalue = id('StickD1cb').value.replace(regjoy,''),
StickU2value = id('StickU2c').value.replace(regjoy,''),
StickL2value = id('StickL2c').value.replace(regjoy,''),
StickR2value = id('StickR2c').value.replace(regjoy,''),
StickD2value = id('StickD2c').value.replace(regjoy,''),
StickU2bvalue = id('StickU2cb').value.replace(regjoy,''),
StickL2bvalue = id('StickL2cb').value.replace(regjoy,''),
StickR2bvalue = id('StickR2cb').value.replace(regjoy,''),
StickD2bvalue = id('StickD2cb').value.replace(regjoy,''),
StickU3value = id('StickU3c').value.replace(regjoy,''),
StickL3value = id('StickL3c').value.replace(regjoy,''),
StickR3value = id('StickR3c').value.replace(regjoy,''),
StickD3value = id('StickD3c').value.replace(regjoy,''),
StickU3bvalue = id('StickU3cb').value.replace(regjoy,''),
StickL3bvalue = id('StickL3cb').value.replace(regjoy,''),
StickR3bvalue = id('StickR3cb').value.replace(regjoy,''),
StickD3bvalue = id('StickD3cb').value.replace(regjoy,''),
StickU4value = id('StickU4c').value.replace(regjoy,''),
StickL4value = id('StickL4c').value.replace(regjoy,''),
StickR4value = id('StickR4c').value.replace(regjoy,''),
StickD4value = id('StickD4c').value.replace(regjoy,''),
StickU4bvalue = id('StickU4cb').value.replace(regjoy,''),
StickL4bvalue = id('StickL4cb').value.replace(regjoy,''),
StickR4bvalue = id('StickR4cb').value.replace(regjoy,''),
StickD4bvalue = id('StickD4cb').value.replace(regjoy,''),

buttonType1 = buttonType1B = buttonType2 = buttonType2B = buttonType3 = buttonType3B = buttonType4 = buttonType4B = '',

gcaSettings = "control_stick_deadzone = " + id('control_stick_deadzone').value + "\n" + "control_stick_sensitivity = " + id('control_stick_sensitivity').value + "\n" + "c_stick_deadzone = " + id('c_stick_deadzone').value + "\n" + "trigger_threshold = " + id('trigger_threshold').value + "\n\n" + '[controller_mapping]' + "\n" + "a = '" + id('a').value + "'\n" + "b = '" + id('b').value + "'\n" + "x = '" + id('x').value + "'\n" + "y = '" + id('y').value + "'\n" + "start = '" + id('start').value + "'\n" + "z = '" + id('z').value + "'\n" + "l = '" + id('l').value + "'\n" + "r = '" + id('r').value + "'\n" + "d_pad_left = '" + id('d_pad_left').value + "'\n" + "d_pad_right = '" + id('d_pad_right').value + "'\n" + "d_pad_down = '" + id('d_pad_down').value + "'\n" + "d_pad_up = '" + id('d_pad_up').value + "'\n" + "c_stick_left = '" + id('c_stick_left').value + "'\n" + "c_stick_right = '" + id('c_stick_right').value + "'\n" + "c_stick_down = '" + id('c_stick_down').value + "'\n" + "c_stick_up = '" + id('c_stick_up').value + "'";

if(gfx.includes('angrylion') || gfx.includes('parallel')){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=false';parallelGFX = 'RSP-Parallel[DisplayListToGraphicsPlugin]=false';z64GFX = 'rsp-z64[DisplayListToGraphicsPlugin]=false'} /* prevent crashes caused by wrong RSP settings */
else if(gfx.includes('rice') || gfx.includes('glide64mk2')){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=true';parallelGFX = 'RSP-Parallel[DisplayListToGraphicsPlugin]=true';z64GFX = 'rsp-z64[DisplayListToGraphicsPlugin]=true'}
if((gfx.includes('angrylion') || gfx.includes('parallel')) && rsp.includes('rsp-hle')){rsp = 'mupen64plus-rsp-parallel' + ext}

if(id('nospeedlimit').checked){audio = 'dummy';vsync = 'Video-General[VerticalSync]=false';ViVsync = 'Video-AngrylionPlus[ViVsync]=false';ParallelVSync = 'Video-Parallel[Vsync]=false'} /* force muted audio and disabled V-Sync */



if(name1.includes('Keyboard'))device1 = 'Input-SDL-Control1[device]=-1' /* controller 1 */
if(id('StickU1c').value.includes('axis') || id('StickL1c').value.includes('axis') || id('StickR1c').value.includes('axis') || id('StickD1c').value.includes('axis'))buttonType1 = 'axis'
if(id('StickU1cb').value.includes('axis') || id('StickL1cb').value.includes('axis') || id('StickR1cb').value.includes('axis') || id('StickD1cb').value.includes('axis'))buttonType1B = 'axis'
if(id('StickU1c').value.includes('button') || id('StickL1c').value.includes('button') || id('StickR1c').value.includes('button') || id('StickD1c').value.includes('button'))buttonType1 = 'button'
if(id('StickU1cb').value.includes('button') || id('StickL1cb').value.includes('button') || id('StickR1cb').value.includes('button') || id('StickD1cb').value.includes('button'))buttonType1B = 'button'
if(id('StickU1c').value.includes('hat') || id('StickL1c').value.includes('hat') || id('StickR1c').value.includes('hat') || id('StickD1c').value.includes('hat'))buttonType1 = 'hat'
if(id('StickU1cb').value.includes('hat') || id('StickL1cb').value.includes('hat') || id('StickR1cb').value.includes('hat') || id('StickD1cb').value.includes('hat'))buttonType1B = 'hat'
AButton1 += 'key(' + id('AButton1').dataset.key + ') ' + id('AButton1c').value + ' ' + id('AButton1cb').value;
BButton1 += 'key(' + id('BButton1').dataset.key + ') ' + id('BButton1c').value + ' ' + id('BButton1cb').value;
LTrig1 += 'key(' + id('LTrig1').dataset.key + ') ' + id('LTrig1c').value + ' ' + id('LTrig1cb').value;
RTrig1 += 'key(' + id('RTrig1').dataset.key + ') ' + id('RTrig1c').value + ' ' + id('RTrig1cb').value;
ZTrig1 += 'key(' + id('ZTrig1').dataset.key + ') ' + id('ZTrig1c').value + ' ' + id('ZTrig1cb').value;
Start1 += 'key(' + id('Start1').dataset.key + ') ' + id('Start1c').value + ' ' + id('Start1cb').value;
DPadU1 += 'key(' + id('DPadU1').dataset.key + ') ' + id('DPadU1c').value + ' ' + id('DPadU1cb').value;
DPadL1 += 'key(' + id('DPadL1').dataset.key + ') ' + id('DPadL1c').value + ' ' + id('DPadL1cb').value;
DPadR1 += 'key(' + id('DPadR1').dataset.key + ') ' + id('DPadR1c').value + ' ' + id('DPadR1cb').value;
DPadD1 += 'key(' + id('DPadD1').dataset.key + ') ' + id('DPadD1c').value + ' ' + id('DPadD1cb').value;
CButtonU1 += 'key(' + id('CButtonU1').dataset.key + ') ' + id('CButtonU1c').value + ' ' + id('CButtonU1cb').value;
CButtonL1 += 'key(' + id('CButtonL1').dataset.key + ') ' + id('CButtonL1c').value + ' ' + id('CButtonL1cb').value;
CButtonR1 += 'key(' + id('CButtonR1').dataset.key + ') ' + id('CButtonR1c').value + ' ' + id('CButtonR1cb').value;
CButtonD1 += 'key(' + id('CButtonD1').dataset.key + ') ' + id('CButtonD1c').value + ' ' + id('CButtonD1cb').value;
MempakSwitch1 += 'key(' + id('MempakSwitch1').dataset.key + ') ' + id('MempakSwitch1c').value + ' ' + id('MempakSwitch1cb').value;
RumblepakSwitch1 += 'key(' + id('RumblepakSwitch1').dataset.key + ') ' + id('RumblepakSwitch1c').value + ' ' + id('RumblepakSwitch1cb').value;
XAxis1 += 'key(' + id('StickL1').dataset.key + ',' + id('StickR1').dataset.key + ') ' + buttonType1 + '(' + StickL1value + ',' + StickR1value + ')' + ' ' + buttonType1B + '(' + StickL1bvalue + ',' + StickR1bvalue + ')';
YAxis1 += 'key(' + id('StickU1').dataset.key + ',' + id('StickD1').dataset.key + ') ' + buttonType1 + '(' + StickU1value + ',' + StickD1value + ')' + ' ' + buttonType1B + '(' + StickU1bvalue + ',' + StickD1bvalue + ')';



if(name2.includes('Keyboard'))device2 = 'Input-SDL-Control2[device]=-1' /* controller 2 */
if(id('StickU2c').value.includes('axis') || id('StickL2c').value.includes('axis') || id('StickR2c').value.includes('axis') || id('StickD2c').value.includes('axis'))buttonType2 = 'axis'
if(id('StickU2cb').value.includes('axis') || id('StickL2cb').value.includes('axis') || id('StickR2cb').value.includes('axis') || id('StickD2cb').value.includes('axis'))buttonType2B = 'axis'
if(id('StickU2c').value.includes('button') || id('StickL2c').value.includes('button') || id('StickR2c').value.includes('button') || id('StickD2c').value.includes('button'))buttonType2 = 'button'
if(id('StickU2cb').value.includes('button') || id('StickL2cb').value.includes('button') || id('StickR2cb').value.includes('button') || id('StickD2cb').value.includes('button'))buttonType2B = 'button'
if(id('StickU2c').value.includes('hat') || id('StickL2c').value.includes('hat') || id('StickR2c').value.includes('hat') || id('StickD2c').value.includes('hat'))buttonType2 = 'hat'
if(id('StickU2cb').value.includes('hat') || id('StickL2cb').value.includes('hat') || id('StickR2cb').value.includes('hat') || id('StickD2cb').value.includes('hat'))buttonType2B = 'hat'
AButton2 += 'key(' + id('AButton2').dataset.key + ') ' + id('AButton2c').value + ' ' + id('AButton2cb').value;
BButton2 += 'key(' + id('BButton2').dataset.key + ') ' + id('BButton2c').value + ' ' + id('BButton2cb').value;
LTrig2 += 'key(' + id('LTrig2').dataset.key + ') ' + id('LTrig2c').value + ' ' + id('LTrig2cb').value;
RTrig2 += 'key(' + id('RTrig2').dataset.key + ') ' + id('RTrig2c').value + ' ' + id('RTrig2cb').value;
ZTrig2 += 'key(' + id('ZTrig2').dataset.key + ') ' + id('ZTrig2c').value + ' ' + id('ZTrig2cb').value;
Start2 += 'key(' + id('Start2').dataset.key + ') ' + id('Start2c').value + ' ' + id('Start2cb').value;
DPadU2 += 'key(' + id('DPadU2').dataset.key + ') ' + id('DPadU2c').value + ' ' + id('DPadU2cb').value;
DPadL2 += 'key(' + id('DPadL2').dataset.key + ') ' + id('DPadL2c').value + ' ' + id('DPadL2cb').value;
DPadR2 += 'key(' + id('DPadR2').dataset.key + ') ' + id('DPadR2c').value + ' ' + id('DPadR2cb').value;
DPadD2 += 'key(' + id('DPadD2').dataset.key + ') ' + id('DPadD2c').value + ' ' + id('DPadD2cb').value;
CButtonU2 += 'key(' + id('CButtonU2').dataset.key + ') ' + id('CButtonU2c').value + ' ' + id('CButtonU2cb').value;
CButtonL2 += 'key(' + id('CButtonL2').dataset.key + ') ' + id('CButtonL2c').value + ' ' + id('CButtonL2cb').value;
CButtonR2 += 'key(' + id('CButtonR2').dataset.key + ') ' + id('CButtonR2c').value + ' ' + id('CButtonR2cb').value;
CButtonD2 += 'key(' + id('CButtonD2').dataset.key + ') ' + id('CButtonD2c').value + ' ' + id('CButtonD2cb').value;
MempakSwitch2 += 'key(' + id('MempakSwitch2').dataset.key + ') ' + id('MempakSwitch2c').value + ' ' + id('MempakSwitch2cb').value;
RumblepakSwitch2 += 'key(' + id('RumblepakSwitch2').dataset.key + ') ' + id('RumblepakSwitch2c').value + ' ' + id('RumblepakSwitch2cb').value;
XAxis2 += 'key(' + id('StickL2').dataset.key + ',' + id('StickR2').dataset.key + ') ' + buttonType2 + '(' + StickL2value + ',' + StickR2value + ')' + ' ' + buttonType2B + '(' + StickL2bvalue + ',' + StickR2bvalue + ')';
YAxis2 += 'key(' + id('StickU2').dataset.key + ',' + id('StickD2').dataset.key + ') ' + buttonType2 + '(' + StickU2value + ',' + StickD2value + ')' + ' ' + buttonType2B + '(' + StickU2bvalue + ',' + StickD2bvalue + ')';



if(name3.includes('Keyboard'))device3 = 'Input-SDL-Control3[device]=-1' /* controller 3 */
if(id('StickU3c').value.includes('axis') || id('StickL3c').value.includes('axis') || id('StickR3c').value.includes('axis') || id('StickD3c').value.includes('axis'))buttonType3 = 'axis'
if(id('StickU3cb').value.includes('axis') || id('StickL3cb').value.includes('axis') || id('StickR3cb').value.includes('axis') || id('StickD3cb').value.includes('axis'))buttonType3B = 'axis'
if(id('StickU3c').value.includes('button') || id('StickL3c').value.includes('button') || id('StickR3c').value.includes('button') || id('StickD3c').value.includes('button'))buttonType3 = 'button'
if(id('StickU3cb').value.includes('button') || id('StickL3cb').value.includes('button') || id('StickR3cb').value.includes('button') || id('StickD3cb').value.includes('button'))buttonType3B = 'button'
if(id('StickU3c').value.includes('hat') || id('StickL3c').value.includes('hat') || id('StickR3c').value.includes('hat') || id('StickD3c').value.includes('hat'))buttonType3 = 'hat'
if(id('StickU3cb').value.includes('hat') || id('StickL3cb').value.includes('hat') || id('StickR3cb').value.includes('hat') || id('StickD3cb').value.includes('hat'))buttonType3B = 'hat'
AButton3 += 'key(' + id('AButton3').dataset.key + ') ' + id('AButton3c').value + ' ' + id('AButton3cb').value;
BButton3 += 'key(' + id('BButton3').dataset.key + ') ' + id('BButton3c').value + ' ' + id('BButton3cb').value;
LTrig3 += 'key(' + id('LTrig3').dataset.key + ') ' + id('LTrig3c').value + ' ' + id('LTrig3cb').value;
RTrig3 += 'key(' + id('RTrig3').dataset.key + ') ' + id('RTrig3c').value + ' ' + id('RTrig3cb').value;
ZTrig3 += 'key(' + id('ZTrig3').dataset.key + ') ' + id('ZTrig3c').value + ' ' + id('ZTrig3cb').value;
Start3 += 'key(' + id('Start3').dataset.key + ') ' + id('Start3c').value + ' ' + id('Start3cb').value;
DPadU3 += 'key(' + id('DPadU3').dataset.key + ') ' + id('DPadU3c').value + ' ' + id('DPadU3cb').value;
DPadL3 += 'key(' + id('DPadL3').dataset.key + ') ' + id('DPadL3c').value + ' ' + id('DPadL3cb').value;
DPadR3 += 'key(' + id('DPadR3').dataset.key + ') ' + id('DPadR3c').value + ' ' + id('DPadR3cb').value;
DPadD3 += 'key(' + id('DPadD3').dataset.key + ') ' + id('DPadD3c').value + ' ' + id('DPadD3cb').value;
CButtonU3 += 'key(' + id('CButtonU3').dataset.key + ') ' + id('CButtonU3c').value + ' ' + id('CButtonU3cb').value;
CButtonL3 += 'key(' + id('CButtonL3').dataset.key + ') ' + id('CButtonL3c').value + ' ' + id('CButtonL3cb').value;
CButtonR3 += 'key(' + id('CButtonR3').dataset.key + ') ' + id('CButtonR3c').value + ' ' + id('CButtonR3cb').value;
CButtonD3 += 'key(' + id('CButtonD3').dataset.key + ') ' + id('CButtonD3c').value + ' ' + id('CButtonD3cb').value;
MempakSwitch3 += 'key(' + id('MempakSwitch3').dataset.key + ') ' + id('MempakSwitch3c').value + ' ' + id('MempakSwitch3cb').value;
RumblepakSwitch3 += 'key(' + id('RumblepakSwitch3').dataset.key + ') ' + id('RumblepakSwitch3c').value + ' ' + id('RumblepakSwitch3cb').value;
XAxis3 += 'key(' + id('StickL3').dataset.key + ',' + id('StickR3').dataset.key + ') ' + buttonType3 + '(' + StickL3value + ',' + StickR3value + ')' + ' ' + buttonType3B + '(' + StickL3bvalue + ',' + StickR3bvalue + ')';
YAxis3 += 'key(' + id('StickU3').dataset.key + ',' + id('StickD3').dataset.key + ') ' + buttonType3 + '(' + StickU3value + ',' + StickD3value + ')' + ' ' + buttonType3B + '(' + StickU3bvalue + ',' + StickD3bvalue + ')';



if(name4.includes('Keyboard'))device4 = 'Input-SDL-Control4[device]=-1' /* controller 4 */
if(id('StickU4c').value.includes('axis') || id('StickL4c').value.includes('axis') || id('StickR4c').value.includes('axis') || id('StickD4c').value.includes('axis'))buttonType4 = 'axis'
if(id('StickU4cb').value.includes('axis') || id('StickL4cb').value.includes('axis') || id('StickR4cb').value.includes('axis') || id('StickD4cb').value.includes('axis'))buttonType4B = 'axis'
if(id('StickU4c').value.includes('button') || id('StickL4c').value.includes('button') || id('StickR4c').value.includes('button') || id('StickD4c').value.includes('button'))buttonType4 = 'button'
if(id('StickU4cb').value.includes('button') || id('StickL4cb').value.includes('button') || id('StickR4cb').value.includes('button') || id('StickD4cb').value.includes('button'))buttonType4B = 'button'
if(id('StickU4c').value.includes('hat') || id('StickL4c').value.includes('hat') || id('StickR4c').value.includes('hat') || id('StickD4c').value.includes('hat'))buttonType4 = 'hat'
if(id('StickU4cb').value.includes('hat') || id('StickL4cb').value.includes('hat') || id('StickR4cb').value.includes('hat') || id('StickD4cb').value.includes('hat'))buttonType4B = 'hat'
AButton4 += 'key(' + id('AButton4').dataset.key + ') ' + id('AButton4c').value + ' ' + id('AButton4cb').value;
BButton4 += 'key(' + id('BButton4').dataset.key + ') ' + id('BButton4c').value + ' ' + id('BButton4cb').value;
LTrig4 += 'key(' + id('LTrig4').dataset.key + ') ' + id('LTrig4c').value + ' ' + id('LTrig4cb').value;
RTrig4 += 'key(' + id('RTrig4').dataset.key + ') ' + id('RTrig4c').value + ' ' + id('RTrig4cb').value;
ZTrig4 += 'key(' + id('ZTrig4').dataset.key + ') ' + id('ZTrig4c').value + ' ' + id('ZTrig4cb').value;
Start4 += 'key(' + id('Start4').dataset.key + ') ' + id('Start4c').value + ' ' + id('Start4cb').value;
DPadU4 += 'key(' + id('DPadU4').dataset.key + ') ' + id('DPadU4c').value + ' ' + id('DPadU4cb').value;
DPadL4 += 'key(' + id('DPadL4').dataset.key + ') ' + id('DPadL4c').value + ' ' + id('DPadL4cb').value;
DPadR4 += 'key(' + id('DPadR4').dataset.key + ') ' + id('DPadR4c').value + ' ' + id('DPadR4cb').value;
DPadD4 += 'key(' + id('DPadD4').dataset.key + ') ' + id('DPadD4c').value + ' ' + id('DPadD4cb').value;
CButtonU4 += 'key(' + id('CButtonU4').dataset.key + ') ' + id('CButtonU4c').value + ' ' + id('CButtonU4cb').value;
CButtonL4 += 'key(' + id('CButtonL4').dataset.key + ') ' + id('CButtonL4c').value + ' ' + id('CButtonL4cb').value;
CButtonR4 += 'key(' + id('CButtonR4').dataset.key + ') ' + id('CButtonR4c').value + ' ' + id('CButtonR4cb').value;
CButtonD4 += 'key(' + id('CButtonD4').dataset.key + ') ' + id('CButtonD4c').value + ' ' + id('CButtonD4cb').value;
MempakSwitch4 += 'key(' + id('MempakSwitch4').dataset.key + ') ' + id('MempakSwitch4c').value + ' ' + id('MempakSwitch4cb').value;
RumblepakSwitch4 += 'key(' + id('RumblepakSwitch4').dataset.key + ') ' + id('RumblepakSwitch4c').value + ' ' + id('RumblepakSwitch4cb').value;
XAxis4 += 'key(' + id('StickL4').dataset.key + ',' + id('StickR4').dataset.key + ') ' + buttonType4 + '(' + StickL4value + ',' + StickR4value + ')' + ' ' + buttonType4B + '(' + StickL4bvalue + ',' + StickR4bvalue + ')';
YAxis4 += 'key(' + id('StickU4').dataset.key + ',' + id('StickD4').dataset.key + ') ' + buttonType4 + '(' + StickU4value + ',' + StickD4value + ')' + ' ' + buttonType4B + '(' + StickU4bvalue + ',' + StickD4bvalue + ')';



if(id('m1_1').checked){ /* mouse buttons 1 */
if(mb1 === 'a')AButton1 += ' mouse(1)'
if(mb1 === 'b')BButton1 += ' mouse(1)'
if(mb1 === 'l')LTrig1 += ' mouse(1)'
if(mb1 === 'r')RTrig1 += ' mouse(1)'
if(mb1 === 'z')ZTrig1 += ' mouse(1)'
if(mb1 === 'cr')CButtonR1 += ' mouse(1)'
if(mb1 === 'cl')CButtonL1 += ' mouse(1)'
if(mb1 === 'cd')CButtonD1 += ' mouse(1)'
if(mb1 === 'cu')CButtonU1 += ' mouse(1)'
if(mb1 === 'dpadr')DPadR1 += ' mouse(1)'
if(mb1 === 'dpadl')DPadL1 += ' mouse(1)'
if(mb1 === 'dpadd')DPadD1 += ' mouse(1)'
if(mb1 === 'dpadu')DPadU1 += ' mouse(1)'
if(mb1 === 'start')Start1 += ' mouse(1)'
if(mb1 === 'ms')MempakSwitch1 += ' mouse(1)'
if(mb1 === 'rs')RumblepakSwitch1 += ' mouse(1)'}
if(id('m2_1').checked){
if(mb2 === 'a')AButton1 += ' mouse(2)'
if(mb2 === 'b')BButton1 += ' mouse(2)'
if(mb2 === 'l')LTrig1 += ' mouse(2)'
if(mb2 === 'r')RTrig1 += ' mouse(2)'
if(mb2 === 'z')ZTrig1 += ' mouse(2)'
if(mb2 === 'cr')CButtonR1 += ' mouse(2)'
if(mb2 === 'cl')CButtonL1 += ' mouse(2)'
if(mb2 === 'cd')CButtonD1 += ' mouse(2)'
if(mb2 === 'cu')CButtonU1 += ' mouse(2)'
if(mb2 === 'dpadr')DPadR1 += ' mouse(2)'
if(mb2 === 'dpadl')DPadL1 += ' mouse(2)'
if(mb2 === 'dpadd')DPadD1 += ' mouse(2)'
if(mb2 === 'dpadu')DPadU1 += ' mouse(2)'
if(mb2 === 'start')Start1 += ' mouse(2)'
if(mb2 === 'ms')MempakSwitch1 += ' mouse(2)'
if(mb2 === 'rs')RumblepakSwitch1 += ' mouse(2)'}
if(id('m3_1').checked){
if(mb3 === 'a')AButton1 += ' mouse(3)'
if(mb3 === 'b')BButton1 += ' mouse(3)'
if(mb3 === 'l')LTrig1 += ' mouse(3)'
if(mb3 === 'r')RTrig1 += ' mouse(3)'
if(mb3 === 'z')ZTrig1 += ' mouse(3)'
if(mb3 === 'cr')CButtonR1 += ' mouse(3)'
if(mb3 === 'cl')CButtonL1 += ' mouse(3)'
if(mb3 === 'cd')CButtonD1 += ' mouse(3)'
if(mb3 === 'cu')CButtonU1 += ' mouse(3)'
if(mb3 === 'dpadr')DPadR1 += ' mouse(3)'
if(mb3 === 'dpadl')DPadL1 += ' mouse(3)'
if(mb3 === 'dpadd')DPadD1 += ' mouse(3)'
if(mb3 === 'dpadu')DPadU1 += ' mouse(3)'
if(mb3 === 'start')Start1 += ' mouse(3)'
if(mb3 === 'ms')MempakSwitch1 += ' mouse(3)'
if(mb3 === 'rs')RumblepakSwitch1 += ' mouse(3)'}



if(id('m1_2').checked){ /* mouse buttons 2 */
if(mb1 === 'a')AButton2 += ' mouse(1)'
if(mb1 === 'b')BButton2 += ' mouse(1)'
if(mb1 === 'l')LTrig2 += ' mouse(1)'
if(mb1 === 'r')RTrig2 += ' mouse(1)'
if(mb1 === 'z')ZTrig2 += ' mouse(1)'
if(mb1 === 'cr')CButtonR2 += ' mouse(1)'
if(mb1 === 'cl')CButtonL2 += ' mouse(1)'
if(mb1 === 'cd')CButtonD2 += ' mouse(1)'
if(mb1 === 'cu')CButtonU2 += ' mouse(1)'
if(mb1 === 'dpadr')DPadR2 += ' mouse(1)'
if(mb1 === 'dpadl')DPadL2 += ' mouse(1)'
if(mb1 === 'dpadd')DPadD2 += ' mouse(1)'
if(mb1 === 'dpadu')DPadU2 += ' mouse(1)'
if(mb1 === 'start')Start2 += ' mouse(1)'
if(mb1 === 'ms')MempakSwitch2 += ' mouse(1)'
if(mb1 === 'rs')RumblepakSwitch2 += ' mouse(1)'}
if(id('m2_2').checked){
if(mb2 === 'a')AButton2 += ' mouse(2)'
if(mb2 === 'b')BButton2 += ' mouse(2)'
if(mb2 === 'l')LTrig2 += ' mouse(2)'
if(mb2 === 'r')RTrig2 += ' mouse(2)'
if(mb2 === 'z')ZTrig2 += ' mouse(2)'
if(mb2 === 'cr')CButtonR2 += ' mouse(2)'
if(mb2 === 'cl')CButtonL2 += ' mouse(2)'
if(mb2 === 'cd')CButtonD2 += ' mouse(2)'
if(mb2 === 'cu')CButtonU2 += ' mouse(2)'
if(mb2 === 'dpadr')DPadR2 += ' mouse(2)'
if(mb2 === 'dpadl')DPadL2 += ' mouse(2)'
if(mb2 === 'dpadd')DPadD2 += ' mouse(2)'
if(mb2 === 'dpadu')DPadU2 += ' mouse(2)'
if(mb2 === 'start')Start2 += ' mouse(2)'
if(mb2 === 'ms')MempakSwitch2 += ' mouse(2)'
if(mb2 === 'rs')RumblepakSwitch2 += ' mouse(2)'}
if(id('m3_2').checked){
if(mb3 === 'a')AButton2 += ' mouse(3)'
if(mb3 === 'b')BButton2 += ' mouse(3)'
if(mb3 === 'l')LTrig2 += ' mouse(3)'
if(mb3 === 'r')RTrig2 += ' mouse(3)'
if(mb3 === 'z')ZTrig2 += ' mouse(3)'
if(mb3 === 'cr')CButtonR2 += ' mouse(3)'
if(mb3 === 'cl')CButtonL2 += ' mouse(3)'
if(mb3 === 'cd')CButtonD2 += ' mouse(3)'
if(mb3 === 'cu')CButtonU2 += ' mouse(3)'
if(mb3 === 'dpadr')DPadR2 += ' mouse(3)'
if(mb3 === 'dpadl')DPadL2 += ' mouse(3)'
if(mb3 === 'dpadd')DPadD2 += ' mouse(3)'
if(mb3 === 'dpadu')DPadU2 += ' mouse(3)'
if(mb3 === 'start')Start2 += ' mouse(3)'
if(mb3 === 'ms')MempakSwitch2 += ' mouse(3)'
if(mb3 === 'rs')RumblepakSwitch2 += ' mouse(3)'}



if(id('m1_3').checked){ /* mouse buttons 3 */
if(mb1 === 'a')AButton3 += ' mouse(1)'
if(mb1 === 'b')BButton3 += ' mouse(1)'
if(mb1 === 'l')LTrig3 += ' mouse(1)'
if(mb1 === 'r')RTrig3 += ' mouse(1)'
if(mb1 === 'z')ZTrig3 += ' mouse(1)'
if(mb1 === 'cr')CButtonR3 += ' mouse(1)'
if(mb1 === 'cl')CButtonL3 += ' mouse(1)'
if(mb1 === 'cd')CButtonD3 += ' mouse(1)'
if(mb1 === 'cu')CButtonU3 += ' mouse(1)'
if(mb1 === 'dpadr')DPadR3 += ' mouse(1)'
if(mb1 === 'dpadl')DPadL3 += ' mouse(1)'
if(mb1 === 'dpadd')DPadD3 += ' mouse(1)'
if(mb1 === 'dpadu')DPadU3 += ' mouse(1)'
if(mb1 === 'start')Start3 += ' mouse(1)'
if(mb1 === 'ms')MempakSwitch3 += ' mouse(1)'
if(mb1 === 'rs')RumblepakSwitch3 += ' mouse(1)'}
if(id('m2_3').checked){
if(mb2 === 'a')AButton3 += ' mouse(2)'
if(mb2 === 'b')BButton3 += ' mouse(2)'
if(mb2 === 'l')LTrig3 += ' mouse(2)'
if(mb2 === 'r')RTrig3 += ' mouse(2)'
if(mb2 === 'z')ZTrig3 += ' mouse(2)'
if(mb2 === 'cr')CButtonR3 += ' mouse(2)'
if(mb2 === 'cl')CButtonL3 += ' mouse(2)'
if(mb2 === 'cd')CButtonD3 += ' mouse(2)'
if(mb2 === 'cu')CButtonU3 += ' mouse(2)'
if(mb2 === 'dpadr')DPadR3 += ' mouse(2)'
if(mb2 === 'dpadl')DPadL3 += ' mouse(2)'
if(mb2 === 'dpadd')DPadD3 += ' mouse(2)'
if(mb2 === 'dpadu')DPadU3 += ' mouse(2)'
if(mb2 === 'start')Start3 += ' mouse(2)'
if(mb2 === 'ms')MempakSwitch3 += ' mouse(2)'
if(mb2 === 'rs')RumblepakSwitch3 += ' mouse(2)'}
if(id('m3_3').checked){
if(mb3 === 'a')AButton3 += ' mouse(3)'
if(mb3 === 'b')BButton3 += ' mouse(3)'
if(mb3 === 'l')LTrig3 += ' mouse(3)'
if(mb3 === 'r')RTrig3 += ' mouse(3)'
if(mb3 === 'z')ZTrig3 += ' mouse(3)'
if(mb3 === 'cr')CButtonR3 += ' mouse(3)'
if(mb3 === 'cl')CButtonL3 += ' mouse(3)'
if(mb3 === 'cd')CButtonD3 += ' mouse(3)'
if(mb3 === 'cu')CButtonU3 += ' mouse(3)'
if(mb3 === 'dpadr')DPadR3 += ' mouse(3)'
if(mb3 === 'dpadl')DPadL3 += ' mouse(3)'
if(mb3 === 'dpadd')DPadD3 += ' mouse(3)'
if(mb3 === 'dpadu')DPadU3 += ' mouse(3)'
if(mb3 === 'start')Start3 += ' mouse(3)'
if(mb3 === 'ms')MempakSwitch3 += ' mouse(3)'
if(mb3 === 'rs')RumblepakSwitch3 += ' mouse(3)'}



if(id('m1_4').checked){ /* mouse buttons 4 */
if(mb1 === 'a')AButton4 += ' mouse(1)'
if(mb1 === 'b')BButton4 += ' mouse(1)'
if(mb1 === 'l')LTrig4 += ' mouse(1)'
if(mb1 === 'r')RTrig4 += ' mouse(1)'
if(mb1 === 'z')ZTrig4 += ' mouse(1)'
if(mb1 === 'cr')CButtonR4 += ' mouse(1)'
if(mb1 === 'cl')CButtonL4 += ' mouse(1)'
if(mb1 === 'cd')CButtonD4 += ' mouse(1)'
if(mb1 === 'cu')CButtonU4 += ' mouse(1)'
if(mb1 === 'dpadr')DPadR4 += ' mouse(1)'
if(mb1 === 'dpadl')DPadL4 += ' mouse(1)'
if(mb1 === 'dpadd')DPadD4 += ' mouse(1)'
if(mb1 === 'dpadu')DPadU4 += ' mouse(1)'
if(mb1 === 'start')Start4 += ' mouse(1)'
if(mb1 === 'ms')MempakSwitch4 += ' mouse(1)'
if(mb1 === 'rs')RumblepakSwitch4 += ' mouse(1)'}
if(id('m2_4').checked){
if(mb2 === 'a')AButton4 += ' mouse(2)'
if(mb2 === 'b')BButton4 += ' mouse(2)'
if(mb2 === 'l')LTrig4 += ' mouse(2)'
if(mb2 === 'r')RTrig4 += ' mouse(2)'
if(mb2 === 'z')ZTrig4 += ' mouse(2)'
if(mb2 === 'cr')CButtonR4 += ' mouse(2)'
if(mb2 === 'cl')CButtonL4 += ' mouse(2)'
if(mb2 === 'cd')CButtonD4 += ' mouse(2)'
if(mb2 === 'cu')CButtonU4 += ' mouse(2)'
if(mb2 === 'dpadr')DPadR4 += ' mouse(2)'
if(mb2 === 'dpadl')DPadL4 += ' mouse(2)'
if(mb2 === 'dpadd')DPadD4 += ' mouse(2)'
if(mb2 === 'dpadu')DPadU4 += ' mouse(2)'
if(mb2 === 'start')Start4 += ' mouse(2)'
if(mb2 === 'ms')MempakSwitch4 += ' mouse(2)'
if(mb2 === 'rs')RumblepakSwitch4 += ' mouse(2)'}
if(id('m3_4').checked){
if(mb3 === 'a')AButton4 += ' mouse(3)'
if(mb3 === 'b')BButton4 += ' mouse(3)'
if(mb3 === 'l')LTrig4 += ' mouse(3)'
if(mb3 === 'r')RTrig4 += ' mouse(3)'
if(mb3 === 'z')ZTrig4 += ' mouse(3)'
if(mb3 === 'cr')CButtonR4 += ' mouse(3)'
if(mb3 === 'cl')CButtonL4 += ' mouse(3)'
if(mb3 === 'cd')CButtonD4 += ' mouse(3)'
if(mb3 === 'cu')CButtonU4 += ' mouse(3)'
if(mb3 === 'dpadr')DPadR4 += ' mouse(3)'
if(mb3 === 'dpadl')DPadL4 += ' mouse(3)'
if(mb3 === 'dpadd')DPadD4 += ' mouse(3)'
if(mb3 === 'dpadu')DPadU4 += ' mouse(3)'
if(mb3 === 'start')Start4 += ' mouse(3)'
if(mb3 === 'ms')MempakSwitch4 += ' mouse(3)'
if(mb3 === 'rs')RumblepakSwitch4 += ' mouse(3)'}



var core = ['--corelib',corelib,'--configdir',configdir,'--datadir','data','--plugindir','plugin','--gfx',gfx,'--audio',audio,'--input',input,'--rsp',rsp],

settings = [RspFallback,m64pJPG,cxd4GFX,m64pGFX,parallelGFX,z64GFX,cxd4Audio,m64pAudio,parallelAudio,z64Audio,WaitForCPUHost,SupportCPUSemaphoreLock, /* RSP */

exp,SaveFilenameFormat,osd,emumode,NoCompiledJump,CountPerOp,CountPerOpDenomPot,SiDmaDuration,AutoStateSlotIncrement,CurrentStateSlot,SharedDataPath,ScreenshotPathSetting,SaveStatePathSetting,SaveSRAMPathSetting,RandomizeInterrupt,EnableDebugger,SaveDiskFormat, /* Core */

IPLROMSetting,DiskSetting, /* 64DD */

fullscreen,ScreenWidth,ScreenHeight,vsync, /* Video */

DEFAULT_FREQUENCY,VOLUME_CONTROL_TYPE,SWAP_CHANNELS,PRIMARY_BUFFER_SIZE,PRIMARY_BUFFER_TARGET,SECONDARY_BUFFER_SIZE,RESAMPLE,VOLUME_ADJUST,VOLUME_DEFAULT,AUDIO_SYNC, /* Audio */

KbdMappingSlot0,KbdMappingSlot1,KbdMappingSlot2,KbdMappingSlot3,KbdMappingSlot4,KbdMappingSlot5,KbdMappingSlot6,KbdMappingSlot7,KbdMappingSlot8,KbdMappingSlot9,KbdMappingStop,KbdMappingFullscreen,KbdMappingSaveState,KbdMappingLoadState,KbdMappingIncrementSlot,KbdMappingReset,KbdMappingSpeedDown,KbdMappingSpeedUp,KbdMappingScreenshot,KbdMappingPause,KbdMappingMute,KbdMappingIncreaseVolume,KbdMappingDecreaseVolume,KbdMappingFastForward,KbdMappingSpeedLimiterToggle,KbdMappingFrameAdvance,KbdMappingGameshark, /* Keyboard Hotkeys */

JoyMappingStop,JoyMappingFullscreen,JoyMappingSaveState,JoyMappingLoadState,JoyMappingIncrementSlot,JoyMappingReset,JoyMappingSpeedDown,JoyMappingSpeedUp,JoyMappingScreenshot,JoyMappingPause,JoyMappingMute,JoyMappingIncreaseVolume,JoyMappingDecreaseVolume,JoyMappingFastForward,JoyMappingFrameAdvance,JoyMappingGameshark, /* Gamepad Hotkeys */

mode1,mode2,mode3,mode4,plugin1,plugin2,plugin3,plugin4,plugged1,plugged2,plugged3,plugged4,name1,name2,name3,name4,device1,device2,device3,device4,gbROM1Setting,gbROM2Setting,gbROM3Setting,gbROM4Setting,gbRAM1Setting,gbRAM2Setting,gbRAM3Setting,gbRAM4Setting, /* Input */

AButton1,BButton1,LTrig1,RTrig1,ZTrig1,Start1,DPadU1,DPadL1,DPadR1,DPadD1,CButtonU1,CButtonL1,CButtonR1,CButtonD1,MempakSwitch1,RumblepakSwitch1,XAxis1,YAxis1,analogdeadzone1,analogpeak1,mouse1,msensitivity1, /* Controller 1 */

AButton2,BButton2,LTrig2,RTrig2,ZTrig2,Start2,DPadU2,DPadL2,DPadR2,DPadD2,CButtonU2,CButtonL2,CButtonR2,CButtonD2,MempakSwitch2,RumblepakSwitch2,XAxis2,YAxis2,analogdeadzone2,analogpeak2,mouse2,msensitivity2, /* Controller 2 */

AButton3,BButton3,LTrig3,RTrig3,ZTrig3,Start3,DPadU3,DPadL3,DPadR3,DPadD3,CButtonU3,CButtonL3,CButtonR3,CButtonD3,MempakSwitch3,RumblepakSwitch3,XAxis3,YAxis3,analogdeadzone3,analogpeak3,mouse3,msensitivity3, /* Controller 3 */

AButton4,BButton4,LTrig4,RTrig4,ZTrig4,Start4,DPadU4,DPadL4,DPadR4,DPadD4,CButtonU4,CButtonL4,CButtonR4,CButtonD4,MempakSwitch4,RumblepakSwitch4,XAxis4,YAxis4,analogdeadzone4,analogpeak4,mouse4,msensitivity4, /* Controller 4 */

Parallel,NumWorkers,BusyLoop,ViMode,ViInterpolation,ViWidescreen,ViHideOverscan,ViIntegerScaling,ViVsync,DpCompat, /* Angrylion Plus */

threadedVideo,msaa,fxaa,aspectRatio,bufferSwapMode,useNativeResolutionFactor,bilinearMode,enableHalosRemoval,anisotropy,cache,txDump,txStrongCRC,txHiresEnable,txNoTextureFileStorage,EnableInaccurateTextureCoordinates,EnableDitheringPattern,EnableHiresNoiseDithering,DitheringQuantization,RDRAMImageDitheringMode,EnableLOD,EnableHWLighting,EnableCoverage,EnableClipping,EnableShadersStorage,EnableLegacyBlending,EnableHybridFilter,EnableCustomSettings,CorrectTexrectCoords,EnableNativeResTexrects,BackgroundsMode,EnableTexCoordBounds,EnableFBEmulation,EnableCopyAuxiliaryToRDRAM,EnableN64DepthCompare,ForceDepthBufferClear,DisableFBInfo,FBInfoReadColorChunk,FBInfoReadDepthChunk,EnableCopyColorToRDRAM,EnableCopyDepthToRDRAM,EnableCopyColorFromRDRAM,EnableCopyDepthToMainDepthBuffer,EnableOverscan,OverscanNtscTop,OverscanNtscLeft,OverscanNtscRight,OverscanNtscBottom,OverscanPalTop,OverscanPalLeft,OverscanPalRight,OverscanPalBottom,txFilterMode,txEnhancementMode,txDeposterize,txFilterIgnoreBG,txCacheSize,txHiresVramLimit,txHiresFullAlphaChannel,txHresAltCRC,txCacheCompression, txForce16bpp, txSaveCache,txPathSetting,txCachePathSetting,txDumpPathSetting,hkTexDump,hkStrongCRC,hkHdTexReload,hkHdTexToggle,hkInaccurateTexCords,hkVsync,hkFBEmulation,hkN64DepthCompare,hkOsdVis,hkOsdFps,hkOsdPercent,hkOsdInternalResolution,hkOsdRenderingResolution,hkTexCoordBounds,hkNativeResTexrects,hkForceGammaCorrection,ForceGammaCorrection,GammaCorrectionLevel,fontName,fontSize,fontColor,ShowFPS,ShowVIS,ShowPercent,ShowInternalResolution,ShowRenderingResolution,ShowStatistics,CountersPos, /* GLideN64 */

ParallelFullscreen,ParallelUpscaling,ParallelScreenWidth,ParallelScreenHeight,ParallelSuperscaledReads,ParallelSuperscaledDither,ParallelDeinterlaceMode,ParallelCropOverscanEnable,ParallelCropOverscanTop,ParallelCropOverscanLeft,ParallelCropOverscanRight,ParallelCropOverscanBottom,ParallelVerticalStretch,ParallelVIAA,ParallelDivot,ParallelGammaDither,ParallelVIBilerp,ParallelVIDither,ParallelDownScale,ParallelNativeTextLOD,ParallelNativeTextRECT,ParallelSynchronousRDP,ParallelWidescreenStretch,ParallelVSync, /* Parallel */

FrameBufferSetting,FrameBufferWriteBackControl,RenderToTexture,ScreenUpdateSetting,NormalAlphaBlender,FastTextureLoading,AccurateTextureMapping,InN64Resolution,SaveVRAM,DoubleSizeForSmallTxtrBuf,DefaultCombinerDisable,EnableHacks,WinFrameMode,FullTMEMEmulation,OpenGLVertexClipper,EnableSSE,SkipFrame,TexRectOnly,SmallTextureOnly,LoadHiResCRCOnly,LoadHiResTextures,DumpTexturesToFiles,RiceShowFPS,Mipmapping,FogMethod,ForceTextureFilter,TextureEnhancement,TextureEnhancementControl,TextureQuality,OpenGLDepthBufferSetting,RiceMultiSampling,ColorQuality,OpenGLRenderSetting,AnisotropicFiltering,ForcePolygonOffset,PolygonOffsetFactor,PolygonOffsetUnits, /* Rice */

Glide64VSync,wrpAntiAliasing,force_polygon_offset,polygon_offset_factor,polygon_offset_units,show_fps,clock,clock_24_hr,wrpFBO,wrpAnisotropic,ghq_fltr,ghq_cmpr,ghq_enht,ghq_hirs,ghq_enht_cmpr,ghq_enht_tile,ghq_enht_f16bpp,ghq_enht_gz,ghq_enht_nobg,ghq_hirs_cmpr,ghq_hirs_tile,ghq_hirs_f16bpp,ghq_hirs_gz,ghq_hirs_altcrc,ghq_cache_size,ghq_hirs_let_texartists_fly,alt_tex_size,use_sts1_only,force_calc_sphere,correct_viewport,increase_texrect_edge,decrease_fillrect_edge,texture_correction,pal230,force_microcheck,force_quad3d,clip_zmin,clip_zmax,fast_crc,adjust_aspect,zmode_compare_less,old_style_adither,n64_z_scale,optimize_texrect,ignore_aux_copy,hires_buf_clear,fb_read_alpha,useless_is_useless,fb_crc_mode,filtering,fog,buff_clear,swapmode,aspect,lodmode,fb_smart,fb_hires,fb_read_always,read_back_to_screen,detect_cpu_write,fb_get_info,fb_render], /* Glide64 MK2 */

cheats = [], activeCheats = '';

if(id('cheatList').textContent != ''){ /* activate cheats  */
var cheatInputs = id('cheatList').querySelectorAll('input[type=checkbox]');
for (var i = 0; i < cheatInputs.length; i++){var cheatInput = cheatInputs[i];checkCheats(cheatInput)}
function checkCheats(cheatInput){if(cheatInput.checked){var id = cheatInput.id.replace('_','-');activeCheats += id + ','}}
cheats = ['--cheats',activeCheats]}

settings = settings.flatMap((w,i) => (i+1) % 1 === 0 ? ['--set', w] : w) /* insert '--set' */

try {writeGCA(configdir,gcaSettings)} /* write GameCube adapter settings to file */
catch (e) {console.warn(e)}

const parameters = core.concat(settings,nospeedlimit,verbose,cheats,filePath), /* launch parameters */
child = emuLaunch(parameters);

})
})
