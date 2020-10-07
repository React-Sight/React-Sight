[![Coverage Status](https://coveralls.io/repos/github/React-Sight/React-Sight/badge.svg?branch=master)](https://coveralls.io/github/React-Sight/React-Sight?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/a7c8e7cd0346c45cc7c6/maintainability)](https://codeclimate.com/github/React-Sight/React-Sight/maintainability)
[![Build Status](https://travis-ci.org/React-Sight/React-Sight.svg?branch=master)](https://travis-ci.org/React-Sight/React-Sight)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/aalppolilappfakpmdfdkpppdnhpgifn.svg)](https://chrome.google.com/webstore/detail/react-sight/aalppolilappfakpmdfdkpppdnhpgifn)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/aalppolilappfakpmdfdkpppdnhpgifn.svg)](https://chrome.google.com/webstore/detail/react-sight/aalppolilappfakpmdfdkpppdnhpgifn)
![Mozilla Add-on](https://img.shields.io/amo/v/react-sight)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

_**Note: project isn't actively maintained. If you would like to maintain, feel free to submit PRs or reach out to @davidcsally**_
_**I also suggest installing it as click-to-run or inside its own chrome profile, so that it doesn't slow down regular browsing**_


# React Sight
<img src="/assets/sidewaylogo4.png" width="300"/>
<br />

React Sight is a live view of the component hierarchy tree of your React application with support for React Router and Redux. _Now with support for Firefox!_

<br/>
<p align="center">
  <img src="/assets/testingDEMO.gif">
</p>
<br/>


## Set Up | Install From the Chrome Store

1. Make sure you've added [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to Chrome. 
1. Install [React Sight](https://chrome.google.com/webstore/detail/react-sight/aalppolilappfakpmdfdkpppdnhpgifn) from the Chrome web store
1. If you are running local file URLs, make sure to enable "Allow access to file URLs" in the extension settings for both React Dev Tools and React Sight
1. Run your React application, or open (almost!) any website running React!
1. Open Chrome Developer Tools (cmd+opt+j) -> React Sight panel

## Set Up |  Firefox
This is the same as Chrome, except you will use the addons from the Firefox website

1. Add [React Dev Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/?src=search)
1. Add [React Sight](https://addons.mozilla.org/en-US/firefox/addon/react-sight/) from the Firefox addons website. 

## Building Your Own Version

If you'd like to build your own version of React Sight from the source code, follow these steps:

1. Clone the repo and run `yarn install` or `npm install` to install dependencies.
1. Use `yarn build` to generate the build.

### Adding to Chrome
1. Open Chrome and go to the extensions page
1. Toggle developer mode in the upper right corner if necessary
1. Click 'Load unpacked'
1. Load the folder `~/ReactSight/build/extension`

### Firefox 

1. Load the extension as a "Temporary Extension" by navigating to: `about:debugging#/runtime/this-firefox`
1. Click "Load Temporary Add-on"
1. Load the file `~/ReactSight/build/extension/manifest.json`. In Firefox, you load the extension's manifest instead of the extension's folder

If you have any additional questions send us a message at reactsight@gmail.com :)

## Usage

Hover over nodes to see their state and props in the side panel. 

Hide DOM elements, Redux components, and Router components with the built in filters, so that you can focus only on the components you've written

Zoom in by double clicking, and zoom out by shift + double clicking (mousewheel zoom coming soon!)

## Why?

We built React Sight because there are no tools on the market that give you a visual representation of the structure of your App. When we were developing our own projects, we wished we had a way to see how everything was structured.

We wanted React Sight to be simple to use, which is why all you have to do is install a Chrome extension. No modifying your existing code!

## How Does It Work?

When the dev tools are opened, React-Sight searches for React renderer's, and patches the render to collect data on each state change.

Data is posted to the Window, where it is read by Chrome's background.js window, and is then relayed to React-Sight's devTools page.

The raw data is then processed and fed to D3, where it is displayed to the user.

## Troubleshooting

***In React16 you will need to trigger a render to have your application show up. The data is not exposed until React's renderer is called.***

'React not found' or no data:

Sometimes React-Sight doesn't get a snapshot of the data at load, triggering a setState ussually fixes this

Maximum call stack exceeded and other console errors:

This is a bug where the parsing functions get stuck in an infinite loop. We are working on a fix.

## Testing

Run `yarn test` to run the test suite. Tests are run using `jest`.

## Contributing

Found a bug? Have a suggestion? Want to make React-Sight better?

Please submit issues/pull requests if you have feedback or would like to contribute. If you're interested in joining the React Sight team as a contributor, feel free to message one of us directly, or just start submitting pull requests!

## Authors

David C Sally (https://github.com/davidcsally)

Grant Kang (https://github.com/Grant05)

William He (https://github.com/hewilliam)

## Contact

Like our app? Found a bug? 

Tell us what you think!

reactsight@gmail.com

Visit us at www.reactsight.com

## Roadmap 

Here's our top development priorities

1. Better support across on React 16+.
1. More consistent detection of root nodes when React Sight is opened.
1. Support for multiple React Applications / mounting nodes, currently it picks the first React application in the renderers list.
1. More robust error handling and guard blocks for extracting state, props, and store
1. Logging / Debugging mode for development, feedback, and error reporting
1. Performance and stability updates
1. UX improvements
1. Improved documentation
1. Hook into the react-devtools-backend so that we don't have to reimplement it :)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
