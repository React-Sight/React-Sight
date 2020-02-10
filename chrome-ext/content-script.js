//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/** function to inject traversal script into running tab's context */
function injectScript(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}

// Listening for events emitted from user's application *window.postMessage()*
window.addEventListener('message', (e) => {
  if (e.source !== window) return;
  // send message to background
  chrome.runtime.sendMessage(e.data, () => {
    if (typeof e.data === 'object') {
      // console.log('**Content-scripts** received data sending to devtools...', e.data);
    }
  });
});

chrome.runtime.onMessage.addListener(() => {
  const newEvent = new Event('reactsight');
  window.dispatchEvent(newEvent);
});

setTimeout(() => {
  injectScript(chrome.runtime.getURL('/installHook.js'), 'body');
}, 5000);
