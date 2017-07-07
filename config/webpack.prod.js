const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const config = require('./webpack.base.js');

module.exports = merge(config, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      drop_console: true,
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
      disable: false,
      allChunks: true
    })
  ]
});

