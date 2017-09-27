import * as drawChart from './drawChart'
import { filterRedux, filterRouter, filterDOM } from './filters'

// stores last snapshot of data
var curData

// *************
// * FUNCTIONS *
// *************

/** Create a connection to the current tab and set up listener */
          // const createChannel = () => {
          //   console.log('Creating connection...')
          //   const port = chrome.extension.connect({
          //     name: "connecting to VisualizeIO"
          //   })
          //
          //
          //   port.onMessage.addListener(data => {
          //     curData = data;
          //     // draw();
          //     drawChart.drawChart(data.data[0])
          //   })
          // }
/** Select current tab and send message */
          // const sendObjectToInspectedPage = message => {
          //   message.tabId = chrome.devtools.inspectedWindow.tabId
          //   console.log('# CONNECT chrome.extension.sendMessage', message)
          //   // console.log(message)
          //   chrome.extension.sendMessage(message)
          // }
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
// ****************
// ***** MAIN *****
// ****************

// attach panel to chrome dev tools
chrome.devtools.panels.create("React-Sight", null, "devtools.html", () => {
  // wire up buttons to actions
  document.querySelector('#router-btn').addEventListener('change', draw)
  document.querySelector('#redux-btn').addEventListener('click', draw)
  document.querySelector('#dom-btn').addEventListener('click', draw)

  // createChannel()
  // // send inital message so that we have data when the extension is first opened
  // sendObjectToInspectedPage({ action: "script", content: "inserted-script.js" })
  const port = chrome.runtime.connect({
    name: "React-Sight"
  })
  console.log('current window TabID: ', chrome.devtools.inspectedWindow.tabId)
  port.postMessage({
    name: 'connect',
    tabId: chrome.devtools.inspectedWindow.tabId
  })
  port.onMessage.addListener(msg => {
    console.log('Data received from background page: ', msg)
  })
})
