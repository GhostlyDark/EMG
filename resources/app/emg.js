document.addEventListener('DOMContentLoaded', function() {
var filePath,fileResult,archivePath,archiveResult,cheatRadio,txPath,txPathResult,txCachePath,txCachePathResult,txDumpPath,txDumpPathResult,workingDirectory,workingDirectoryResult,PIF,PIFResult,IPLROM,IPLROMResult,Disk,DiskResult,ScreenshotPath,ScreenshotPathResult,SaveStatePath,SaveStatePathResult,SaveSRAMPath,SaveSRAMPathResult,gbROM1,gbROM1Result,gbROM2,gbROM2Result,gbROM3,gbROM3Result,gbROM4,gbROM4Result,gbRAM1,gbRAM1Result,gbRAM2,gbRAM2Result,gbRAM3,gbRAM3Result,gbRAM4,gbRAM4Result,recentFiles = [];

const dialogDirectory = window.dialogDirectory,
dialogFile = window.dialogFile,
emuLaunch = window.emuLaunch,
listArchive = window.listArchive,
extractArchive = window.extractArchive,
returnPath = window.returnPath,
jstest = window.jstest,
showCheats = window.showCheats,
writeGCA = window.writeGCA,
hires_texture = window.hires_texture,
cache = window.cache,
texture_dump = window.texture_dump,
working_directory = window.working_directory,
textInputs = document.querySelectorAll("input[type='text']"),

regjoy = /axis|button|hat|\(|\)/g, regsplit = /\s*\n/, regradio = /^\s\s\s/g, regbox = /_.*/g, regkb = /key\(\)|key\(,\)/g,

keys = {32:1,33:1,34:1,35:1,36:1,37:1,38:1,39:1,40:1}, /* spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40 */

keyCodes = {0:'',3:'break',8:'backspace',9:'tab',12:'clear',13:'enter',16:'shift',17:'ctrl',18:'alt',19:'pause',20:'caps lock',27:'escape',32:'spacebar',33:'page up',34:'page down',35:'end',36:'home',37:'left arrow',38:'up arrow',39:'right arrow',40:'down arrow',45:'insert',46:'delete',47:'help',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',96:'numpad 0',97:'numpad 1',98:'numpad 2',99:'numpad 3',100:'numpad 4',101:'numpad 5',102:'numpad 6',103:'numpad 7',104:'numpad 8',105:'numpad 9',106:'numpad *',107:'numpad +',109:'numpad -',111:'numpad /',112:'f1',113:'f2',114:'f3',115:'f4',116:'f5',117:'f6',118:'f7',119:'f8',120:'f9',121:'f10',122:'f11',123:'f12',144:'num lock'}, /* HTML DOM keycodes to text */

keySyms = {0:0,3:318,8:8,9:9,12:12,13:13,16:304,17:306,18:308,19:19,20:301,27:27,32:32,33:280,34:281,35:279,36:278,37:276,38:273,39:275,40:274,45:277,46:127,47:315,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,65:97,66:98,67:99,68:100,69:101,70:102,71:103,72:104,73:105,74:106,75:107,76:108,77:109,78:110,79:111,80:112,81:113,82:114,83:115,84:116,85:117,86:118,87:119,88:120,89:121,90:122,96:256,97:257,98:258,99:259,100:260,101:261,102:262,103:263,104:264,105:265,106:268,107:270,109:269,111:267,112:282,113:283,114:284,115:285,116:286,117:287,118:288,119:289,120:290,121:291,122:292,123:293,144:300}, /* HTML DOM keycodes to SDL keysyms for mupen64plus hotkeys */

hotKeys = {0:'',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z'}, /* HTML DOM keycodes to GLideN64 hotkeys */

n64_buttons = ['AButton1','AButton2','AButton3','AButton4','BButton1','BButton2','BButton3','BButton4','LTrig1','LTrig2','LTrig3','LTrig4','RTrig1','RTrig2','RTrig3','RTrig4','ZTrig1','ZTrig2','ZTrig3','ZTrig4','Start1','Start2','Start3','Start4','DPadU1','DPadU2','DPadU3','DPadU4','DPadD1','DPadD2','DPadD3','DPadD4','DPadL1','DPadL2','DPadL3','DPadL4','DPadR1','DPadR2','DPadR3','DPadR4','StickU1','StickU2','StickU3','StickU4','StickD1','StickD2','StickD3','StickD4','StickL1','StickL2','StickL3','StickL4','StickR1','StickR2','StickR3','StickR4','CButtonU1','CButtonU2','CButtonU3','CButtonU4','CButtonD1','CButtonD2','CButtonD3','CButtonD4','CButtonL1','CButtonL2','CButtonL3','CButtonL4','CButtonR1','CButtonR2','CButtonR3','CButtonR4','MempakSwitch1','MempakSwitch2','MempakSwitch3','MempakSwitch4','RumblepakSwitch1','RumblepakSwitch2','RumblepakSwitch3','RumblepakSwitch4'],

gliden64_hotkeys = ['hkTexDump','hkHdTexReload','hkHdTexToggle','hkInaccurateTexCords','hkVsync','hkFBEmulation','hkN64DepthCompare','hkOsdVis','hkOsdFps','hkOsdPercent','hkOsdInternalResolution','hkOsdRenderingResolution','hkTexCoordBounds','hkNativeResTexrects','hkForceGammaCorrection'],

m64p_hotkeys = ['KbdMappingStop','KbdMappingSlot0','KbdMappingSlot1','KbdMappingSlot2','KbdMappingSlot3','KbdMappingSlot4','KbdMappingSlot5','KbdMappingSlot6','KbdMappingSlot7','KbdMappingSlot8','KbdMappingSlot9','KbdMappingFullscreen','KbdMappingSaveState','KbdMappingLoadState','KbdMappingIncrementSlot','KbdMappingReset','KbdMappingSpeedDown','KbdMappingSpeedUp','KbdMappingScreenshot','KbdMappingPause','KbdMappingMute','KbdMappingIncreaseVolume','KbdMappingDecreaseVolume','KbdMappingFastForward','KbdMappingFrameAdvance','KbdMappingGameshark'],

m64p_joykeys = [
'JoyMappingStop1','JoyMappingFullscreen1','JoyMappingSaveState1','JoyMappingLoadState1','JoyMappingIncrementSlot1','JoyMappingReset1','JoyMappingSpeedDown1','JoyMappingSpeedUp1','JoyMappingScreenshot1','JoyMappingPause1','JoyMappingMute1','JoyMappingIncreaseVolume1','JoyMappingDecreaseVolume1','JoyMappingFastForward1','JoyMappingFrameAdvance1','JoyMappingGameshark1',
'JoyMappingStop2','JoyMappingFullscreen2','JoyMappingSaveState2','JoyMappingLoadState2','JoyMappingIncrementSlot2','JoyMappingReset2','JoyMappingSpeedDown2','JoyMappingSpeedUp2','JoyMappingScreenshot2','JoyMappingPause2','JoyMappingMute2','JoyMappingIncreaseVolume2','JoyMappingDecreaseVolume2','JoyMappingFastForward2','JoyMappingFrameAdvance2','JoyMappingGameshark2',
'JoyMappingStop3','JoyMappingFullscreen3','JoyMappingSaveState3','JoyMappingLoadState3','JoyMappingIncrementSlot3','JoyMappingReset3','JoyMappingSpeedDown3','JoyMappingSpeedUp3','JoyMappingScreenshot3','JoyMappingPause3','JoyMappingMute3','JoyMappingIncreaseVolume3','JoyMappingDecreaseVolume3','JoyMappingFastForward3','JoyMappingFrameAdvance3','JoyMappingGameshark3',
'JoyMappingStop4','JoyMappingFullscreen4','JoyMappingSaveState4','JoyMappingLoadState4','JoyMappingIncrementSlot4','JoyMappingReset4','JoyMappingSpeedDown4','JoyMappingSpeedUp4','JoyMappingScreenshot4','JoyMappingPause4','JoyMappingMute4','JoyMappingIncreaseVolume4','JoyMappingDecreaseVolume4','JoyMappingFastForward4','JoyMappingFrameAdvance4','JoyMappingGameshark4'],

ranges = ['MouseSensitivity1X','MouseSensitivity1Y','MouseSensitivity2X','MouseSensitivity2Y','MouseSensitivity3X','MouseSensitivity3Y','MouseSensitivity4X','MouseSensitivity4Y','AnalogDeadzone1X','AnalogDeadzone1Y','AnalogDeadzone2X','AnalogDeadzone2Y','AnalogDeadzone3X','AnalogDeadzone3Y','AnalogDeadzone4X','AnalogDeadzone4Y','AnalogPeak1X','AnalogPeak1Y','AnalogPeak2X','AnalogPeak2Y','AnalogPeak3X','AnalogPeak3Y','AnalogPeak4X','AnalogPeak4Y'],

numbers = ['OverscanNtscTop','OverscanNtscLeft','OverscanNtscRight','OverscanNtscBottom','OverscanPalTop','OverscanPalLeft','OverscanPalRight','OverscanPalBottom','NumWorkers','ParallelCropOverscan','txCacheSize','txHiresVramLimit','GammaCorrectionLevel','fontSize','CountPerOp','CountPerOpDenomPot','SiDmaDuration','CurrentStateSlot','VOLUME_ADJUST','VOLUME_DEFAULT','PolygonOffsetFactor','PolygonOffsetUnits','polygon_offset_factor','polygon_offset_units','ghq_cache_size'],

dropdowns = [
'emumode','resolution','SaveDiskFormat', /* mupen64plus */
'gfx','audio','input','rsp','RspFallback', /* mupen64plus plugins */
'plugin1','plugin2','plugin3','plugin4','mode1','mode2','mode3','mode4','mouse1_1','mouse1_2','mouse1_3','mouse2_1','mouse2_2','mouse2_3','mouse3_1','mouse3_2','mouse3_3','mouse4_1','mouse4_2','mouse4_3', // mupen64plus-input
'DEFAULT_FREQUENCY','SECONDARY_BUFFER_SIZE','RESAMPLE', /* mupen64plus-audio */
'a','b','x','y','start','z','l','r','d_pad_left','d_pad_right','d_pad_down','d_pad_up','c_stick_left','c_stick_right','c_stick_down','c_stick_up', /* mupen64plus-input-gca */
'msaa','aspectRatio','bufferSwapMode','CountersPos','useNativeResolutionFactor','anisotropy','cache','RDRAMImageDitheringMode','CorrectTexrectCoords','EnableNativeResTexrects','BackgroundsMode','EnableN64DepthCompare','EnableCopyColorToRDRAM','EnableCopyDepthToRDRAM','txFilterMode','txEnhancementMode', /* GLideN64 */
'ViMode','ViInterpolation','DpCompat', /* Angrylion-Plus */
'ParallelUpscaling','ParallelDeinterlace','ParallelDownScale', /* Parallel */
'FrameBufferWriteBackControl','RenderToTexture','ScreenUpdateSetting','Mipmapping','ForceTextureFilter','TextureEnhancement','TextureEnhancementControl','TextureQuality','OpenGLDepthBufferSetting','RiceMultiSampling','ColorQuality','AnisotropicFiltering','wrpAntiAliasing', /* Rice */
'show_fps','ghq_fltr','ghq_cmpr','ghq_enht','alt_tex_size','use_sts1_only','force_calc_sphere','correct_viewport','increase_texrect_edge','decrease_fillrect_edge','texture_correction','pal230','force_microcheck','force_quad3d','clip_zmin','clip_zmax','fast_crc','adjust_aspect','zmode_compare_less','old_style_adither','n64_z_scale','optimize_texrect','ignore_aux_copy','hires_buf_clear','fb_read_alpha','useless_is_useless','fb_crc_mode','filtering','fog','buff_clear','swapmode','aspect','lodmode','fb_smart','fb_hires','fb_read_always','read_back_to_screen','detect_cpu_write','fb_get_info','fb_render' /* Glide64 MK2 */];



n64_buttons.forEach(n64_button => { // Keyboard input
var box = id(n64_button),
name = 'name1';
if(n64_button.includes(2)){name = 'name2'}
if(n64_button.includes(3)){name = 'name3'}
if(n64_button.includes(4)){name = 'name4'}

id('clear'+n64_button).addEventListener('click', function(){
box.value = '';
box.dataset.key = '0';
localStorage.removeItem(n64_button)})

if(localStorage.getItem(n64_button) != null){
box.value = keyCodes[localStorage.getItem(n64_button)];
box.dataset.key = keySyms[localStorage.getItem(n64_button)]}
box.addEventListener('keyup', function(e){id(name).value = 'Keyboard';localStorage.setItem(name,'Keyboard')
if(keyCodes[e.keyCode] != undefined){
box.value = keyCodes[e.keyCode];
box.dataset.key = keySyms[e.keyCode];
localStorage.setItem(n64_button, e.keyCode)}})})

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

dropdowns.forEach(dropdown => {
var drop = id(dropdown);
if(localStorage.getItem(dropdown) != null){drop.value = localStorage.getItem(dropdown)}
drop.addEventListener('change', function(){localStorage.setItem(dropdown, drop.options[drop.selectedIndex].value)})})

if(localStorage.getItem('rsp') != null){
if(localStorage.getItem('rsp') === 'mupen64plus-rsp-hle'){id('RspFallback').disabled = false;id('rspGFX').disabled = true;id('rspAudio').disabled = false;id('WaitForCPUHost').disabled = true;id('SupportCPUSemaphoreLock').disabled = true}
else if(localStorage.getItem('rsp') === 'mupen64plus-rsp-cxd4-sse2'){id('RspFallback').disabled = true;id('rspGFX').disabled = false;id('rspAudio').disabled = false;id('WaitForCPUHost').disabled = false;id('SupportCPUSemaphoreLock').disabled = false}
else if(localStorage.getItem('rsp') === 'mupen64plus-rsp-parallel'){id('RspFallback').disabled = true;id('rspGFX').disabled = true;id('rspAudio').disabled = true;id('WaitForCPUHost').disabled = true;id('SupportCPUSemaphoreLock').disabled = true}}
function rspDropdownDisable(){
if(id('rsp').value === 'mupen64plus-rsp-hle'){id('RspFallback').disabled = false;id('rspGFX').disabled = true;id('rspAudio').disabled = false;id('WaitForCPUHost').disabled = true;id('SupportCPUSemaphoreLock').disabled = true}
else if(id('rsp').value === 'mupen64plus-rsp-cxd4-sse2'){id('RspFallback').disabled = true;id('rspGFX').disabled = false;id('rspAudio').disabled = false;id('WaitForCPUHost').disabled = false;id('SupportCPUSemaphoreLock').disabled = false}
else if(id('rsp').value === 'mupen64plus-rsp-parallel'){id('RspFallback').disabled = true;id('rspGFX').disabled = true;id('rspAudio').disabled = true;id('WaitForCPUHost').disabled = true;id('SupportCPUSemaphoreLock').disabled = true}}
id('rsp').addEventListener('change', function(){rspDropdownDisable()})
rspDropdownDisable();

ranges.forEach(range => {
var range_input = id(range),
range_reset = id('reset'+range),
range_text = id(range+'Text'),
range_value = '2';
if(range.includes('AnalogDeadzone')){range_value = '4096'}
else if(range.includes('AnalogPeak')){range_value = '32768'}

range_reset.addEventListener('click', function(){range_input.value = range_value;localStorage.removeItem(range);range_text.innerHTML = range_input.value})
if(localStorage.getItem(range) != null){range_input.value = localStorage.getItem(range);range_text.innerHTML = range_input.value}
range_input.addEventListener('change', function(){localStorage.setItem(range, range_input.value);range_text.innerHTML = range_input.value})})

id('NumWorkers').max = window.navigator.hardwareConcurrency;
numbers.forEach(number => {
var number_input = id(number),
number_decrease = id('decrease'+number),
number_increase = id('increase'+number),
digits = 0;
if(number_input.step.includes('.'))digits=2;

if(localStorage.getItem(number) != null){number_input.value = localStorage.getItem(number)}
number_input.addEventListener('change', function(){localStorage.setItem(number, number_input.value)})
number_input.addEventListener('keydown', function(e){e.preventDefault()})

number_decrease.addEventListener('click', function(){if(number_input.value != number_input.min){
if(number_input.id === 'SiDmaDuration' && number_input.value === '0'){number_input.value = '-1'}
else{number_input.value = (parseFloat(number_input.value) - number_input.step*1).toFixed(digits)}
localStorage.setItem(number, number_input.value)}})

number_increase.addEventListener('click', function(){if(number_input.value != number_input.max){
if(number_input.id === 'SiDmaDuration' && number_input.value === '-1'){number_input.value = '0'}
else{number_input.value = (parseFloat(number_input.value) + number_input.step*1).toFixed(digits)}
localStorage.setItem(number, number_input.value)}})})



if(localStorage.getItem('name1') != null){id('name1').value = localStorage.getItem('name1')}
id('name1').addEventListener('change', function(){localStorage.setItem('name1', id('name1').value)})
id('resetname1').addEventListener('click', function(){id('name1').value = 'Keyboard';localStorage.setItem('name1','Keyboard')})

if(localStorage.getItem('name2') != null){id('name2').value = localStorage.getItem('name2')}
id('name2').addEventListener('change', function(){localStorage.setItem('name2', id('name2').value)})
id('resetname2').addEventListener('click', function(){id('name2').value = 'Keyboard';localStorage.setItem('name2','Keyboard')})

if(localStorage.getItem('name3') != null){id('name3').value = localStorage.getItem('name3')}
id('name3').addEventListener('change', function(){localStorage.setItem('name3', id('name3').value)})
id('resetname3').addEventListener('click', function(){id('name3').value = 'Keyboard';localStorage.setItem('name3','Keyboard')})

if(localStorage.getItem('name4') != null){id('name4').value = localStorage.getItem('name4')}
id('name4').addEventListener('change', function(){localStorage.setItem('name4', id('name4').value)})
id('resetname4').addEventListener('click', function(){id('name4').value = 'Keyboard';localStorage.setItem('name4','Keyboard')})



function txNoTextureFileStorageDisable(){if(id('txNoTextureFileStorage').checked){id('cache').disabled = true}else{id('cache').disabled = false}}
if(localStorage.getItem('txNoTextureFileStorage') != 'null'){if(localStorage.getItem('txNoTextureFileStorage') === 'true'){id('cache').disabled = true}}
id('txNoTextureFileStorage').addEventListener('change', function(){txNoTextureFileStorageDisable()})

function mode1Disable(){if(id('mode1').value === 'Input-SDL-Control1[mode]=2'){id('plugged1').disabled = true;id('name1').disabled = true}else{id('plugged1').disabled = false;id('name1').disabled = false}}
if(localStorage.getItem('mode1') != 'null'){if(localStorage.getItem('mode1') === 'Input-SDL-Control1[mode]=2'){id('plugged1').disabled = true;id('name1').disabled = true}}
id('mode1').addEventListener('change', function(){mode1Disable()})
mode1Disable();

function mode2Disable(){if(id('mode2').value === 'Input-SDL-Control2[mode]=2'){id('plugged2').disabled = true;id('name2').disabled = true}else{id('plugged2').disabled = false;id('name2').disabled = false}}
if(localStorage.getItem('mode2') != 'null'){if(localStorage.getItem('mode2') === 'Input-SDL-Control2[mode]=2'){id('plugged2').disabled = true;id('name2').disabled = true}}
id('mode2').addEventListener('change', function(){mode2Disable()})
mode2Disable();

function mode3Disable(){if(id('mode3').value === 'Input-SDL-Control3[mode]=2'){id('plugged3').disabled = true;id('name3').disabled = true}else{id('plugged3').disabled = false;id('name3').disabled = false}}
if(localStorage.getItem('mode3') != 'null'){if(localStorage.getItem('mode3') === 'Input-SDL-Control3[mode]=2'){id('plugged3').disabled = true;id('name3').disabled = true}}
id('mode3').addEventListener('change', function(){mode3Disable()})
mode3Disable();

function mode4Disable(){if(id('mode4').value === 'Input-SDL-Control4[mode]=2'){id('plugged4').disabled = true;id('name4').disabled = true}else{id('plugged4').disabled = false;id('name4').disabled = false}}
if(localStorage.getItem('mode4') != 'null'){if(localStorage.getItem('mode4') === 'Input-SDL-Control4[mode]=2'){id('plugged4').disabled = true;id('name4').disabled = true}}
id('mode4').addEventListener('change', function(){mode4Disable()})
mode4Disable();

id('mouse1').addEventListener('change', function(){mouse1Disable()})
mouse1Disable()
function mouse1Disable(){
if(!id('mouse1').checked){id('mouse1_1').disabled = true;id('mouse1_2').disabled = true;id('mouse1_3').disabled = true;id('MouseSensitivity1X').disabled = true;id('MouseSensitivity1Y').disabled = true}
else{id('mouse1_1').disabled = false;id('mouse1_2').disabled = false;id('mouse1_3').disabled = false;id('MouseSensitivity1X').disabled = false;id('MouseSensitivity1Y').disabled = false}}

id('mouse2').addEventListener('change', function(){mouse2Disable()})
mouse2Disable()
function mouse2Disable(){
if(!id('mouse2').checked){id('mouse2_1').disabled = true;id('mouse2_2').disabled = true;id('mouse2_3').disabled = true;id('MouseSensitivity2X').disabled = true;id('MouseSensitivity2Y').disabled = true}
else{id('mouse2_1').disabled = false;id('mouse2_2').disabled = false;id('mouse2_3').disabled = false;id('MouseSensitivity2X').disabled = false;id('MouseSensitivity2Y').disabled = false}}

id('mouse3').addEventListener('change', function(){mouse3Disable()})
mouse3Disable()
function mouse3Disable(){
if(!id('mouse3').checked){id('mouse3_1').disabled = true;id('mouse3_2').disabled = true;id('mouse3_3').disabled = true;id('MouseSensitivity3X').disabled = true;id('MouseSensitivity3Y').disabled = true}
else{id('mouse3_1').disabled = false;id('mouse3_2').disabled = false;id('mouse3_3').disabled = false;id('MouseSensitivity3X').disabled = false;id('MouseSensitivity3Y').disabled = false}}

id('mouse4').addEventListener('change', function(){mouse4Disable()})
mouse4Disable()
function mouse4Disable(){
if(!id('mouse4').checked){id('mouse4_1').disabled = true;id('mouse4_2').disabled = true;id('mouse4_3').disabled = true;id('MouseSensitivity4X').disabled = true;id('MouseSensitivity4Y').disabled = true}
else{id('mouse4_1').disabled = false;id('mouse4_2').disabled = false;id('mouse4_3').disabled = false;id('MouseSensitivity4X').disabled = false;id('MouseSensitivity4Y').disabled = false}}



if(localStorage.getItem('recentFiles') != null){recentFiles = JSON.parse(localStorage.getItem('recentFiles'))}
if(localStorage.getItem('filePath') != null){filePath = localStorage.getItem('filePath');id('fileText').innerHTML = filePath}
if(localStorage.getItem('archivePath') != null){archivePath = localStorage.getItem('archivePath');id('archiveText').innerHTML = archivePath}

id('extractROM').addEventListener('click', function(){
if(archivePath != undefined){
let list = listArchive(archivePath);
var datastring = list.replace(/.*  /g,''),
datasplit = datastring.split(regsplit);
if(list === ''){return}else{let unzip = extractArchive(archivePath,workingDirectory)}
datasplit.forEach(rom => ROMFiles(rom));
function ROMFiles(rom){if(rom != ''){
let pathToROM = returnPath(workingDirectory,rom);
if(!recentFiles.includes(pathToROM))recentFiles.unshift(pathToROM);recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}}
id('recent').selectedIndex = '1';
filePath = id('option0').value;id('fileText').innerHTML = filePath;localStorage.setItem('filePath', filePath)}})

id('fileInput').addEventListener('click', function(){
fileResult = dialogFile({name:'N64 ROM',extensions:['n64','v64','z64']});
if(fileResult != undefined){filePath = fileResult;id('fileText').innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath.toString()))recentFiles.unshift(filePath.toString());recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}})
	
id('archiveInput').addEventListener('click', function(){
archiveResult = dialogFile({name:'ROM Archive',extensions:['7z','rar','zip']});
if(archiveResult != undefined){archivePath = archiveResult;id('archiveText').innerHTML = archivePath;localStorage.setItem('archivePath',archivePath)}})

function recentFilesUpdate(){
id('optionDefault').selected = true;
if(recentFiles[0] != null){id('option0').value = recentFiles[0];id('option0').innerHTML = '1. ' + recentFiles[0]}
if(recentFiles[1] != null){id('option1').value = recentFiles[1];id('option1').innerHTML = '2. ' + recentFiles[1]}
if(recentFiles[2] != null){id('option2').value = recentFiles[2];id('option2').innerHTML = '3. ' + recentFiles[2]}
if(recentFiles[3] != null){id('option3').value = recentFiles[3];id('option3').innerHTML = '4. ' + recentFiles[3]}
if(recentFiles[4] != null){id('option4').value = recentFiles[4];id('option4').innerHTML = '5. ' + recentFiles[4]}
if(recentFiles[5] != null){id('option5').value = recentFiles[5];id('option5').innerHTML = '6. ' + recentFiles[5]}
if(recentFiles[6] != null){id('option6').value = recentFiles[6];id('option6').innerHTML = '7. ' + recentFiles[6]}
if(recentFiles[7] != null){id('option7').value = recentFiles[7];id('option7').innerHTML = '8. ' + recentFiles[7]}
if(recentFiles[8] != null){id('option8').value = recentFiles[8];id('option8').innerHTML = '9. ' + recentFiles[8]}
if(recentFiles[9] != null){id('option9').value = recentFiles[9];id('option9').innerHTML = '10. ' + recentFiles[9]}}
recentFilesUpdate()
id('recent').addEventListener('change', function(){
if(id('recent').value != null && id('recent').value != ''){filePath = id('recent').value;id('fileText').innerHTML = filePath;localStorage.setItem('filePath', filePath);if(!recentFiles.includes(filePath))recentFiles.unshift(filePath);recentFiles.splice(10);localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}})

id('clearRecent').addEventListener('click', function(){
recentFiles = [];
localStorage.removeItem('recentFiles');
id('optionDefault').selected = true;
id('option0').value = '';id('option0').innerHTML = '';
id('option1').value = '';id('option1').innerHTML = '';
id('option2').value = '';id('option2').innerHTML = '';
id('option3').value = '';id('option3').innerHTML = '';
id('option4').value = '';id('option4').innerHTML = '';
id('option5').value = '';id('option5').innerHTML = '';
id('option6').value = '';id('option6').innerHTML = '';
id('option7').value = '';id('option7').innerHTML = '';
id('option8').value = '';id('option8').innerHTML = '';
id('option9').value = '';id('option9').innerHTML = ''})



id('listCheats').addEventListener('click', function(){
id('cheatList').innerHTML = '';
const parameters = ['--cheats','list',filePath],
child = showCheats(parameters);
var datastring = child.replace(/^((?!UI-Console\:\s\s\s\s*\d).)*$/gm,''),
datafilter = datastring.replace(/UI-Console\:\s\s\s\s/gm,''),
dataremove = datafilter.replace(/\r/gm,'');
datasplit = dataremove.split(regsplit);
datasplit.forEach(e => cheat(e));
function cheat(e){if(e != ''){
var cheatCheckbox,cheat;
cheatCheckbox = e.replace(/\:.*/g,'');
if(!e.match(regradio)){cheatRadio = cheatCheckbox}
if(e.match(regradio)){cheatCheckbox = cheatCheckbox.replace(regradio,cheatRadio + '_')}
if(cheatCheckbox.includes('_')){id(cheatCheckbox.replace(regbox,'')).disabled = true}
cheat = "<input id='" + cheatCheckbox + "' type='checkbox'><label for='" + cheatCheckbox + "'>" + e.replace(regradio,'') + "</label>";
id('cheatList').innerHTML += cheat + '<br><br>';
if(cheatCheckbox.includes('_')){var radioBox = id('cheatList').querySelector('#' + CSS.escape(cheatCheckbox));radioBox.classList.add('radio')}
}}
if(id('cheatList').innerHTML === ''){id('cheatList').innerHTML = 'No cheats for this ROM found.'}
})

id('cheatList').addEventListener('change', function(e){
if(e.target.classList.contains('radio')){
var id = e.target.id.replace(regbox,'_');
const radioBoxes = document.querySelectorAll('.radio');
for (var i = 0; i < radioBoxes.length; i++){var box = radioBoxes[i];if(box.id.includes(id)){if(box.id != e.target.id)box.checked = false}}}})



function noScroll(e){if(keys[e.keyCode]){e.preventDefault();return false}}
for (var i = 0; i < textInputs.length; i++){var textInput = textInputs[i];preventScroll(textInput)}
function preventScroll(textInput){
textInput.addEventListener('focus',(e) => {window.addEventListener('keydown',noScroll,false)})
textInput.addEventListener('blur',(e) => {window.removeEventListener('keydown',noScroll,false)})}
id('name1').addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})
id('name2').addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})
id('name3').addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})
id('name4').addEventListener('focus',(e) => {window.removeEventListener('keydown',noScroll,false)})

