//might need additional testing..renderers provides a list of all imported React instances
console.log(window)
const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers;
//grab the first instance of imported React library
const instance = reactInstances[Object.keys(reactInstances)[0]];
var throttle = false;
//locate instance of __REACT_DEVTOOLS_GLOBAL_HOOK__
//__REACT_DEVTOOLS_GLOBAL_HOOK__ exists if React is imported in inspected Window
(function installHook() {
  //no instance of React
  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    //should run loading animation here probably
    return console.log('Cannot find React library...')
  } else {
    console.log(instance)
    //hijack receiveComponent method which runs after a component is rendered
    instance.Reconciler.receiveComponent = (function (original) {
      console.log(original)
      return function (...args) {
        if (!throttle) {
          getData()
          throttle = true
          setTimeout(() => throttle = false, 1)
        }
        return original(...args)
      }
    })(instance.Reconciler.receiveComponent)
  }
})();

const getData = (components = [], store = []) => {
  //define rootElement of virtual DOM
  const rootElement = instance.Mount._instancesByReactRootID[1]._renderedComponent;
  //recursively traverse down through props chain starting from root element
  traverseAllChildren(rootElement, components);
  const data = { data: components, store: store }
  console.log('retrieved data --> posting to content-scripts...: ', data)
  window.postMessage(JSON.parse(JSON.stringify(data)), '*');
};

const traverseAllChildren = (component, parentArr) => {
  // console.log('#recurTraverse component: ', component)
  // if no current element, return
  if (!component._currentElement) return

  const newComponent = { children: [], id: component._debugID, name: 'default' }

  // if (component.constructor.name === 'ReactDOMTextComponent') {
  //   //current component is a TEXT NODE .. ie. <p>I AM ReactDOMTextComponent</p>
  //   //do nothing? LINE BELOW IS STILL IN TESTING TO PASS THRU DOM TEXT
  //   // component = component._renderedComponent
  //   newComponent.name = component._currentElement
  // }
  // else if (component.constructor.name === 'ReactDOMComponent') {
  //   //current component is a DOM node;
  //   newComponent.name = component._currentElement.type
  //   //BELOW IS STILL IN TESTING: trying to grab props and its className from a DOM NODE
  //   const domProps = component._currentElement.props || null
  //   newComponent.props = parseProps(domProps)
  //   newComponent.type = component.constructor.name
  // }

  // else if (component.constructor.name === 'ReactCompositeComponentWrapper') {
  //   newComponent.name = component._currentElement.type && component._currentElement.type.name
  //   newComponent.state = component && component._instance && component._instance.state || null
  //   newComponent.type = component.constructor.name
  //   if (component._currentElement.type.name === 'Connect' || component._currentElement.type.name === 'Provider') {
  //     newComponent.type = "ReduxComponent"
  //     // this.store = component._instance.store.getState()
  //   }
  //   let copyProps = component && component._instance && component._instance.props || null
  //   newComponent.props = parseProps(copyProps)
  //   newComponent.methods = []
  //   const keys = Object.keys(component._instance)
  //   keys.forEach(properties => {
  //     if (typeof component._instance[properties] === 'function' && properties !== 'render') {
  //       let newObj = {}
  //       newObj[properties] = "" + component._instance[properties]
  //       newComponent.methods.push(newObj)
  //     }
  //   })
  // }

  // Get Store

  // Get Name
  if (component._currentElement.type) {
    // check for displayName or name
    if (component._currentElement.type.displayName) newComponent.name = component._currentElement.type.displayName
    else if (component._currentElement.type.name) newComponent.name = component._currentElement.type.name

    else newComponent.name = component._currentElement.type
  }
  else newComponent.name = 'Unknown'

  // Get State
  newComponent.state = component && component._instance && component._instance.state || null

  // console.log('Name: ', newComponent.name)
  // console.log('ID: ', newComponent.id)

  //go into children of current component
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

parseProps = (currentComponent) => {
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

window.addEventListener('reactsight', e => {
  getData()
})
