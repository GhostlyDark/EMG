window.appData = require('@electron/remote').app.getPath('appData')
window.dir = __dirname
window.pathJoin = require('path').join
window.pathExtname = require('path').extname
window.showOpenDialogSync = require('@electron/remote').dialog.showOpenDialogSync
window.spawn = require('child_process').spawn
window.spawnSync = require('child_process').spawnSync
window.writeFileSync = require('fs').writeFileSync
