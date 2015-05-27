var https = require('https')
var _ = require('underscore')

var h = require('./helpers')

module.exports = {
  send: send
}

var defaultReqOptions = {
  hostname: 'mandrillapp.com',
  method: 'POST',
  port: 443
}
var config = h.getConfig()
var apiPrefix = '/api/1.0/'

function callMandrill (json, path, callback) {
  var req = https.request(_.extend({
    path: path,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': json.length
    }
  }, defaultReqOptions), function(res) {
    if(res.statusCode == '200') callback(true)
  })
  req.write(json)
  req.end()
}

function send (message, callback) {
  var path = apiPrefix + 'messages/send.json'
  var requestJSON = JSON.stringify({
    key: config.mandrillAPIKey,
    message: message
  })
  callMandrill(requestJSON, path, callback)
}