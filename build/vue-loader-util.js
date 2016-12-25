var ExtractTextPlugin = require('extract-text-webpack-plugin')
var pathUtil = require('./path-util.js')

module.exports = {
  getCssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return 'vue-style-loader!css-loader'
    }
    return ExtractTextPlugin.extract({
      loader: 'css-loader',
      fallbackLoader: 'vue-style-loader'
    })
  },
  getScssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return `vue-style-loader!css-loader!sass-loader?includePaths[]=${pathUtil.getPathFromRoot('src/styles')}`
    }
    return ExtractTextPlugin.extract({
      loader: ['css-loader', `sass-loader?includePaths[]=${pathUtil.getPathFromRoot('src/styles')}`]
    })
  }
}
