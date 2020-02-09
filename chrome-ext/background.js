//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint no-var: off, camelcase: off, max-len: off, prefer-arrow-callback: off,
no-useless-return: off, max-len: off, no-console: off, prefer-const: off,
no-unused-vars: off, eqeqeq: off */
const connections = {};

// Background page -- background.js
// inject content script when dev tools are opened
chrome.runtime.onConnect.addListener((port) => {
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = (message, sender, sendResponse) => {

    // creates a new key/value pair of current window & devtools tab when a new devtools tab is opened
    if (message.name === 'connect' && message.tabId) {
      connections[message.tabId] = port;
      return;
    }
    // may not be necessary, this is an attempt to keep the port alive
    return true;
  };
  // Listens to messages sent from devtools
  port.onMessage.addListener(devToolsListener);
  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(devToolsListener);

    let tabs = Object.keys(connections);
    for (let i = 0; i < tabs.length; i += 1) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

// Receives message from content-scripts and checks for valid connections before posting to devtools
chrome.runtime.onMessage.addListener(function (req, sender) {
  if (sender.tab) {
    let tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(req);
    } else console.log('WARNING:: Tab not found in connection list');
  } else console.log('WARNING:: sender.tab not defined');
  // see this for why https://github.com/mozilla/webextension-polyfill/issues/130#issue-333539552
  return Promise.resolve('Dummy response to keep the console quiet');
});
