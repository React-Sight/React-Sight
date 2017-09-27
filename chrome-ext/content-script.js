// var port = chrome.runtime.connect({name: "contentscript-port"});
// Listening for events from webpage postmessages
window.addEventListener('message', e => {
  chrome.extension.sendMessage(e.data, function () {
    console.log('Chrome ext. has received message ..sending over to background.js: ', e.data)
  })
});
