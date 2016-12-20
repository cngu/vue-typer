var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: '[name].min.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-typer demo',
      template: 'build/template.index.html',
      filename: '../index.html',
      inject: 'body'
    })
  ]
})