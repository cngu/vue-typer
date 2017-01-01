var path = require('path')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  getRoot: function() {
    return projectRoot
  },
  getPathFromRoot: function(relativePath) {
    return path.join(projectRoot, relativePath)
  },
  getLibPath: function(project, libName) {
    return path.join(projectRoot, `src/${project}/lib/${libName}/index.js`)
  },
  getPublicImageAssetPath: function() {
    return process.env.NODE_ENV === 'development' ? '/' : 'dist/'
  }
}
