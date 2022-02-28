const {contextBridge,ipcRenderer} = require('electron'),
cwd = ipcRenderer.sendSync('cwd'),
executablePath = ipcRenderer.sendSync('executablePath'),
hires_texture = ipcRenderer.sendSync('hires_texture'),
cache = ipcRenderer.sendSync('cache'),
texture_dump = ipcRenderer.sendSync('texture_dump'),
working_directory = ipcRenderer.sendSync('working_directory'),
stdio = ['ignore', 'pipe', 'ignore'],
dialogDirectory = () => {return ipcRenderer.sendSync('dialogDirectory')},
dialogFile = (data) => {return ipcRenderer.sendSync('dialogFile', data)},
writeGCA = (gcaSettings) => {ipcRenderer.sendSync('writeGCA', gcaSettings)},
emuLaunch = (parameters) => {ipcRenderer.send('emuLaunch', parameters)},
listArchive = (archivePath) => {return ipcRenderer.sendSync('listArchive', archivePath)},
extractArchive = (archivePath, workingDirectory) => {return ipcRenderer.sendSync('extractArchive', archivePath, workingDirectory)},
returnPath = (workingDirectory, rom) => {return ipcRenderer.sendSync('returnPath', workingDirectory, rom)},
showCheats = (parameters) => {return ipcRenderer.sendSync('showCheats', parameters)},

jstest = (joyinput,name1Input,name2Input,name3Input,name4Input) => {
var joyvalue,joyfilter,joydata,jstestConfig;
if(joyinput.id.includes('1')){jstestConfig = ['-e', '0']}
if(joyinput.id.includes('2')){jstestConfig = ['-e', '1']}
if(joyinput.id.includes('3')){jstestConfig = ['-e', '2']}
if(joyinput.id.includes('4')){jstestConfig = ['-e', '3']}
ipcRenderer.removeAllListeners('jsLog')
ipcRenderer.removeAllListeners('jsClosed')
ipcRenderer.send('jstestKill')
ipcRenderer.send('jstestChild', jstestConfig)
ipcRenderer.once('jsLog', (e, data) => {
joyfilter = data.replace(/\r/gm,'');
joydata = joyfilter.split('\n'); // joydata[0] = Device Name, joydata[1] = Device Number, joydata[2] = Pressed Key
if(joydata[2].includes('-')){joyvalue = joydata[2].replace(/\s.*/i,'-)')}else{joyvalue = joydata[2].replace(/\s.*/i,'+)')}
if(joyinput.id.includes('JoyMapping')){
if(joydata[2].includes('button')){joyvalue = 'B' + joydata[2].replace(/button\(|\)/g,'')}
if(joydata[2].includes('hat')){joyvalue = joydata[2].replace('hat(','H').replace(' ','V').replace(')','')}
if(joydata[2].includes('axis')){joyvalue = joyvalue.replace(/xis\(|\)/g,'').replace('a','A')}
if(joyvalue != joyinput.value && joyinput.value != '' && !joyinput.value.includes('/')){joyvalue = joyinput.value + '/' + joyvalue}}
else{
if(joyinput.id.includes('1')){name1Input.value = joydata[0];localStorage.setItem('name1',joydata[0])}
if(joyinput.id.includes('2')){name2Input.value = joydata[0];localStorage.setItem('name2',joydata[0])}
if(joyinput.id.includes('3')){name3Input.value = joydata[0];localStorage.setItem('name3',joydata[0])}
if(joyinput.id.includes('4')){name4Input.value = joydata[0];localStorage.setItem('name4',joydata[0])}
if(joydata[2].includes('button')){joyvalue = joydata[2]};
if(joydata[2].includes('hat')){joyvalue = joydata[2].replace('1)','Up)').replace('2)','Right)').replace('4)','Down)').replace('8)','Left)')}}
if(joyvalue != undefined){joyinput.value = joyvalue;localStorage.setItem(joyinput.id,joyvalue)}})
joyinput.addEventListener('blur', function(){ipcRenderer.send('jstestKill')})
ipcRenderer.once('jsClosed', () => {joyinput.blur()})}

ipcRenderer.on('spawnargs', (e, spawnargs) => {console.log(spawnargs)})
ipcRenderer.on('m64pLog', (e, stdout) => {console.log(stdout)})

contextBridge.exposeInMainWorld('hires_texture',hires_texture)
contextBridge.exposeInMainWorld('cache',cache)
contextBridge.exposeInMainWorld('texture_dump',texture_dump)
contextBridge.exposeInMainWorld('working_directory',working_directory)
contextBridge.exposeInMainWorld('dialogDirectory',dialogDirectory)
contextBridge.exposeInMainWorld('dialogFile',dialogFile)
contextBridge.exposeInMainWorld('emuLaunch',emuLaunch)
contextBridge.exposeInMainWorld('listArchive',listArchive)
contextBridge.exposeInMainWorld('extractArchive',extractArchive)
contextBridge.exposeInMainWorld('returnPath',returnPath)
contextBridge.exposeInMainWorld('jstest',jstest)
contextBridge.exposeInMainWorld('showCheats',showCheats)
contextBridge.exposeInMainWorld('writeGCA',writeGCA)
