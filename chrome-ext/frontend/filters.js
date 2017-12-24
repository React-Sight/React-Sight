//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.
//
//  Filters work by building parsing existing JSON data, and returning a
//  new JSON object
//

/** Parse JSON recursively and remove unwanted items
 *
 * Generic filter method, only really using this for Route components
 */
const routerFilter = (node, parentArr, filter) => {
  if (node.name === undefined) return;
  const newObj = {
    name: node.name,
    children: [],
    id: node.id,
    props: node.props,
    state: node.state,
    methods: node.methods,
    isDOM: node.isDOM,
  };

  if (filter.includes(node.name)) {
    node.children.forEach((child) => {
      routerFilter(child, parentArr, filter);
    });
  } else {
    parentArr.push(newObj);
    node.children.forEach((child) => {
      routerFilter(child, newObj.children, filter);
    });
  }
};

/** Removes DOM nodes by checking 'isDOM' flag */
const domFilter = (node, parentArr) => {
  if (node.name === undefined) return;
  const newObj = {
    name: node.name,
    children: [],
    id: node.id,
    props: node.props,
    state: node.state,
    methods: node.methods,
    isDOM: node.isDOM,
  };

  if (node.isDOM) {
    node.children.forEach((child) => {
      domFilter(child, parentArr);
    });
  } else {
    parentArr.push(newObj);
    node.children.forEach((child) => {
      domFilter(child, newObj.children);
    });
  }
};

/** This is specifcally for redux, and looks for components names 'connect' */
const reduxFilter = (node, parentArr, filter) => {
  if (node.name === undefined) return;
  const newObj = {
    name: node.name,
    children: [],
    id: node.id,
    props: node.props,
    state: node.state,
    methods: node.methods,
    isDOM: node.isDOM,
  };

  if (filter.includes(node.name) || node.name.includes('Connect')) {
    node.children.forEach((child) => {
      reduxFilter(child, parentArr, filter);
    });
  } else {
    parentArr.push(newObj);
    node.children.forEach((child) => {
      reduxFilter(child, newObj.children, filter);
    });
  }
};

/** Removes Redux components from tree */
export const filterRedux = (data) => {
  const filtered = { data: [] };
  const names = ['Provider', 'Connect'];
  reduxFilter(data.data[0], filtered.data, names);
  return filtered;
};

/** Removes ReactRouter v4 components from JSON */
export const filterRouter = (data) => {
  const filtered = { data: [] };
  const names = ['BrowserRouter', 'Router', 'Switch', 'Route', 'Link', 'StaticRouter', 'NavLink', 'Redirect', 'MemoryRouter', 'Prompt', 'NavLink'];
  routerFilter(data.data[0], filtered.data, names);
  return filtered;
};

/** Removes Basic DOM components from tree */
export const filterDOM = (data) => {
  const filtered = { data: [] };
  domFilter(data.data[0], filtered.data);
  return filtered;
};
