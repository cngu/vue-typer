var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pathUtil = require('./path-util.js')
var baseWebpackConfig = require('./webpack.config.base')
var baseUglifyConfig = require('./uglify.config.base')

module.exports = merge(baseWebpackConfig, {
  entry: {
    'vue-typer': pathUtil.getPathFromRoot('src/index.js')
  },
  output: {
    filename: '[name].min.js',
    library: 'VueTyper',
    libraryTarget: 'umd'
  },
  devtool: '#source-map',
  plugins: [
     // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.optimize.UglifyJsPlugin(baseUglifyConfig),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})