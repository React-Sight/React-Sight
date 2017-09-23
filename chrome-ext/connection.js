const drawChart = require("./drawChart")
import { filterRedux, filterRouter } from './filters'

var curData
var noRouter
var noRedux
var noRouterRedux

var hideRouter = false
var hideRedux = false

function createChannel() {
  console.log('Creating connection...')
  var port = chrome.extension.connect({
    name: "connecting to VisualizeIO"
  })

  console.log('# port.onMessage.addListener')
  port.onMessage.addListener(function (data) {
    console.log('got data')
    curData = data;
    draw();
  })
}

function sendObjectToInspectedPage(message) {
  message.tabId = chrome.devtools.inspectedWindow.tabId
  console.log('# chrome.extension.sendMessage')
  console.log(message)
  chrome.extension.sendMessage(message)
}

function routerButton() {
  if (hideRouter) {
    hideRouter = false
    draw()
  }
  else {
    hideRouter = true
    draw()
  }
}

function reduxButton() {
  if (hideRedux) {
    hideRedux = false
    draw()
  }
  else {
    hideRedux = true
    draw()
  }
}


function draw() {
  if (hideRouter && hideRedux) {
    noRouterRedux = filterRedux(curData)
    noRouterRedux = filterRouter(noRouterRedux)
    drawChart.drawChart(noRouterRedux.data[0])
  }
  else if (hideRouter) {
    noRouter = filterRouter(curData)
    drawChart.drawChart(noRouter.data[0])
  }
  else if (hideRedux) {
    noRedux = filterRedux(curData)
    drawChart.drawChart(noRedux.data[0])
  }
  else drawChart.drawChart(curData.data[0])
}

// attach panel to chrome dev tools
console.log('# creating a panel')
chrome.devtools.panels.create("VisualizeIO", null, "devtools.html", function () {
  console.log('# chrome.devtools.panels.create')

  document.querySelector('#router-btn').addEventListener('change', routerButton)
  document.querySelector('#redux-btn').addEventListener('click', reduxButton)

  createChannel()
  console.log('# sendObjectToInspectedPage')
  sendObjectToInspectedPage({ action: "script", content: "inserted-script.js" })
})


