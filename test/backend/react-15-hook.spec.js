//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/* eslint-env jest */
import { getName, getId } from '../../chrome-ext/backend/react-15-hook';

describe('[react-15-hook.js]: getName', () => {
  it('should get a node\'s dispayName', () => {
    const NAME = 'div';
    const component = { _currentElement: { type: { displayName: NAME } } };
    const result = getName(component);
    expect(result).toEqual(NAME);
  });

  it('should get a node\'s name', () => {
    const NAME = 'div';
    const component = { _currentElement: { type: { name: NAME } } };
    const result = getName(component);
    expect(result).toEqual(NAME);
  });

  it('should get a node\'s type', () => {
    const NAME = 'div';
    const component = { _currentElement: { type: NAME } };
    const result = getName(component);
    expect(result).toEqual(NAME);
  });

  it('should default if no data present', () => {
    const component = {};
    const result = getName(component);
    expect(result).toEqual('default');
  });
});

describe('[react-15-hook.js]: getId', () => {
  it('should get a node\'s debug id', () => {
    const ID = 10;
    const component = { _debugID: ID };
    const result = getId(component);
    const expected = { id: ID, isDOM: true };
    expect(result).toEqual(expected);
  });

  it('should get a node\'s dom id', () => {
    const ID = 10;
    const component = { _domID: ID };
    const result = getId(component);
    const expected = { id: ID, isDOM: true };
    expect(result).toEqual(expected);
  });

  it('should get a node\'s dom id', () => {
    const _mountOrder = 5;
    const component = { _mountOrder };
    const result = getId(component);
    const expected = { id: _mountOrder * 100, isDOM: false };
    expect(result).toEqual(expected);
  });
});
