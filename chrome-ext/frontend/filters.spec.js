//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/* eslint-env jest */
import { filterRedux, filterRouter, filterDOM } from './filters';
import { mockDOM, mockFilterRedux, mockFilterRouter, mockFilterDOM } from '../../test/fixtures';

describe('filterRedux', () => {
  it('should filter Redux components', () => {
    const actual = filterRedux(mockDOM);
    expect(actual).toEqual(mockFilterRedux);
  });

  it('should abort if node.name is undefined', () => {
    const actual = filterRedux({ data: [{}] });
    expect(actual).toEqual({ data: [] });
  });
});

describe('filterRouter', () => {
  it('should filter Router components', () => {
    const actual = filterRouter(mockDOM);
    expect(actual).toEqual(mockFilterRouter);
  });

  it('should abort if node.name is undefined', () => {
    const actual = filterRouter({ data: [{}] });
    expect(actual).toEqual({ data: [] });
  });
});

describe('filterDOM', () => {
  it('should filter DOM components', () => {
    const actual = filterDOM(mockDOM);
    expect(actual).toEqual(mockFilterDOM);
  });

  it('should abort if node.name is undefined', () => {
    const actual = filterDOM({ data: [{}] });
    expect(actual).toEqual({ data: [] });
  });
});
