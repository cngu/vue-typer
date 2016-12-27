var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var pathUtil = require('./path-util.js')
var loaderUtil = require('./loader-util.js')

const config = {
  output: {
    path: pathUtil.getPathFromRoot('dist')
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: loaderUtil.getVueCssLoader(),
            scss: loaderUtil.getVueScssLoader()
          },
          postcss: [
            autoprefixer({ browsers: ['last 2 versions'] })
          ]
        }
      },
      {
        test: /\.js$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: loaderUtil.getCssLoader()
      },
      {
        test: /\.scss$/,
        include: pathUtil.getRoot(),
        exclude: /node_modules/,
        loader: loaderUtil.getScssLoader()
      }
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
}

// Only demo builds require ExtractTextPlugin to allow style caching separately from the bundle.
// In the production build, we must bundle the CSS along with the code.
if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new ExtractTextPlugin('[name].[contenthash].css'))
}

module.exports = config