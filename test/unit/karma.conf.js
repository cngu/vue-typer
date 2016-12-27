var webpack = require('webpack')
var merge = require('webpack-merge')
var pathUtil = require('../../build/path-util.js')

var baseConfig = require('../../build/webpack.config.base')
var webpackConfig = merge(baseConfig, {
  // use eval for karma-sourcemap-loader
  devtool: '#eval'
})

// Insert isparta loader
var vueTestSource = /\.vue$/.source
var vueLoader = 'vue-loader'
webpackConfig.module.rules.some(function(rule) {
  if (rule.test.source === vueTestSource && rule.loader === vueLoader) {
    rule.options.loaders.js = 'isparta-loader'
    return true
  }
})

// make sure isparta loader is applied before eslint
webpackConfig.module.rules.unshift({
  enforce: 'pre',
  test: /\.js$/,
  loader: 'isparta-loader',
  include: pathUtil.getPathFromRoot('src')
})

// only apply babel for test files when using isparta
webpackConfig.module.rules.some(function(loader, i) {
  if (loader.loader === 'babel-loader') {
    loader.include = pathUtil.getPathFromRoot('test/unit')
    return true
  }
})

module.exports = function(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
