const {ipcRenderer} = require('electron'),
child_process = require('child_process'),
fs = require('fs'),
path = require('path'),
appData = ipcRenderer.sendSync('appData'),
dialog = {open: data => ipcRenderer.sendSync('dialog', data)},
writeGCA = (gcaSettings) => {fs.writeFileSync(path.join(__dirname, 'm64p', 'mupen64plus-input-gca.toml'),gcaSettings)},

cwd = path.join(__dirname, 'm64p'),
stdio = ['ignore', 'pipe', 'ignore'],
cheatOptions = {cwd: cwd, stdio: stdio},
emuOptions = {cwd: cwd, detached: true, stdio: stdio},
jstestOptions = {cwd: cwd, stdio: stdio, timeout: 10000},

executablePath = path.join(cwd, 'mupen64plus'),
jstestPath = path.join(cwd, 'sdl2-jstest'),
hires_texture = path.join(appData, 'mupen64plus', 'hires_texture'),
cache = path.join(appData, 'mupen64plus', 'cache'),
texture_dump = path.join(appData, 'mupen64plus', 'texture_dump'),

emuLaunch = (parameters) => {
  var stdout = '';
  let child = child_process.spawn(executablePath, parameters, emuOptions);
  console.log(child.spawnargs)
  child.stdout.on('data', (data) => {stdout += `${data}`})
  child.on('exit', () => {console.log(stdout)})
},

showCheats = (parameters) => {
	let child = child_process.spawnSync(executablePath, parameters, cheatOptions);
	return child.stdout.toString()
},

jstestSpawn = (jstestConfig) => {
	let child = child_process.spawn(jstestPath, jstestConfig, jstestOptions);
	return child
}

window.hires_texture = hires_texture
window.cache = cache
window.texture_dump = texture_dump
window.dialog = dialog
window.emuLaunch = emuLaunch
window.jstestSpawn = jstestSpawn
window.showCheats = showCheats
window.writeGCA = writeGCA
