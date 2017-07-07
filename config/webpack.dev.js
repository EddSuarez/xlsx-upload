const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.base.js');

module.exports = merge(commonConfig, {
  entry: {
    dev: [
      'webpack-dev-server/client?http://localhost:8081',
      'webpack/hot/dev-server'
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
      disable: true,
      allChunks: true
    })
  ],
  devtool: 'eval-source-map'
});
