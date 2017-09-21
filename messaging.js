// console.log('***** messaging.js')
//
// (function createChannel() {
//   console.log('making a channel')
//   //Create a port with background page for continous message communication
//   var port = chrome.extension.connect({
//       name: "Sample Communication" //Given a Name
//   });
//
//   // Listen to messages from the background page
//   port.onMessage.addListener(function (message) {
//     document.querySelector('#insertmessagebutton').innerHTML = message.content;
//     // port.postMessage(message);
//   });
//
// }());
//
// // This sends an object to the background page
// // where it can be relayed to the inspected page
// function sendObjectToInspectedPage(message) {
//   console.log('sending')
//   message.tabId = chrome.devtools.inspectedWindow.tabId;
//   chrome.extension.sendMessage(message);
// }
