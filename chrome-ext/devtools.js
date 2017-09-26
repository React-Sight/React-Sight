import * as drawChart from './drawChart'
import { filterRedux, filterRouter, filterDOM } from './filters'

// Bad globals - variables that store last snapshot of data
var curData
var noRouter
var noRedux
var noRouterRedux
var noDOM
var noDOMnoRedux
var noDOMnoRouter

/** Create a connection to the current tab and set up listener */
const createChannel = () => {
  console.log('Creating connection...')
  const port = chrome.extension.connect({
    name: "connecting to VisualizeIO"
  })


  port.onMessage.addListener(data => {
    curData = data;
    // draw();
    drawChart.drawChart(data.data[0])
  })
}
/** Select current tab and send message */
const sendObjectToInspectedPage = message => {
  message.tabId = chrome.devtools.inspectedWindow.tabId
  console.log('# CONNECT chrome.extension.sendMessage', message)
  // console.log(message)
  chrome.extension.sendMessage(message)
}

console.log('# creating a panel')
chrome.devtools.panels.create("VisualizeIO", null, "devtools.html", () => {
  console.log('# chrome.devtools.panels.create')

  // wire up buttons to actions
  document.querySelector('#router-btn').addEventListener('change', draw)
  document.querySelector('#redux-btn').addEventListener('click', draw)
  document.querySelector('#dom-btn').addEventListener('click', draw)

  createChannel()
  // send inital message so that we have data when the extension is first opened
  sendObjectToInspectedPage({ action: "script", content: "inserted-script.js" })
})

/**
 * Abstracting the drawing function to one command.
 * This func conditionally renders based on the router and redux checkboxes
 */
const draw = () => {
  const hideRouter = document.querySelector('#router-btn').checked
  const hideRedux = document.querySelector('#redux-btn').checked
  const hideDOM = document.querySelector('#dom-btn').checked

  if (!hideRedux && !hideRouter && !hideDOM) drawChart.drawChart(curData.data[0])
  else if (hideRouter && hideRedux) {
    noRouterRedux = filterRedux(curData)
    noRouterRedux = filterRouter(noRouterRedux)
    drawChart.drawChart(noRouterRedux.data[0])
  }
  else if (hideDOM && hideRedux) {
    noDOMnoRedux = filterRedux(curData)
    noDOMnoRedux = filterDOM(noDOMnoRedux)
    drawChart.drawChart(noDOMnoRedux.data[0])

  }

  else if (hideDOM && hideRouter) {
    noDOMnoRouter = filterDOM(curData)
    noDOMnoRouter = filterRouter(noRouterRedux)
    drawChart.drawChart(noDOMnoRouter.data[0])

  }

  else if (hideDOM) {
    noDOM = filterDOM(curData)
    drawChart.drawChart(noDOM.data[0])
  }
  else if (hideRouter) {
    noRouter = filterRouter(curData)
    drawChart.drawChart(noRouter.data[0])
  }
  else if (hideRedux) {
    noRedux = filterRedux(curData)
    drawChart.drawChart(noRedux.data[0])
  }
  else throw console.log('Error drawing chart')
}

// attach panel to chrome dev tools
