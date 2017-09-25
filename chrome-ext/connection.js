import * as drawChart from './drawChart'
import { filterRedux, filterRouter, filterDOM } from './filters'

// stores last snapshot of data
var curData

/** Create a connection to the current tab and set up listener */
const createChannel = () => {
  console.log('Creating connection...')
  const port = chrome.extension.connect({
    name: "connecting to VisualizeIO"
  })

  // add listener to port and update chart with new data
  console.log('# port.onMessage.addListener')
  port.onMessage.addListener(data => {
    console.log('got data')
    curData = data;
    draw();
  })
}

/** Select current tab and send message */
const sendObjectToInspectedPage = message => {
  message.tabId = chrome.devtools.inspectedWindow.tabId
  console.log('# CONNECT chrome.extension.sendMessage')
  // console.log(message)
  chrome.extension.sendMessage(message)
}

/**
 * Abstracting the drawing function to one command.
 * This func conditionally renders based on the router and redux checkboxes
 */
const draw = () => {
  const hideDOM = document.querySelector('#dom-btn').checked
  const hideRedux = document.querySelector('#redux-btn').checked  
  const hideRouter = document.querySelector('#router-btn').checked
 
  let datas = curData
  if (hideRedux) datas = filterRedux(datas)
  if (hideDOM) datas = filterDOM(datas)
  if (hideRouter) datas = filterRouter(datas)
  drawChart.drawChart(datas.data[0])
  }

// attach panel to chrome dev tools
console.log('# creating a panel')
chrome.devtools.panels.create("VisualizeIO", null, "devtools.html", () => {
  console.log('# chrome.devtools.panels.create')

  // wire up buttons to actions
  document.querySelector('#router-btn').addEventListener('change', draw)
  document.querySelector('#redux-btn').addEventListener('click', draw)
  document.querySelector('#dom-btn').addEventListener('click', draw)
  
  createChannel()

  console.log('# sendObjectToInspectedPage')

  // send inital message so that we have data when the extension is first opened
  sendObjectToInspectedPage({ action: "script", content: "inserted-script.js" })
})