function removeShow(){
if(id('mainSettings').classList.contains('active'))id('mainSettings').classList.remove('active');
if(id('inputSettings').classList.contains('active'))id('inputSettings').classList.remove('active');
if(id('videoSettings').classList.contains('active'))id('videoSettings').classList.remove('active');
if(id('mainSettingsDropdown').classList.contains('show'))id('mainSettingsDropdown').classList.remove('show');
if(id('inputSettingsDropdown').classList.contains('show'))id('inputSettingsDropdown').classList.remove('show');
if(id('videoSettingsDropdown').classList.contains('show'))id('videoSettingsDropdown').classList.remove('show')}

id('mainSettings').addEventListener('click', function(){
if(id('mainSettingsDropdown').classList.contains('show')){removeShow()}
else{removeShow();id('mainSettingsDropdown').classList.toggle('show');id('mainSettings').classList.toggle('active')}})
id('inputSettings').addEventListener('click', function(){
if(id('inputSettingsDropdown').classList.contains('show')){removeShow()}
else{removeShow();id('inputSettingsDropdown').classList.toggle('show');id('inputSettings').classList.toggle('active')}})
id('videoSettings').addEventListener('click', function(){
if(id('videoSettingsDropdown').classList.contains('show')){removeShow()}
else{removeShow();id('videoSettingsDropdown').classList.toggle('show');id('videoSettings').classList.toggle('active')}})

