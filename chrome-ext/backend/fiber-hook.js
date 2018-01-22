/* eslint brace-style: off, camelcase: off, max-len: off, no-prototype-builtins: off, no-restricted-syntax: off, consistent-return: off, no-inner-declarations: off */
import { parseFunction } from './common';

let __ReactSightStore;

/** TODO - get objects to work
  *
  * Parse the props for React 16 components
  */
export const props16 = (node) => {
  // console.log('props16');
  const props = {};
  const keys = Object.keys(node.memoizedProps);

  keys.forEach((prop) => {
    if (typeof node.memoizedProps[prop] === 'function') {
      props[prop] = parseFunction(node.memoizedProps[prop]);
    }
    // TODO - get these objects to work, almost always children property
    else if (typeof node.memoizedProps[prop] === 'object') {
      // console.log("PROP Object: ", node.memoizedProps[prop]);
      props[prop] = 'object*';

      // TODO - parse object
      // console.log('obj: ', node.memoizedProps[prop]);
      // if (node.memoizedProps[prop] && Object.keys(node.memoizedProps[prop]).length) {
      //   const keys = Object.keys(node.memoizedProps[props]);
      //   console.log('keys', keys)
      //   props[prop] = keys
      //   props[prop] = parseProps(node.memoizedProps[props]);
      // }
    }

    // TODO - debug this
    // else if (prop === 'children') {
    //   props[prop] = new node.memoizedProps[prop].constructor();
    //   if (Array.isArray(node.memoizedProps[prop])) {
    //     node.memoizedProps[prop].forEach((child) => {
    //       props[prop].push(child && child.type && child.type.name);
    //     });
    //   }
    //   else props[prop].name = node.memoizedProps[prop].type && node.memoizedProps[prop].type.name;
    // }
    else props[prop] = node.memoizedProps[prop];
  });
  return props;
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
  console.log('React > 16');
  if (typeof fiberDOM === 'undefined') return;
  const components = [];
  // console.log('[ReactSight]traverse16 vDOM: ', fiberDOM);
  recur16(fiberDOM.current.stateNode.current, components);
  const data = {
    data: components,
    store: __ReactSightStore,
  };
  data.data = data.data[0].children[0].children;
  // console.log('[ReactSight] retrieved data --> posting to content-scripts...: ', data)
  // console.log('[ReactSight] SENDING -> ', data);
  window.postMessage(JSON.parse(JSON.stringify(data)), '*');
};
