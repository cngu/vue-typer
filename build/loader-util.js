var ExtractTextPlugin = require('extract-text-webpack-plugin')
var pathUtil = require('./path-util.js')

var vueTyperStyles = pathUtil.getPathFromRoot('src/vue-typer/styles')
var demoStyles = pathUtil.getPathFromRoot('src/demo/styles')

var cssLoader = 'css-loader?minimize'
var sassLoader = `sass-loader?includePaths[]=${vueTyperStyles}&includePaths[]=${demoStyles}`

module.exports = {
  getCssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return `style-loader!${cssLoader}`
    }
    return ExtractTextPlugin.extract({
      use: cssLoader,
      fallback: 'style-loader'
    })
  },
  getScssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return `style-loader!${cssLoader}!${sassLoader}`
    }
    return ExtractTextPlugin.extract({
      use: [cssLoader, `${sassLoader}`],
      fallback: 'style-loader'
    })
  },
  getVueCssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return `vue-style-loader!${cssLoader}`
    }
    return ExtractTextPlugin.extract({
      use: cssLoader,
      fallback: 'vue-style-loader'
    })
  },
  getVueScssLoader: function() {
    if (process.env.NODE_ENV === 'production') {
      return `vue-style-loader!${cssLoader}!${sassLoader}`
    }
    return ExtractTextPlugin.extract({
      use: [cssLoader, `${sassLoader}`]
    })
  }
}
