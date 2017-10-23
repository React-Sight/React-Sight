//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

import * as drawChart from './drawChart';
import { filterRedux, filterRouter, filterDOM } from './filters';
import drawStore from './store-panel';
import drawVBox from './breadcrumb.js';
import processLoader from './loader.js';
// stores last snapshot of data
let curData;

// *************
// * FUNCTIONS *
// *************
/**
 * Abstracting the drawing function to one command.
 * This func conditionally renders based on the router and redux checkboxes
 */
const draw = () => {
  const hideDOM = document.querySelector('#dom-btn').checked;
  const hideRedux = document.querySelector('#redux-btn').checked;
  const hideRouter = document.querySelector('#router-btn').checked;

  let datas = curData;
  if (hideRedux) datas = filterRedux(datas);
  if (hideDOM) datas = filterDOM(datas);
  if (hideRouter) datas = filterRouter(datas);
  drawChart.drawChart(datas.data[0]);
  if (!curData.store) {
    const storeContainer = document.getElementById('store-container');
    storeContainer.innerHTML = '';
  } else {
    drawStore(curData.store);
  }
  drawVBox(datas.data[0]);
};

// ****************`
// ***** MAIN *****
// ****************
// attach panel to chrome dev tools
chrome.devtools.panels.create('React-Sight', null, 'devtools.html', () => {
  // wire up buttons to actions
  document.querySelector('#router-btn').addEventListener('click', draw);
  document.querySelector('#redux-btn').addEventListener('click', draw);
  document.querySelector('#dom-btn').addEventListener('click', draw);
  document.querySelector('#zoom-in-btn').addEventListener('click', drawChart.zoomIn);
  document.querySelector('#zoom-out-btn').addEventListener('click', drawChart.zoomOut);

  drawChart.zoomIn();
  drawChart.zoomOut();

  const port = chrome.extension.connect({
    name: 'React-Sight',
  });

  // establishes a connection between devtools and background page
  port.postMessage({
    name: 'connect',
    tabId: chrome.devtools.inspectedWindow.tabId,
  });

  processLoader();
  // Listens for posts sent in specific ports and redraws tree
  port.onMessage.addListener((msg) => {
    if (!msg.data) return;
    if (typeof msg != 'object') return;
    curData = msg;
    draw();
  });
});
