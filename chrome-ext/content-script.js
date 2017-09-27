//Listening for events emitted from user's application *window.postMessage()*
window.addEventListener('message', e => {
  if (e.source !== window) return
  //send message to background
  chrome.extension.sendMessage(e.data, function () {
    console.log('**Content-scripts** received data sending to devtools...', e.data)
  })
});

chrome.runtime.onMessage.addListener((message, sender) => {
    var newEvent = new Event('reactsight')
    window.dispatchEvent(newEvent)
    // panelLoaded = true
    /** DEVELOPER NOTES:
    additional testing required with panelLoaded...message handler
    should only emit event when user clicks on React-Sight panel..
    listener is currently emitting anytime a new tab is open */
})
