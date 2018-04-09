//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint brace-style: off, camelcase: off, max-len: off, no-prototype-builtins: off, no-restricted-syntax: off, consistent-return: off, no-inner-declarations: off */
/* eslint no-use-before-define: off, no-var: off */
import { parseFunction } from './common';

var __ReactSightDebugMode = (process.env.NODE_ENV === 'debug');
let __ReactSightStore;

/** TODO - get objects to work
  *
  * Parse the props for React 16 components
  */
export const props16 = (node) => {
  try {
    const props = {};
    const keys = Object.keys(node.memoizedProps);

    keys.forEach((prop) => {
      const value = node.memoizedProps[prop];
      if (typeof value === 'function') props[prop] = parseFunction(value);
      // TODO - get these objects to work, almost always children property
      else if (typeof node.memoizedProps[prop] === 'object') {
        // console.log("PROP Object: ", node.memoizedProps[prop]);
        props[prop] = 'object*';

        // TODO - parse object
      }
      else props[prop] = node.memoizedProps[prop];
    });
    return props;
  } catch (e) {
    return {};
  }
};

/** TODO: Get Props
 *
 * Traverse through vDOM (React 16) and build up JSON data
 *
 */
export const recur16 = (node, parentArr) => {
  const newComponent = {
    name: '',
    children: [],
    state: null,
    props: null,
    id: null,
    isDOM: null,
  };

  // TODO ** only works on local host **
  // get ID
  if (node._debugID) newComponent.id = node._debugID;

  // get name and type
  if (node.type) {
    if (node.type.name) {
      newComponent.name = node.type.name;
      newComponent.isDOM = false;
    }
    else {
      newComponent.name = node.type;
      newComponent.isDOM = true;
    }
  }

  // get state
  if (node.memoizedState) newComponent.state = node.memoizedState;

  // get props
  if (node.memoizedProps) newComponent.props = props16(node);

  // get store
  if (node.type && node.type.propTypes) {
    if (node.type.propTypes.hasOwnProperty('store')) {
      __ReactSightStore = node.stateNode.store.getState();
    }
  }
  newComponent.children = [];
  parentArr.push(newComponent);
  if (node.child != null) recur16(node.child, newComponent.children);
  if (node.sibling != null) recur16(node.sibling, parentArr);
};

/**
 * Traversal Method for React 16
 *
 * If the application is using React Fiber, run this method to crawl the virtual DOM.
 * First, find the React mount point, then walk through each node
 * For each node, grab the state and props if present
 * Finally, POST data to window to be recieved by content-scripts
 *
 * @param {array} components - array containing parsed virtual DOM
 *
 */
export const traverse16 = (fiberDOM) => {
  if (typeof fiberDOM === 'undefined') return;
  if (__ReactSightDebugMode) console.log('[ReactSight] traverse16 vDOM: ', fiberDOM);
  const components = [];
  recur16(fiberDOM.current.stateNode.current, components);
  if (__ReactSightDebugMode) console.log('[ReactSight] traverse16 data: ', components);
  const data = {
    data: components,
    store: __ReactSightStore,
  };
  data.data = data.data[0].children[0].children;
  const ReactSightData = { data: components, store: __ReactSightStore };
  const clone = JSON.parse(JSON.stringify(ReactSightData));
  if (__ReactSightDebugMode) console.log('[ReactSight] retrieved data --> posting to content-scripts...: ', ReactSightData);
  if (__ReactSightDebugMode) console.log('[ReactSight] SENDING -> ', clone);
  window.postMessage(clone, '*');
};
