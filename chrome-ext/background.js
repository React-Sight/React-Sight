chrome.extension.onConnect.addListener(function (port) {
  var extensionListener = (message, sender, sendResponse) => {
    if (message.tabId && message.content) {
      if (message.action === 'code') {
        chrome.tabs.executeScript(message.tabId, { code: message.content });
      }
      else if (message.action === 'script') {
        chrome.tabs.executeScript(message.tabId, { file: message.content });
      }
      else chrome.tabs.sendMessage(message.tabId, message, sendResponse);
    }
    else port.postMessage(message)
    sendResponse(message);
  }
  // Listens to messages sent from the panel
  chrome.extension.onMessage.addListener(extensionListener);
  port.onDisconnect.addListener(function (port) {
  })    
});

