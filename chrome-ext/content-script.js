var port = chrome.runtime.connect({name: "contentscript-port"});

// Listening for events from webpage postmessages
console.log('# content script window listener')
window.addEventListener('message', e => {
  console.log('# WINDOW sendObjectToDevTools')
  console.log(e)
  sendObjectToDevTools(e.data)
});


function sendObjectToDevTools(message) {
  console.log('# chrome.extension.sendMessage')
  // console.log(message)    
  chrome.extension.sendMessage(message, function (message) {
    // console.log('HELLO YOU SENT A MESSAGE BACK: ', message)
  })
}
