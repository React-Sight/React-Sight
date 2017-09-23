console.log('injecting background script...')

chrome.extension.onConnect.addListener(function (port) {
  console.log('onConnect...', port)

  var extensionListener = function (message, sender, sendResponse) {
    console.log('listener')
    if (message.tabId && message.content) {

      //Evaluate script in inspectedPage
      if (message.action === 'code') {
        console.log('code')
        chrome.tabs.executeScript(message.tabId, { code: message.content });
        //Attach script to inspectedPage
      }

      else if (message.action === 'script') {
        console.log('script')
        chrome.tabs.executeScript(message.tabId, { file: message.content });
        //Pass message to inspectedPage
      }

      else chrome.tabs.sendMessage(message.tabId, message, sendResponse);
      console.log('sending message')
      // This accepts messages from the inspectedPage and
      // sends them to the panel
    }

    else {
      console.log('else block')
      port.postMessage(message)
    }
    console.log('sending response')
    sendResponse(message);
  }

  // Listens to messages sent from the panel
  chrome.extension.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {

    console.log('disconnecting')
    // chrome.extension.onMessage.removeListener(extensionListener);
  });

  // port.onMessage.addListener(function (message) {
  //   console.log('posting message')
  //     port.postMessage(message);
  // });

});
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('# chrome.runtime.onMessage')
//   return true;
// });
