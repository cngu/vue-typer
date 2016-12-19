var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
      inject: 'body',
      templateVars: {
        title: 'vue-typer demo'
      }
    })
  ]
})