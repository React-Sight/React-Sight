//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/* eslint-env jest */

import updatePanel from './state-props-panel';

describe('updatePanel', () => {
  it('says none if state is null and props are null', () => {
    document.body.innerHTML =
    '<div class="col-md-4 col-sm-push-6" id="sidebar-reactsight">' +
      '<ul class="sidebar-nav">' +
        '<li id="\'"store-container">' +
          '<h2>Store</h2>' +
          '<div id="store"></div>' +
          '<br>' +
        '</li>' +
        '<li id="state-container">' +
          '<h2>State</h2>' +
          '<div id="state"></div>' +
          '<br>' +
        '</li>' +
        '<li id="props-container">' +
          '<h2>Props</h2>' +
          '<div id="props"></div>' +
          '<br>' +
        '</li>' +
      '</ul>' +
    '</div>';

    updatePanel(null, null);
    const stateNode = document.getElementById('state');
    expect(stateNode.innerHTML).toEqual('None');
  });

  it('renders JSON formatter for state ', () => {
    document.body.innerHTML =
    '<div class="col-md-4 col-sm-push-6" id="sidebar-reactsight">' +
      '<ul class="sidebar-nav">' +
        '<li id="\'"store-container">' +
          '<h2>Store</h2>' +
          '<div id="store"></div>' +
          '<br>' +
        '</li>' +
        '<li id="state-container">' +
          '<h2>State</h2>' +
          '<div id="state"></div>' +
          '<br>' +
        '</li>' +
        '<li id="props-container">' +
          '<h2>Props</h2>' +
          '<div id="props"></div>' +
          '<br>' +
        '</li>' +
      '</ul>' +
    '</div>';

    updatePanel({}, null);
    const jsonFormatter = document.querySelector('.json-formatter-row');
    expect(jsonFormatter).toBeTruthy();
  });

  it('renders JSON formatter for props ', () => {
    document.body.innerHTML =
    '<div class="col-md-4 col-sm-push-6" id="sidebar-reactsight">' +
      '<ul class="sidebar-nav">' +
        '<li id="\'"store-container">' +
          '<h2>Store</h2>' +
          '<div id="store"></div>' +
          '<br>' +
        '</li>' +
        '<li id="state-container">' +
          '<h2>State</h2>' +
          '<div id="state"></div>' +
          '<br>' +
        '</li>' +
        '<li id="props-container">' +
          '<h2>Props</h2>' +
          '<div id="props"></div>' +
          '<br>' +
        '</li>' +
      '</ul>' +
    '</div>';

    updatePanel(null, {});
    const jsonFormatter = document.querySelector('.json-formatter-row');
    expect(jsonFormatter).toBeTruthy();
  });
});
