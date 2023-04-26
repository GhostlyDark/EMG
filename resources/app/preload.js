const {contextBridge,ipcRenderer} = require('electron'),
cwd = ipcRenderer.sendSync('cwd'),
testROM = ipcRenderer.sendSync('testROM'),
executablePath = ipcRenderer.sendSync('executablePath'),
pluginDir = ipcRenderer.sendSync('pluginDir'),
config = ipcRenderer.sendSync('config'),
screenshot = ipcRenderer.sendSync('screenshot'),
savePath = ipcRenderer.sendSync('savePath'),
hires_texture = ipcRenderer.sendSync('hires_texture'),
cache = ipcRenderer.sendSync('cache'),
texture_dump = ipcRenderer.sendSync('texture_dump'),
isLinux = ipcRenderer.sendSync('isLinux'),
dialogDirectory = () => {return ipcRenderer.sendSync('dialogDirectory')},
dialogFile = (data) => {return ipcRenderer.sendSync('dialogFile', data)},
writeGCA = (gcaSettings, configdir) => {ipcRenderer.sendSync('writeGCA', configdir, gcaSettings)},
emuLaunch = (parameters) => {ipcRenderer.send('emuLaunch', parameters)},
showCheats = (parameters) => {return ipcRenderer.sendSync('showCheats', parameters)},
jsRefresh = () => {return ipcRenderer.sendSync('jsRefresh')},
jsMapping = (padId) => {return ipcRenderer.sendSync('jsMapping', padId)},

jstest = (joyinput) => {
var id = function(id){return document.getElementById(id)},joyvalue,joydata,jstestConfig,config;
if(joyinput.id.includes('1'))config = c1
if(joyinput.id.includes('2'))config = c2
if(joyinput.id.includes('3'))config = c3
if(joyinput.id.includes('4'))config = c4
const cvalue = config.value.substring(0,2).replace(/\:/g,'');
jstestConfig = ['-es', cvalue];
ipcRenderer.removeAllListeners('jsLog')
ipcRenderer.removeAllListeners('jsClosed')
ipcRenderer.send('jstestKill')
ipcRenderer.send('jstestChild', jstestConfig)
ipcRenderer.once('jsLog', (e, data) => {
joydata = data.replace(/\r/gm,'');
let mapping = jsMapping(cvalue); /* force + on trigger axis */
if(mapping != '' && mapping != null && mapping != undefined){
mapping = '"' + mapping.replace(/hint:(.*):(.*)/,'hint:$1$2').replace(/([^,]*),([^,]*),/,'guid:$1,name:$2,').replace(/\:/g,'":"').replace(/,/g,'","').replace(/\r|\n/g,'') + '"'
mapping = JSON.parse('{' + mapping.replace(/,""/,'') + '}')
if(joydata.includes('axis')){
const jdvalue = joydata.replace(/\n/g).replace(/axis\((.*) .*/,'a$1');
if(jdvalue == mapping.lefttrigger || jdvalue == mapping.righttrigger)joydata = joydata.replace(' -',' ')}}
if(joydata.includes('-')){joyvalue = joydata.replace(/\s.*/i,'-)')}else{joyvalue = joydata.replace(/\s.*/i,'+)')} /* axis */
if(joyinput.id.includes('JoyMapping')){ /* mupen64plus joypad hotkeys */
if(joydata.includes('button')){joyvalue = 'B' + joydata.replace(/button\(|\)/g,'')}
if(joydata.includes('hat')){joyvalue = joydata.replace('hat(','H').replace(' ','V').replace(')','')}
if(joydata.includes('axis')){joyvalue = joyvalue.replace(/xis\(|\)/g,'').replace('a','A')}
if(joyvalue != joyinput.value && joyinput.value != '' && !joyinput.value.includes('/')){joyvalue = joyinput.value + '/' + joyvalue}}
else{ /* joypad buttons */
if(joydata.includes('button')){joyvalue = joydata}
if(joydata.includes('hat')){joyvalue = joydata.replace('1)','Up)').replace('2)','Right)').replace('4)','Down)').replace('8)','Left)')}}
if(joyvalue != undefined){joyinput.value = joyvalue;localStorage.setItem(joyinput.id,joyvalue)}}) /* finalize */
joyinput.addEventListener('blur', function(){ipcRenderer.send('jstestKill')})
ipcRenderer.once('jsClosed', () => {joyinput.blur()})}

ipcRenderer.on('m64pLog', (e, spawnargs, stdout) => {
console.dir(JSON.stringify(spawnargs, null, 1) + '\n' + stdout)
if(log.innerHTML != '')log.innerHTML = ''
var data = '', line = stdout.replace(/\r/gm,'').split(/\s*\n/);
line.forEach(line => {
if(line.includes('RSP Error: RSP: unknown opcode'))line = 'RSP Error: unknown opcode'
if(line.includes('RSP Error: unknown task type:'))line = 'RSP Error: unknown task type'
if(line.includes('Error:') && !data.includes(line))data += '<p>' + line + '</p>'})
if(data.includes("couldn't open ROM file") || data.includes('failed to open ROM image file'))alert('Mupen64Plus Error: Unable to open ROM file')
else if(data.includes('plugin not found'))alert('Mupen64Plus Error: A plugin failed to initialize')
else if(data.includes('AttachCoreLib() Error:'))alert('Mupen64Plus Error: Core files or dependencies missing')
else if(stdout === ''){alert('Mupen64Plus Error: Emulator instance crashed');data = 'Emulator instance crashed.'}
log.innerHTML = data})

contextBridge.exposeInMainWorld('testROM',testROM)
contextBridge.exposeInMainWorld('pluginDir',pluginDir)
contextBridge.exposeInMainWorld('config',config)
contextBridge.exposeInMainWorld('screenshot',screenshot)
contextBridge.exposeInMainWorld('savePath',savePath)
contextBridge.exposeInMainWorld('hires_texture',hires_texture)
contextBridge.exposeInMainWorld('cache',cache)
contextBridge.exposeInMainWorld('texture_dump',texture_dump)
contextBridge.exposeInMainWorld('isLinux',isLinux)
contextBridge.exposeInMainWorld('dialogDirectory',dialogDirectory)
contextBridge.exposeInMainWorld('dialogFile',dialogFile)
contextBridge.exposeInMainWorld('emuLaunch',emuLaunch)
contextBridge.exposeInMainWorld('jstest',jstest)
contextBridge.exposeInMainWorld('jsRefresh',jsRefresh)
contextBridge.exposeInMainWorld('jsMapping',jsMapping)
contextBridge.exposeInMainWorld('showCheats',showCheats)
contextBridge.exposeInMainWorld('writeGCA',writeGCA)
