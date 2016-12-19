var path = require('path')

var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    testapp: path.join(projectRoot, 'src/main.js')
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].js'
  }
}