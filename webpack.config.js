/* eslint no-unused-vars: 0 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './chrome-ext/frontend/devtools.js',
    installHook: './chrome-ext/backend/installHook.js',
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/chrome-ext/build/`,
  },
  // use a load for .jsx and ES6
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
};
