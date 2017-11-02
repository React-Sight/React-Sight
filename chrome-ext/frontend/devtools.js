//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

import drawStore from './store-panel';
import drawLoadingScreen from './loader';
import * as drawChart from './drawChart';
import drawBreadcrumbs from './breadcrumb';
import { filterRedux, filterRouter, filterDOM } from './filters';

// stores last snapshot of data
let curData;

// *************
// * FUNCTIONS *
// *************
/**
 * Abstracting the drawing function to one command.
 * -This func conditionally renders based on the filter buttons
 * -
 */
const draw = () => {
  // get values from filter checkboxes (true / false)
  const hideDOM = document.querySelector('#dom-btn').checked;
  const hideRedux = document.querySelector('#redux-btn').checked;
  const hideRouter = document.querySelector('#router-btn').checked;

  // process data through filters
  let processedData = curData;
  if (hideRedux) processedData = filterRedux(processedData);
  if (hideDOM) processedData = filterDOM(processedData);
  if (hideRouter) processedData = filterRouter(processedData);

  // run draw function to render / update tree
  drawChart.drawChart(processedData.data[0]);

  // if no redux store, remove 'Store' from side panel, otherwise render store JSON
  if (!curData.store) {
    const storeContainer = document.getElementById('store-container');
    storeContainer.innerHTML = '';
  } else {
    drawStore(curData.store);
  }
  drawBreadcrumbs(processedData.data[0]);
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

  // call a zoom in / zoom out to fix first pan/drag event,
  // without this, first dragging chart will cause it to jump on screen
  // drawChart.zoomIn();
  // drawChart.zoomOut();

  const port = chrome.extension.connect({
    name: 'React-Sight',
  });

  // establishes a connection between devtools and background page
  port.postMessage({
    name: 'connect',
    tabId: chrome.devtools.inspectedWindow.tabId,
  });

  // appends loading screen
  drawLoadingScreen();

  // Listens for posts sent in specific ports and redraws tree
  port.onMessage.addListener((msg) => {
    if (!msg.data) return; // abort if data not present, or if not of type object
    if (typeof msg !== 'object') return;
    curData = msg; // assign global data object
    draw();
  });
});
