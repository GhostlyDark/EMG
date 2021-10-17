const {ipcRenderer} = require('electron'),
dialog = {open: data => ipcRenderer.sendSync('dialog', data)}

window.appData = ipcRenderer.sendSync('appData')
window.dialog = dialog
window.dir = __dirname
window.pathJoin = require('path').join
window.pathExtname = require('path').extname
window.spawn = require('child_process').spawn
window.spawnSync = require('child_process').spawnSync
window.writeFileSync = require('fs').writeFileSync
