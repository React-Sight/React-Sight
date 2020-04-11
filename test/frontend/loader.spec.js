//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint-env jest */
import processLoader from '../../extension/frontend/loader';

jest.useFakeTimers();

describe('processLoader()', () => {
  it('should display a funny loading message', () => {
    document.body.innerHTML =
      '<div class="loading">' +
        '<div id="loader-container">' +
          '<img id="loader-icon" src="./asset/floatinggif2.gif">' +
          '<h4 id="loader-header"></h4>' +
          '<h6 id="loader-sub-header">Starting</h6>' +
        '</div>' +
      '</div>';

    processLoader();
    const header = document.getElementById('loader-header').innerHTML;
    expect(header.length).toBeGreaterThan(1);
  });

  it('should safely check for loading screen <div>s', () => {
    document.body.innerHTML =
    '<div class="tree">' +
      '<div class="loading">' +
        '<div id="loader-container">' +
          '<img id="loader-icon" src="./asset/floatinggif2.gif">' +
          '<h4 id="loader-header">something funny here</h4>' +
          '<h6 id="loader-sub-header">Starting</h6>' +
        '</div>' +
      '</div>' +
    '</div>';

    processLoader();
    const loading = document.querySelector('.loading');
    if (loading) document.querySelector('.tree').removeChild(loading);

    jest.runAllTimers();

    const header = document.querySelector('loader-header');
    expect(header).toBeFalsy();

    const subHeader = document.getElementById('loader-sub-header');
    expect(subHeader).toBeFalsy();
  });

  it('should display an error message if React is not found', () => {
    document.body.innerHTML =
    '<div class="loading">' +
      '<div id="loader-container">' +
        '<img id="loader-icon" src="./asset/floatinggif2.gif">' +
        '<h4 id="loader-header">something funny here</h4>' +
        '<h6 id="loader-sub-header">Starting</h6>' +
      '</div>' +
    '</div>';

    processLoader();
    jest.runAllTimers();

    const header = document.getElementById('loader-header').innerHTML;
    expect(header.length).toBe(0);

    const subHeader = document.getElementById('loader-sub-header').innerHTML;
    expect(subHeader.length).toBeGreaterThan(9);
  });
});
