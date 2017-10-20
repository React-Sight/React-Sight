//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

import JSONFormatter from 'json-formatter-js';

let isOpen = 0;
let previousStore;

const drawStore = (data) => {
  if (Object.keys(data).length) {
    const storeNode = document.getElementById('store');
    storeNode.innerHTML = '';
    if (previousStore) {
      previousStore._isOpen ? isOpen = 1 : isOpen = 0;
    }
    const storeFormatter = new JSONFormatter(data, isOpen, {
      hoverPreviewEnabed: false,
      hoverPreviewArrayCount: 5,
      hoverPreviewFieldCount: 5,
      animateOpen: true,
      animateClose: true,
    });
    previousStore = storeFormatter;
    storeFormatter.openAtDepth(isOpen);
    storeNode.appendChild(storeFormatter.render());
  }
};

export default drawStore;
