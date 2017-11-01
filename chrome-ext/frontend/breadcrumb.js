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
  // base cases
  if (!data.name) return;
  if (!data.children.length) return;
  
  // first instance of node
  if (!data.isDOM) object[data.name] = (object[data.name] || 0) + 1;

  // iterate through children
  data.children.forEach(child => getNodeNames(child, object));
};

/**
 * Clears the current breadcrumb and appends an updated version
 * 
 * @param {object} data - representation of React's vDOM
 */
const drawVBox = (data) => {
  let anchorText;
  const nodeNames = {};
  getNodeNames(data, nodeNames);
  const nodes = Object.keys(nodeNames);
  const breadcrumbSteps = [];

  // iterate through list of components and create DOM nodes
  // store DOM nodes in breadcrumbSteps 
  nodes.forEach((node) => {
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'breadcrumb-item');
    anchor.setAttribute('href', '#');

    // set number of times node appears
    if (nodeNames[node] === 1) anchorText = document.createTextNode(`${node}`);
    else anchorText = document.createTextNode(`${node}[${nodeNames[node]}]`);
    anchor.appendChild(anchorText);
    breadcrumbSteps.push(anchor);
  });

  // select current breadcrumb, clear it, and re-append new breadcrumb by iteratring through breadcrumbSteps
  const breadcrumb = document.querySelector('.breadcrumb');
  breadcrumb.innerHTML = '';
  breadcrumbSteps.forEach((node) => {
    breadcrumb.appendChild(node);
  });
};

export default drawVBox;
