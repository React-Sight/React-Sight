const drawChart = require("./drawChart")
import { filterRedux, filterRouter } from './filters'

// Bad globals
var curData
var noRouter
var noRedux
var noRouterRedux

var hideRouter = false
var hideRedux = false

const createChannel = () => {
  console.log('Creating connection...')
  const port = chrome.extension.connect({
    name: "connecting to VisualizeIO"
  })

  console.log('# port.onMessage.addListener')
  port.onMessage.addListener(data => {
    console.log('got data')
    curData = data;
    draw();
  })
}

const sendObjectToInspectedPage = message => {
  message.tabId = chrome.devtools.inspectedWindow.tabId
  console.log('# CONNECT chrome.extension.sendMessage')
  // console.log(message)
  chrome.extension.sendMessage(message)
}

const routerButton = () => {
  if (hideRouter) {
    hideRouter = false
    draw()
  }
  else {
    hideRouter = true
    draw()
  }
}

const reduxButton = () => {
  if (hideRedux) {
    hideRedux = false
    draw()
  }
  else {
    hideRedux = true
    draw()
  }
}

/**
 * Abstracting the drawing function to one command.
 * This func conditionally renders based on the router and redux checkboxes
 */
const draw = () => {
  if (!hideRedux && !hideRouter) drawChart.drawChart(curData.data[0])
  else if (hideRouter && hideRedux) {
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
  else console.log('HUGE ERROR!!!!!')
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