window.onclick = function(e){if(!e.target.matches('.dropbutton')){removeShow()}}



function prevent(e){e.preventDefault();e.stopPropagation()}
function fileExtension(fpath,ext){ext = fpath.slice((fpath.lastIndexOf(".") - 1 >>> 0) + 2);return ext}

function ROMInput(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'n64' || fileExtension(fPath) === 'v64' || fileExtension(fPath) === 'z64'){
filePath = fPath;id('fileText').innerHTML = fPath;localStorage.setItem('filePath', fPath);if(!recentFiles.includes(filePath))recentFiles.unshift(filePath);recentFiles.splice(10);recentFilesUpdate();localStorage.setItem('recentFiles',JSON.stringify(recentFiles));if(id('cheatList').innerHTML!='')id('cheatList').innerHTML=''}}}
id('fileInput').addEventListener('drop', handleDropROM, false)
id('fileInput').addEventListener('dragover', prevent, false)
function handleDropROM(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;ROMInput(fPath)}}

function ArchiveInput(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === '7z' || fileExtension(fPath) === 'rar' || fileExtension(fPath) === 'zip'){
archivePath = fPath;id('archiveText').innerHTML = fPath;localStorage.setItem('archivePath', fPath)}}}
id('archiveInput').addEventListener('drop', handleDropArchive, false)
id('archiveInput').addEventListener('dragover', prevent, false)
function handleDropArchive(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;ArchiveInput(fPath)}}

function PIFFile(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'n64' || fileExtension(fPath) === 'v64' || fileExtension(fPath) === 'z64' || fileExtension(fPath) === 'bin' || fileExtension(fPath) === 'rom'){
PIF = fPath;id('PIFText').innerHTML = fPath;localStorage.setItem('PIF', fPath)}}}
id('PIF').addEventListener('drop', handleDropPIF, false)
id('PIF').addEventListener('dragover', prevent, false)
function handleDropPIF(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;PIFFile(fPath)}}

function IPLROMFile(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'n64' || fileExtension(fPath) === 'v64' || fileExtension(fPath) === 'z64' || fileExtension(fPath) === 'bin' || fileExtension(fPath) === 'rom'){
IPLROM = fPath;id('IPLROMText').innerHTML = fPath;localStorage.setItem('IPLROM', fPath)}}}
id('IPLROM').addEventListener('drop', handleDropIPLROM, false)
id('IPLROM').addEventListener('dragover', prevent, false)
function handleDropIPLROM(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;IPLROMFile(fPath)}}

function DiskFile(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'ndd'){
Disk = fPath;id('DiskText').innerHTML = fPath;localStorage.setItem('Disk', fPath)}}}
id('Disk').addEventListener('drop', handleDropDisk, false)
id('Disk').addEventListener('dragover', prevent, false)
function handleDropDisk(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;DiskFile(fPath)}}

function gbROM1File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
gbROM1 = fPath;id('gbROM1Text').innerHTML = fPath;localStorage.setItem('gbROM1', fPath)}}}
id('gbROM1').addEventListener('drop', handleDropgbROM1, false)
id('gbROM1').addEventListener('dragover', prevent, false)
function handleDropgbROM1(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM1File(fPath)}}

function gbROM2File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
gbROM2 = fPath;id('gbROM2Text').innerHTML = fPath;localStorage.setItem('gbROM2', fPath)}}}
id('gbROM2').addEventListener('drop', handleDropgbROM2, false)
id('gbROM2').addEventListener('dragover', prevent, false)
function handleDropgbROM2(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM2File(fPath)}}

function gbROM3File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
gbROM3 = fPath;id('gbROM3Text').innerHTML = fPath;localStorage.setItem('gbROM3', fPath)}}}
id('gbROM3').addEventListener('drop', handleDropgbROM3, false)
id('gbROM3').addEventListener('dragover', prevent, false)
function handleDropgbROM3(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM3File(fPath)}}

function gbROM4File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'gb' || fileExtension(fPath) === 'gbc'){
gbROM4 = fPath;id('gbROM4Text').innerHTML = fPath;localStorage.setItem('gbROM4', fPath)}}}
id('gbROM4').addEventListener('drop', handleDropgbROM4, false)
id('gbROM4').addEventListener('dragover', prevent, false)
function handleDropgbROM4(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbROM4File(fPath)}}

function gbRAM1File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
gbRAM1 = fPath;id('gbRAM1Text').innerHTML = fPath;localStorage.setItem('gbRAM1', fPath)}}}
id('gbRAM1').addEventListener('drop', handleDropgbRAM1, false)
id('gbRAM1').addEventListener('dragover', prevent, false)
function handleDropgbRAM1(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM1File(fPath)}}

function gbRAM2File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
gbRAM2 = fPath;id('gbRAM2Text').innerHTML = fPath;localStorage.setItem('gbRAM2', fPath)}}}
id('gbRAM2').addEventListener('drop', handleDropgbRAM2, false)
id('gbRAM2').addEventListener('dragover', prevent, false)
function handleDropgbRAM2(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM2File(fPath)}}

function gbRAM3File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
gbRAM3 = fPath;id('gbRAM3Text').innerHTML = fPath;localStorage.setItem('gbRAM3', fPath)}}}
id('gbRAM3').addEventListener('drop', handleDropgbRAM3, false)
id('gbRAM3').addEventListener('dragover', prevent, false)
function handleDropgbRAM3(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM3File(fPath)}}

function gbRAM4File(fPath){
if(fPath != undefined){
if(fileExtension(fPath) === 'sav'){
gbRAM4 = fPath;id('gbRAM4Text').innerHTML = fPath;localStorage.setItem('gbRAM4', fPath)}}}
id('gbRAM4').addEventListener('drop', handleDropgbRAM4, false)
id('gbRAM4').addEventListener('dragover', prevent, false)
function handleDropgbRAM4(e) {prevent(e);
if(e.dataTransfer.files[0] === undefined)return
else{fPath = e.dataTransfer.files[0].path;gbRAM4File(fPath)}}



id('clearPIF').addEventListener('click', function(){PIF = '';id('PIFText').innerHTML = '';localStorage.removeItem('PIF')})
if(localStorage.getItem('PIF') === null){PIF = '';id('PIFText').innerHTML = PIF}
if(localStorage.getItem('PIF') != null){PIF = localStorage.getItem('PIF');id('PIFText').innerHTML = PIF}
id('PIF').addEventListener('click', function(){
PIFResult = dialogFile({name:'64DD IPL',extensions:['n64','v64','z64','bin','rom']})
if(PIFResult != undefined){PIF = PIFResult.toString();id('PIFText').innerHTML = PIF;localStorage.setItem('PIF', PIF)}})

id('clearIPLROM').addEventListener('click', function(){IPLROM = '';id('IPLROMText').innerHTML = '';localStorage.removeItem('IPLROM')})
if(localStorage.getItem('IPLROM') === null){IPLROM = '';id('IPLROMText').innerHTML = IPLROM}
if(localStorage.getItem('IPLROM') != null){IPLROM = localStorage.getItem('IPLROM');id('IPLROMText').innerHTML = IPLROM}
id('IPLROM').addEventListener('click', function(){
IPLROMResult = dialogFile({name:'64DD IPL',extensions:['n64','v64','z64','bin','rom']})
if(IPLROMResult != undefined){IPLROM = IPLROMResult.toString();id('IPLROMText').innerHTML = IPLROM;localStorage.setItem('IPLROM', IPLROM)}})

id('clearDisk').addEventListener('click', function(){Disk = '';id('DiskText').innerHTML = '';localStorage.removeItem('Disk')})
if(localStorage.getItem('Disk') === null){Disk = '';id('DiskText').innerHTML = Disk}
if(localStorage.getItem('Disk') != null){Disk = localStorage.getItem('Disk');id('DiskText').innerHTML = Disk}
id('Disk').addEventListener('click', function(){
DiskResult = dialogFile({name:'64DD Disk',extensions:['ndd']})
if(DiskResult != undefined){Disk = DiskResult.toString();id('DiskText').innerHTML = Disk;localStorage.setItem('Disk', Disk)}})

id('cleargbROM1').addEventListener('click', function(){gbROM1 = '';id('gbROM1Text').innerHTML = '';localStorage.removeItem('gbROM1')})
if(localStorage.getItem('gbROM1') === null){gbROM1 = '';id('gbROM1Text').innerHTML = gbROM1}
if(localStorage.getItem('gbROM1') != null){gbROM1 = localStorage.getItem('gbROM1');id('gbROM1Text').innerHTML = gbROM1}
id('gbROM1').addEventListener('click', function(){
gbROM1Result = dialogFile({name:'GB ROM',extensions:['gb','gbc']})
if(gbROM1Result != undefined){gbROM1 = gbROM1Result.toString();id('gbROM1Text').innerHTML = gbROM1;localStorage.setItem('gbROM1', gbROM1)}})

id('cleargbROM2').addEventListener('click', function(){gbROM2 = '';id('gbROM2Text').innerHTML = '';localStorage.removeItem('gbROM2')})
if(localStorage.getItem('gbROM2') === null){gbROM2 = '';id('gbROM2Text').innerHTML = gbROM2}
if(localStorage.getItem('gbROM2') != null){gbROM2 = localStorage.getItem('gbROM2');id('gbROM2Text').innerHTML = gbROM2}
id('gbROM2').addEventListener('click', function(){
gbROM2Result = dialogFile({name:'GB ROM',extensions:['gb','gbc']})
if(gbROM2Result != undefined){gbROM2 = gbROM2Result.toString();id('gbROM2Text').innerHTML = gbROM2;localStorage.setItem('gbROM2', gbROM2)}})

id('cleargbROM3').addEventListener('click', function(){gbROM3 = '';id('gbROM3Text').innerHTML = '';localStorage.removeItem('gbROM3')})
if(localStorage.getItem('gbROM3') === null){gbROM3 = '';id('gbROM3Text').innerHTML = gbROM3}
if(localStorage.getItem('gbROM3') != null){gbROM3 = localStorage.getItem('gbROM3');id('gbROM3Text').innerHTML = gbROM3}
id('gbROM3').addEventListener('click', function(){
gbROM3Result = dialogFile({name:'GB ROM',extensions:['gb','gbc']})
if(gbROM3Result != undefined){gbROM3 = gbROM3Result.toString();id('gbROM3Text').innerHTML = gbROM3;localStorage.setItem('gbROM3', gbROM3)}})

id('cleargbROM4').addEventListener('click', function(){gbROM4 = '';id('gbROM4Text').innerHTML = '';localStorage.removeItem('gbROM4')})
if(localStorage.getItem('gbROM4') === null){gbROM4 = '';id('gbROM4Text').innerHTML = gbROM4}
if(localStorage.getItem('gbROM4') != null){gbROM4 = localStorage.getItem('gbROM4');id('gbROM4Text').innerHTML = gbROM4}
id('gbROM4').addEventListener('click', function(){
gbROM4Result = dialogFile({name:'GB ROM',extensions:['gb','gbc']})
if(gbROM4Result != undefined){gbROM4 = gbROM4Result.toString();id('gbROM4Text').innerHTML = gbROM4;localStorage.setItem('gbROM4', gbROM4)}})

id('cleargbRAM1').addEventListener('click', function(){gbRAM1 = '';id('gbRAM1Text').innerHTML = '';localStorage.removeItem('gbRAM1')})
if(localStorage.getItem('gbRAM1') === null){gbRAM1 = '';id('gbRAM1Text').innerHTML = gbRAM1}
if(localStorage.getItem('gbRAM1') != null){gbRAM1 = localStorage.getItem('gbRAM1');id('gbRAM1Text').innerHTML = gbRAM1}
id('gbRAM1').addEventListener('click', function(){
gbRAM1Result = dialogFile({name:'GB Save File',extensions:['sav']})
if(gbRAM1Result != undefined){gbRAM1 = gbRAM1Result.toString();id('gbRAM1Text').innerHTML = gbRAM1;localStorage.setItem('gbRAM1', gbRAM1)}})

id('cleargbRAM2').addEventListener('click', function(){gbRAM2 = '';id('gbRAM2Text').innerHTML = '';localStorage.removeItem('gbRAM2')})
if(localStorage.getItem('gbRAM2') === null){gbRAM2 = '';id('gbRAM2Text').innerHTML = gbRAM2}
if(localStorage.getItem('gbRAM2') != null){gbRAM2 = localStorage.getItem('gbRAM2');id('gbRAM2Text').innerHTML = gbRAM2}
id('gbRAM2').addEventListener('click', function(){
gbRAM2Result = dialogFile({name:'GB Save File',extensions:['sav']})
if(gbRAM2Result != undefined){gbRAM2 = gbRAM2Result.toString();id('gbRAM2Text').innerHTML = gbRAM2;localStorage.setItem('gbRAM2', gbRAM2)}})

id('cleargbRAM3').addEventListener('click', function(){gbRAM3 = '';id('gbRAM3Text').innerHTML = '';localStorage.removeItem('gbRAM3')})
if(localStorage.getItem('gbRAM3') === null){gbRAM3 = '';id('gbRAM3Text').innerHTML = gbRAM3}
if(localStorage.getItem('gbRAM3') != null){gbRAM3 = localStorage.getItem('gbRAM3');id('gbRAM3Text').innerHTML = gbRAM3}
id('gbRAM3').addEventListener('click', function(){
gbRAM3Result = dialogFile({name:'GB Save File',extensions:['sav']})
if(gbRAM3Result != undefined){gbRAM3 = gbRAM3Result.toString();id('gbRAM3Text').innerHTML = gbRAM3;localStorage.setItem('gbRAM3', gbRAM3)}})

id('cleargbRAM4').addEventListener('click', function(){gbRAM4 = '';id('gbRAM4Text').innerHTML = '';localStorage.removeItem('gbRAM4')})
if(localStorage.getItem('gbRAM4') === null){gbRAM4 = '';id('gbRAM4Text').innerHTML = gbRAM4}
if(localStorage.getItem('gbRAM4') != null){gbRAM4 = localStorage.getItem('gbRAM4');id('gbRAM4Text').innerHTML = gbRAM4}
id('gbRAM4').addEventListener('click', function(){
gbRAM4Result = dialogFile({name:'GB Save File',extensions:['sav']})
if(gbRAM4Result != undefined){gbRAM4 = gbRAM4Result.toString();id('gbRAM4Text').innerHTML = gbRAM4;localStorage.setItem('gbRAM4', gbRAM4)}})

