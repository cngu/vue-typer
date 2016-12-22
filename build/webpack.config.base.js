var webpack = require('webpack')
var pathUtil = require('./path-util.js')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require('autoprefixer')

module.exports = {
  output: {
    path: pathUtil.getPathFromRoot('dist')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              loader: 'css-loader',
              fallbackLoader: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              loader: ['css-loader', 'sass-loader']
            })
          },
          postcss: [
            autoprefixer({ browsers: ['last 2 versions'] })
          ]
        }
      },
      {
        test: /\.js$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin()
  ]
}