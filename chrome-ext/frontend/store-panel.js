//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

import JSONFormatter from 'json-formatter-js';

let isOpen = 0;
let previousStore;

/**
 *
 * @param {object} data - Object representing Redux store
 */
const drawStore = (data) => {
  if (Object.keys(data).length) {
    // select & remove previous store
    const storeNode = document.getElementById('store');
    storeNode.innerHTML = '';

    if (previousStore) {
      previousStore._isOpen ? isOpen = 1 : isOpen = 0;
    }

    // try {
    //   isOpen = previousStore._isOpen;
    // }
    // catch (err) {
    //   console.log('No Previous store', err);
    //   isOpen = 0;
    // }

    // instantiate new JSONFormatter with Redux data
    const storeFormatter = new JSONFormatter(data, isOpen, {
      hoverPreviewEnabed: false,
      hoverPreviewArrayCount: 5,
      hoverPreviewFieldCount: 5,
      animateOpen: true,
      animateClose: true,
    });

    // append new store to page
    previousStore = storeFormatter;
    storeFormatter.openAtDepth(isOpen);
    storeNode.appendChild(storeFormatter.render());
  }
};

export default drawStore;
