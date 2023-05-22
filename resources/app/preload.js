var id = function(id){return document.getElementById(id)};

const {contextBridge,ipcRenderer} = require('electron'),
testROM = ipcRenderer.sendSync('testROM'),
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
dialogError = (title, data) => {ipcRenderer.send('dialogError', title, data)},
openPath = (data) => {return ipcRenderer.sendSync('openPath', data)},
showInFolder = (data) => {return ipcRenderer.sendSync('showInFolder', data.toString())},
romDir = (data) => {return ipcRenderer.sendSync('romDir', data)},
romDirFile = (dir, data) => {return ipcRenderer.sendSync('romDirFile', dir, data)},
writeGCA = (gcaSettings, configdir) => {ipcRenderer.sendSync('writeGCA', configdir, gcaSettings)},
emuLaunch = (parameters) => {ipcRenderer.send('emuLaunch', parameters)},
showCheats = (parameters) => {return ipcRenderer.sendSync('showCheats', parameters)},
jsRefresh = () => {return ipcRenderer.sendSync('jsRefresh')},
jsMapping = (padId) => {return ipcRenderer.sendSync('jsMapping', padId)},
goToGitHub = () => {ipcRenderer.send('goToGitHub')},

jstest = (joyinput) => {
var joyID = function(joyID){return id(joyID)},joyvalue,joydata,jstestConfig,config;
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
if(joyvalue != undefined){
if(!joyinput.id.includes('JoyMapping') && joyinput.id.includes('c') && !joyinput.id.includes('cb')){ /* disallow same input type for secondary bindings, slot 1 */
const secondary = joyinput.id + 'b';
if(joyID(secondary).value.includes('axis') && joyvalue.includes('axis')){joyID(secondary).value = '';localStorage.removeItem(secondary)}
if(joyID(secondary).value.includes('button') && joyvalue.includes('button')){joyID(secondary).value = '';localStorage.removeItem(secondary)}
if(joyID(secondary).value.includes('hat') && joyvalue.includes('hat')){joyID(secondary).value = '';localStorage.removeItem(secondary)}}
if(!joyinput.id.includes('JoyMapping') && joyinput.id.includes('cb')){ /* disallow same input type for secondary bindings, slot 2 */
const primary = joyinput.id.replace('cb','c');
if(joyID(primary).value.includes('axis') && joyvalue.includes('axis')){joyID(primary).value = joyvalue;localStorage.setItem(primary,joyvalue);return}
if(joyID(primary).value.includes('button') && joyvalue.includes('button')){joyID(primary).value = joyvalue;localStorage.setItem(primary,joyvalue);return}
if(joyID(primary).value.includes('hat') && joyvalue.includes('hat')){joyID(primary).value = joyvalue;localStorage.setItem(primary,joyvalue);return}}
joyinput.value = joyvalue;localStorage.setItem(joyinput.id,joyvalue)}}) /* finalize */
joyinput.addEventListener('blur', function(){ipcRenderer.send('jstestKill')})
ipcRenderer.once('jsClosed', () => {joyinput.blur()})}

ipcRenderer.on('m64pLog', (e, spawnargs, stdout) => {
console.dir(JSON.stringify(spawnargs, null, 1) + '\n' + stdout)
if(log.innerHTML != '')log.innerHTML = ''
var data = '', line = stdout.replace(/\r/gm,'').split(/\s*\n/);
line.forEach(line => {
if(line.includes('RSP Error: RSP: unknown opcode'))line = 'RSP: unknown opcode'
if(line.includes('RSP Error: unknown task type:'))line = 'RSP: unknown task type'
if(line.includes('Error:') && !data.includes(line))data += '<p>' + line + '</p>'})
if(data.includes("couldn't open ROM file") || data.includes('failed to open ROM image file')){dialogError('ROM failure','ROM file failed to load')}
else if(data.includes('plugin not found')){dialogError('Plugin failure','Plugin failed to load')}
else if(data.includes('AttachCoreLib() Error:')){dialogError('Core failure','Core failed to load')}
else if(stdout === ''){data = 'Emulator crashed';dialogError(data)}
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
contextBridge.exposeInMainWorld('openPath',openPath)
contextBridge.exposeInMainWorld('showInFolder',showInFolder)
contextBridge.exposeInMainWorld('romDir',romDir)
contextBridge.exposeInMainWorld('romDirFile',romDirFile)
contextBridge.exposeInMainWorld('emuLaunch',emuLaunch)
contextBridge.exposeInMainWorld('jstest',jstest)
contextBridge.exposeInMainWorld('jsRefresh',jsRefresh)
contextBridge.exposeInMainWorld('jsMapping',jsMapping)
contextBridge.exposeInMainWorld('showCheats',showCheats)
contextBridge.exposeInMainWorld('writeGCA',writeGCA)

document.addEventListener('DOMContentLoaded', function() {id('github').addEventListener('click', function(){goToGitHub()})})
