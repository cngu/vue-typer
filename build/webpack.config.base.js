var path = require('path')
var webpack = require('webpack')

var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    'vue-typer': path.join(projectRoot, 'src/main.js')
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
        include: projectRoot,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        include: projectRoot,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // Required for vue-loader: http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}