id('resetScreenshotPath').addEventListener('click', function(){ScreenshotPath = '';id('ScreenshotPathText').innerHTML = '';localStorage.removeItem('ScreenshotPath')})
if(localStorage.getItem('ScreenshotPath') === null){ScreenshotPath = '';id('ScreenshotPathText').innerHTML = ScreenshotPath}
if(localStorage.getItem('ScreenshotPath') != null){ScreenshotPath = localStorage.getItem('ScreenshotPath');id('ScreenshotPathText').innerHTML = ScreenshotPath}
id('ScreenshotPath').addEventListener('click', function(){
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



function joystick(joyinput){jstest(joyinput,id('name1'),id('name2'),id('name3'),id('name4'))}

n64_buttons.forEach(n64_button => { // Joystick input
var n64_button = n64_button+'c',
box = id(n64_button),
n64_button_b = n64_button+'b',
boxB = id(n64_button_b);

box.addEventListener('click', function(){joystick(box)})
boxB.addEventListener('click', function(){joystick(boxB)})
if(localStorage.getItem(n64_button) != null){box.value = localStorage.getItem(n64_button)}
if(localStorage.getItem(n64_button_b) != null){boxB.value = localStorage.getItem(n64_button_b)}
id('clear'+n64_button).addEventListener('click', function(){box.value = '';localStorage.removeItem(n64_button);boxB.value = '';localStorage.removeItem(n64_button_b)})})

m64p_joykeys.forEach(joykey => { // mupen64plus joystick hotkeys
var box = id(joykey);
box.addEventListener('click', function(){joystick(box)})
if(localStorage.getItem(joykey) != null){box.value = localStorage.getItem(joykey)}
id('clear'+joykey).addEventListener('click', function(){box.value = '';localStorage.removeItem(joykey)})})



id('resetcontrol_stick_deadzone').addEventListener('click', function(){id('control_stick_deadzone').value = '20';localStorage.removeItem('control_stick_deadzone');id('control_stick_deadzoneText').innerHTML = id('control_stick_deadzone').value})
if(localStorage.getItem('control_stick_deadzone') != null){id('control_stick_deadzone').value = localStorage.getItem('control_stick_deadzone');id('control_stick_deadzoneText').innerHTML = id('control_stick_deadzone').value}
id('control_stick_deadzone').addEventListener('change', function(){localStorage.setItem('control_stick_deadzone', id('control_stick_deadzone').value);id('control_stick_deadzoneText').innerHTML = id('control_stick_deadzone').value})

id('resetcontrol_stick_sensitivity').addEventListener('click', function(){id('control_stick_sensitivity').value = '180';localStorage.removeItem('control_stick_sensitivity');id('control_stick_sensitivityText').innerHTML = id('control_stick_sensitivity').value})
if(localStorage.getItem('control_stick_sensitivity') != null){id('control_stick_sensitivity').value = localStorage.getItem('control_stick_sensitivity');id('control_stick_sensitivityText').innerHTML = id('control_stick_sensitivity').value}
id('control_stick_sensitivity').addEventListener('change', function(){localStorage.setItem('control_stick_sensitivity', id('control_stick_sensitivity').value);id('control_stick_sensitivityText').innerHTML = id('control_stick_sensitivity').value})

id('resetc_stick_deadzone').addEventListener('click', function(){id('c_stick_deadzone').value = '40';localStorage.removeItem('c_stick_deadzone');id('c_stick_deadzoneText').innerHTML = id('c_stick_deadzone').value})
if(localStorage.getItem('c_stick_deadzone') != null){id('c_stick_deadzone').value = localStorage.getItem('c_stick_deadzone');id('c_stick_deadzoneText').innerHTML = id('c_stick_deadzone').value}
id('c_stick_deadzone').addEventListener('change', function(){localStorage.setItem('c_stick_deadzone', id('c_stick_deadzone').value);id('c_stick_deadzoneText').innerHTML = id('c_stick_deadzone').value})

id('resettrigger_threshold').addEventListener('click', function(){id('trigger_threshold').value = '168';localStorage.removeItem('trigger_threshold');id('trigger_thresholdText').innerHTML = id('trigger_threshold').value})
if(localStorage.getItem('trigger_threshold') != null){id('trigger_threshold').value = localStorage.getItem('trigger_threshold');id('trigger_thresholdText').innerHTML = id('trigger_threshold').value}
id('trigger_threshold').addEventListener('change', function(){localStorage.setItem('trigger_threshold', id('trigger_threshold').value);id('trigger_thresholdText').innerHTML = id('trigger_threshold').value})

id('resetfontColor').addEventListener('click', function(){fontColor = '#B5E61D';id('fontColor').value = '#B5E61D';localStorage.removeItem('fontColor')})
if(localStorage.getItem('fontColor') != null){id('fontColor').value = localStorage.getItem('fontColor')}
id('fontColor').addEventListener('change', function(){localStorage.setItem('fontColor', id('fontColor').value)})



if(localStorage.getItem('hkULActive') != null && localStorage.getItem('hkDIVActive') != null){
currentHK(id(localStorage.getItem('hkULActive')),id(localStorage.getItem('hkDIVActive')))}

function currentHK(currentUL,currentDIV){
if(id('ul_hk_keyboard').classList.contains('active'))id('ul_hk_keyboard').classList.remove('active');
if(id('ul_hk_controller1').classList.contains('active'))id('ul_hk_controller1').classList.remove('active');
if(id('ul_hk_controller2').classList.contains('active'))id('ul_hk_controller2').classList.remove('active');
if(id('ul_hk_controller3').classList.contains('active'))id('ul_hk_controller3').classList.remove('active');
if(id('ul_hk_controller4').classList.contains('active'))id('ul_hk_controller4').classList.remove('active');
if(!id('hk_keyboard').classList.contains('hide'))id('hk_keyboard').classList.add('hide');
if(!id('hk_controller1').classList.contains('hide'))id('hk_controller1').classList.add('hide');
if(!id('hk_controller2').classList.contains('hide'))id('hk_controller2').classList.add('hide');
if(!id('hk_controller3').classList.contains('hide'))id('hk_controller3').classList.add('hide');
if(!id('hk_controller4').classList.contains('hide'))id('hk_controller4').classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('hkULActive',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('hkDIVActive',currentDIV.id)}

id('ul_hk_keyboard').addEventListener('click', function(){currentHK(id('ul_hk_keyboard'),id('hk_keyboard'))})
id('ul_hk_controller1').addEventListener('click', function(){currentHK(id('ul_hk_controller1'),id('hk_controller1'))})
id('ul_hk_controller2').addEventListener('click', function(){currentHK(id('ul_hk_controller2'),id('hk_controller2'))})
id('ul_hk_controller3').addEventListener('click', function(){currentHK(id('ul_hk_controller3'),id('hk_controller3'))})
id('ul_hk_controller4').addEventListener('click', function(){currentHK(id('ul_hk_controller4'),id('hk_controller4'))})

if(localStorage.getItem('cULActive1') != null && localStorage.getItem('cDIVActive1') != null){
currentController(id(localStorage.getItem('cULActive1')),id(localStorage.getItem('cDIVActive1')))}
if(localStorage.getItem('cULActive2') != null && localStorage.getItem('cDIVActive2') != null){
currentController(id(localStorage.getItem('cULActive2')),id(localStorage.getItem('cDIVActive2')))}
if(localStorage.getItem('cULActive3') != null && localStorage.getItem('cDIVActive3') != null){
currentController(id(localStorage.getItem('cULActive3')),id(localStorage.getItem('cDIVActive3')))}
if(localStorage.getItem('cULActive4') != null && localStorage.getItem('cDIVActive4') != null){
currentController(id(localStorage.getItem('cULActive4')),id(localStorage.getItem('cDIVActive4')))}

function currentController(currentUL,currentDIV){
if(currentUL.id.includes('1')){
if(id('ul_c1_keyboard').classList.contains('active'))id('ul_c1_keyboard').classList.remove('active');
if(id('ul_c1_controller').classList.contains('active'))id('ul_c1_controller').classList.remove('active');
if(!id('c1_keyboard').classList.contains('hide'))id('c1_keyboard').classList.add('hide');
if(!id('c1_controller').classList.contains('hide'))id('c1_controller').classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive1',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive1',currentDIV.id)}
if(currentUL.id.includes('2')){
if(id('ul_c2_keyboard').classList.contains('active'))id('ul_c2_keyboard').classList.remove('active');
if(id('ul_c2_controller').classList.contains('active'))id('ul_c2_controller').classList.remove('active');
if(!id('c2_keyboard').classList.contains('hide'))id('c2_keyboard').classList.add('hide');
if(!id('c2_controller').classList.contains('hide'))id('c2_controller').classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive2',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive2',currentDIV.id)}
if(currentUL.id.includes('3')){
if(id('ul_c3_keyboard').classList.contains('active'))id('ul_c3_keyboard').classList.remove('active');
if(id('ul_c3_controller').classList.contains('active'))id('ul_c3_controller').classList.remove('active');
if(!id('c3_keyboard').classList.contains('hide'))id('c3_keyboard').classList.add('hide');
if(!id('c3_controller').classList.contains('hide'))id('c3_controller').classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive3',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive3',currentDIV.id)}
if(currentUL.id.includes('4')){
if(id('ul_c4_keyboard').classList.contains('active'))id('ul_c4_keyboard').classList.remove('active');
if(id('ul_c4_controller').classList.contains('active'))id('ul_c4_controller').classList.remove('active');
if(!id('c4_keyboard').classList.contains('hide'))id('c4_keyboard').classList.add('hide');
if(!id('c4_controller').classList.contains('hide'))id('c4_controller').classList.add('hide');
currentUL.classList.add('active');localStorage.setItem('cULActive4',currentUL.id);
currentDIV.classList.remove('hide');localStorage.setItem('cDIVActive4',currentDIV.id)}}

id('ul_c1_keyboard').addEventListener('click', function(){currentController(id('ul_c1_keyboard'),id('c1_keyboard'))})
id('ul_c2_keyboard').addEventListener('click', function(){currentController(id('ul_c2_keyboard'),id('c2_keyboard'))})
id('ul_c3_keyboard').addEventListener('click', function(){currentController(id('ul_c3_keyboard'),id('c3_keyboard'))})
id('ul_c4_keyboard').addEventListener('click', function(){currentController(id('ul_c4_keyboard'),id('c4_keyboard'))})
id('ul_c1_controller').addEventListener('click', function(){currentController(id('ul_c1_controller'),id('c1_controller'))})
id('ul_c2_controller').addEventListener('click', function(){currentController(id('ul_c2_controller'),id('c2_controller'))})
id('ul_c3_controller').addEventListener('click', function(){currentController(id('ul_c3_controller'),id('c3_controller'))})
id('ul_c4_controller').addEventListener('click', function(){currentController(id('ul_c4_controller'),id('c4_controller'))})



