//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/** Parse JSON recursively and remove unwanted items
 *
 * Shared between all filters
 */
const recurFilter = (node, parentArr, filter) => {
  if (node.name == undefined) return;
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
      recurFilter(child, parentArr, filter);
    });
  } else {
    parentArr.push(newObj);
    node.children.forEach((child) => {
      recurFilter(child, newObj.children, filter);
    });
  }
};

const domFilter = (node, parentArr) => {
  if (node.name == undefined) return;
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

const reduxFilter = (node, parentArr, filter) => {
  if (node.name == undefined) return;
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
export function filterRedux(data) {
  const filtered = { data: [] };
  const names = ['Provider', 'Connect'];
  reduxFilter(data.data[0], filtered.data, names);
  return filtered;
}

/** Removes ReactRouter v4 components from JSON */
export function filterRouter(data) {
  const filtered = { data: [] };
  const names = ['BrowserRouter', 'Router', 'Switch', 'Route', 'Link', 'StaticRouter', 'NavLink', 'Redirect', 'MemoryRouter', 'Prompt', 'NavLink'];
  recurFilter(data.data[0], filtered.data, names);
  return filtered;
}

/** Removes Basic DOM components from tree */
export function filterDOM(data) {
  const filtered = { data: [] };
  domFilter(data.data[0], filtered.data);
  return filtered;
}
