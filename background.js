// document.addEventListener('message', function(e){
//   //send message to ext
//   console.log('heloo there')
// }, false);


console.log('[background.js]')

window.addEventListener('message', function(e) {
  console.log('listening...');
  console.log(e);
}, false)
