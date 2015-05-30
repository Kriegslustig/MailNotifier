var https = require('https')
var _ = require('underscore')

var h = require('./helpers')

module.exports = {
  send: send,
  sendFormat: sendFormat
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

function sendFormat (date, text, subject, recipient) {
  var tmp = new Date
  send({
    send_at: date,
    text: text,
    subject: subject,
    from_email: 'mandrill@ls7.ch',
    to: [{email: recipient}]
  }, function () {
    console.log('Notifier set! Will trigger at ' + (tmp.setTime(date*1000) && tmp))
  })
}