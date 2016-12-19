var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    testapp: path.join(projectRoot, 'src/main.js')
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-typer test app',
      filename: 'index.html'
    })
  ]
}