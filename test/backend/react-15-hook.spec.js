//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint-env jest */
/* eslint quotes: off */

import { getName, getId, getRef, getKey, getState, getStore } from '../../extension/backend/react-15-hook';

describe(`[react-15-hook.js]: getName`, () => {
  it(`should get a node's dispayName`, () => {
    const NAME = 'div';
    const component = { _currentElement: { type: { displayName: NAME } } };
    const result = getName(component);
    expect(result).toEqual(NAME);
  });

  it(`should get a node's name`, () => {
    const NAME = 'div';
    const component = { _currentElement: { type: { name: NAME } } };
    const result = getName(component);
    expect(result).toEqual(NAME);
  });

  it(`should get a node's type`, () => {
    const NAME = 'div';
    const component = { _currentElement: { type: NAME } };
    const result = getName(component);
    expect(result).toEqual(NAME);
  });

  it(`should default if no data present`, () => {
    const component = {};
    const result = getName(component);
    expect(result).toEqual('default');
  });
});

describe(`[react-15-hook.js]: getId`, () => {
  it(`should get a node's debug id`, () => {
    const ID = 10;
    const component = { _debugID: ID };
    const result = getId(component);
    const expected = { id: ID, isDOM: true };
    expect(result).toEqual(expected);
  });

  it(`should get a node's dom id`, () => {
    const ID = 10;
    const component = { _domID: ID };
    const result = getId(component);
    const expected = { id: ID, isDOM: true };
    expect(result).toEqual(expected);
  });

  it(`should get a node's dom id from mount order`, () => {
    const _mountOrder = 5;
    const component = { _mountOrder };
    const result = getId(component);
    const expected = { id: _mountOrder * 100, isDOM: false };
    expect(result).toEqual(expected);
  });
});

describe(`[react-15-hook.js]: getRef`, () => {
  it(`should get a node's ref`, () => {
    const ref = 20; // check the type of this var
    const component = { _currentElement: { ref } };
    const result = getRef(component);
    const expected = ref;
    expect(result).toEqual(expected);
  });

  it(`should return null if component does not have a ref`, () => {
    const component = { _currentElement: {} };
    const res = getRef(component);
    expect(res).toEqual(null);
  });
});

describe(`[react-15-hook.js]: getKey`, () => {
  it(`should get a component's key`, () => {
    const key = 20; // check the type of this var
    const component = { _currentElement: { key } };
    const result = getKey(component);
    const expected = key;
    expect(result).toEqual(expected);
  });

  it(`should return null if component does not have a key`, () => {
    const component = { _currentElement: {} };
    const res = getKey(component);
    expect(res).toEqual(null);
  });
});

describe(`[react-15-hook.js] getState`, () => {
  it(`should get a component's state`, () => {
    const state = { a: 'a', b: 'b' };
    const component = { _instance: { state } };
    const res = getState(component);
    expect(res).toEqual(state);
  });

  it(`should return null if component is stateless`, () => {
    const component = { _instance: {} };
    const res = getState(component);
    expect(res).toEqual(null);
  });
});

describe(`[react-15-hook.js] getStore`, () => {
  it(`should return null if component does not have a store`, () => {
    const component = { _currentElement: { type: { propTypes: { } } } };
    const res = getStore(component);
    expect(res).toEqual(null);
  });
});
