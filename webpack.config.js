/* eslint no-unused-vars: 0 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  devServer: {
    contentBase: `${__dirname}/chrome-ext/build`,
  },

  entry: {
    bundle: './chrome-ext/frontend/devtools.js',
    installHook: './chrome-ext/backend/installHook.js',
  },

  output: {
    filename: '[name].js',
    path: `${__dirname}/build/chrome-ext`,
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass$|\.scss$|\.css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader',
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      // {output}/to/file.txt
      { from: 'chrome-ext/manifest.json', to: '../chrome-ext/manifest.json' },
      { from: 'chrome-ext/content-script.js', to: '../chrome-ext/content-script.js' },
      { from: 'chrome-ext/background.js', to: '../chrome-ext/background.js' },
      { from: 'chrome-ext/devtools.html', to: '../chrome-ext/devtools.html' },
      { from: 'chrome-ext/asset/', to: '../chrome-ext/asset/' },
    ]),
  ],
};
