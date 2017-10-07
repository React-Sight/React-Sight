if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {

}

const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers
const instance = reactInstances[Object.keys(reactInstances)[0]]
instance.Reconciler.receiveComponent = (function (original) {
  return function (nextElement, container, callback) {
    var result = original.apply(this, arguments)
    getData()
    return result
  }
})(instance.Reconciler.receiveComponent)


const getData = (components = [], store = []) => {
  var reactRoot = document.querySelector("[data-reactroot]")
  var dom = reactRoot[Object.getOwnPropertyNames(reactRoot)[0]]
  const vDOM = dom._renderedChildren['.0']
  traverseAllChildren(vDOM, components)
  const data = { data: components, store: [] }
  console.log('DATA: ', data)
}

const parseProps = (currentComponent) => {
    let newProps = {}
    for (let key in currentComponent) {
      if (typeof currentComponent[key] === 'function') {
        newProps[key] = '' + currentComponent[key]
      }
      else if (key === 'children') {
        newProps[key] = new currentComponent[key].constructor
        if (Array.isArray(currentComponent[key])) {
          currentComponent[key].forEach(child => {
            if (typeof child === 'undefined') return
            let name;
            if (child) {
              name = child
              if (child.type) {
                name = child.type
                if (child.type.name) {
                  name = child.type.name
                }
              }
            }
            newProps[key].push(name)
          })
        } else {
          newProps[key].name = currentComponent[key].type && currentComponent[key].type.name
        }
      } else if (typeof currentComponent[key] === 'object') {
        newProps[key] = currentComponent[key]
      } else {
        newProps[key] = currentComponent[key]
      }
    }
    return newProps
  }

/** Traverse through virtual DOM and add data to array */
const traverseAllChildren = (component, parentArr) => {
  // if no current element, return
  if (!component._currentElement) return

  const newComponent = { children: [], id: component._debugID }

  if (component.constructor.name === 'ReactDOMTextComponent') {
    //current component is a TEXT NODE .. ie. <p>I AM ReactDOMTextComponent</p>
    //do nothing? LINE BELOW IS STILL IN TESTING TO PASS THRU DOM TEXT
    // component = component._renderedComponent
    newComponent.name = component._currentElement
  }
  else if (component.constructor.name === 'ReactDOMComponent') {
    //current component is a DOM node;
    newComponent.name = component._currentElement.type
    //BELOW IS STILL IN TESTING: trying to grab props and its className from a DOM NODE
    const domProps = component._currentElement.props || null
    newComponent.props = parseProps(domProps)
    newComponent.type = component.constructor.name
  }

  else if (component.constructor.name === 'ReactCompositeComponentWrapper') {
    newComponent.name = component._currentElement.type && component._currentElement.type.name
    newComponent.state = component && component._instance && component._instance.state || null
    newComponent.type = component.constructor.name
    if (component._currentElement.type.name === 'Connect' || component._currentElement.type.name === 'Provider') {
      newComponent.type = "ReduxComponent"
    }
    let copyProps = component && component._instance && component._instance.props || null
    newComponent.props = parseProps(copyProps)
    newComponent.methods = []
    const keys = Object.keys(component._instance)
    keys.forEach(properties => {
      if (typeof component._instance[properties] === 'function' && properties !== 'render') {
        let newObj = {}
        newObj[properties] = "" + component._instance[properties]
        newComponent.methods.push(newObj)
      }
    })
  }
  const componentChildren = component._renderedChildren
  parentArr.push(newComponent);
  if (componentChildren) {
    const keys = Object.keys(componentChildren)
    keys.forEach(key => {
      traverseAllChildren(componentChildren[key], newComponent.children)
    })
  }
  else if (component._renderedComponent) {
    traverseAllChildren(component._renderedComponent, newComponent.children)
  }
}
