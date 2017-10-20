//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

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
  chrome.extension.sendMessage(e.data, () => {
    if (typeof e.data === 'object') {
      // console.log('**Content-scripts** received data sending to devtools...', e.data);
    }
  });
});

chrome.extension.onMessage.addListener(() => {
  const newEvent = new Event('reactsight');
  window.dispatchEvent(newEvent);
  // panelLoaded = true
  /** DEVELOPER NOTES:
  additional testing required with panelLoaded...message handler
  should only emit event when user clicks on React-Sight panel..
  listener is currently emitting anytime a new tab is open */
});

injectScript(chrome.extension.getURL('/backend/installHook.js'), 'body');