id('launch').addEventListener('click', function(){
var exp = 'Core[DisableExtraMem]=' + id('exp').checked,
osd = id('osd').checked ? '--osd' : '--noosd',
fullscreen = id('fullscreen').checked ? '--fullscreen' : '--windowed',
ParallelFullscreen = 'Video-Parallel[Fullscreen]=' + id('fullscreen').checked,
vsync = 'Video-General[VerticalSync]=' + id('vsync').checked,
Glide64VSync = 'Video-Glide64mk2[vsync]=' + id('vsync').checked,
cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=' + id('rspGFX').checked,
cxd4Audio = 'rsp-cxd4[AudioListToAudioPlugin]=' + id('rspAudio').checked,
m64pAudio = 'Rsp-HLE[AudioListToAudioPlugin]=' + id('rspAudio').checked,
WaitForCPUHost = 'rsp-cxd4[WaitForCPUHost]=' + id('WaitForCPUHost').checked,
SupportCPUSemaphoreLock = 'rsp-cxd4[SupportCPUSemaphoreLock]=' + id('SupportCPUSemaphoreLock').checked,
threadedVideo = 'Video-GLideN64[threadedVideo]=' + id('threadedVideo').checked,
bilinearMode = 'Video-GLideN64[bilinearMode]=' + id('bilinearMode').checked,
fxaa = 'Video-GLideN64[fxaa]=' + id('fxaa').checked,
enableHalosRemoval = 'Video-GLideN64[enableHalosRemoval]=' + id('enableHalosRemoval').checked,
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

Parallel = 'Video-Angrylion-Plus[Parallel]=' + id('Parallel').checked,
BusyLoop = 'Video-Angrylion-Plus[BusyLoop]=' + id('BusyLoop').checked,
ViWidescreen = 'Video-Angrylion-Plus[ViWidescreen]=' + id('ViWidescreen').checked,
ViHideOverscan = 'Video-Angrylion-Plus[ViHideOverscan]=' + id('ViHideOverscan').checked,
ViIntegerScaling = 'Video-Angrylion-Plus[ViIntegerScaling]=' + id('ViIntegerScaling').checked,

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

resolution = id('resolution').options[id('resolution').selectedIndex].value,
ParallelScreenWidth = 'Video-Parallel[ScreenWidth]=' + id('resolution').options[id('resolution').selectedIndex].dataset.width,
ParallelScreenHeight = 'Video-Parallel[ScreenHeight]=' + id('resolution').options[id('resolution').selectedIndex].dataset.height,
gfx = id('gfx').options[id('gfx').selectedIndex].value,
audio = id('audio').options[id('audio').selectedIndex].value,
input = id('input').options[id('input').selectedIndex].value,
rsp = id('rsp').options[id('rsp').selectedIndex].value,
RspFallback = id('RspFallback').options[id('RspFallback').selectedIndex].value,
emumode = id('emumode').options[id('emumode').selectedIndex].value,
plugin1 = id('plugin1').options[id('plugin1').selectedIndex].value,
plugin2 = id('plugin2').options[id('plugin2').selectedIndex].value,
plugin3 = id('plugin3').options[id('plugin3').selectedIndex].value,
plugin4 = id('plugin4').options[id('plugin4').selectedIndex].value,
mode1 = id('mode1').options[id('mode1').selectedIndex].value,
mode2 = id('mode2').options[id('mode2').selectedIndex].value,
mode3 = id('mode3').options[id('mode3').selectedIndex].value,
mode4 = id('mode4').options[id('mode4').selectedIndex].value,
msaa = id('msaa').options[id('msaa').selectedIndex].value,
aspectRatio = id('aspectRatio').options[id('aspectRatio').selectedIndex].value,
bufferSwapMode = id('bufferSwapMode').options[id('bufferSwapMode').selectedIndex].value,
useNativeResolutionFactor = id('useNativeResolutionFactor').options[id('useNativeResolutionFactor').selectedIndex].value,
anisotropy = id('anisotropy').options[id('anisotropy').selectedIndex].value,
cache = id('cache').options[id('cache').selectedIndex].value,
RDRAMImageDitheringMode = id('RDRAMImageDitheringMode').options[id('RDRAMImageDitheringMode').selectedIndex].value,
CorrectTexrectCoords = id('CorrectTexrectCoords').options[id('CorrectTexrectCoords').selectedIndex].value,
EnableNativeResTexrects = id('EnableNativeResTexrects').options[id('EnableNativeResTexrects').selectedIndex].value,
BackgroundsMode = id('BackgroundsMode').options[id('BackgroundsMode').selectedIndex].value,
EnableN64DepthCompare = id('EnableN64DepthCompare').options[id('EnableN64DepthCompare').selectedIndex].value,
EnableCopyColorToRDRAM = id('EnableCopyColorToRDRAM').options[id('EnableCopyColorToRDRAM').selectedIndex].value,
EnableCopyDepthToRDRAM = id('EnableCopyDepthToRDRAM').options[id('EnableCopyDepthToRDRAM').selectedIndex].value,
txFilterMode = id('txFilterMode').options[id('txFilterMode').selectedIndex].value,
txEnhancementMode = id('txEnhancementMode').options[id('txEnhancementMode').selectedIndex].value,
ViMode = id('ViMode').options[id('ViMode').selectedIndex].value,
ViInterpolation = id('ViInterpolation').options[id('ViInterpolation').selectedIndex].value,
DpCompat = id('DpCompat').options[id('DpCompat').selectedIndex].value,
ParallelUpscaling = id('ParallelUpscaling').options[id('ParallelUpscaling').selectedIndex].value,
ParallelDeinterlace = id('ParallelDeinterlace').options[id('ParallelDeinterlace').selectedIndex].value,
ParallelDownScale = id('ParallelDownScale').options[id('ParallelDownScale').selectedIndex].value,
CountersPos = id('CountersPos').options[id('CountersPos').selectedIndex].value,
SaveDiskFormat = id('SaveDiskFormat').options[id('SaveDiskFormat').selectedIndex].value,
DEFAULT_FREQUENCY = id('DEFAULT_FREQUENCY').options[id('DEFAULT_FREQUENCY').selectedIndex].value,
PRIMARY_BUFFER_TARGET = id('SECONDARY_BUFFER_SIZE').options[id('SECONDARY_BUFFER_SIZE').selectedIndex].dataset.buffer,
SECONDARY_BUFFER_SIZE = id('SECONDARY_BUFFER_SIZE').options[id('SECONDARY_BUFFER_SIZE').selectedIndex].value,
RESAMPLE = id('RESAMPLE').options[id('RESAMPLE').selectedIndex].value,
FrameBufferWriteBackControl = id('FrameBufferWriteBackControl').options[id('FrameBufferWriteBackControl').selectedIndex].value,
RenderToTexture = id('RenderToTexture').options[id('RenderToTexture').selectedIndex].value,
ScreenUpdateSetting = id('ScreenUpdateSetting').options[id('ScreenUpdateSetting').selectedIndex].value,
Mipmapping = id('Mipmapping').options[id('Mipmapping').selectedIndex].value,
ForceTextureFilter = id('ForceTextureFilter').options[id('ForceTextureFilter').selectedIndex].value,
TextureEnhancement = id('TextureEnhancement').options[id('TextureEnhancement').selectedIndex].value,
TextureEnhancementControl = id('TextureEnhancementControl').options[id('TextureEnhancementControl').selectedIndex].value,
TextureQuality = id('TextureQuality').options[id('TextureQuality').selectedIndex].value,
OpenGLDepthBufferSetting = id('OpenGLDepthBufferSetting').options[id('OpenGLDepthBufferSetting').selectedIndex].value,
RiceMultiSampling = id('RiceMultiSampling').options[id('RiceMultiSampling').selectedIndex].value,
ColorQuality = id('ColorQuality').options[id('ColorQuality').selectedIndex].value,
AnisotropicFiltering = id('AnisotropicFiltering').options[id('AnisotropicFiltering').selectedIndex].value,
wrpAntiAliasing = id('wrpAntiAliasing').options[id('wrpAntiAliasing').selectedIndex].value,
show_fps = id('show_fps').options[id('show_fps').selectedIndex].value,
ghq_fltr = id('ghq_fltr').options[id('ghq_fltr').selectedIndex].value,
ghq_cmpr = id('ghq_cmpr').options[id('ghq_cmpr').selectedIndex].value,
ghq_enht = id('ghq_enht').options[id('ghq_enht').selectedIndex].value,
alt_tex_size = id('alt_tex_size').options[id('alt_tex_size').selectedIndex].value,
use_sts1_only = id('use_sts1_only').options[id('use_sts1_only').selectedIndex].value,
force_calc_sphere = id('force_calc_sphere').options[id('force_calc_sphere').selectedIndex].value,
correct_viewport = id('correct_viewport').options[id('correct_viewport').selectedIndex].value,
increase_texrect_edge = id('increase_texrect_edge').options[id('increase_texrect_edge').selectedIndex].value,
decrease_fillrect_edge = id('decrease_fillrect_edge').options[id('decrease_fillrect_edge').selectedIndex].value,
texture_correction = id('texture_correction').options[id('texture_correction').selectedIndex].value,
pal230 = id('pal230').options[id('pal230').selectedIndex].value,
force_microcheck = id('force_microcheck').options[id('force_microcheck').selectedIndex].value,
force_quad3d = id('force_quad3d').options[id('force_quad3d').selectedIndex].value,
clip_zmin = id('clip_zmin').options[id('clip_zmin').selectedIndex].value,
clip_zmax = id('clip_zmax').options[id('clip_zmax').selectedIndex].value,
fast_crc = id('fast_crc').options[id('fast_crc').selectedIndex].value,
adjust_aspect = id('adjust_aspect').options[id('adjust_aspect').selectedIndex].value,
zmode_compare_less = id('zmode_compare_less').options[id('zmode_compare_less').selectedIndex].value,
old_style_adither = id('old_style_adither').options[id('old_style_adither').selectedIndex].value,
n64_z_scale = id('n64_z_scale').options[id('n64_z_scale').selectedIndex].value,
optimize_texrect = id('optimize_texrect').options[id('optimize_texrect').selectedIndex].value,
ignore_aux_copy = id('ignore_aux_copy').options[id('ignore_aux_copy').selectedIndex].value,
hires_buf_clear = id('hires_buf_clear').options[id('hires_buf_clear').selectedIndex].value,
fb_read_alpha = id('fb_read_alpha').options[id('fb_read_alpha').selectedIndex].value,
useless_is_useless = id('useless_is_useless').options[id('useless_is_useless').selectedIndex].value,
fb_crc_mode = id('fb_crc_mode').options[id('fb_crc_mode').selectedIndex].value,
filtering = id('filtering').options[id('filtering').selectedIndex].value,
fog = id('fog').options[id('fog').selectedIndex].value,
buff_clear = id('buff_clear').options[id('buff_clear').selectedIndex].value,
swapmode = id('swapmode').options[id('swapmode').selectedIndex].value,
aspect = id('aspect').options[id('aspect').selectedIndex].value,
lodmode = id('lodmode').options[id('lodmode').selectedIndex].value,
fb_smart = id('fb_smart').options[id('fb_smart').selectedIndex].value,
fb_hires = id('fb_hires').options[id('fb_hires').selectedIndex].value,
fb_read_always = id('fb_read_always').options[id('fb_read_always').selectedIndex].value,
read_back_to_screen = id('read_back_to_screen').options[id('read_back_to_screen').selectedIndex].value,
detect_cpu_write = id('detect_cpu_write').options[id('detect_cpu_write').selectedIndex].value,
fb_get_info = id('fb_get_info').options[id('fb_get_info').selectedIndex].value,
fb_render = id('fb_render').options[id('fb_render').selectedIndex].value,

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
NumWorkers = 'Video-Angrylion-Plus[NumWorkers]=' + id('NumWorkers').value,
CountPerOp = 'Core[CountPerOp]=' + id('CountPerOp').value,
CountPerOpDenomPot = 'Core[CountPerOpDenomPot]=' + id('CountPerOpDenomPot').value,
SiDmaDuration = 'Core[SiDmaDuration]=' + id('SiDmaDuration').value,
CurrentStateSlot = 'Core[CurrentStateSlot]=' + id('CurrentStateSlot').value,
name1 = 'Input-SDL-Control1[name]=' + id('name1').value,
name2 = 'Input-SDL-Control2[name]=' + id('name2').value,
name3 = 'Input-SDL-Control3[name]=' + id('name3').value,
name4 = 'Input-SDL-Control4[name]=' + id('name4').value,
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

JoyMappingStop = 'CoreEvents[Joy Mapping Stop]=' + 'J0' + id('JoyMappingStop1').value + ',' + 'J1' + id('JoyMappingStop2').value + ',' + 'J2' + id('JoyMappingStop3').value + ',' + 'J3' + id('JoyMappingStop4').value,
JoyMappingFullscreen = 'CoreEvents[Joy Mapping Fullscreen]=' + 'J0' + id('JoyMappingFullscreen1').value + ',' + 'J1' + id('JoyMappingFullscreen2').value + ',' + 'J2' + id('JoyMappingFullscreen3').value + ',' + 'J3' + id('JoyMappingFullscreen4').value,
JoyMappingSaveState = 'CoreEvents[Joy Mapping Save State]=' + 'J0' + id('JoyMappingSaveState1').value + ',' + 'J1' + id('JoyMappingSaveState2').value + ',' + 'J2' + id('JoyMappingSaveState3').value + ',' + 'J3' + id('JoyMappingSaveState4').value,
JoyMappingLoadState = 'CoreEvents[Joy Mapping Load State]=' + 'J0' + id('JoyMappingLoadState1').value + ',' + 'J1' + id('JoyMappingLoadState2').value + ',' + 'J2' + id('JoyMappingLoadState3').value + ',' + 'J3' + id('JoyMappingLoadState4').value,
JoyMappingIncrementSlot = 'CoreEvents[Joy Mapping Increment Slot]=' + 'J0' + id('JoyMappingIncrementSlot1').value + ',' + 'J1' + id('JoyMappingIncrementSlot2').value + ',' + 'J2' + id('JoyMappingIncrementSlot3').value + ',' + 'J3' + id('JoyMappingIncrementSlot4').value,
JoyMappingReset = 'CoreEvents[Joy Mapping Reset]=' + 'J0' + id('JoyMappingReset1').value + ',' + 'J1' + id('JoyMappingReset2').value + ',' + 'J2' + id('JoyMappingReset3').value + ',' + 'J3' + id('JoyMappingReset4').value,
JoyMappingSpeedDown = 'CoreEvents[Joy Mapping Speed Down]=' + 'J0' + id('JoyMappingSpeedDown1').value + ',' + 'J1' + id('JoyMappingSpeedDown2').value + ',' + 'J2' + id('JoyMappingSpeedDown3').value + ',' + 'J3' + id('JoyMappingSpeedDown4').value,
JoyMappingSpeedUp = 'CoreEvents[Joy Mapping Speed Up]=' + 'J0' + id('JoyMappingSpeedUp1').value + ',' + 'J1' + id('JoyMappingSpeedUp2').value + ',' + 'J2' + id('JoyMappingSpeedUp3').value + ',' + 'J3' + id('JoyMappingSpeedUp4').value,
JoyMappingScreenshot = 'CoreEvents[Joy Mapping Screenshot]=' + 'J0' + id('JoyMappingScreenshot1').value + ',' + 'J1' + id('JoyMappingScreenshot2').value + ',' + 'J2' + id('JoyMappingScreenshot3').value + ',' + 'J3' + id('JoyMappingScreenshot4').value,
JoyMappingPause = 'CoreEvents[Joy Mapping Pause]=' + 'J0' + id('JoyMappingPause1').value + ',' + 'J1' + id('JoyMappingPause2').value + ',' + 'J2' + id('JoyMappingPause3').value + ',' + 'J3' + id('JoyMappingPause4').value,
JoyMappingMute = 'CoreEvents[Joy Mapping Mute]=' + 'J0' + id('JoyMappingMute1').value + ',' + 'J1' + id('JoyMappingMute2').value + ',' + 'J2' + id('JoyMappingMute3').value + ',' + 'J3' + id('JoyMappingMute4').value,
JoyMappingIncreaseVolume = 'CoreEvents[Joy Mapping Increase Volume]=' + 'J0' + id('JoyMappingIncreaseVolume1').value + ',' + 'J1' + id('JoyMappingIncreaseVolume2').value + ',' + 'J2' + id('JoyMappingIncreaseVolume3').value + ',' + 'J3' + id('JoyMappingIncreaseVolume4').value,
JoyMappingDecreaseVolume = 'CoreEvents[Joy Mapping Decrease Volume]=' + 'J0' + id('JoyMappingDecreaseVolume1').value + ',' + 'J1' + id('JoyMappingDecreaseVolume2').value + ',' + 'J2' + id('JoyMappingDecreaseVolume3').value + ',' + 'J3' + id('JoyMappingDecreaseVolume4').value,
JoyMappingFastForward = 'CoreEvents[Joy Mapping Fast Forward]=' + 'J0' + id('JoyMappingFastForward1').value + ',' + 'J1' + id('JoyMappingFastForward2').value + ',' + 'J2' + id('JoyMappingFastForward3').value + ',' + 'J3' + id('JoyMappingFastForward4').value,
JoyMappingFrameAdvance = 'CoreEvents[Joy Mapping Frame Advance]=' + 'J0' + id('JoyMappingFrameAdvance1').value + ',' + 'J1' + id('JoyMappingFrameAdvance2').value + ',' + 'J2' + id('JoyMappingFrameAdvance3').value + ',' + 'J3' + id('JoyMappingFrameAdvance4').value,
JoyMappingGameshark = 'CoreEvents[Joy Mapping Gameshark]=' + 'J0' + id('JoyMappingGameshark1').value + ',' + 'J1' + id('JoyMappingGameshark2').value + ',' + 'J2' + id('JoyMappingGameshark3').value + ',' + 'J3' + id('JoyMappingGameshark4').value,

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

device1, device2, device3, device4,
plugged1 = 'Input-SDL-Control1[plugged]=' + id('plugged1').checked,
plugged2 = 'Input-SDL-Control2[plugged]=' + id('plugged2').checked,
plugged3 = 'Input-SDL-Control3[plugged]=' + id('plugged3').checked,
plugged4 = 'Input-SDL-Control4[plugged]=' + id('plugged4').checked,
mouse1 = 'Input-SDL-Control1[mouse]=' + id('mouse1').checked,
mouse2 = 'Input-SDL-Control2[mouse]=' + id('mouse2').checked,
mouse3 = 'Input-SDL-Control3[mouse]=' + id('mouse3').checked,
mouse4 = 'Input-SDL-Control4[mouse]=' + id('mouse4').checked,
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

control_stick_deadzone = id('control_stick_deadzone').value,
control_stick_sensitivity = id('control_stick_sensitivity').value,
c_stick_deadzone = id('c_stick_deadzone').value,
trigger_threshold = id('trigger_threshold').value,
a = id('a').value,
b = id('b').value,
x = id('x').value,
y = id('y').value,
start = id('start').value,
z = id('z').value,
l = id('l').value,
r = id('r').value,
d_pad_left = id('d_pad_left').value,
d_pad_right = id('d_pad_right').value,
d_pad_down = id('d_pad_down').value,
d_pad_up = id('d_pad_up').value,
c_stick_left = id('c_stick_left').value,
c_stick_right = id('c_stick_right').value,
c_stick_down = id('c_stick_down').value,
c_stick_up = id('c_stick_up').value,
gcaSettings = 'control_stick_deadzone = ' +  control_stick_deadzone + '\n' + 'control_stick_sensitivity = ' + control_stick_sensitivity + '\n' + 'c_stick_deadzone = ' + c_stick_deadzone + '\n' + 'trigger_threshold = ' + trigger_threshold + '\n' + '\n' + '[controller_mapping]' + '\n' + 'a = ' + a + '\n' + 'b = ' + b + '\n' + 'x = ' + x + '\n' + 'y = ' + y + '\n' + 'start = ' + start + '\n' + 'z = ' + z + '\n' + 'l = ' + l + '\n' + 'r = ' + r + '\n' + 'd_pad_left = ' + d_pad_left + '\n' + 'd_pad_right = ' + d_pad_right + '\n' + 'd_pad_down = ' + d_pad_down + '\n' + 'd_pad_up = ' + d_pad_up + '\n' + 'c_stick_left = ' + c_stick_left + '\n' + 'c_stick_right = ' + c_stick_right + '\n' + 'c_stick_down = ' + c_stick_down + '\n' + 'c_stick_up = ' + c_stick_up,

m64pGFX = 'Rsp-HLE[DisplayListToGraphicsPlugin]=True',
SharedDataPath = 'Core[SharedDataPath]=',
PIFROM, nospeedlimit, verbose,

AButton1,AButton2,AButton3,AButton4,BButton1,BButton2,BButton3,BButton4,LTrig1,LTrig2,LTrig3,LTrig4,RTrig1,RTrig2,RTrig3,RTrig4,ZTrig1,ZTrig2,ZTrig3,ZTrig4,Start1,Start2,Start3,Start4,DPadU1,DPadU2,DPadU3,DPadU4,DPadL1,DPadL2,DPadL3,DPadL4,DPadR1,DPadR2,DPadR3,DPadR4,DPadD1,DPadD2,DPadD3,DPadD4,CButtonU1,CButtonU2,CButtonU3,CButtonU4,CButtonL1,CButtonL2,CButtonL3,CButtonL4,CButtonR1,CButtonR2,CButtonR3,CButtonR4,CButtonD1,CButtonD2,CButtonD3,CButtonD4,MempakSwitch1,MempakSwitch2,MempakSwitch3,MempakSwitch4,RumblepakSwitch1,RumblepakSwitch2,RumblepakSwitch3,RumblepakSwitch4,XAxis1,XAxis2,XAxis3,XAxis4,YAxis1,YAxis2,YAxis3,YAxis4;



if(id('name1').value === 'Keyboard'){
var mouse1_1 = 	id('mouse1_1').options[id('mouse1_1').selectedIndex].value,
mouse1_2 = 	id('mouse1_2').options[id('mouse1_2').selectedIndex].value,
mouse1_3 = 	id('mouse1_3').options[id('mouse1_3').selectedIndex].value;
device1 = 'Input-SDL-Control1[device]=-1';
AButton1 = 'Input-SDL-Control1[A Button]=' + 'key(' + id('AButton1').dataset.key + ')';
BButton1 = 'Input-SDL-Control1[B Button]=' + 'key(' + id('BButton1').dataset.key + ')';
LTrig1 = 'Input-SDL-Control1[L Trig]=' + 'key(' + id('LTrig1').dataset.key + ')';
RTrig1 = 'Input-SDL-Control1[R Trig]=' + 'key(' + id('RTrig1').dataset.key + ')';
ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + 'key(' + id('ZTrig1').dataset.key + ')';
Start1 = 'Input-SDL-Control1[Start]=' + 'key(' + id('Start1').dataset.key + ')';
DPadU1 = 'Input-SDL-Control1[DPad U]=' + 'key(' + id('DPadU1').dataset.key + ')';
DPadL1 = 'Input-SDL-Control1[DPad L]=' + 'key(' + id('DPadL1').dataset.key + ')';
DPadR1 = 'Input-SDL-Control1[DPad R]=' + 'key(' + id('DPadR1').dataset.key + ')';
DPadD1 = 'Input-SDL-Control1[DPad D]=' + 'key(' + id('DPadD1').dataset.key + ')';
CButtonU1 = 'Input-SDL-Control1[C Button U]=' + 'key(' + id('CButtonU1').dataset.key + ')';
CButtonL1 = 'Input-SDL-Control1[C Button L]=' + 'key(' + id('CButtonL1').dataset.key + ')';
CButtonR1 = 'Input-SDL-Control1[C Button R]=' + 'key(' + id('CButtonR1').dataset.key + ')';
CButtonD1 = 'Input-SDL-Control1[C Button D]=' + 'key(' + id('CButtonD1').dataset.key + ')';
MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + 'key(' + id('MempakSwitch1').dataset.key + ')';
RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + 'key(' + id('RumblepakSwitch1').dataset.key + ')';
XAxis1 = 'Input-SDL-Control1[X Axis]=' + 'key(' + id('StickL1').dataset.key + ',' + id('StickR1').dataset.key + ')';
YAxis1 = 'Input-SDL-Control1[Y Axis]=' + 'key(' + id('StickU1').dataset.key + ',' + id('StickD1').dataset.key + ')';
if(id('mouse1').checked && mouse1_1 != ''){
if(mouse1_1 === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=mouse(1)'}
if(mouse1_1 === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=mouse(1)'}
if(mouse1_1 === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=mouse(1)'}
if(mouse1_1 === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=mouse(1)'}
if(mouse1_1 === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=mouse(1)'}}
if(id('mouse1').checked && mouse1_2 != ''){
if(mouse1_2 === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=mouse(2)'}
if(mouse1_2 === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=mouse(2)'}
if(mouse1_2 === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=mouse(2)'}
if(mouse1_2 === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=mouse(2)'}
if(mouse1_2 === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=mouse(2)'}}
if(id('mouse1').checked && mouse1_3 != ''){
if(mouse1_3 === 'a'){AButton1 = 'Input-SDL-Control1[A Button]=mouse(3)'}
if(mouse1_3 === 'b'){BButton1 = 'Input-SDL-Control1[B Button]=mouse(3)'}
if(mouse1_3 === 'l'){LTrig1 = 'Input-SDL-Control1[L Trig]=mouse(3)'}
if(mouse1_3 === 'r'){RTrig1 = 'Input-SDL-Control1[R Trig]=mouse(3)'}
if(mouse1_3 === 'z'){ZTrig1 = 'Input-SDL-Control1[Z Trig]=mouse(3)'}}
}else{
device1 = 'Input-SDL-Control1[device]=0';
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
AButton1 = 'Input-SDL-Control1[A Button]=' + id('AButton1c').value + ' ' + id('AButton1cb').value;
BButton1 = 'Input-SDL-Control1[B Button]=' + id('BButton1c').value + ' ' + id('BButton1cb').value;
LTrig1 = 'Input-SDL-Control1[L Trig]=' + id('LTrig1c').value + ' ' + id('LTrig1cb').value;
RTrig1 = 'Input-SDL-Control1[R Trig]=' + id('RTrig1c').value + ' ' + id('RTrig1cb').value;
ZTrig1 = 'Input-SDL-Control1[Z Trig]=' + id('ZTrig1c').value + ' ' + id('ZTrig1cb').value;
Start1 = 'Input-SDL-Control1[Start]=' + id('Start1c').value + ' ' + id('Start1cb').value;
DPadU1 = 'Input-SDL-Control1[DPad U]=' + id('DPadU1c').value + ' ' + id('DPadU1cb').value;
DPadL1 = 'Input-SDL-Control1[DPad L]=' + id('DPadL1c').value + ' ' + id('DPadL1cb').value;
DPadR1 = 'Input-SDL-Control1[DPad R]=' + id('DPadR1c').value + ' ' + id('DPadR1cb').value;
DPadD1 = 'Input-SDL-Control1[DPad D]=' + id('DPadD1c').value + ' ' + id('DPadD1cb').value;
CButtonU1 = 'Input-SDL-Control1[C Button U]=' + id('CButtonU1c').value + ' ' + id('CButtonU1cb').value;
CButtonL1 = 'Input-SDL-Control1[C Button L]=' + id('CButtonL1c').value + ' ' + id('CButtonL1cb').value;
CButtonR1 = 'Input-SDL-Control1[C Button R]=' + id('CButtonR1c').value + ' ' + id('CButtonR1cb').value;
CButtonD1 = 'Input-SDL-Control1[C Button D]=' + id('CButtonD1c').value + ' ' + id('CButtonD1cb').value;
MempakSwitch1 = 'Input-SDL-Control1[Mempak Switch]=' + id('MempakSwitch1c').value + ' ' + id('MempakSwitch1cb').value;
RumblepakSwitch1 = 'Input-SDL-Control1[Rumblepak Switch]=' + id('RumblepakSwitch1c').value + ' ' + id('RumblepakSwitch1cb').value;
XAxis1 = 'Input-SDL-Control1[X Axis]=' + buttonType + '(' + StickL1value + ',' + StickR1value + ')' + ' ' + buttonTypeB + '(' + StickL1bvalue + ',' + StickR1bvalue + ')';
YAxis1 = 'Input-SDL-Control1[Y Axis]=' + buttonType + '(' + StickU1value + ',' + StickD1value + ')' + ' ' + buttonTypeB + '(' + StickU1bvalue + ',' + StickD1bvalue + ')'}

if(id('name2').value === 'Keyboard'){
var mouse2_1 = 	id('mouse2_1').options[id('mouse2_1').selectedIndex].value,
mouse2_2 = 	id('mouse2_2').options[id('mouse2_2').selectedIndex].value,
mouse2_3 = 	id('mouse2_3').options[id('mouse2_3').selectedIndex].value;
device2 = 'Input-SDL-Control2[device]=-1';
AButton2 = 'Input-SDL-Control2[A Button]=' + 'key(' + id('AButton2').dataset.key + ')';
BButton2 = 'Input-SDL-Control2[B Button]=' + 'key(' + id('BButton2').dataset.key + ')';
LTrig2 = 'Input-SDL-Control2[L Trig]=' + 'key(' + id('LTrig2').dataset.key + ')';
RTrig2 = 'Input-SDL-Control2[R Trig]=' + 'key(' + id('RTrig2').dataset.key + ')';
ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + 'key(' + id('ZTrig2').dataset.key + ')';
Start2 = 'Input-SDL-Control2[Start]=' + 'key(' + id('Start2').dataset.key + ')';
DPadU2 = 'Input-SDL-Control2[DPad U]=' + 'key(' + id('DPadU2').dataset.key + ')';
DPadL2 = 'Input-SDL-Control2[DPad L]=' + 'key(' + id('DPadL2').dataset.key + ')';
DPadR2 = 'Input-SDL-Control2[DPad R]=' + 'key(' + id('DPadR2').dataset.key + ')';
DPadD2 = 'Input-SDL-Control2[DPad D]=' + 'key(' + id('DPadD2').dataset.key + ')';
CButtonU2 = 'Input-SDL-Control2[C Button U]=' + 'key(' + id('CButtonU2').dataset.key + ')';
CButtonL2 = 'Input-SDL-Control2[C Button L]=' + 'key(' + id('CButtonL2').dataset.key + ')';
CButtonR2 = 'Input-SDL-Control2[C Button R]=' + 'key(' + id('CButtonR2').dataset.key + ')';
CButtonD2 = 'Input-SDL-Control2[C Button D]=' + 'key(' + id('CButtonD2').dataset.key + ')';
MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + 'key(' + id('MempakSwitch2').dataset.key + ')';
RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + 'key(' + id('RumblepakSwitch2').dataset.key + ')';
XAxis2 = 'Input-SDL-Control2[X Axis]=' + 'key(' + id('StickL2').dataset.key + ',' + id('StickR2').dataset.key + ')';
YAxis2 = 'Input-SDL-Control2[Y Axis]=' + 'key(' + id('StickU2').dataset.key + ',' + id('StickD2').dataset.key + ')'
if(id('mouse2').checked && mouse2_1 != ''){
if(mouse2_1 === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=mouse(1)'}
if(mouse2_1 === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=mouse(1)'}
if(mouse2_1 === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=mouse(1)'}
if(mouse2_1 === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=mouse(1)'}
if(mouse2_1 === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=mouse(1)'}}
if(id('mouse2').checked && mouse2_2 != ''){
if(mouse2_2 === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=mouse(2)'}
if(mouse2_2 === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=mouse(2)'}
if(mouse2_2 === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=mouse(2)'}
if(mouse2_2 === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=mouse(2)'}
if(mouse2_2 === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=mouse(2)'}}
if(id('mouse2').checked && mouse2_3 != ''){
if(mouse2_3 === 'a'){AButton2 = 'Input-SDL-Control2[A Button]=mouse(3)'}
if(mouse2_3 === 'b'){BButton2 = 'Input-SDL-Control2[B Button]=mouse(3)'}
if(mouse2_3 === 'l'){LTrig2 = 'Input-SDL-Control2[L Trig]=mouse(3)'}
if(mouse2_3 === 'r'){RTrig2 = 'Input-SDL-Control2[R Trig]=mouse(3)'}
if(mouse2_3 === 'z'){ZTrig2 = 'Input-SDL-Control2[Z Trig]=mouse(3)'}}
}else{
device2 = 'Input-SDL-Control2[device]=1';
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
AButton2 = 'Input-SDL-Control2[A Button]=' + id('AButton2c').value + ' ' + id('AButton2cb').value;
BButton2 = 'Input-SDL-Control2[B Button]=' + id('BButton2c').value + ' ' + id('BButton2cb').value;
LTrig2 = 'Input-SDL-Control2[L Trig]=' + id('LTrig2c').value + ' ' + id('LTrig2cb').value;
RTrig2 = 'Input-SDL-Control2[R Trig]=' + id('RTrig2c').value + ' ' + id('RTrig2cb').value;
ZTrig2 = 'Input-SDL-Control2[Z Trig]=' + id('ZTrig2c').value + ' ' + id('ZTrig2cb').value;
Start2 = 'Input-SDL-Control2[Start]=' + id('Start2c').value + ' ' + id('Start2cb').value;
DPadU2 = 'Input-SDL-Control2[DPad U]=' + id('DPadU2c').value + ' ' + id('DPadU2cb').value;
DPadL2 = 'Input-SDL-Control2[DPad L]=' + id('DPadL2c').value + ' ' + id('DPadL2cb').value;
DPadR2 = 'Input-SDL-Control2[DPad R]=' + id('DPadR2c').value + ' ' + id('DPadR2cb').value;
DPadD2 = 'Input-SDL-Control2[DPad D]=' + id('DPadD2c').value + ' ' + id('DPadD2cb').value;
CButtonU2 = 'Input-SDL-Control2[C Button U]=' + id('CButtonU2c').value + ' ' + id('CButtonU2cb').value;
CButtonL2 = 'Input-SDL-Control2[C Button L]=' + id('CButtonL2c').value + ' ' + id('CButtonL2cb').value;
CButtonR2 = 'Input-SDL-Control2[C Button R]=' + id('CButtonR2c').value + ' ' + id('CButtonR2cb').value;
CButtonD2 = 'Input-SDL-Control2[C Button D]=' + id('CButtonD2c').value + ' ' + id('CButtonD2cb').value;
MempakSwitch2 = 'Input-SDL-Control2[Mempak Switch]=' + id('MempakSwitch2c').value + ' ' + id('MempakSwitch2cb').value;
RumblepakSwitch2 = 'Input-SDL-Control2[Rumblepak Switch]=' + id('RumblepakSwitch2c').value + ' ' + id('RumblepakSwitch2cb').value;
XAxis2 = 'Input-SDL-Control2[X Axis]=' + buttonType + '(' + StickL2value + ',' + StickR2value + ')' + ' ' + buttonTypeB + '(' + StickL2bvalue + ',' + StickR2bvalue + ')';
YAxis2 = 'Input-SDL-Control2[Y Axis]=' + buttonType + '(' + StickU2value + ',' + StickD2value + ')' + ' ' + buttonTypeB + '(' + StickU2bvalue + ',' + StickD2bvalue + ')'}

if(id('name3').value === 'Keyboard'){
var mouse3_1 = 	id('mouse3_1').options[id('mouse3_1').selectedIndex].value,
mouse3_2 = 	id('mouse3_2').options[id('mouse3_2').selectedIndex].value,
mouse3_3 = 	id('mouse3_3').options[id('mouse3_3').selectedIndex].value;
device3 = 'Input-SDL-Control3[device]=-1';
AButton3 = 'Input-SDL-Control3[A Button]=' + 'key(' + id('AButton3').dataset.key + ')';
BButton3 = 'Input-SDL-Control3[B Button]=' + 'key(' + id('BButton3').dataset.key + ')';
LTrig3 = 'Input-SDL-Control3[L Trig]=' + 'key(' + id('LTrig3').dataset.key + ')';
RTrig3 = 'Input-SDL-Control3[R Trig]=' + 'key(' + id('RTrig3').dataset.key + ')';
ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + 'key(' + id('ZTrig3').dataset.key + ')';
Start3 = 'Input-SDL-Control3[Start]=' + 'key(' + id('Start3').dataset.key + ')';
DPadU3 = 'Input-SDL-Control3[DPad U]=' + 'key(' + id('DPadU3').dataset.key + ')';
DPadL3 = 'Input-SDL-Control3[DPad L]=' + 'key(' + id('DPadL3').dataset.key + ')';
DPadR3 = 'Input-SDL-Control3[DPad R]=' + 'key(' + id('DPadR3').dataset.key + ')';
DPadD3 = 'Input-SDL-Control3[DPad D]=' + 'key(' + id('DPadD3').dataset.key + ')';
CButtonU3 = 'Input-SDL-Control3[C Button U]=' + 'key(' + id('CButtonU3').dataset.key + ')';
CButtonL3 = 'Input-SDL-Control3[C Button L]=' + 'key(' + id('CButtonL3').dataset.key + ')';
CButtonR3 = 'Input-SDL-Control3[C Button R]=' + 'key(' + id('CButtonR3').dataset.key + ')';
CButtonD3 = 'Input-SDL-Control3[C Button D]=' + 'key(' + id('CButtonD3').dataset.key + ')';
MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + 'key(' + id('MempakSwitch3').dataset.key + ')';
RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + 'key(' + id('RumblepakSwitch3').dataset.key + ')';
XAxis3 = 'Input-SDL-Control3[X Axis]=' + 'key(' + id('StickL3').dataset.key + ',' + id('StickR3').dataset.key + ')';
YAxis3 = 'Input-SDL-Control3[Y Axis]=' + 'key(' + id('StickU3').dataset.key + ',' + id('StickD3').dataset.key + ')'
if(id('mouse3').checked && mouse3_1 != ''){
if(mouse3_1 === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=mouse(1)'}
if(mouse3_1 === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=mouse(1)'}
if(mouse3_1 === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=mouse(1)'}
if(mouse3_1 === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=mouse(1)'}
if(mouse3_1 === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=mouse(1)'}}
if(id('mouse3').checked && mouse3_2 != ''){
if(mouse3_2 === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=mouse(2)'}
if(mouse3_2 === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=mouse(2)'}
if(mouse3_2 === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=mouse(2)'}
if(mouse3_2 === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=mouse(2)'}
if(mouse3_2 === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=mouse(2)'}}
if(id('mouse3').checked && mouse3_3 != ''){
if(mouse3_3 === 'a'){AButton3 = 'Input-SDL-Control3[A Button]=mouse(3)'}
if(mouse3_3 === 'b'){BButton3 = 'Input-SDL-Control3[B Button]=mouse(3)'}
if(mouse3_3 === 'l'){LTrig3 = 'Input-SDL-Control3[L Trig]=mouse(3)'}
if(mouse3_3 === 'r'){RTrig3 = 'Input-SDL-Control3[R Trig]=mouse(3)'}
if(mouse3_3 === 'z'){ZTrig3 = 'Input-SDL-Control3[Z Trig]=mouse(3)'}}
}else{
device3 = 'Input-SDL-Control3[device]=2';
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
AButton3 = 'Input-SDL-Control3[A Button]=' + id('AButton3c').value + ' ' + id('AButton3cb').value;
BButton3 = 'Input-SDL-Control3[B Button]=' + id('BButton3c').value + ' ' + id('BButton3cb').value;
LTrig3 = 'Input-SDL-Control3[L Trig]=' + id('LTrig3c').value + ' ' + id('LTrig3cb').value;
RTrig3 = 'Input-SDL-Control3[R Trig]=' + id('RTrig3c').value + ' ' + id('RTrig3cb').value;
ZTrig3 = 'Input-SDL-Control3[Z Trig]=' + id('ZTrig3c').value + ' ' + id('ZTrig3cb').value;
Start3 = 'Input-SDL-Control3[Start]=' + id('Start3c').value + ' ' + id('Start3cb').value;
DPadU3 = 'Input-SDL-Control3[DPad U]=' + id('DPadU3c').value + ' ' + id('DPadU3cb').value;
DPadL3 = 'Input-SDL-Control3[DPad L]=' + id('DPadL3c').value + ' ' + id('DPadL3cb').value;
DPadR3 = 'Input-SDL-Control3[DPad R]=' + id('DPadR3c').value + ' ' + id('DPadR3cb').value;
DPadD3 = 'Input-SDL-Control3[DPad D]=' + id('DPadD3c').value + ' ' + id('DPadD3cb').value;
CButtonU3 = 'Input-SDL-Control3[C Button U]=' + id('CButtonU3c').value + ' ' + id('CButtonU3cb').value;
CButtonL3 = 'Input-SDL-Control3[C Button L]=' + id('CButtonL3c').value + ' ' + id('CButtonL3cb').value;
CButtonR3 = 'Input-SDL-Control3[C Button R]=' + id('CButtonR3c').value + ' ' + id('CButtonR3cb').value;
CButtonD3 = 'Input-SDL-Control3[C Button D]=' + id('CButtonD3c').value + ' ' + id('CButtonD3cb').value;
MempakSwitch3 = 'Input-SDL-Control3[Mempak Switch]=' + id('MempakSwitch3c').value + ' ' + id('MempakSwitch3cb').value;
RumblepakSwitch3 = 'Input-SDL-Control3[Rumblepak Switch]=' + id('RumblepakSwitch3c').value + ' ' + id('RumblepakSwitch3cb').value;
XAxis3 = 'Input-SDL-Control3[X Axis]=' + buttonType + '(' + StickL3value + ',' + StickR3value + ')' + ' ' + buttonTypeB + '(' + StickL3bvalue + ',' + StickR3bvalue + ')';
YAxis3 = 'Input-SDL-Control3[Y Axis]=' + buttonType + '(' + StickU3value + ',' + StickD3value + ')' + ' ' + buttonTypeB + '(' + StickU3bvalue + ',' + StickD3bvalue + ')'}

if(id('name4').value === 'Keyboard'){
var mouse4_1 = 	id('mouse4_1').options[id('mouse4_1').selectedIndex].value,
mouse4_2 = 	id('mouse4_2').options[id('mouse4_2').selectedIndex].value,
mouse4_3 = 	id('mouse4_3').options[id('mouse4_3').selectedIndex].value;
device4 = 'Input-SDL-Control4[device]=-1';
AButton4 = 'Input-SDL-Control4[A Button]=' + 'key(' + id('AButton4').dataset.key + ')';
BButton4 = 'Input-SDL-Control4[B Button]=' + 'key(' + id('BButton4').dataset.key + ')';
LTrig4 = 'Input-SDL-Control4[L Trig]=' + 'key(' + id('LTrig4').dataset.key + ')';
RTrig4 = 'Input-SDL-Control4[R Trig]=' + 'key(' + id('RTrig4').dataset.key + ')';
ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + 'key(' + id('ZTrig4').dataset.key + ')';
Start4 = 'Input-SDL-Control4[Start]=' + 'key(' + id('Start4').dataset.key + ')';
DPadU4 = 'Input-SDL-Control4[DPad U]=' + 'key(' + id('DPadU4').dataset.key + ')';
DPadL4 = 'Input-SDL-Control4[DPad L]=' + 'key(' + id('DPadL4').dataset.key + ')';
DPadR4 = 'Input-SDL-Control4[DPad R]=' + 'key(' + id('DPadR4').dataset.key + ')';
DPadD4 = 'Input-SDL-Control4[DPad D]=' + 'key(' + id('DPadD4').dataset.key + ')';
CButtonU4 = 'Input-SDL-Control4[C Button U]=' + 'key(' + id('CButtonU4').dataset.key + ')';
CButtonL4 = 'Input-SDL-Control4[C Button L]=' + 'key(' + id('CButtonL4').dataset.key + ')';
CButtonR4 = 'Input-SDL-Control4[C Button R]=' + 'key(' + id('CButtonR4').dataset.key + ')';
CButtonD4 = 'Input-SDL-Control4[C Button D]=' + 'key(' + id('CButtonD4').dataset.key + ')';
MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + 'key(' + id('MempakSwitch4').dataset.key + ')';
RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + 'key(' + id('RumblepakSwitch4').dataset.key + ')';
XAxis4 = 'Input-SDL-Control4[X Axis]=' + 'key(' + id('StickL4').dataset.key + ',' + id('StickR4').dataset.key + ')';
YAxis4 = 'Input-SDL-Control4[Y Axis]=' + 'key(' + id('StickU4').dataset.key + ',' + id('StickD4').dataset.key + ')'
if(id('mouse4').checked && mouse4_1 != ''){
if(mouse4_1 === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=mouse(1)'}
if(mouse4_1 === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=mouse(1)'}
if(mouse4_1 === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=mouse(1)'}
if(mouse4_1 === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=mouse(1)'}
if(mouse4_1 === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=mouse(1)'}}
if(id('mouse4').checked && mouse4_2 != ''){
if(mouse4_2 === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=mouse(2)'}
if(mouse4_2 === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=mouse(2)'}
if(mouse4_2 === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=mouse(2)'}
if(mouse4_2 === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=mouse(2)'}
if(mouse4_2 === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=mouse(2)'}}
if(id('mouse4').checked && mouse4_3 != ''){
if(mouse4_3 === 'a'){AButton4 = 'Input-SDL-Control4[A Button]=mouse(3)'}
if(mouse4_3 === 'b'){BButton4 = 'Input-SDL-Control4[B Button]=mouse(3)'}
if(mouse4_3 === 'l'){LTrig4 = 'Input-SDL-Control4[L Trig]=mouse(3)'}
if(mouse4_3 === 'r'){RTrig4 = 'Input-SDL-Control4[R Trig]=mouse(3)'}
if(mouse4_3 === 'z'){ZTrig4 = 'Input-SDL-Control4[Z Trig]=mouse(3)'}}
}else{
device4 = 'Input-SDL-Control4[device]=3';
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
AButton4 = 'Input-SDL-Control4[A Button]=' + id('AButton4c').value + ' ' + id('AButton4cb').value;
BButton4 = 'Input-SDL-Control4[B Button]=' + id('BButton4c').value + ' ' + id('BButton4cb').value;
LTrig4 = 'Input-SDL-Control4[L Trig]=' + id('LTrig4c').value + ' ' + id('LTrig4cb').value;
RTrig4 = 'Input-SDL-Control4[R Trig]=' + id('RTrig4c').value + ' ' + id('RTrig4cb').value;
ZTrig4 = 'Input-SDL-Control4[Z Trig]=' + id('ZTrig4c').value + ' ' + id('ZTrig4cb').value;
Start4 = 'Input-SDL-Control4[Start]=' + id('Start4c').value + ' ' + id('Start4cb').value;
DPadU4 = 'Input-SDL-Control4[DPad U]=' + id('DPadU4c').value + ' ' + id('DPadU4cb').value;
DPadL4 = 'Input-SDL-Control4[DPad L]=' + id('DPadL4c').value + ' ' + id('DPadL4cb').value;
DPadR4 = 'Input-SDL-Control4[DPad R]=' + id('DPadR4c').value + ' ' + id('DPadR4cb').value;
DPadD4 = 'Input-SDL-Control4[DPad D]=' + id('DPadD4c').value + ' ' + id('DPadD4cb').value;
CButtonU4 = 'Input-SDL-Control4[C Button U]=' + id('CButtonU4c').value + ' ' + id('CButtonU4cb').value;
CButtonL4 = 'Input-SDL-Control4[C Button L]=' + id('CButtonL4c').value + ' ' + id('CButtonL4cb').value;
CButtonR4 = 'Input-SDL-Control4[C Button R]=' + id('CButtonR4c').value + ' ' + id('CButtonR4cb').value;
CButtonD4 = 'Input-SDL-Control4[C Button D]=' + id('CButtonD4c').value + ' ' + id('CButtonD4cb').value;
MempakSwitch4 = 'Input-SDL-Control4[Mempak Switch]=' + id('MempakSwitch4c').value + ' ' + id('MempakSwitch4cb').value;
RumblepakSwitch4 = 'Input-SDL-Control4[Rumblepak Switch]=' + id('RumblepakSwitch4c').value + ' ' + id('RumblepakSwitch4cb').value;
XAxis4 = 'Input-SDL-Control4[X Axis]=' + buttonType + '(' + StickL4value + ',' + StickR4value + ')' + ' ' + buttonTypeB + '(' + StickL4bvalue + ',' + StickR4bvalue + ')';
YAxis4 = 'Input-SDL-Control4[Y Axis]=' + buttonType + '(' + StickU4value + ',' + StickD4value + ')' + ' ' + buttonTypeB + '(' + StickU4bvalue + ',' + StickD4bvalue + ')'}



function kb(kb){if(kb.match(regkb))kb = kb.replace(regkb,'');return kb}

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



if(gfx === 'mupen64plus-video-angrylion-plus' || gfx === 'mupen64plus-video-parallel'){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=False'; cxd4Audio = 'rsp-cxd4[DisplayListToAudioPlugin]=False'}
else if(gfx === 'mupen64plus-video-rice' || gfx === 'mupen64plus-video-glide64mk2'){cxd4GFX = 'rsp-cxd4[DisplayListToGraphicsPlugin]=True'}
if(gfx === 'mupen64plus-video-angrylion-plus' && rsp === 'mupen64plus-rsp-hle'){rsp = 'mupen64plus-rsp-cxd4-sse2'}
else if(gfx === 'mupen64plus-video-parallel' && rsp === 'mupen64plus-rsp-hle'){rsp = 'mupen64plus-rsp-parallel'}
else if((gfx === 'mupen64plus-video-rice' || gfx === 'mupen64plus-video-glide64mk2') && rsp === 'mupen64plus-rsp-parallel'){rsp = 'mupen64plus-rsp-hle'}

if(id('nospeedlimit').checked){nospeedlimit = '--nospeedlimit';audio = 'dummy';vsync = 'Video-General[VerticalSync]=False';Glide64VSync = 'Video-Glide64mk2[vsync]=False'}else{nospeedlimit = []}
PIFROM = PIF != '' ? ['--pif',PIF] : []
verbose = id('verbose').checked ? '--verbose' : []

var core = ['--corelib','mupen64plus','--plugindir','.',osd,fullscreen,'--resolution',resolution,'--gfx',gfx,'--audio',audio,'--input',input,'--rsp',rsp,'--set',RspFallback,'--emumode',emumode,'--set',exp,'--set',vsync,'--set',cxd4GFX,'--set',m64pGFX,'--set',IPLROMSetting,'--set',DiskSetting,'--set',NoCompiledJump,'--set',CountPerOp,'--set',CountPerOpDenomPot,'--set',SiDmaDuration,'--set',AutoStateSlotIncrement,'--set',CurrentStateSlot,'--set',SharedDataPath,'--set',ScreenshotPathSetting,'--set',SaveStatePathSetting,'--set',SaveSRAMPathSetting,'--set',RandomizeInterrupt,'--set',SaveDiskFormat,'--set',WaitForCPUHost,'--set',SupportCPUSemaphoreLock,'--set',gbROM1Setting,'--set',gbROM2Setting,'--set',gbROM3Setting,'--set',gbROM4Setting,'--set',gbRAM1Setting,'--set',gbRAM2Setting,'--set',gbRAM3Setting,'--set',gbRAM4Setting,'--set',DEFAULT_FREQUENCY,'--set',SWAP_CHANNELS,'--set',PRIMARY_BUFFER_TARGET,'--set',SECONDARY_BUFFER_SIZE,'--set',RESAMPLE,'--set',VOLUME_ADJUST,'--set',VOLUME_DEFAULT,'--set',AUDIO_SYNC,'--set',KbdMappingSlot0,'--set',KbdMappingSlot1,'--set',KbdMappingSlot2,'--set',KbdMappingSlot3,'--set',KbdMappingSlot4,'--set',KbdMappingSlot5,'--set',KbdMappingSlot6,'--set',KbdMappingSlot7,'--set',KbdMappingSlot8,'--set',KbdMappingSlot9,'--set',KbdMappingStop,'--set',KbdMappingFullscreen,'--set',KbdMappingSaveState,'--set',KbdMappingLoadState,'--set',KbdMappingIncrementSlot,'--set',KbdMappingReset,'--set',KbdMappingSpeedDown,'--set',KbdMappingSpeedUp,'--set',KbdMappingScreenshot,'--set',KbdMappingPause,'--set',KbdMappingMute,'--set',KbdMappingIncreaseVolume,'--set',KbdMappingDecreaseVolume,'--set',KbdMappingFastForward,'--set',KbdMappingFrameAdvance,'--set',KbdMappingGameshark,'--set',JoyMappingStop,'--set',JoyMappingFullscreen,'--set',JoyMappingSaveState,'--set',JoyMappingLoadState,'--set',JoyMappingIncrementSlot,'--set',JoyMappingReset,'--set',JoyMappingSpeedDown,'--set',JoyMappingSpeedUp,'--set',JoyMappingScreenshot,'--set',JoyMappingPause,'--set',JoyMappingMute,'--set',JoyMappingIncreaseVolume,'--set',JoyMappingDecreaseVolume,'--set',JoyMappingFastForward,'--set',JoyMappingFrameAdvance,'--set',JoyMappingGameshark],

controls = ['--set',AButton1,'--set',BButton1,'--set',LTrig1,'--set',RTrig1,'--set',ZTrig1,'--set',Start1,'--set',DPadU1,'--set',DPadL1,'--set',DPadR1,'--set',DPadD1,'--set',CButtonU1,'--set',CButtonL1,'--set',CButtonR1,'--set',CButtonD1,'--set',MempakSwitch1,'--set',RumblepakSwitch1,'--set',XAxis1,'--set',YAxis1,'--set',AButton2,'--set',BButton2,'--set',LTrig2,'--set',RTrig2,'--set',ZTrig2,'--set',Start2,'--set',DPadU2,'--set',DPadL2,'--set',DPadR2,'--set',DPadD2,'--set',CButtonU2,'--set',CButtonL2,'--set',CButtonR2,'--set',CButtonD2,'--set',MempakSwitch2,'--set',RumblepakSwitch2,'--set',XAxis2,'--set',YAxis2,'--set',AButton3,'--set',BButton3,'--set',LTrig3,'--set',RTrig3,'--set',ZTrig3,'--set',Start3,'--set',DPadU3,'--set',DPadL3,'--set',DPadR3,'--set',DPadD3,'--set',CButtonU3,'--set',CButtonL3,'--set',CButtonR3,'--set',CButtonD3,'--set',MempakSwitch3,'--set',RumblepakSwitch3,'--set',XAxis3,'--set',YAxis3,'--set',AButton4,'--set',BButton4,'--set',LTrig4,'--set',RTrig4,'--set',ZTrig4,'--set',Start4,'--set',DPadU4,'--set',DPadL4,'--set',DPadR4,'--set',DPadD4,'--set',CButtonU4,'--set',CButtonL4,'--set',CButtonR4,'--set',CButtonD4,'--set',MempakSwitch4,'--set',RumblepakSwitch4,'--set',XAxis4,'--set',YAxis4,'--set',plugin1,'--set',plugin2,'--set',plugin3,'--set',plugin4,'--set',plugged1,'--set',plugged2,'--set',plugged3,'--set',plugged4,'--set',mode1,'--set',mode2,'--set',mode3,'--set',mode4,'--set',name1,'--set',name2,'--set',name3,'--set',name4,'--set',mouse1,'--set',mouse2,'--set',mouse3,'--set',mouse4,'--set',msensitivity1,'--set',msensitivity2,'--set',msensitivity3,'--set',msensitivity4,'--set',analogdeadzone1,'--set',analogdeadzone2,'--set',analogdeadzone3,'--set',analogdeadzone4,'--set',analogpeak1,'--set',analogpeak2,'--set',analogpeak3,'--set',analogpeak4,'--set',device1,'--set',device2,'--set',device3,'--set',device4],

Angrylion = ['--set',Parallel,'--set',NumWorkers,'--set',BusyLoop,'--set',ViMode,'--set',ViInterpolation,'--set',ViWidescreen,'--set',ViHideOverscan,'--set',ViIntegerScaling,'--set',DpCompat],

GLideN64 = ['--set',threadedVideo,'--set',msaa,'--set',fxaa,'--set',aspectRatio,'--set',bufferSwapMode,'--set',useNativeResolutionFactor,'--set',bilinearMode,'--set',enableHalosRemoval,'--set',anisotropy,'--set',cache,'--set',txHiresEnable,'--set',txNoTextureFileStorage,'--set',EnableInaccurateTextureCoordinates,'--set',EnableDitheringPattern,'--set',EnableHiresNoiseDithering,'--set',DitheringQuantization,'--set',RDRAMImageDitheringMode,'--set',EnableLOD,'--set',EnableHWLighting,'--set',EnableCoverage,'--set',EnableClipping,'--set',EnableShadersStorage,'--set',EnableLegacyBlending,'--set',EnableHybridFilter,'--set',EnableCustomSettings,'--set',CorrectTexrectCoords,'--set',EnableNativeResTexrects,'--set',BackgroundsMode,'--set',EnableTexCoordBounds,'--set',EnableFBEmulation,'--set',EnableCopyAuxiliaryToRDRAM,'--set',EnableN64DepthCompare,'--set',ForceDepthBufferClear,'--set',DisableFBInfo,'--set',FBInfoReadColorChunk,'--set',FBInfoReadDepthChunk,'--set',EnableCopyColorToRDRAM,'--set',EnableCopyDepthToRDRAM,'--set',EnableCopyColorFromRDRAM,'--set',EnableCopyDepthToMainDepthBuffer,'--set',EnableOverscan,'--set',OverscanNtscTop,'--set',OverscanNtscLeft,'--set',OverscanNtscRight,'--set',OverscanNtscBottom,'--set',OverscanPalTop,'--set',OverscanPalLeft,'--set',OverscanPalRight,'--set',OverscanPalBottom,'--set',txFilterMode,'--set',txEnhancementMode,'--set',txDeposterize,'--set',txFilterIgnoreBG,'--set',txCacheSize,'--set',txHiresVramLimit,'--set',txHiresFullAlphaChannel,'--set',txHresAltCRC,'--set',txCacheCompression, '--set',txForce16bpp, '--set',txSaveCache,'--set',txPathSetting,'--set',txCachePathSetting,'--set',txDumpPathSetting,'--set',hkTexDump,'--set',hkHdTexReload,'--set',hkHdTexToggle,'--set',hkInaccurateTexCords,'--set',hkVsync,'--set',hkFBEmulation,'--set',hkN64DepthCompare,'--set',hkOsdVis,'--set',hkOsdFps,'--set',hkOsdPercent,'--set',hkOsdInternalResolution,'--set',hkOsdRenderingResolution,'--set',hkTexCoordBounds,'--set',hkNativeResTexrects,'--set',hkForceGammaCorrection,'--set',ForceGammaCorrection,'--set',GammaCorrectionLevel,'--set',fontSize,'--set',fontColor,'--set',ShowFPS,'--set',ShowVIS,'--set',ShowPercent,'--set',ShowInternalResolution,'--set',ShowRenderingResolution,'--set',ShowStatistics,'--set',CountersPos],

Parallel = ['--set',ParallelFullscreen,'--set',ParallelUpscaling,'--set',ParallelScreenWidth,'--set',ParallelScreenHeight,'--set',ParallelSuperscaledReads,'--set',ParallelSuperscaledDither,'--set',ParallelDeinterlace,'--set',ParallelIntegerScale,'--set',ParallelCropOverscan,'--set',ParallelVIAA,'--set',ParallelDivot,'--set',ParallelGammaDither,'--set',ParallelVIBilerp,'--set',ParallelVIDither,'--set',ParallelDownScale,'--set',ParallelNativeTextLOD,'--set',ParallelNativeTextRECT,'--set',ParallelWidescreenStretch],

Rice = ['--set',FrameBufferSetting,'--set',FrameBufferWriteBackControl,'--set',RenderToTexture,'--set',ScreenUpdateSetting,'--set',NormalAlphaBlender,'--set',FastTextureLoading,'--set',AccurateTextureMapping,'--set',InN64Resolution,'--set',SaveVRAM,'--set',DoubleSizeForSmallTxtrBuf,'--set',DefaultCombinerDisable,'--set',EnableHacks,'--set',WinFrameMode,'--set',FullTMEMEmulation,'--set',OpenGLVertexClipper,'--set',EnableSSE,'--set',SkipFrame,'--set',TexRectOnly,'--set',SmallTextureOnly,'--set',LoadHiResCRCOnly,'--set',LoadHiResTextures,'--set',DumpTexturesToFiles,'--set',RiceShowFPS,'--set',Mipmapping,'--set',FogMethod,'--set',ForceTextureFilter,'--set',TextureEnhancement,'--set',TextureEnhancementControl,'--set',TextureQuality,'--set',OpenGLDepthBufferSetting,'--set',RiceMultiSampling,'--set',ColorQuality,'--set',OpenGLRenderSetting,'--set',AnisotropicFiltering,'--set',ForcePolygonOffset,'--set',PolygonOffsetFactor,'--set',PolygonOffsetUnits],

Glide64MK2 = ['--set',Glide64VSync,'--set',wrpAntiAliasing,'--set',force_polygon_offset,'--set',polygon_offset_factor,'--set',polygon_offset_units,'--set',show_fps,'--set',clock,'--set',clock_24_hr,'--set',wrpFBO,'--set',wrpAnisotropic,'--set',ghq_fltr,'--set',ghq_cmpr,'--set',ghq_enht,'--set',ghq_hirs,'--set',ghq_enht_cmpr,'--set',ghq_enht_tile,'--set',ghq_enht_f16bpp,'--set',ghq_enht_gz,'--set',ghq_enht_nobg,'--set',ghq_hirs_cmpr,'--set',ghq_hirs_tile,'--set',ghq_hirs_f16bpp,'--set',ghq_hirs_gz,'--set',ghq_hirs_altcrc,'--set',ghq_cache_save,'--set',ghq_cache_size,'--set',ghq_hirs_let_texartists_fly,'--set',ghq_hirs_dump,'--set',alt_tex_size,'--set',use_sts1_only,'--set',force_calc_sphere,'--set',correct_viewport,'--set',increase_texrect_edge,'--set',decrease_fillrect_edge,'--set',texture_correction,'--set',pal230,'--set',force_microcheck,'--set',force_quad3d,'--set',clip_zmin,'--set',clip_zmax,'--set',fast_crc,'--set',adjust_aspect,'--set',zmode_compare_less,'--set',old_style_adither,'--set',n64_z_scale,'--set',optimize_texrect,'--set',ignore_aux_copy,'--set',hires_buf_clear,'--set',fb_read_alpha,'--set',useless_is_useless,'--set',fb_crc_mode,'--set',filtering,'--set',fog,'--set',buff_clear,'--set',swapmode,'--set',aspect,'--set',lodmode,'--set',fb_smart,'--set',fb_hires,'--set',fb_read_always,'--set',read_back_to_screen,'--set',detect_cpu_write,'--set',fb_get_info,'--set',fb_render],

graphics = [],
cheats = [],
activeCheats = '';
if(id('cheatList').innerHTML != ''){
var cheatInputs = id('cheatList').querySelectorAll("input[type='checkbox']");
for (var i = 0; i < cheatInputs.length; i++){var cheatInput = cheatInputs[i];checkCheats(cheatInput)}
function checkCheats(cheatInput){if(cheatInput.checked){var id = cheatInput.id.replace('_','-');activeCheats += id + ','}}
cheats = ['--cheats',activeCheats]}

if(!input.includes('mupen64plus-input-sdl'))controls = []
if(gfx.includes('mupen64plus-video-angrylion-plus'))graphics = Angrylion
if(gfx.includes('mupen64plus-video-glide64mk2'))graphics = Glide64MK2
if(gfx.includes('mupen64plus-video-GLideN64'))graphics = GLideN64
if(gfx.includes('mupen64plus-video-parallel'))graphics = Parallel
if(gfx.includes('mupen64plus-video-rice'))graphics = Rice

if(input.includes('mupen64plus-input-gca')){
try {writeGCA(gcaSettings)}
catch (e) {console.warn(e)}}

const parameters = core.concat(PIFROM,nospeedlimit,verbose,cheats,controls,graphics,filePath),
child = emuLaunch(parameters);

})
})