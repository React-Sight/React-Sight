/** Parse JSON recursively and remove unwanted items */
const recurFilter = (node, parentArr, filter) => {
  if (node.name == undefined) return
  const newObj = { name: node.name, children: [], id: node.id, props: node.props, state: node.state }
  if (filter.includes(node.name)) {
    node.children.forEach(child => {
      recurFilter(child, parentArr, filter);
    });
  }
  else {
    parentArr.push(newObj);
    node.children.forEach(child => {
      recurFilter(child, newObj.children, filter);
    });
  }
}

/** Removes Redux components from tree */
export function filterRedux(data) {
  const filtered = { data: [] }
  const names = ['Provider', 'Connect'];

  recurFilter(data.data[0], filtered.data, names)
  console.log('# filtered Redux', filtered)
  return filtered;
}

/** Removes ReactRouter v4 components from JSON */
export function filterRouter(data) {
  const filtered = { data: [] }
  const names = ['BrowserRouter', 'Router', 'Switch', 'Route', 'Link', 'StaticRouter', 'NavLink', 'Redirect', 'MemoryRouter', 'Prompt', 'NavLink'];

  recurFilter(data.data[0], filtered.data, names)
  console.log('# filtered Router', filtered)
  return filtered;
}
