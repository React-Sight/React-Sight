var connections = {}

chrome.runtime.onConnect.addListener(function (port) {
  var extensionListener = (message, sender, res) => {
    //creates a new key/value pair of current window & devtools tab when a new devtools tab is opened
    if (message.name == 'connect' && message.tabId) {
      //sends a message to content-scripts when a new tab is opened to instantiate the tree
      chrome.tabs.sendMessage(message.tabId, message)
      connections[message.tabId] = port;
      return;
    }
    //other message handling
  }
  // Listens to messages sent from devtools
  port.onMessage.addListener(extensionListener);
  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener)

    var tabs = Object.keys(connections)
    for (let i = 0; i < tabs.length; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break;
      }
    }
  })
})
//Receives message from content-scripts and checks for valid connections before posting to devtools
chrome.runtime.onMessage.addListener(function (req, sender, res) {
  if (sender.tab) {
    var tabId = sender.tab.id
    if (tabId in connections) {
      connections[tabId].postMessage(req)
    } else {
      console.log('WARNING :: Tab not found in connection list')
    }
  } else {
    console.log("WARNING:: sender.tab not defined")
  }
  return true
})
