var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var pathUtil = require('./path-util')
var loaderUtil = require('./loader-util')

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
        loader: 'eslint-loader',
        include: pathUtil.getPathsFromRoot(['src', 'test']),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: pathUtil.getPathsFromRoot(['src', 'test']),
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
        loader: 'babel-loader',
        include: pathUtil.getPathsFromRoot(['src', 'test'])
      },
      {
        test: /\.css$/,
        loader: loaderUtil.getCssLoader(),
        include: pathUtil.getPathsFromRoot(['src', 'test'])
      },
      {
        test: /\.scss$/,
        loader: loaderUtil.getScssLoader(),
        include: pathUtil.getPathsFromRoot(['src', 'test'])
      },
      {
        test: /\.png$/,
        include: pathUtil.getPathFromRoot('src/demo/assets/images'),
        loader: 'url-loader',
        options: {
          name: '[name].[hash].[ext]',
          limit: 10000,
          publicPath: pathUtil.getPublicImageAssetPath()
        }
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
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

// Only demo builds require ExtractTextPlugin to allow style caching separately from the bundle.
// In the production build, we must bundle the CSS along with the code.
if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new ExtractTextPlugin('[name].[contenthash].min.css'))
}

module.exports = config
