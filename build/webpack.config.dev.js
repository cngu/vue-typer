var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pathUtil = require('./path-util.js')
var baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  entry: {
    demo: pathUtil.getPathFromRoot('src/demo/index.js'),
    vendor: ['vue', pathUtil.getLibPath('demo', 'bootstrap'), pathUtil.getLibPath('demo', 'prism')]
  },
  output: {
    filename: '[name].js',
    publicPath: "/"
  },
  // Ideally #eval-source-map, but breakpoints don't work: https://github.com/webpack/webpack/issues/2145
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      title: 'vue-typer demo dev server',
      template: 'build/template.index.html',
      inject: 'body'
    })
  ]
})