var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pathUtil = require('./path-util.js')
var baseWebpackConfig = require('./webpack.config.base')
var baseUglifyConfig = require('./uglify.config.base')

module.exports = merge(baseWebpackConfig, {
  entry: {
    demo: pathUtil.getPathFromRoot('src/demo.js'),
    vendor: 'vue'
  },
  output: {
    filename: '[name].[chunkhash].min.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    // Replace module IDs with the hash of the module pathnames. This solves the issue
    // where module IDs change between builds when code-changes in one bundle and cause
    // other bundles to be re-emitted even if their code hasn't changed, e.g. importing
    // an existing module in app.js causes a new vendor.js bundle to be emitted even if
    // no vendor code has changed, and vice versa. Note that this slightly increases the
    // size of the bundle, as the hashes are longer than IDs.
    // https://github.com/webpack/webpack/issues/1315
    // An alternative is NamedModulesPlugin, but this leaks/exposes the pathnames.
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin(baseUglifyConfig),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-typer demo',
      template: 'build/template.index.html',
      filename: '../index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false
      },
      // Necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})