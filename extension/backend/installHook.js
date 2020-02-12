//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

/* eslint brace-style: off, camelcase: off, max-len: off, no-prototype-builtins: off, no-restricted-syntax: off, consistent-return: off, no-inner-declarations: off */

import { traverse16 } from './fiber-hook';
import { getData } from './react-15-hook';

var __ReactSightDebugMode = (process.env.NODE_ENV === 'debug');

// Notes... might need additional testing..renderers provides a list of all imported React instances
var __ReactSightHasRun; // memoize installing the hook

if (!__ReactSightHasRun) {
  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) console.warn('[React-Sight]: React Sight requires React Dev Tools to be installed.');
  const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers || null;
  const instance = reactInstances.get(1);
  // const reactRoot = window.document.body.childNodes;
  const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  // grab the first instance of imported React library

  let __ReactSightThrottle = false;
  let __ReactSightFiberDOM;
  let __ReactSight_ReactVersion;

  // locate instance of __REACT_DEVTOOLS_GLOBAL_HOOK__
  // __REACT_DEVTOOLS_GLOBAL_HOOK__ exists if React is imported in inspected Window

  /**
   * Begin monkey patch
   *
   *  IF __REACT_DEVTOOLS_GLOBAL_HOOK__ NOT present, assume website is not using React
   *  IF React 16 detected, patch 'onCommitFiberRoot' from react dev tools
   *  ELSE Patch React 15 (or lowers) reconciler method
   */
  /*eslint-disable */
  (function installHook() {
    // no instance of React detected
    if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      console.log('Error: React DevTools not present. React Sight uses React DevTools to patch React\'s reconciler');
      return;
    }
    // React fiber (16+)
    if (instance && instance.version) {
      __ReactSight_ReactVersion = instance.version;
      if (__ReactSightDebugMode) console.log('version: ', __ReactSight_ReactVersion);
      devTools.onCommitFiberRoot = (function (original) {
        return function (...args) {
          __ReactSightFiberDOM = args[1];
          if (__ReactSightDebugMode) console.log('DOM: ', __ReactSightFiberDOM);
          traverse16(__ReactSightFiberDOM);
          return original(...args);
        };
      })(devTools.onCommitFiberRoot);
    }
    // React 15 or lower
    else if (instance && instance.Reconciler) {
      // hijack receiveComponent method which runs after a component is rendered
      instance.Reconciler.receiveComponent = (function (original) {
        return function (...args) {
          if (!__ReactSightThrottle) {
            __ReactSightThrottle = true;
            setTimeout(() => {
              getData(instance);
              __ReactSightThrottle = false;
            }, 10);
          }
          return original(...args);
        };
      })(instance.Reconciler.receiveComponent);
    }
    else console.log('[React Sight] React not found');
  })();
  /* eslint-enable */

  // listener for initial load
  if (instance) {
    window.addEventListener('reactsight', () => {
      if (parseInt(__ReactSight_ReactVersion, 10) >= 16) traverse16(__ReactSightFiberDOM);
      else getData(instance);
    });
  }
  __ReactSightHasRun = true;
}
