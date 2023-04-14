let win, jstestChild;
const {app, BrowserWindow, dialog, ipcMain, Menu, nativeImage, session, shell} = require('electron'),
childSpawn = require('child_process').spawn,
childSpawnSync = require('child_process').spawnSync,
existsSync = require('fs').existsSync,
mkdirSync = require('fs').mkdirSync,
writeFileSync = require('fs').writeFileSync,
url = require('url').URL,
path = require('path').join,
dir = __dirname,
appData = app.getPath('appData'),
m64pConfig = path(appData, 'mupen64plus'),
emg = path(appData, 'EMG'),
cwd = path(dir, 'm64p'),
testROM = path(cwd, 'm64p_test_rom.v64'),
executablePath = path(cwd, 'mupen64plus'),
jstestPath = path(cwd, 'sdl2-jstest'),
isLinux = process.platform === 'linux',
stdio = ['ignore', 'pipe', 'ignore'],
emuOptions = {cwd: cwd, detached: true, stdio: stdio},
cheatOptions = {cwd: cwd, stdio: stdio, windowsHide: true},
jsOptions = {cwd: cwd, stdio: stdio, timeout: 5000, windowsHide: true},
scale = {width:28},
load = path(dir, 'index.htm'),
name = ' ' + app.name + ' v' + app.getVersion(),
preferences = {preload:path(dir, 'preload.js')},
mainWindow = {backgroundColor:'#121212', width:1280, height:800, minWidth:923, minHeight:640, title:name, show:false, autoHideMenuBar:true, webPreferences:preferences},
deleteDialog = {defaultId:1, cancelId:1, icon:path(dir, 'img', 'delete.png'), buttons:['Confirm','Abort'], title:' Reset settings', message:'Reset all settings?'};

let m64pCache = m64pConfig, m64pShare = m64pConfig;
if(isLinux){m64pCache = path(appData, '../', '.cache', 'mupen64plus');m64pShare = path(appData, '../', '.local', 'share', 'mupen64plus')};

const cache = path(m64pCache,'cache'),
hires_texture = path(m64pShare,'hires_texture'),
save = path(m64pShare,'save'),
screenshot = path(m64pShare,'screenshot'),
shaders = path(m64pCache,'shaders'),
texture_dump = path(m64pShare,'texture_dump');

app.enableSandbox()

ipcMain.on('emuLaunch', (e, parameters) => {
	let stdout = '';
	const child = childSpawn(executablePath, parameters, emuOptions);
	child.stdout.on('data', (data) => {stdout += data.toString()})
	child.on('exit', () => {e.reply('m64pLog', child.spawnargs, stdout)})
})

