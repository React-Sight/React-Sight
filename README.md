# React Sight
<img src="/assets/sidewaylogo4.png" width="300"/>
React Sight is a live view of the component hierarchy tree of your React application with support for React Router and Redux.

## Set Up

1. Run npm install for Right Sight in your root project folder

```
npm install --save-dev react-sight
```
or
```
yarn install --dev react-sight
```

2. ```Import``` Sight where you render your App.


```javascript
import React, { Component } from 'react';
// Add import statement
import Sight from 'react-sight'
```

3. Wrap the ```<Sight>``` component around your application

```
//Wrap <Sight> Component around your application
ReactDOM.render(
  <Sight>
    </App>
  </Sight>
  document.getElementById('root'),
);
```

or

```
//Wrap <Sight> Component around your application
ReactDOM.render(
  <Sight>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </Sight>
  ,
  document.getElementById('root'),
);
```

3. Install the React Sight Chrome Developer Tool from the [Chrome Store](***). 

4. Run your React application in Chrome

5. Open Chrome Developer Tools -> React Sight panel

## Contributing

Please submit issues/pull requests if you have feedback or would like to contribute. If you're interested in joining the React Sight team as a contributor, feel free to message one of us directly.

## Authors

David C Sally (https://github.com/davidcsally)

Grant Kang (https://github.com/Grant05)

William He (https://github.com/hewilliam)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
