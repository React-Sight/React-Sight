//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/* eslint-env jest */

import { filterRedux } from './filters';

describe('filter.js', () => {
  it('should filter Redux Components', () => {
    const mockData = {
      data: [{
        id: 4,
        isDOM: true,
        props: {},
        state: null,
        name: 'Div',
        children: [{
          id: 5,
          isDOM: false,
          name: 'Provider',
          props: { store: 'object*', children: 'object*' },
          state: null,
          children: [{
            id: 6,
            isDOM: false,
            props: {},
            state: {},
            name: 'BrowserRouter',
            children: [],
          }],
        }],
      }],
    };

    const expected = {
      data: [{
        id: 4,
        isDOM: true,
        props: {},
        state: null,
        name: 'Div',
        children: [{
          id: 6,
          isDOM: false,
          props: {},
          state: {},
          name: 'BrowserRouter',
          children: [],
        }],
      }],
    };

    const actual = filterRedux(mockData);
    expect(actual).toEqual(expected);
  });
});
