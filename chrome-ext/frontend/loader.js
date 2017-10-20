//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

const loaderHeaders = [
  'Centering divs...',
  'Calibrating the DOM...',
  'Concatenating strings...',
  'Too much recursion...',
  'Adding Hidden Agendas...',
  'Hijacking setState...',
  'Asserting semicolons...',
  'Fixing bugs in D3...',
  'Adjusting Linter...',
  'Removing console logs...',
  'Extracting sensitive user information...',
  'Deleting all node modules...',
  'Gathering components...',
  'Initializing content-scripts...',
];

function processLoader() {
  // console.log('...processing loader');
  const header = document.getElementById('loader-header');
  header.innerHTML = loaderHeaders[Math.floor(Math.random() * loaderHeaders.length)];

  setTimeout(() => {
    const subHeader = document.getElementById('loader-sub-header');
    subHeader.innerHTML = 'Cannot find imported React library';
  }, 10000);
}

export default processLoader;
