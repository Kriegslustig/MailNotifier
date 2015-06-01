var read = require('read')
var fs = require('fs')

var h = require('./lib/helpers')

function mandrillQuerier (callback) {
  return function () {
    read({
      prompt: 'This module uses [Mandrill](mandrillapp.com)\n\
Enter an API-key:'
    }, function (err, data) {
      config.add('mandrillAPIKey', data)
      callback()
    })
  }
}

function mailQuerier (callback) {
  return function () {
    read({
      prompt: 'What email should I send the notifications to?'
    }, function (err, data) {
      config.add('defaultRecipient', data)
      callback()
    })
  }
}

var config = (function () {
  var config = {
    'mandrillAPIKey': false,
    'defaultRecipient': false
  }
  return {
    add: function (key, value) {
      if(config[key] === false) return config[key] = value
      return false
    },
    writer: function (filepath) {
      return function () {
        fs.mkdirSync(h.getFilePath('config', true))
        h.overwriteFile(filepath, config)
        return true
      }
    }
  }
})()

mandrillQuerier(mailQuerier(config.writer('config.json')))()
