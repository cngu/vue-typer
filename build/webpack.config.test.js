var webpack = require('webpack')
var merge = require('webpack-merge')
var pathUtil = require('./path-util.js')
var baseConfig = require('./webpack.config.base')

var webpackConfig = merge(baseConfig, {
  resolve: {
    alias: {
      // We want to use the standalone build for tests so we can use the 'template' option
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  // use eval for karma-sourcemap-loader
  devtool: '#eval'
})

module.exports = webpackConfig
