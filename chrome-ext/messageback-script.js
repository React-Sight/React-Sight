console.log('# window.addEventListener')
window.addEventListener("message", function (e) {
  console.log('# sendObjectToDevTools')
  console.log(e)
  sendObjectToDevTools(e.data)
})

function sendObjectToDevTools(message) {
  console.log('# chrome.extension.sendMessage')
  // console.log(message)    
  chrome.extension.sendMessage(message, function (message) {
    // console.log('HELLO YOU SENT A MESSAGE BACK: ', message)
  }) 
}