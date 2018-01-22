/* eslint brace-style: off, camelcase: off, max-len: off, no-prototype-builtins: off, no-restricted-syntax: off, consistent-return: off, no-inner-declarations: off */

import { parseFunction } from './common';

let __ReactSightStore;

/**
 * Parse Component's props. Handle nested objects and functions
 *
 * @param {object} props - Object representing a component's props
 */
export const parseProps = (props, i = 0) => {
  if (!props) return;
  if (props.hasOwnProperty(window) || props.hasOwnProperty('prevObject') || props.hasOwnProperty(Window)) return; // window was causing infinite loops
  if (typeof props !== 'object') return props;
  // check if current props has PROPS property..don't traverse further just grab name property
  // var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");
  // if (props.hasOwnProperty('props')) {
  if (Object.prototype.hasOwnProperty.call(props, 'props')) {
    if (!props.hasOwnProperty('type')) return undefined;
    else if (props.type.hasOwnProperty('name') && props.type.name.length) return props.type.name;
    else if (props.type.hasOwnProperty('displayName') && props.type.displayName.length) return props.type.displayName;
    else if (props.hasOwnProperty('type')) return `${props.type}`;
  }

  else {
    const parsedProps = {};
    // TODO remove for in loop
    for (let key in props) {
      if (!props[key]) parsedProps[key] === null;
      // stringify methods
      else if (key === 'routes') return;
      else if (typeof props[key] === 'function') {
        parsedProps[key] = parseFunction(props[key]);
      }
      else if (Array.isArray(props[key]) && key === 'children') {
        // parseProps forEach element
        parsedProps[key] = [];
        props[key].forEach((child) => {
          parsedProps[key].push(parseProps(child));
        });
      } else if (typeof props[key] === 'object') {
        // handle custom objects and components with one child
        if (props[key] && Object.keys(props[key]).length) {
          if (i < 3) { // limit this func
            const iterator = i + 1;
            parsedProps[key] = parseProps(props[key], iterator);
          } else parsedProps[key] = 'obj*'; // end recursion so we dont get infinite loops
        }
      }
      else {
        // handle text nodes and other random values
        parsedProps[key] = props[key];
      }
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
  // if no current element, return
  if (!component._currentElement) return;
  const newComponent = {
    children: [],
    id: null,
    name: 'default',
    state: null,
    props: null,
    ref: null,
    key: null,
  };
  // get ID
  if (component._debugID) {
    newComponent.id = component._debugID;
  }
  if (component._domID) {
    newComponent.id = component._domID;
    newComponent.isDOM = true;
  }
  else {
    newComponent.id = component._mountOrder * 100;
    newComponent.isDOM = false;
  }
  // Get Name
  if (component._currentElement.type) {
    // check for displayName or name
    if (component._currentElement.type.displayName) newComponent.name = component._currentElement.type.displayName;
    else if (component._currentElement.type.name) newComponent.name = component._currentElement.type.name;
    else newComponent.name = component._currentElement.type;
  }
  else newComponent.name = 'default';

  // call getState() on react-redux.connect()
  if (component._currentElement.type) {
    if (component._currentElement.type.propTypes) {
      if (component._currentElement.type.propTypes.hasOwnProperty('store')) {
        __ReactSightStore = component._instance.store.getState();
      }
    }
  }

  // Get State
  if (!newComponent.state && component._instance && component._instance.state) {
    newComponent.state = component._instance.state;
    if (newComponent.state && Object.keys(newComponent.state).length === 0) {
      newComponent.state = null;
    }
  }
  if (!newComponent.props && component._currentElement && component._currentElement.props) {
    newComponent.props = parseProps(component._currentElement.props);
  }
  // Get key
  if (!newComponent.key && component._currentElement && component._currentElement.key) {
    newComponent.key = component._currentElement.key;
  }
  if (!newComponent.ref && component._currentElement && component._currentElement.ref) {
    newComponent.ref = component._currentElement.ref;
  }

  // go into children of current component
  const componentChildren = component._renderedChildren;
  parentArr.push(newComponent);
  if (componentChildren) {
    const keys = Object.keys(componentChildren);
    keys.forEach((key) => {
      traverseAllChildren(componentChildren[key], newComponent.children);
    });
  }
  else if (component._renderedComponent) {
    traverseAllChildren(component._renderedComponent, newComponent.children);
  }
};

/**
 * Traverse React's virtual DOM and POST the object to the window.
 * The message will be recieved by React Sight chrome extension (the content script)
 *
 * @param {array} components - array containing parsed virtual DOM
 */
export const getData = (reactDOM) => {
  console.log('React < 16');
  const components = [];
  // define rootElement of virtual DOM
  const rootElement = reactDOM.Mount._instancesByReactRootID[1]._renderedComponent;
  // recursively traverse down through props chain   starting from root element
  traverseAllChildren(rootElement, components);
  const data = { data: components, store: __ReactSightStore };

  // console.log('SENDING -> ', data);
  window.postMessage(JSON.parse(JSON.stringify(data)), '*');
};
