const messageback = require("./messageback-script")
const drawChart = require("./drawChart.js")

function createChannel() {
  console.log('Creating connection...')
  var port = chrome.extension.connect({
    name: "connecting to VisualizeIO"
  });

  console.log('# port.onMessage.addListener')  
  port.onMessage.addListener(function (data) {
    drawChart.drawChart(data.data[0].children[0])
  })
};

function sendObjectToInspectedPage(message) {
  // console.log('sending something !!!!')
  message.tabId = chrome.devtools.inspectedWindow.tabId;
  console.log('# chrome.extension.sendMessage')  
  console.log(message)  
  chrome.extension.sendMessage(message)
}

// attach panel to chrome dev tools
chrome.devtools.panels.create("dataViz", null, "devtools.html", function () {
  console.log('# chrome.devtools.panels.create')
  createChannel()
  console.log('# sendObjectToInspectedPage')  
  sendObjectToInspectedPage({ action: "script", content: "messageback-script.js" })
  sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
  
});