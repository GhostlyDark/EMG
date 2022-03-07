const {contextBridge,ipcRenderer} = require('electron'),
cwd = ipcRenderer.sendSync('cwd'),
executablePath = ipcRenderer.sendSync('executablePath'),
hires_texture = ipcRenderer.sendSync('hires_texture'),
cache = ipcRenderer.sendSync('cache'),
texture_dump = ipcRenderer.sendSync('texture_dump'),
working_directory = ipcRenderer.sendSync('working_directory'),
isLinux = ipcRenderer.sendSync('isLinux'),
dialogDirectory = () => {return ipcRenderer.sendSync('dialogDirectory')},
dialogFile = (data) => {return ipcRenderer.sendSync('dialogFile', data)},
writeGCA = (gcaSettings) => {ipcRenderer.sendSync('writeGCA', gcaSettings)},
emuLaunch = (parameters) => {ipcRenderer.send('emuLaunch', parameters)},
listArchive = (archivePath, ext) => {return ipcRenderer.sendSync('listArchive', archivePath, ext)},
extractArchive = (archivePath, workingDirectory, ext) => {return ipcRenderer.sendSync('extractArchive', archivePath, workingDirectory, ext)},
returnPath = (workingDirectory, rom) => {return ipcRenderer.sendSync('returnPath', workingDirectory, rom)},
showCheats = (parameters) => {return ipcRenderer.sendSync('showCheats', parameters)},
jsrefresh = () => {return ipcRenderer.sendSync('jsrefresh')},

jstest = (joyinput) => {
var joyvalue,joydata,jstestConfig,config;
if(joyinput.id.includes('1'))config = c1
if(joyinput.id.includes('2'))config = c2
if(joyinput.id.includes('3'))config = c3
if(joyinput.id.includes('4'))config = c4
jstestConfig = ['-es', config.value.substring(0,2).replace(/\:/g,'')];
ipcRenderer.removeAllListeners('jsLog')
ipcRenderer.removeAllListeners('jsClosed')
ipcRenderer.send('jstestKill')
ipcRenderer.send('jstestChild', jstestConfig)
ipcRenderer.once('jsLog', (e, data) => {
joydata = data.replace(/\r/gm,'');
if(joydata.includes('-')){joyvalue = joydata.replace(/\s.*/i,'-)')}else{joyvalue = joydata.replace(/\s.*/i,'+)')}
if(joyinput.id.includes('JoyMapping')){
if(joydata.includes('button')){joyvalue = 'B' + joydata.replace(/button\(|\)/g,'')}
if(joydata.includes('hat')){joyvalue = joydata.replace('hat(','H').replace(' ','V').replace(')','')}
if(joydata.includes('axis')){joyvalue = joyvalue.replace(/xis\(|\)/g,'').replace('a','A')}
if(joyvalue != joyinput.value && joyinput.value != '' && !joyinput.value.includes('/')){joyvalue = joyinput.value + '/' + joyvalue}}
else{
if(joydata.includes('button')){joyvalue = joydata}
if(joydata.includes('hat')){joyvalue = joydata.replace('1)','Up)').replace('2)','Right)').replace('4)','Down)').replace('8)','Left)')}}
if(joyvalue != undefined){joyinput.value = joyvalue;localStorage.setItem(joyinput.id,joyvalue)}})
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

contextBridge.exposeInMainWorld('hires_texture',hires_texture)
contextBridge.exposeInMainWorld('cache',cache)
contextBridge.exposeInMainWorld('texture_dump',texture_dump)
contextBridge.exposeInMainWorld('working_directory',working_directory)
contextBridge.exposeInMainWorld('isLinux',isLinux)
contextBridge.exposeInMainWorld('dialogDirectory',dialogDirectory)
contextBridge.exposeInMainWorld('dialogFile',dialogFile)
contextBridge.exposeInMainWorld('emuLaunch',emuLaunch)
contextBridge.exposeInMainWorld('listArchive',listArchive)
contextBridge.exposeInMainWorld('extractArchive',extractArchive)
contextBridge.exposeInMainWorld('returnPath',returnPath)
contextBridge.exposeInMainWorld('jstest',jstest)
contextBridge.exposeInMainWorld('jsrefresh',jsrefresh)
contextBridge.exposeInMainWorld('showCheats',showCheats)
contextBridge.exposeInMainWorld('writeGCA',writeGCA)
