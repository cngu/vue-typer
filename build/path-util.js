var path = require('path')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  getRoot: function() {
    return projectRoot
  },
  getPathFromRoot: function(relativePath) {
    return path.join(projectRoot, relativePath)
  }
}
