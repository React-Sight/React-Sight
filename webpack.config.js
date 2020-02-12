/* eslint no-unused-vars: 0 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  devtool: 'cheap-source-map',

  entry: {
    bundle: './extension/frontend/devtools.js',
    installHook: './extension/backend/installHook.js',
  },

  output: {
    filename: '[name].js',
    path: `${__dirname}/build/extension`,
  },

  module: {
    rules: [
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
      { from: 'extension/manifest.json', to: '../extension/manifest.json' },
      { from: 'extension/content-script.js', to: '../extension/content-script.js' },
      { from: 'extension/background.js', to: '../extension/background.js' },
      { from: 'extension/devtools.html', to: '../extension/devtools.html' },
      { from: 'extension/asset/', to: '../extension/asset/' },
    ]),
  ],
};
