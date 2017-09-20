// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// 
// Can use:
// chrome.tabs.*
// chrome.extension.*
console.log('***** background.js')

chrome.extension.onConnect.addListener(function (port) {
  console.log('port', port)
  console.log('adding listener')
  var extensionListener = function (message, sender, sendResponse) {

    console.log('the listener')
    if (message.tabId && message.content) {

      //Evaluate script in inspectedPage
      if (message.action === 'code') {
        chrome.tabs.executeScript(message.tabId, { code: message.content });

        //Attach script to inspectedPage
      } else if (message.action === 'script') {
        chrome.tabs.executeScript(message.tabId, { file: message.content });

        //Pass message to inspectedPage
      } else {
        chrome.tabs.sendMessage(message.tabId, message, sendResponse);
      }

      // This accepts messages from the inspectedPage and 
      // sends them to the panel
    } else {
      console.log('poosting')
      port.postMessage(message);
    }
    sendResponse(message);
  }

  // Listens to messages sent from the panel
  chrome.extension.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    chrome.extension.onMessage.removeListener(extensionListener);
  });

  // port.onMessage.addListener(function (message) {
  //     port.postMessage(message);
  // });

});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  return true;
});
