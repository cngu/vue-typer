var ExtractTextPlugin = require('extract-text-webpack-plugin')
var pathUtil = require('./path-util.js')

var vueTyperStyles = pathUtil.getPathFromRoot('src/vue-typer/styles')
var demoStyles = pathUtil.getPathFromRoot('src/demo/styles')

module.exports = {
  getCssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return 'style-loader!css-loader'
    }
    return ExtractTextPlugin.extract({
      loader: 'css-loader',
      fallbackLoader: 'style-loader'
    })
  },
  getVueCssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return 'vue-style-loader!css-loader'
    }
    return ExtractTextPlugin.extract({
      loader: 'css-loader',
      fallbackLoader: 'vue-style-loader'
    })
  },
  getVueScssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return `vue-style-loader!css-loader!sass-loader?includePaths[]=${vueTyperStyles}&includePaths[]=${demoStyles}`
    }
    return ExtractTextPlugin.extract({
      loader: ['css-loader', `sass-loader?includePaths[]=${vueTyperStyles}&includePaths[]=${demoStyles}`]
    })
  }
}
