/* eslint no-unused-vars: 0 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devServer: {
    contentBase: `${__dirname}/chrome-ext/build`,
  },
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
        test: /\.sass$|\.scss$|\.css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/chrome-ext/devtools.html`,
    }),
  ],
};
