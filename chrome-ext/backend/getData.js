//get Data
// function getData(components = [], store = []) {
//   let reactRoot = document.querySelector("[data-reactroot]")
//   let vDOM = reactRoot[Object.getOwnPropertyNames(reactRoot)[0]]
//   const rootElement = vDOM._renderedChildren['.0']
//   traverseAllChildren(rootElement, components)
//   const data = { data: components, store: [] }
//   console.log('DATA...(getData.js): ', data)
// }
//
// const traverseAllChildren = (component, parentArr) => {
//   if (!component._currentElement) return
//
//   const newComponent = {
//     children: [],
//     id: component._debugID,
//     name: 'default'
//   }
//   if (component.constructor.name === 'ReactDOMTextComponent')
// }

export function getData() {
  console.log('retrieving data...(getData.js)')
}
