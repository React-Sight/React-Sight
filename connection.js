(function createChannel() {
  console.log('connected to CHANNEL...')
  var port = chrome.extension.connect({
    name: "connecting to VisualizeIO"
  });

  port.onMessage.addListener(function (data) {
    console.log('GOT THE DATA', data)

  })
}());

function sendObjectToInspectedPage(message) {
  console.log('sending something !!!!')
  message.tabId = chrome.devtools.inspectedWindow.tabId;
  chrome.extension.sendMessage(message)
}
