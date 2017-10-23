//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

const connections = {}

chrome.extension.onConnect.addListener(function (port) {
  let extensionListener = (message, sender, res) => {
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

    let tabs = Object.keys(connections)
    for (let i = 0; i < tabs.length; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break;
      }
    }
  })
})
//Receives message from content-scripts and checks for valid connections before posting to devtools
chrome.extension.onMessage.addListener(function (req, sender, res) {
  if (sender.tab) {
    let tabId = sender.tab.id
    if (tabId in connections) {
      connections[tabId].postMessage(req)
    } else {
      console.log('WARNING:: Tab not found in connection list')
    }
  } else {
    console.log("WARNING:: sender.tab not defined")
  }
  return true
})
