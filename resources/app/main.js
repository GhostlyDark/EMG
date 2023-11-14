let win, jstestChild;
const {app, BrowserWindow, dialog, globalShortcut, ipcMain, Menu, nativeImage, session, shell} = require('electron'),
{existsSync, mkdirSync, readdirSync, writeFileSync} = require('node:fs'),
{spawn, spawnSync} = require('node:child_process'),
url = require('node:url').URL,
path = require('node:path').join,
dir = __dirname,
appData = app.getPath('appData'),
m64pConfig = path(appData, 'mupen64plus'),
cwd = path(dir, '../', 'm64p'),
pluginDir = path(cwd, 'plugin'),
testROM = path(cwd, 'mupen64plus.z64'),
executablePath = path(cwd, 'mupen64plus'),
jstestPath = path(cwd, 'sdl2-jstest'),
isLinux = process.platform === 'linux',
stdio = ['ignore', 'pipe', 'ignore'],
emuOptions = {cwd: cwd, detached: true, stdio: stdio},
cheatOptions = {cwd: cwd, stdio: stdio, windowsHide: true},
jsOptions = {cwd: cwd, stdio: stdio, timeout: 5000, windowsHide: true},
load = 'http://localhost:64064',
name = ' ' + app.name + ' v' + app.getVersion(),
preferences = {preload:path(dir, 'preload.js'), disableDialogs:true},
mainWindow = {backgroundColor:'#121212', width:1280, height:800, minWidth:923, minHeight:640, title:name, show:false, webPreferences:preferences},
deleteDialog = {defaultId:1, cancelId:1, icon:path(dir, 'img', 'delete.png'), buttons:['Confirm','Abort'], title:' Reset settings', message:'Reset all settings?'},
server = require(path(dir,'server.js'));
let m64pCache = m64pShare = m64pConfig;

if(app.requestSingleInstanceLock())server.deploy()
if(process.versions.electron.substring(0,2) > '26')mainWindow.height=0
if(isLinux){m64pCache = path(appData, '../', '.cache', 'mupen64plus');m64pShare = path(appData, '../', '.local', 'share', 'mupen64plus')}

const cache = path(m64pCache,'cache'),
hires_texture = path(m64pShare,'hires_texture'),
save = path(m64pShare,'save'),
screenshot = path(m64pShare,'screenshot'),
shaders = path(m64pCache,'shaders'),
texture_dump = path(m64pShare,'texture_dump');

app.commandLine.appendSwitch('disable-http-cache')
app.commandLine.appendSwitch('no-proxy-server')
app.commandLine.appendSwitch('ignore-connections-limit', 'localhost:64064')
app.commandLine.appendSwitch('lang','en-US')
app.enableSandbox()

ipcMain.on('emuLaunch', (e, parameters) => {
	let stdout = '';
	const child = spawn(executablePath, parameters, emuOptions);
	child.stdout.on('data', (data) => {stdout += data.toString()})
	child.on('exit', () => {e.reply('m64pLog', child.spawnargs, stdout)})
})

