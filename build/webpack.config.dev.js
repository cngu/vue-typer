var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "/"
  },
  // Ideally #eval-source-map, but breakpoints don't work: https://github.com/webpack/webpack/issues/2145
  devtool: '#source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-typer dev server',
      template: 'build/template.index.html',
      inject: 'body'
    })
  ]
})