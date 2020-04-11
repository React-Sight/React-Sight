//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2018 React Sight. All rights reserved.

// Array of funny loading messages
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
  'Reticulating Splines',
];

const errorMessage = '<p>Cannot find React<br><br>Triggering a setState() usually fixes this</p><br><br><p>Note: React-Sight works best on local projects with React v15/16</p>';

/**
 * Appends the loading screen with a random quote.
 *
 * The loader is removed when / if the tree is drawn,
 * after data has been received from the inspected page.
 * After 10 seconds, it will show an error, indicating it could not find React's root node
 */
const processLoader = () => {
  // select loader and change message in text node
  const header = document.getElementById('loader-header');
  header.innerHTML = loaderHeaders[Math.floor(Math.random() * loaderHeaders.length)];

  // If React isn't found, notify the user
  setTimeout(() => {
    if (document.getElementById('loader-header')) header.innerHTML = '';
    if (document.getElementById('loader-sub-header')) {
      const subHeader = document.getElementById('loader-sub-header');
      subHeader.innerHTML = errorMessage;
    }
  }, 10000);
};

export default processLoader;
