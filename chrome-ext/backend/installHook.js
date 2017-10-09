//might need additional testing..renderers provides a list of all imported React instances
console.log(window)
const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers || null;
//grab the first instance of imported React library
const instance = reactInstances[Object.keys(reactInstances)[0]];
var throttle = false;
// var store = [];
//locate instance of __REACT_DEVTOOLS_GLOBAL_HOOK__
//__REACT_DEVTOOLS_GLOBAL_HOOK__ exists if React is imported in inspected Window
(function installHook() {
  //no instance of React
  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    //should run loading animation here probably
    return console.log('Cannot find React library...')
  } else {
    console.log('instance: ', instance)
    //hijack receiveComponent method which runs after a component is rendered
    instance.Reconciler.receiveComponent = (function (original) {
      return function (...args) {
        if (!throttle) {
          throttle = true
          setTimeout(() => {
            getData();
            throttle = false
          }, 10)
        }
        return original(...args)
      }
    })(instance.Reconciler.receiveComponent)
  }
})();

const getData = (components = [], store = []) => {
  //define rootElement of virtual DOM
  const rootElement = instance.Mount._instancesByReactRootID[1]._renderedComponent;
  // console.log('rootElement: ', rootElement)
  //recursively traverse down through props chain   starting from root element
  traverseAllChildren(rootElement, components);
  const data = { data: components, store: store }
  console.log('retrieved data --> posting to content-scripts...: ', data)
  window.postMessage(JSON.parse(JSON.stringify(data)), '*');
};

const traverseAllChildren = (component, parentArr, sightID = 0) => {
  // console.log('#recurTraverse component: ', component)
  // if no current element, return
  if (!component._currentElement) return
  // console.log('current component: ', component)
  const newComponent = {
    children: [],
    id: component._debugID,
    name: 'default',
    state: null,
    props: null,
    ref: null,
    key: null,
    type: null,
  };
  //Get type
  if (!newComponent.type && component.constructor && component.constructor.name) {
    newComponent.type = component.constructor.name
  }
  // if (newComponent.name === 'ReactDOMTextComponent') {
  //  Account for Text nodes..
  // }
  // Get Name
  if (component._currentElement.type) {
    // check for displayName or name
    if (component._currentElement.type.displayName) newComponent.name = component._currentElement.type.displayName
    else if (component._currentElement.type.name) newComponent.name = component._currentElement.type.name
    else newComponent.name = component._currentElement.type
  }
  else newComponent.name = 'default'

  // Get State
  if (!newComponent.state && component._instance && component._instance.state) {
    newComponent.state = component._instance.state
    if (newComponent.state && Object.keys(newComponent.state).length === 0) {
      newComponent.state = null;
    }
  }
  if (!newComponent.props && component._currentElement && component._currentElement.props) {
    newComponent.props = parseProps(component._currentElement.props)
  }
  //Get key
  if (!newComponent.key && component._currentElement && component._currentElement.key) {
    newComponent.key = component._currentElement.key
  }
  if (!newComponent.ref && component._currentElement && component._currentElement.ref) {
    newComponent.ref = component._currentElement.ref
  }

  //go into children of current component
  const componentChildren = component._renderedChildren
  parentArr.push(newComponent);
  if (componentChildren) {
    const keys = Object.keys(componentChildren)
    keys.forEach(key => {
      traverseAllChildren(componentChildren[key], newComponent.children, sightID)
    })
  }
  else if (component._renderedComponent) {
    traverseAllChildren(component._renderedComponent, newComponent.children, sightID)
  }
}

const parseProps = (props) => {
  //only parse props of current component and not its children
  const parsedProps = {};
  for (let key in props) {
    if (typeof props[key] === 'function') {
      parsedProps[key] = '' + props[key]
    } else if (key === 'children') {
      if (!props[key]) parsedProps[key] = null;
      else if (Array.isArray(props[key])) {
        parsedProps[key] = new props[key].constructor;
        props[key].forEach(child => {
          if (typeof child === 'undefined') return;
          let name = null;
          if (child) {
            name = child
            if (child.type) {
              name = child.type
              if (child.type.name) {
                name = child.type.name
              }
            }
          }
          parsedProps[key].push(name)
        })
      } else if (typeof props[key] === 'string') {
        parsedProps[key] = props[key]
      } else {
        if (props[key].type.displayName) parsedProps[key] = props[key].type.displayName;
        else if (props[key].type.name) parsedProps[key] = props[key].type.name;
      }
    } else if (typeof props[key] === 'object' && key !== 'children') {
      parsedProps[key] = parseProps(props[key])
    } else {
      parsedProps[key] = props[key]
    }
  }
  return parsedProps
}
//listener for initial load
window.addEventListener('reactsight', e => {
  getData()
})
