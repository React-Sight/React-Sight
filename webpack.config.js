const path = require('path');
const webpack = require('webpack');
const WebpackMonitor = require('webpack-monitor');

module.exports = {
  entry: './chrome-ext/frontend/devtools.js',
  output: {
    filename: './chrome-ext/build/bundle.js',
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
  plugins: [
    new WebpackMonitor({
      capture: true,
      launch: true,
    }),
  ],
};
