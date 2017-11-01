//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.
//
//  What's a Breadcrumb? It's the 'nav' bar at the top of the window,
//  which highlights which component the user has selected

/** 
 * Build up object containing component names and number of times they appear
 * 
 * @param {object} data - object represeting vDOM
 * @param {object} object - function will build up an object of names and the number of times they appear
 */
const getNodeNames = (data, object) => {
  if (!data.name) return;
  if (!data.isDOM) {
    object[data.name] = (object[data.name] || 0) + 1;
  }
  if (!data.children.length) return;

  data.children.forEach((child) => {
    getNodeNames(child, object);
  });
};

const drawVBox = (data) => {
  let anchorText;
  const nodeNames = {};
  getNodeNames(data, nodeNames);
  const nodes = Object.keys(nodeNames);
  const breadcrumbSteps = [];

  nodes.forEach((node) => {
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'breadcrumb-item');
    anchor.setAttribute('href', '#');

    if (nodeNames[node] === 1) anchorText = document.createTextNode(`${node}`);
    else anchorText = document.createTextNode(`${node}[${nodeNames[node]}]`);
    anchor.appendChild(anchorText);
    breadcrumbSteps.push(anchor);
  });
  const breadcrumb = document.querySelector('.breadcrumb');
  breadcrumb.innerHTML = '';
  breadcrumbSteps.forEach((node) => {
    breadcrumb.appendChild(node);
  });
};

export default drawVBox;
