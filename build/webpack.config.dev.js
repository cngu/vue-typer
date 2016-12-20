var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-typer dev server',
      template: 'build/template.index.html',
      inject: 'body'
    })
  ]
})