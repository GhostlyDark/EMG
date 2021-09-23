let win, choice, whitelist;
const {app, BrowserWindow, Menu, session, shell, dialog, nativeImage} = require('electron'),
remote = require("@electron/remote/main"),
url = require('url').URL,
path = require('path'),
scale = {width:28},
load = path.join(__dirname, 'index.htm'),
name = ' ' + app.name + ' v' + app.getVersion(),
preferences = {nodeIntegration:true,contextIsolation:false},
mainWindow = {backgroundColor:'#121212', width:1280, height:800, minWidth:923, minHeight:640, title:name, show:false, autoHideMenuBar:true, webPreferences:preferences};
remote.initialize()

app.commandLine.appendSwitch('disable-http-cache')
app.commandLine.appendSwitch('no-proxy-server')
//app.enableSandbox()

var menuQuit = 'Quit ' + app.name,menuWindow = 'Window',menuFunctions = 'Functions',menuReload = 'Reload window',menuCreate = 'Create window',menuClose = 'Close window',menuZoomIn = 'Increase zoom',menuZoomOut = 'Decrease zoom',menuZoomReset = 'Reset zoom',menuFullscreen = 'Fullscreen',menuClear = 'Reset settings',menuSaves = 'Show User Data',menuSite = 'Visit website',dialogDelete = ' Reset settings',dialogDeleteM = 'Reset all settings?',dialogClose = ' Close window',dialogCloseM = 'Close selected window?',dialogQuit = ' Quit app',dialogQuitM = 'Exit launcher? May close emulator instances.',dialogNo = 'Abort',dialogYes = 'Confirm';
const deleteDialog = {defaultId:1, cancelId:1, icon:path.join(__dirname, 'img', 'delete.png'), buttons:[dialogYes,dialogNo], title:dialogDelete, message:dialogDeleteM},
closeDialog = {defaultId:1, cancelId:1, icon:path.join(__dirname, 'img', 'close.png'), buttons:[dialogYes,dialogNo], title:dialogClose, message:dialogCloseM},
quitDialog = {defaultId:1, cancelId:1, icon:path.join(__dirname, 'img', 'quit.png'), buttons:[dialogYes,dialogNo], title:dialogQuit, message:dialogQuitM}

app.on('second-instance', (e) => {if(win.isMinimized()){win.restore()}else{win.focus()}})
if(!app.requestSingleInstanceLock()){return app.quit()}

app.on('ready', () => {
win = new BrowserWindow(mainWindow)
remote.enable(win.webContents)
win.loadFile(load);
win.once('ready-to-show', () => {win.maximize();win.show()})
win.on('page-title-updated', (e) => {e.preventDefault()})
if(process.platform === 'linux'){win.setIcon(path.join(__dirname, 'img', 'emg.png'))}
win.webContents.on('new-window', (e) => {e.defaultPrevented = true})
win.webContents.on('will-navigate', (e, nav) => {const parsed = new url(nav)
if(parsed.origin != load) {e.preventDefault()}})

session.defaultSession.webRequest.onBeforeRequest(function(details, callback) {whitelist =/(^file:\/\/\/)|(^devtools:\/\/devtools\/bundled\/)/g;if(whitelist.test(details.url)){callback({cancel:false})}else{callback({cancel:true})}})
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {callback({responseHeaders: Object.assign({"Content-Security-Policy": ["frame-ancestors 'none'"]}, details.responseHeaders)})})

Menu.setApplicationMenu(Menu.buildFromTemplate([
	{label: 'App', submenu: [{icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'quit.png')).resize(scale), label: menuQuit, accelerator: 'CmdOrCtrl+Q', click () {win.close()}}]},
	{label: menuWindow, submenu: [
      {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'refresh.png')).resize(scale), label: menuReload, accelerator: 'CmdOrCtrl+R', role: 'reload'},
	  {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'inspector.png')).resize(scale), label: 'Developer Tools', accelerator: 'CmdOrCtrl+I', role: 'toggleDevTools'},
      {type: 'separator'},
      {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'zoom-in.png')).resize(scale), label: menuZoomIn, accelerator: 'CmdOrCtrl+numadd', role: 'zoomin'},
      {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'zoom-out.png')).resize(scale), label: menuZoomOut, accelerator: 'CmdOrCtrl+numsub', role: 'zoomout'},
	  {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'zoom-reset.png')).resize(scale), label: menuZoomReset, accelerator: 'CmdOrCtrl+num0', role: 'resetzoom'},
	  ]},
	{label: menuFunctions, submenu: [
	  {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'delete.png')).resize(scale), label: menuClear, click () {choice = dialog.showMessageBoxSync(win,deleteDialog);if(choice !== 1){session.defaultSession.clearStorageData();session.defaultSession.clearCache()}}},
	  {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'save.png')).resize(scale), label: menuSaves, click () {shell.openPath(path.join(app.getPath('appData'), 'mupen64plus'))}},
	  {type: 'separator'},
	  {icon: nativeImage.createFromPath(path.join(__dirname, 'img', 'icon-ghostly-nx.png')).resize(scale), label: menuSite, click () {shell.openExternal('https://evilgames.eu/')}}
	  ]},
]))

win.on('close', (e) => {choice = dialog.showMessageBoxSync(win,quitDialog);if(choice == 1){e.preventDefault()}})
win.on('closed', () => {app.exit()})})