ipcMain.on('showCheats', (e, parameters) => {
	const child = spawnSync(executablePath, parameters, cheatOptions);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('jstestChild', (e, jstestConfig) => {
	jstestChild = spawn(jstestPath, jstestConfig, jsOptions);
	jstestChild.stdout.on('data', (data) => {e.reply('jsLog', data.toString())})
	jstestChild.on('close', () => {e.reply('jsClosed')})
})

ipcMain.on('jsRefresh', (e) => {
	const child = spawnSync(jstestPath, ['-ls'], jsOptions);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('jsMapping', (e, padId) => {
	const child = spawnSync(jstestPath, ['-m', padId], jsOptions);
	e.returnValue = child.stdout.toString()
})

ipcMain.on('writeGCA', (e, gcaSettings, configdir) => {
	if(!existsSync(configdir))mkdirSync(configdir,{recursive:true})
	if(!existsSync(cache))mkdirSync(cache,{recursive:true})
	if(!existsSync(hires_texture))mkdirSync(hires_texture,{recursive:true})
	if(!existsSync(save))mkdirSync(save,{recursive:true})
	if(!existsSync(screenshot))mkdirSync(screenshot,{recursive:true})
	if(!existsSync(shaders))mkdirSync(shaders,{recursive:true})
	if(!existsSync(texture_dump))mkdirSync(texture_dump,{recursive:true})
	e.returnValue = writeFileSync(path(configdir,'mupen64plus-input-gca.toml'),gcaSettings)
})

ipcMain.on('testROM', (e) => {e.returnValue = testROM})
ipcMain.on('pluginDir', (e) => {e.returnValue = readdirSync(pluginDir)})
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
ipcMain.on('dialogError', (e, title, data) => {e.returnValue = dialog.showErrorBox(title,data)})
ipcMain.on('romDir', (e, data) => {if(existsSync(data)){e.returnValue = readdirSync(data)}else{e.returnValue = ''}})
ipcMain.on('romDirFile', (e, dir, data) => {e.returnValue = path(dir,data)})
ipcMain.on('openPath', (e, data) => {if(existsSync(data)){e.returnValue = shell.openPath(data).toString()}else{e.returnValue = ''}})
ipcMain.on('showInFolder', (e, data) => {e.returnValue = shell.showItemInFolder(data)})

Menu.setApplicationMenu(null)

app.on('browser-window-focus', () => {
globalShortcut.register('CmdOrCtrl+I', () => {win.webContents.toggleDevTools()})
globalShortcut.register('CmdOrCtrl+N', () => {const choice = dialog.showMessageBoxSync(win,deleteDialog);if(choice !== 1){session.defaultSession.clearStorageData();session.defaultSession.clearCache()}})
globalShortcut.register('CmdOrCtrl+R', () => {win.reload()})
globalShortcut.register('CmdOrCtrl+num0', () => {win.webContents.setZoomFactor(1.0)})
globalShortcut.register('CmdOrCtrl+numsub', () => {if(win.webContents.getZoomFactor().toFixed(1) != 0.1)win.webContents.setZoomFactor(win.webContents.getZoomFactor()-0.1)})
globalShortcut.register('CmdOrCtrl+numadd', () => {if(win.webContents.getZoomFactor().toFixed(1) != 5.0)win.webContents.setZoomFactor(win.webContents.getZoomFactor()+0.1)})})

app.on('browser-window-blur', () => {globalShortcut.unregisterAll()})

app.on('second-instance', (e) => {if(win.isMinimized()){win.restore()}else{win.focus()}})
if(!app.requestSingleInstanceLock()){return app.quit()}

app.on('ready', () => {
win = new BrowserWindow(mainWindow)
if(process.versions.electron.substring(0,2) > '23')win.setBackgroundMaterial('acrylic')
win.loadURL(load)
win.minimize()
win.once('ready-to-show', () => {win.maximize()})
win.on('page-title-updated', (e) => {e.preventDefault()})
if(isLinux)win.setIcon(nativeImage.createFromPath(path(dir, 'img', 'emg.png')).resize({width:48}))
win.webContents.setWindowOpenHandler((details) => {return {action:'deny'}})

win.webContents.on('will-navigate', (e, nav) => {const parsed = new url(nav)
if(parsed.origin != load)e.preventDefault()})

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {callback({responseHeaders: Object.assign({"Content-Security-Policy": ["frame-ancestors 'none',sandbox allow-same-origin allow-scripts"]}, details.responseHeaders)})})
session.defaultSession.webRequest.onBeforeRequest(
function(details, callback){
const whitelist = /(^http:\/\/localhost:64064)|(^devtools:\/\/devtools\/bundled\/)/g;
if(whitelist.test(details.url)){callback({cancel:false})}
else if(details.url.includes('%20')){callback({redirectURL: details.url.replace('%20','')})}
else{callback({cancel:true})}})

win.on('closed', () => {app.exit()})
})
