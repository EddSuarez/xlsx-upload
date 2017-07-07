/*eslint-disable */
const webpack = require('webpack');
const path = require('path');
const webpackRules = require('./webpack.rules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, '..', 'client/src/app'),
  build: path.resolve(__dirname, '..', 'client/dist'),
  root: path.resolve(__dirname)
};

const vendorEntries = [
  'expose-loader?$!expose-loader?jQuery!jquery',
  'bootstrap-webpack!./config/bootstrap.config.js',
  'font-awesome-webpack!./config/font-awesome.config.js',
  'angular',
  'angular-resource',
  'angular-cookies',
  '@uirouter/angularjs',
  'angular-ui-bootstrap',
  'angular-ui-validate',
  'angular-animate',
  'angular-loading-bar',
  'angular-sanitize',
  'angular-toastr',
  'ng-file-upload'
];

module.exports = {
  entry: {
    app: PATHS.app,
    vendor: vendorEntries
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      nodeModules: path.resolve(__dirname, '..', 'node_modules'),
      src: path.resolve(__dirname, '..', 'client/src'),
      common: path.resolve(__dirname, '..', 'client/src/common'),
      vendor: path.resolve(__dirname, '..', 'client/src/vendor'),
      services: path.resolve(__dirname, '..', 'client/src/components/services')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      moment: 'moment',
      humanizeDuration: 'humanize-duration'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'client/src/index.template.html'),
      title: 'Curio admin',
      meta: {
        keywords: '',
        description: 'Lb base',
        fragment: '!'
      },
      filename: path.resolve(PATHS.build, 'index.html'),
      inject: false,
      favicon: path.resolve(__dirname, '..', 'client/src/favicon.ico'),
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      },
      mobile: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash].js'
    }),
    new CleanWebpackPlugin([PATHS.build], {
      // Without `root` CleanWebpackPlugin won't point to our
      // project and will fail to work.
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
      }
    })
  ],
  module: {
    rules: webpackRules
  },
  devtool: 'cheap-source-map'
};
