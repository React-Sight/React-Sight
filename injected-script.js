// injected-script.js

console.log('injected-script.js')

window.postMessage({
  greeting: 'hello there!',
  source: 'my-devtools-extension'
}, '*');
