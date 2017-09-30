import * as drawChart from './drawChart'
import { filterRedux, filterRouter, filterDOM } from './filters'
import drawStore from './store-panel.js'
import drawVBox from './breadcrumb.js'
// stores last snapshot of data
var curData

// *************
// * FUNCTIONS *
// *************
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
  drawStore(datas.store)
  drawVBox(datas.data[0])
}

$('#wrapper').toggleClass("toggled")
// ****************
// ***** MAIN *****
// ****************

// attach panel to chrome dev tools
chrome.devtools.panels.create("React-Sight", null, "devtools.html", () => {
  // wire up buttons to actions
  document.querySelector('#router-btn').addEventListener('click', draw)
  document.querySelector('#redux-btn').addEventListener('click', draw)
  document.querySelector('#dom-btn').addEventListener('click', draw)

  const port = chrome.extension.connect({
    name: "React-Sight"
  })

  //establishes a connection between devtools and background page
  port.postMessage({
    name: 'connect',
    tabId: chrome.devtools.inspectedWindow.tabId
  })
  //Listens for posts sent in specific ports and redraws tree
  port.onMessage.addListener(msg => {
    console.log('Drawing tree...', msg)
    curData = msg;
    draw()
  })
})
