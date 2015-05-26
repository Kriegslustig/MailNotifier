var _ = require('underscore')

var globalFilePaths = {
  config: '/etc/mail-notifier/',
  data: '~/.mail-notifier/'
}

module.exports = {

  readFile: function (fileName) {
    return fs.existsSync(fileName) ? fs.readFileSync(fileName, {encoding: 'utf8'}) : false
  },

  isGlobal: function (command) {
    return process.argv[0] === 'node' ? false : true
  },

  getFilePath: function (type, fileName) {
    return isGlobal() && globalFilePaths[type] ? globalFilePaths[type] + filename : './' + fileName
  },

  readConfigFile: function () {
    return readFile(getConfigFilePath('config.json')) || (console.error('No config file found') && false)
  },

  getConfig: function () {
    var config = readConfigFile()
    return config ? JSON.parse(config) : false
  }
}