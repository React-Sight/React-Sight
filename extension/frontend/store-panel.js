//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint no-unused-expressions: off */

import JSONFormatter from 'json-formatter-js';

/**
 *  Draw the store panel, if redux store data is found
 *
 * @param {object} data - Object representing Redux store
 * @param {element} previousStore - object representing a JSONFormatter instance
 * @returns {element} - returns a JSONFormatter element, or null
 */
const drawStore = (data, previousStore) => {
  // safely check if data has keys
  if (Object.keys(data).length) {
    // select & remove previous store
    const storeNode = document.getElementById('store');
    storeNode.innerHTML = '';

    // if previous instance was expanded, keep expanded
    let isOpen;
    if (previousStore && previousStore._isOpen) isOpen = 1;
    else isOpen = 0;

    // instantiate new JSONFormatter with Redux data
    const storeFormatter = new JSONFormatter(data, isOpen, {
      hoverPreviewEnabed: false,
      hoverPreviewArrayCount: 5,
      hoverPreviewFieldCount: 5,
      animateOpen: true,
      animateClose: true,
    });

    // append new store to page
    storeFormatter.openAtDepth(isOpen);
    storeNode.appendChild(storeFormatter.render());
    return storeFormatter;
  }
  return null;
};

export default drawStore;
