window.addEventListener("message", function (e) {
  sendObjectToDevTools(JSON.parse(e.data))
})

function sendObjectToDevTools(message) {
  chrome.extension.sendMessage(message, function (message) {
    console.log('HELLO YOU SENT A MESSAGE BACK: ', message)
  })
}
