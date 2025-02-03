var id = function(id){return document.getElementById(id)},
html = document.documentElement,
body = document.body,
themeColor = document.querySelector('meta[name=theme-color]'),
color, file;

if(localStorage.theme != null){themeColor.setAttribute('content',localStorage.theme)}
if(localStorage.dark != null && localStorage.dark === ''){html.classList.toggle('dark')}
if(localStorage.palette != null){html.classList.remove('palette-ocean');html.classList.toggle('palette-' + localStorage.palette)}
if(localStorage.custom != null && localStorage.custom === ''){html.classList.remove('custom')}
if(localStorage.blur != null && localStorage.blur != '' && localStorage.background != null && localStorage.background != ''){html.classList.add('blur');id('background').style.backgroundImage = 'url(' + localStorage.background + ')'}

document.addEventListener('DOMContentLoaded', function(){
id('settings').addEventListener('click', function(){id('footer').classList.toggle('footer')})

id('moon').addEventListener('click', function(){
if(!html.classList.contains('transition'))html.classList.toggle('transition')

if(html.classList.contains('dark')){switch(localStorage.palette){
default: color = 'rgb(35,75,195)'; break;
case 'red': color = 'rgb(163,28,45)'; break;
case 'purple': color = 'rgb(85,50,170)'; break;
case 'ice': color = 'rgb(0,105,170)'}}
else{switch(localStorage.palette){
default: color = 'rgb(15,55,175)'; break;
case 'red': color = 'rgb(138,3,20)'; break;
case 'purple': color = 'rgb(70,35,165)'; break;
case 'ice': color = 'rgb(0,85,150)'}}
if(html.classList.contains('dark')){localStorage.dark = ''}else{localStorage.dark = 'dark'}
html.classList.toggle('dark');themeColor.setAttribute('content',color);localStorage.theme = color})

id('palettes').addEventListener('click', function(){
var palcol = 'palette-' + localStorage.palette;
html.classList.remove(palcol);
if(html.classList.contains('dark')){switch(localStorage.palette){
default: color = 'rgb(138,3,20)'; break;
case 'red': color = 'rgb(70,35,165)'; break;
case 'purple': color = 'rgb(0,85,150)'; break;
case 'ice': color = 'rgb(15,55,175)'}}
else{switch(localStorage.palette){
default: color = 'rgb(163,28,45)'; break;
case 'red': color = 'rgb(85,50,170)'; break;
case 'purple': color = 'rgb(0,105,170)'; break;
case 'ice': color = 'rgb(35,75,195)'}}
switch(localStorage.palette){
default: html.classList.toggle('palette-red');localStorage.palette = 'red'; break;
case 'red': html.classList.toggle('palette-purple');localStorage.palette = 'purple'; break;
case 'purple': html.classList.toggle('palette-ice');localStorage.palette = 'ice'; break;
case 'ice': html.classList.toggle('palette-ocean');localStorage.palette = 'ocean'}
themeColor.setAttribute('content',color);localStorage.theme = color})

id('fancy').addEventListener('click', function(){id('background_input').click()})
id('reset').addEventListener('click', function(){
switch(html.classList.contains('custom')){
default: localStorage.custom = 'custom';html.classList.add('custom');localStorage.blur = '';html.classList.remove('blur'); break;
case true: id('background').style.backgroundImage = '';localStorage.background = '';localStorage.custom = '';localStorage.blur = '';html.classList.remove('custom');html.classList.remove('blur')}})

id('background_input').addEventListener('change', bgChange, false)
function bgChange(e){
if(e === undefined){return false}
if(file === undefined || file === ''){file = e.target.files[0]}
if(!file.type.match('image.*')) {id('background_input').value = file = ''; return}
else if(typeof FileReader !== 'undefined' && file.size > 3.65*1024*1024){
if(body.classList.contains('de')){alert('Bild zu groß (max. 3,6 MB).')}else{alert('Image too large (3.6 MB max).')}
id('background_input').value = file = '';return}
var reader = new FileReader();
reader.addEventListener('load',(function(){return function(e){
localStorage.background = e.target.result;id('background').style.backgroundImage = 'url(' + e.target.result + ')';html.classList.add('custom');html.classList.add('blur');localStorage.custom = 'custom';localStorage.blur = 'blur'}})(file),false);
reader.readAsDataURL(file);id('background_input').value = file = ''}

var boxes = document.querySelectorAll('input[type=checkbox]');
for (var i = 0; i < boxes.length; i++){var box = boxes[i];if (box.hasAttribute('data-store')){setupBox(box)}}
function setupBox(box){
var storageId = box.getAttribute('data-store'),oldVal = localStorage[storageId];
if (oldVal != null) {box.checked = oldVal === 'true' ? true : false}
box.addEventListener('change', function(){localStorage[storageId] = this.checked})}
})
