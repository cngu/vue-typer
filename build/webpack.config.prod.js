var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pathUtil = require('./path-util')
var baseWebpackConfig = require('./webpack.config.base')
var baseUglifyConfig = require('./uglify.config.base')

var packageJson = require('../package.json')
var nameAndVersion = packageJson.name + ' v' + packageJson.version
var copyright = 'Copyright 2016-' + new Date().getFullYear() + ' ' + packageJson.author
var license = 'Released under the ' + packageJson.license + ' license.'
var bannerComment = nameAndVersion + '\n' + copyright + '\n' + license

module.exports = merge(baseWebpackConfig, {
  entry: {
    'vue-typer': pathUtil.getPathFromRoot('src/vue-typer/index.js')
  },
  output: {
    filename: '[name].min.js',
    library: 'VueTyper',
    libraryTarget: 'umd'
  },
  // devtool: '#source-map',
  plugins: [
     // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.optimize.UglifyJsPlugin(baseUglifyConfig),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin(bannerComment)
  ]
})