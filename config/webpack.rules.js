const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const rules = [
  {
    test: /bootstrap\/js\//,
    use: [
      {
        loader: 'imports-loader',
        options: {
          jQuery: 'jquery'
        }
      }
    ]
  },
  {
    test: /\.js$/,
    use: ['ng-annotate-loader', 'babel-loader'],
    exclude: /node_modules/,
    include: [
      path.resolve(__dirname, '..', 'client/src')
    ]
  },
  {
    test: /\.html$/,
    // you need to exclude your base template
    // (unless you do not want this plugin own templating feature)
    exclude: /index\.template\.html$/,
    loader: 'html-loader'
  },
  {
    test: /\.(jpg|png|ico)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ]
  },
  {
    test: /(en|es)\.json$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'i18n/[name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(css|less)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader?sourceMap']
    })
  }
];

module.exports = rules;
