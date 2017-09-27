var connections = {}

chrome.runtime.onConnect.addListener(function (port) {
console.log('Connected to PORT...: ', port)
  var extensionListener = (message, sender, res) => {
    console.log('extensionListener: ', message)
    if (message.name == 'connect' && message.tabId) {
      console.log('ESTABLISHED NEW CONNECTION')
      connections[message.tabId] = port;
      return;
    }
    //other message handling
  }
  // Listens to messages sent from the panel
  port.onMessage.addListener(extensionListener);
  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener)

    var tabs = Object.keys(connections)
    console.log('Removing tab...Tabs currently open: ', connections)
    for (let i = 0; i < tabs.length; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break;
      }
    }
  })
})

chrome.runtime.onMessage.addListener(function (req, sender, res) {
  console.log('BACKGROUND PAGE MESSAGE HANDLER: ', req)
  console.log(sender)
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
