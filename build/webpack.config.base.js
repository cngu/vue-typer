var path = require('path')

var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    "vue-typer": path.join(projectRoot, 'src/main.js')
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        enforce: 'pre', 
        test: /\.(js|vue)$/, 
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        },
        include: projectRoot,
        exclude: /node_modules/ 
      }
    ]
  }
}