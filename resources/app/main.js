let win, choice, whitelist;
const {app, BrowserWindow, dialog, ipcMain, Menu, nativeImage, session, shell} = require('electron'),
childSpawn = require('child_process').spawn,
childSpawnSync = require('child_process').spawnSync,
fs = require('fs').writeFileSync,
url = require('url').URL,
path = require('path').join,
dir = __dirname,
appData = app.getPath('appData'),
cwd = path(dir, 'm64p'),
executablePath = path(cwd, 'mupen64plus'),
jstestPath = path(cwd, 'sdl2-jstest'),
stdio = ['ignore', 'pipe', 'ignore'],
options = {cwd: cwd, stdio: stdio, windowsHide: true},
emuOptions = {cwd: cwd, detached: true, stdio: stdio},
jstestOptions = {cwd: cwd, stdio: stdio, timeout: 10000, windowsHide: true},
scale = {width:28},
load = path(dir, 'index.htm'),
name = ' ' + app.name + ' v' + app.getVersion(),
preferences = {preload:path(dir,'preload.js')},
mainWindow = {backgroundColor:'#121212', width:1280, height:800, minWidth:923, minHeight:640, title:name, show:false, autoHideMenuBar:true, webPreferences:preferences};
app.enableSandbox()

const menuQuit = 'Quit ' + app.name,menuWindow = 'Window',menuFunctions = 'Functions',menuReload = 'Reload window',menuDev = 'Developer tools',menuZoomIn = 'Increase zoom',menuZoomOut = 'Decrease zoom',menuZoomReset = 'Reset zoom',menuClear = 'Reset settings',menuEMG = 'Show EMG data',menuSaves = 'Show m64p data',menuGitHub = 'Visit GitHub repo',menuSite = 'Visit website',dialogDelete = ' Reset settings',dialogDeleteM = 'Reset all settings?',dialogNo = 'Abort',dialogYes = 'Confirm',
deleteDialog = {defaultId:1, cancelId:1, icon:path(dir, 'img', 'delete.png'), buttons:[dialogYes,dialogNo], title:dialogDelete, message:dialogDeleteM}

var jstestChild,
zipPath = path(cwd, '7z');
if(process.platform === 'linux')zipPath = '7z';