ipcMain.on('showCheats', (e, parameters) => {
	const child = childSpawnSync(executablePath, parameters, cheatOptions);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('jstestChild', (e, jstestConfig) => {
	jstestChild = childSpawn(jstestPath, jstestConfig, jsOptions);
	jstestChild.stdout.on('data', (data) => {e.reply('jsLog', data.toString())})
	jstestChild.on('close', () => {e.reply('jsClosed')})
})

ipcMain.on('jsRefresh', (e) => {
	const child = childSpawnSync(jstestPath, ['-ls'], jsOptions);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('jsMapping', (e, padId) => {
	const child = childSpawnSync(jstestPath, ['-m', padId], jsOptions);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('writeGCA', (e, gcaSettings, configdir) => {
	if(!existsSync(configdir)){mkdirSync(configdir,{recursive:true})}
	if(!existsSync(cache)){mkdirSync(cache,{recursive:true})}
	if(!existsSync(hires_texture)){mkdirSync(hires_texture,{recursive:true})}
	if(!existsSync(save)){mkdirSync(save,{recursive:true})}
	if(!existsSync(screenshot)){mkdirSync(screenshot,{recursive:true})}
	if(!existsSync(shaders)){mkdirSync(shaders,{recursive:true})}
	if(!existsSync(texture_dump)){mkdirSync(texture_dump,{recursive:true})}
	e.returnValue = writeFileSync(path(configdir,'mupen64plus-input-gca.toml'),gcaSettings)
})

ipcMain.on('cwd', (e) => {e.returnValue = cwd})
ipcMain.on('testROM', (e) => {e.returnValue = testROM})
ipcMain.on('executablePath', (e) => {e.returnValue = executablePath})
ipcMain.on('jstestPath', (e) => {e.returnValue = jstestPath})
ipcMain.on('jstestKill', () => {if(jstestChild != undefined)jstestChild.kill('SIGTERM')})
ipcMain.on('config', (e) => {e.returnValue = m64pConfig})
ipcMain.on('screenshot', (e) => {e.returnValue = screenshot})
ipcMain.on('savePath', (e) => {e.returnValue = save})
ipcMain.on('hires_texture', (e) => {e.returnValue = hires_texture})
ipcMain.on('cache', (e) => {e.returnValue = cache})
ipcMain.on('texture_dump', (e) => {e.returnValue = texture_dump})
ipcMain.on('isLinux', (e) => {e.returnValue = isLinux})
ipcMain.on('dialogDirectory', (e) => {e.returnValue = dialog.showOpenDialogSync({properties:['openDirectory']})})
ipcMain.on('dialogFile', (e, data) => {e.returnValue = dialog.showOpenDialogSync({properties:['openFile'],filters:[data]})})

app.on('second-instance', (e) => {if(win.isMinimized()){win.restore()}else{win.focus()}})
if(!app.requestSingleInstanceLock()){return app.quit()}

app.on('ready', () => {
win = new BrowserWindow(mainWindow)
win.loadFile(load)
win.once('ready-to-show', () => {win.maximize();win.show()})
win.on('page-title-updated', (e) => {e.preventDefault()})
if(isLinux){win.setIcon(path(dir, 'img', 'emg.png'))}
win.webContents.setWindowOpenHandler((details) => {return {action:'deny'}})

win.webContents.on('will-navigate', (e, nav) => {const parsed = new url(nav)
if(parsed.origin != load) {e.preventDefault()}})

session.defaultSession.webRequest.onBeforeRequest(
function(details, callback){
const whitelist = /(^file:\/\/\/)|(^devtools:\/\/devtools\/bundled\/)/g;
if(whitelist.test(details.url)){callback({cancel:false})}
else{callback({cancel:true})}})

Menu.setApplicationMenu(Menu.buildFromTemplate([
	{label: 'App', submenu: [{icon: nativeImage.createFromPath(path(dir, 'img', 'quit.png')).resize(scale), label: 'Quit ' + app.name, click () {win.close()}}]},
	{label: 'Window', submenu: [
		{icon: nativeImage.createFromPath(path(dir, 'img', 'refresh.png')).resize(scale), label: 'Reload window', accelerator: 'CmdOrCtrl+R', role: 'reload'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'inspector.png')).resize(scale), label: 'Developer tools', accelerator: 'CmdOrCtrl+I', role: 'toggleDevTools'},
		{type: 'separator'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'zoom-in.png')).resize(scale), label: 'Increase zoom', accelerator: 'CmdOrCtrl+numadd', role: 'zoomin'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'zoom-out.png')).resize(scale), label: 'Decrease zoom', accelerator: 'CmdOrCtrl+numsub', role: 'zoomout'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'zoom-reset.png')).resize(scale), label: 'Reset zoom', accelerator: 'CmdOrCtrl+num0', role: 'resetzoom'},
		]},
	{label: 'Functions', submenu: [
		{icon: nativeImage.createFromPath(path(dir, 'img', 'delete.png')).resize(scale), label: 'Reset settings', click () {const choice = dialog.showMessageBoxSync(win,deleteDialog);if(choice !== 1){session.defaultSession.clearStorageData();session.defaultSession.clearCache()}}},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'emg.png')).resize(scale), label: 'Show EMG data', click () {shell.openPath(emg)}},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'mupen64plus.png')).resize(scale), label: 'Show m64p data', click () {shell.openPath(m64pConfig);if(isLinux){shell.openPath(m64pCache);shell.openPath(m64pShare)}}},
		{type: 'separator'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'github.png')).resize(scale), label: 'Visit GitHub repo', click () {shell.openExternal('https://github.com/GhostlyDark/EMG')}},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'icon-ghostly-nx.png')).resize(scale), label: 'Visit website', click () {shell.openExternal('https://evilgames.eu/')}}
		]}
]))

win.on('closed', () => {app.exit()})
})
