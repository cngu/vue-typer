const { resolve } = require('path')

module.exports = function nuxtVueTyper() {
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-typer.js'
  })
}

module.exports.meta = require('../package.json')
