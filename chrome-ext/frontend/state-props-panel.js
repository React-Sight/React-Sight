//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

import JSONFormatter from 'json-formatter-js';

/**
 * Update the state/ props for a selected node
 * Clears existing state / props panel, then appends new panel
 *
 * @param {} state - JSON representation of component's state
 * @param {} props - JSON representation of component's props
 */
function updatePanel(state, props) {
  const stateNode = document.getElementById('state');
  const propsNode = document.getElementById('props');

  // state
  const stateFormatter = new JSONFormatter(state, 1, {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 10,
    hoverPreviewFieldCount: 5,
    animateOpen: true,
    animateClose: true,
  });

  // props
  const propsFomatter = new JSONFormatter(props, 1, {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    animateOpen: true,
    animateClose: true,
  });

  stateNode.innerHTML = '';
  propsNode.innerHTML = '';

  if (state == null || state === undefined) {
    stateNode.appendChild(document.createTextNode('None'));
  } else {
    stateNode.appendChild(stateFormatter.render());
  }

  if (props == null || props === undefined) {
    propsNode.appendChild(document.createTextNode('None'));
  } else {
    propsNode.appendChild(propsFomatter.render());
  }
}

export default updatePanel;