ipcMain.on('listArchive', (e, archivePath) => {
	const parameters = ['l',archivePath,'*.n64','*.v64','*.z64','-r','-ba'];
	let child = childSpawnSync(zipPath, parameters, options);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('extractArchive', (e, archivePath, workingDirectory) => {
	const parameters = ['e','-o'+workingDirectory,archivePath,'*.n64','*.v64','*.z64','-r','-y'];
	let child = childSpawnSync(zipPath, parameters, options);
	e.returnValue = ''
})

ipcMain.on('returnPath', (e, workingDirectory, rom) => {e.returnValue = path(workingDirectory, rom)})

ipcMain.on('emuLaunch', (e, parameters) => {
	var stdout = '';
	let child = childSpawn(executablePath, parameters, emuOptions);
	e.reply('spawnargs', child.spawnargs)
	child.stdout.on('data', (data) => {stdout += data.toString()})
	child.on('exit', () => {e.reply('m64pLog', stdout)})
})

ipcMain.on('showCheats', (e, parameters) => {
	let child = childSpawnSync(executablePath, parameters, options);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('jstestChild', (e, jstestConfig) => {
	jstestChild = childSpawn(jstestPath, jstestConfig, jstestOptions);
	jstestChild.stdout.on('data', (data) => {e.reply('jsLog', data.toString())})
	jstestChild.on('close', () => {e.reply('jsClosed')})
})
ipcMain.on('jstestKill', () => {if(jstestChild != undefined)jstestChild.kill('SIGTERM')})

ipcMain.on('cwd', (e) => {e.returnValue = cwd})
ipcMain.on('executablePath', (e) => {e.returnValue = executablePath})
ipcMain.on('jstestPath', (e) => {e.returnValue = jstestPath})
ipcMain.on('hires_texture', (e) => {e.returnValue = path(appData, 'mupen64plus', 'hires_texture')})
ipcMain.on('cache', (e) => {if(process.platform === 'linux'){e.returnValue = path(appData, '../', '.cache', 'mupen64plus', 'cache')}else{e.returnValue = path(appData, 'mupen64plus', 'cache')}})
ipcMain.on('texture_dump', (e) => {if(process.platform === 'linux'){e.returnValue = path(appData, '../', '.cache', 'mupen64plus', 'texture_dump')}else{e.returnValue = path(appData, 'mupen64plus', 'texture_dump')}})
ipcMain.on('working_directory', (e) => {e.returnValue = path(appData, 'EMG', 'ROMs')})
ipcMain.on('dialogDirectory', (e) => {e.returnValue = dialog.showOpenDialogSync({properties:['openDirectory']})})
ipcMain.on('dialogFile', (e, data) => {e.returnValue = dialog.showOpenDialogSync({properties:['openFile'],filters:[data]})})
ipcMain.on('writeGCA', (e, gcaSettings) => {e.returnValue = fs(path(appData, 'mupen64plus', 'mupen64plus-input-gca.toml'),gcaSettings)})

app.on('second-instance', (e) => {if(win.isMinimized()){win.restore()}else{win.focus()}})
if(!app.requestSingleInstanceLock()){return app.quit()}

app.on('ready', () => {
win = new BrowserWindow(mainWindow)
win.loadFile(load)
win.once('ready-to-show', () => {win.maximize();win.show()})
win.on('page-title-updated', (e) => {e.preventDefault()})
if(process.platform === 'linux'){win.setIcon(path(dir, 'img', 'emg.png'))}
win.webContents.on('new-window', (e) => {e.defaultPrevented = true})
win.webContents.on('will-navigate', (e, nav) => {const parsed = new url(nav)
if(parsed.origin != load) {e.preventDefault()}})

session.defaultSession.webRequest.onBeforeRequest(function(details, callback) {whitelist =/(^file:\/\/\/)|(^devtools:\/\/devtools\/bundled\/)/g;if(whitelist.test(details.url)){callback({cancel:false})}else{callback({cancel:true})}})
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {callback({responseHeaders: Object.assign({"Content-Security-Policy": ["frame-ancestors 'none'"]}, details.responseHeaders)})})

Menu.setApplicationMenu(Menu.buildFromTemplate([
	{label: 'App', submenu: [{icon: nativeImage.createFromPath(path(dir, 'img', 'quit.png')).resize(scale), label: menuQuit, click () {win.close()}}]},
	{label: menuWindow, submenu: [
		{icon: nativeImage.createFromPath(path(dir, 'img', 'refresh.png')).resize(scale), label: menuReload, accelerator: 'CmdOrCtrl+R', role: 'reload'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'inspector.png')).resize(scale), label: menuDev, accelerator: 'CmdOrCtrl+I', role: 'toggleDevTools'},
		{type: 'separator'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'zoom-in.png')).resize(scale), label: menuZoomIn, accelerator: 'CmdOrCtrl+numadd', role: 'zoomin'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'zoom-out.png')).resize(scale), label: menuZoomOut, accelerator: 'CmdOrCtrl+numsub', role: 'zoomout'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'zoom-reset.png')).resize(scale), label: menuZoomReset, accelerator: 'CmdOrCtrl+num0', role: 'resetzoom'},
		]},
	{label: menuFunctions, submenu: [
		{icon: nativeImage.createFromPath(path(dir, 'img', 'delete.png')).resize(scale), label: menuClear, click () {choice = dialog.showMessageBoxSync(win,deleteDialog);if(choice !== 1){session.defaultSession.clearStorageData();session.defaultSession.clearCache()}}},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'emg.png')).resize(scale), label: menuEMG, click () {shell.openPath(path(appData, 'EMG'))}},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'mupen64plus.png')).resize(scale), label: menuSaves, click () {shell.openPath(path(appData, 'mupen64plus'))}},
		{type: 'separator'},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'github.png')).resize(scale), label: menuGitHub, click () {shell.openExternal('https://github.com/GhostlyDark/EMG')}},
		{icon: nativeImage.createFromPath(path(dir, 'img', 'icon-ghostly-nx.png')).resize(scale), label: menuSite, click () {shell.openExternal('https://evilgames.eu/')}}
		]},
]))

win.on('closed', () => {app.exit()})})