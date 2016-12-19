var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    "vue-typer": path.join(projectRoot, 'src/main.js')
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-typer demo',
      filename: path.join(projectRoot, 'index.html')
    })
  ]
}