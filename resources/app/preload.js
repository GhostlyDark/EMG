const {contextBridge,ipcRenderer} = require('electron'),
cwd = ipcRenderer.sendSync('cwd'),
executablePath = ipcRenderer.sendSync('executablePath'),
hires_texture = ipcRenderer.sendSync('hires_texture'),
cache = ipcRenderer.sendSync('cache'),
texture_dump = ipcRenderer.sendSync('texture_dump'),
stdio = ['ignore', 'pipe', 'ignore'],
dialogDirectory = () => {return ipcRenderer.sendSync('dialogDirectory')},
dialogFile = (data) => {return ipcRenderer.sendSync('dialogFile', data)},
writeGCA = (gcaSettings) => {ipcRenderer.sendSync('writeGCA', gcaSettings)},
emuLaunch = (parameters) => {ipcRenderer.send('emuLaunch', parameters)},
showCheats = (parameters) => {return ipcRenderer.sendSync('showCheats', parameters)},

jstest = (joyinput,name1Input,name2Input,name3Input,name4Input) => {
const regremove = /\r/gm, regaxis = /\s.*/i, reghk = /button\(|\)/g, reghka = /xis\(|\)/g;
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
joyfilter = data.replace(regremove,'');
joydata = joyfilter.split('\n'); // joydata[0] = Device Name, joydata[1] = Device Number, joydata[2] = Pressed Key
if(joyinput.id.includes('JoyMapping')){
if(joydata[2].includes('button')){joyvalue = 'B' + joydata[2].replace(reghk,'')}
if(joydata[2].includes('hat')){
if(joydata[2] === 'hat(0 1)'){joyvalue = 'H0V1'}
if(joydata[2] === 'hat(0 2)'){joyvalue = 'H0V2'}
if(joydata[2] === 'hat(0 4)'){joyvalue = 'H0V4'}
if(joydata[2] === 'hat(0 8)'){joyvalue = 'H0V8'}}
if(joydata[2].includes('axis')){
if(joydata[2].includes('-')){joyvalue = joydata[2].replace(regaxis,'-)')}
else{joyvalue = joydata[2].replace(regaxis,'+)')}
joyvalue = joyvalue.replace(reghka,'').replace('a','A')}
if(joyvalue != joyinput.value && joyinput.value != '' && !joyinput.value.includes('/')){joyvalue = joyinput.value + '/' + joyvalue}}
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
joyinput.addEventListener('blur', function(){ipcRenderer.send('jstestKill')})
ipcRenderer.once('jsClosed', () => {joyinput.blur()})}

ipcRenderer.on('spawnargs', (e, spawnargs) => {console.log(spawnargs)})
ipcRenderer.on('m64pLog', (e, stdout) => {console.log(stdout)})

contextBridge.exposeInMainWorld('hires_texture',hires_texture)
contextBridge.exposeInMainWorld('cache',cache)
contextBridge.exposeInMainWorld('texture_dump',texture_dump)
contextBridge.exposeInMainWorld('dialogDirectory',dialogDirectory)
contextBridge.exposeInMainWorld('dialogFile',dialogFile)
contextBridge.exposeInMainWorld('emuLaunch',emuLaunch)
contextBridge.exposeInMainWorld('jstest',jstest)
contextBridge.exposeInMainWorld('showCheats',showCheats)
contextBridge.exposeInMainWorld('writeGCA',writeGCA)
