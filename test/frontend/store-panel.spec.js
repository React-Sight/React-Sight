//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint-env jest */
import drawStore from '../../extension/frontend/store-panel';
import {
  mockReduxStore,
  mockStorePanel,
  mockJSONFormatter,
  mockJSONFormatterExpanded,
} from '../../test/fixtures';

describe('drawStore', () => {
  it('should not run if no mockReduxStore is passed', () => {
    const result = drawStore({});
    expect(result).toEqual(null);
  });

  it('should render a JSONFormatter element if data is present', () => {
    document.body.innerHTML = mockStorePanel;
    drawStore(mockReduxStore);
    const storeNode = document.getElementById('store').innerHTML;
    expect(storeNode).toEqual(mockJSONFormatter);
  });

  it('should open the panel if it was previously open', () => {
    document.body.innerHTML = mockStorePanel;
    let previousStore = drawStore(mockReduxStore);
    previousStore._isOpen = 1;
    previousStore = drawStore(mockReduxStore, previousStore);
    const storeNode = document.getElementById('store').innerHTML;
    expect(storeNode).toEqual(mockJSONFormatterExpanded);
  });
});
