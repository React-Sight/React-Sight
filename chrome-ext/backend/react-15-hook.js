//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint brace-style: off, camelcase: off, max-len: off, no-prototype-builtins: off, no-restricted-syntax: off, consistent-return: off, no-inner-declarations: off */
/* eslint no-use-before-define: off, no-var: off */
import { parseFunction } from './common';

var __ReactSightDebugMode = (process.env.NODE_ENV === 'debug');
let __ReactSightStore;

/**
 * Parse Component's props. Handle nested objects and functions
 *
 * @param {object} props - Object representing a component's props
 */
const parseProps = (props, i = 0) => {
  if (!props) return null;
  if (props.hasOwnProperty(window) || props.hasOwnProperty('prevObject') || props.hasOwnProperty(Window)) return null; // window was causing infinite loops
  if (typeof props !== 'object') return props;

  // check if current props has PROPS property..don't traverse further just grab name property
  if (Object.prototype.hasOwnProperty.call(props, 'props')) {
    if (!props.hasOwnProperty('type')) return undefined;
    else if (props.type.hasOwnProperty('name') && props.type.name.length) return props.type.name;
    else if (props.type.hasOwnProperty('displayName') && props.type.displayName.length) return props.type.displayName;
    else if (props.hasOwnProperty('type')) return `${props.type}`;
  }

  // otherwise parse the props
  else {
    const parsedProps = {};
    // TODO remove for in loop
    for (const key in props) {
      if (!props[key]) parsedProps[key] = null;

      // stringify methods
      else if (key === 'routes') return;
      else if (typeof props[key] === 'function') parsedProps[key] = parseFunction(props[key]);
      // array parse parseProps forEach element
      else if (Array.isArray(props[key]) && key === 'children') parsedProps[key] = parseArray(props[key]);

      // else if type is an object
      else if (typeof props[key] === 'object') {
        // handle custom objects and components with one child
        if (props[key] && Object.keys(props[key]).length) {
          if (i < 3) { // limit this func
            const iterator = i + 1;
            parsedProps[key] = parseProps(props[key], iterator);
          } else parsedProps[key] = 'obj*'; // end recursion so we dont get infinite loops
        }
      }
      // handle text nodes and other random values
      else parsedProps[key] = props[key];
    }
    return parsedProps;
  }
};

/**
 * Recursively walk through virtual DOM and build up JSON representation
 *
 * @param {react component} component - a react component
 * @param {array} parentArr - array representing component's parent
 */
export const traverseAllChildren = (component, parentArr) => {
  if (!component._currentElement) return;

  const newComponent = {
    children: [],
    id: null,
    idDOM: false,
    name: 'default',
    state: null,
    props: null,
    ref: null,
    key: null,
  };

  __ReactSightStore = getStore(component);

  newComponent.state = getState(component);
  newComponent.key = getKey(component);
  newComponent.ref = getRef(component);
  newComponent.name = getName(component);
  newComponent.props = getProps(component);

  const id = getId(component);
  newComponent.id = id.id;
  newComponent.isDOM = id.isDOM;

  // Add new component to parent's array
  parentArr.push(newComponent);

  const { _renderedChildren, _renderedComponent } = component;

  // traverse child or children of current component
  if (_renderedComponent) traverseAllChildren(_renderedComponent, newComponent.children);
  else if (_renderedChildren) {
    const keys = Object.keys(_renderedChildren);
    keys.forEach(key => traverseAllChildren(_renderedChildren[key], newComponent.children));
  }
};

/**
 * Traverse React's virtual DOM and POST the object to the window.
 * The message will be recieved by React Sight chrome extension (the content script)
 *
 * 1. define rootElement of virtual DOM
 * 2. recursively traverse down through props chain, starting from root element

 * @param {array} components - array containing parsed virtual DOM
 */
export const getData = (reactDOM) => {
  if (__ReactSightDebugMode) console.log('vDOM', reactDOM);
  const components = [];
  const rootElement = reactDOM.Mount._instancesByReactRootID[1]._renderedComponent;
  traverseAllChildren(rootElement, components);
  const ReactSightData = { data: components, store: __ReactSightStore };
  const clone = JSON.parse(JSON.stringify(ReactSightData));
  if (__ReactSightDebugMode) console.log('SENDING -> ', ReactSightData);
  window.postMessage(JSON.parse(JSON.stringify(clone)), '*');
};

// ***************
// *** HELPERS ***
// ***************

/**
 * Parse an array and it's elements. Accepts and array and returns an array
 *
 * @param {array} arr
 */
const parseArray = arr => arr.map(elem => parseProps(elem));

/**
 * Returns a React component's props, if any
 * @param {React Element} component
 */
const getProps = (component) => {
  if (component._currentElement && component._currentElement.props) return parseProps(component._currentElement.props);
  return null;
};

/**
 * Return's a React component's state, if any
 * @param {React Element} component
 */
export const getState = (component) => {
  if (component._instance && component._instance.state) return component._instance.state;
  return null;
};

export const getStore = (component) => {
  // call getState() on react-redux.connect()
  if (component._currentElement.type && component._currentElement.type.propTypes && component._currentElement.type.propTypes.hasOwnProperty('store')) {
    return component._instance.store.getState();
  }
  return null;
};

/**
 * Returns a React component's key, if any
 * @param {React Element} component
 */
export const getKey = (component) => {
  if (component._currentElement && component._currentElement.key) return component._currentElement.key;
  return null;
};

/**
 * Returns a React component's ref, if any
 * @param {React Element} component
 */
export const getRef = (component) => {
  if (component._currentElement && component._currentElement.ref) return component._currentElement.ref;
  return null;
};

/**
 * Returns a React component's name, if any
 * @param {React Element} component
 */
export const getName = (component) => {
  if (component && component._currentElement && component._currentElement.type) {
    if (component._currentElement.type.displayName) return component._currentElement.type.displayName;
    else if (component._currentElement.type.name) return component._currentElement.type.name;
    return component._currentElement.type;
  }
  return 'default';
};

/**
 * Returns a React component's id, if any
 * @param {React Element} component
 */
export const getId = (component) => {
  if (component._debugID) return { id: component._debugID, isDOM: true };
  if (component._domID) return { id: component._domID, isDOM: true };
  return { id: component._mountOrder * 100, isDOM: false };
};
