var id = function(id){return document.getElementById(id)},
html = document.documentElement,
themeColor = document.querySelector('meta[name=theme-color]');

if(localStorage.theme != null){themeColor.setAttribute('content',localStorage.theme)}
if(localStorage.light != null && localStorage.light === 'light'){html.classList.add('light')}
if(localStorage.palette != null && localStorage.palette != ''){html.classList.add('palette-' + localStorage.palette)}
if(localStorage.no_bg != null && localStorage.no_bg === 'no_bg'){html.classList.add('no_bg')}

if(localStorage.blur != null && localStorage.blur != '' && localStorage.background != null && localStorage.background != ''){
html.classList.add('blur');
var bgStyle = document.createElement('style'),
bgCSS = "#background{background-image:url('" + localStorage.background + "')";
document.head.appendChild(bgStyle);
bgStyle.appendChild(document.createTextNode(bgCSS));
bgStyle.setAttribute('id','bgCSS')}

document.addEventListener('DOMContentLoaded', function(){
id('settings').addEventListener('click', function(){id('footer').classList.toggle('footer')})

id('moon').addEventListener('click', function(color){
if(!html.classList.contains('light')){
if(html.classList.contains('palette-red')){color = 'rgb(163,28,45)'}
else if(html.classList.contains('palette-purple')){color = 'rgb(85,50,170)'}
else if(html.classList.contains('palette-ice')){color = 'rgb(0,105,170)'}
else{color = 'rgb(35,75,195)'}}
else{if(html.classList.contains('palette-red')){color = 'rgb(138,3,20)'}
else if(html.classList.contains('palette-purple')){color = 'rgb(70,35,165)'}
else if(html.classList.contains('palette-ice')){color = 'rgb(0,85,150)'}
else{color = 'rgb(15,55,175)'}}
if(html.classList.contains('light')){localStorage.light = ''}else{localStorage.light = 'light'}
html.classList.toggle('light');themeColor.setAttribute('content',color);localStorage.theme = color})

id('palettes').addEventListener('click', function(color){
if(!html.classList.contains('light')){
if(html.classList.contains('palette-red')){color = 'rgb(70,35,165)'}
else if(html.classList.contains('palette-purple')){color = 'rgb(0,85,150)'}
else if(html.classList.contains('palette-ice')){color = 'rgb(15,55,175)'}
else{color = 'rgb(138,3,20)'}}
else{if(html.classList.contains('palette-red')){color = 'rgb(85,50,170)'}
else if(html.classList.contains('palette-purple')){color = 'rgb(0,105,170)'}
else if(html.classList.contains('palette-ice')){color = 'rgb(35,75,195)'}
else{color = 'rgb(163,28,45)'}}
if(html.classList.contains('palette-red')){html.classList.remove('palette-red');html.classList.add('palette-purple');localStorage.palette = 'purple'}
else if(html.classList.contains('palette-purple')){html.classList.remove('palette-purple');html.classList.add('palette-ice');localStorage.palette = 'ice'}
else if(html.classList.contains('palette-ice')){html.classList.remove('palette-ice');localStorage.palette = ''}
else{html.classList.remove('palette-red');html.classList.remove('palette-purple');html.classList.remove('palette-ice');html.classList.add('palette-red');localStorage.palette = 'red'}
themeColor.setAttribute('content',color);localStorage.theme = color})

id('fancy').addEventListener('click', function(){id('background_input').click()})

id('reset').addEventListener('click', function(){if(id('bgCSS') != null)id('bgCSS').outerHTML = ''
if(!html.classList.contains('no_bg')){localStorage.background = localStorage.blur = '';localStorage.no_bg = 'no_bg';html.classList.add('no_bg');html.classList.remove('blur')}
else{localStorage.no_bg = '';html.classList.remove('no_bg');html.classList.remove('blur');localStorage.blur = ''}})

id('background_input').addEventListener('change', bgChange, false)
function bgChange(e,file){
if(e === undefined){return false}
if(file === undefined || file === ''){file = e.target.files[0]}
if(!file.type.match('image.*')){
if(html.classList.contains('de')){alert('Format nicht unterstützt.')}else{alert('File type unsupported.')}
id('background_input').value = file = '';return}
else if(typeof FileReader !== 'undefined' && file.size > 3.65*1024*1024){
if(html.classList.contains('de')){alert('Bild zu groß (max. 3,6 MB).')}else{alert('Image too large (3.6 MB max).')}
id('background_input').value = file = '';return}
var reader = new FileReader();
reader.addEventListener('load',(function(){return function(e){
localStorage.background = e.target.result;
var bgStyle = document.createElement('style'),
bgCSS = "#background{background-image:url('" + e.target.result + "')";
document.head.appendChild(bgStyle);
bgStyle.appendChild(document.createTextNode(bgCSS));
bgStyle.setAttribute('id','bgCSS');
html.classList.remove('no_bg');localStorage.no_bg = '';html.classList.add('blur');localStorage.blur = 'blur'}})(file),false);
reader.readAsDataURL(file);id('background_input').value = file = ''}

var boxes = document.querySelectorAll('input[type=checkbox]');
for(var i = 0; i < boxes.length; i++){var box = boxes[i];if(box.hasAttribute('data-store')){setupBox(box)}}
function setupBox(box){
var storageId = box.getAttribute('data-store'),oldVal = localStorage[storageId];
if(oldVal != null){box.checked = oldVal === 'true' ? true : false}
box.addEventListener('change', function(){localStorage[storageId] = this.checked})}
})
