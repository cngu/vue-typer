var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-typer demo',
      template: 'build/template.index.html',
      filename: '../index.html',
      inject: 'body'
    })
  ]
})