/// **************
/// **** MAIN ****
/// **************

// Detect if NPM module is present
var moduleDetection;

if (window._REACTSIGHTATTACHED) moduleDetection = true;
else moduleDetection = false;

// Traverse the vDOM if NPM module is not detected
if (!window._REACTSIGHTATTACHED) {

  // GET the react components
  var reactRoot = document.querySelector("[data-reactroot]");

  // get the vDOM
  var vDOM = reactRoot[Object.getOwnPropertyNames(reactRoot)[0]];

  // go to top of vDOM
  let topDOM;
  toTheTop(vDOM);

  console.log('****************');
  console.log('I N J E C T E D  S C R I P T ');
  console.log('N P M  M O D U L E  P R E S E N T ? ', window._REACTSIGHTATTACHED);
  console.log('window', window);
  console.log('ROOT', reactRoot);
  console.log('vDOM: ', vDOM);
  console.log('TOP', topDOM);
  console.log('****************');

  window.addEventListener('reactsight', e => {
    vDomTraverse();
    // setInterval(vDomTraverse, 2000);
  });
}

// ###############
// ## FUNCTIONS ##
// ###############

/** Traverse React entry point to top most container */
function toTheTop(component) {
  if (component._currentElement) {
    if (component._currentElement._owner) {
      topDOM = component._currentElement._owner
      toTheTop(component._currentElement._owner)
    }
  }
}

/** Traverse's React's virtual DOM */
function vDomTraverse(components = []) {
  console.log('#vDomTraverse')
  // const dom = this._reactInternalInstance._renderedComponent._renderedChildren['.0']
  recursiveTraverse(topDOM, components)
  const data = { data: components, store: this.store }
  console.log('$$$$$$$$$$$$$$$$$$')
  console.log('SENDING: ', data)
  console.log('$$$$$$$$$$$$$$$$$$')
  window.postMessage(JSON.parse(JSON.stringify(data)), '*')
}

function parseProps(currentComponent) {
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

/** Recursively goes through each React / DOM node */
function recursiveTraverse(component, parentArr) {
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


  // Get ID
  if (component._domID) newComponent.id = component._domID
  else newComponent.id = component._mountOrder * 100

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
      recursiveTraverse(componentChildren[key], newComponent.children)
    })
  }
  else if (component._renderedComponent) {
    recursiveTraverse(component._renderedComponent, newComponent.children)
  }
};