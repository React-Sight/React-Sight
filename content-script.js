console.log('content-script.js')


window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  console.log('ADDDING LISTENER')
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
      !message.source === 'my-devtools-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
});
