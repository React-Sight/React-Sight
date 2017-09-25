var port = chrome.runtime.connect({name: "contentscript-port"});

// Listening for events from webpage postmessages
console.log('# content script window listener')
window.addEventListener('message', e => {
  console.log('# WINDOW sendObjectToDevTools', e)
  sendObjectToDevTools(e.data)
});

//get message from window and send to chrome.extension
function sendObjectToDevTools(message) {
  console.log('# chrome.extension.sendMessage')
  // console.log(message)
  chrome.extension.sendMessage(message, function (message) {
  })
}
