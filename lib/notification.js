var h = require('./helpers')
var _ = require('underscore')

var notificationsFile = 'notifications.json'

module.exports = {
  add: function (date, text, subject, recipient) {
    h.appendToFile(notificationsFile, JSON.stringify(
      h.readJSONFile('data', notificationsFile, '[]').concat([{
          date: date,
          text: text,
          subject: subject,
          from_email: 'mandrill@ls7.ch',
          to: [{email: recipient}]
        }]
      )
    ))
  },

  read: function () {
    return h.readJSONFile('data', notificationsFile, false) || h.error('No notifications found') || {}
  },

  delete: function (ind) {
    var curr = this.read()
    curr.splice(ind, 1)
    h.overWriteFile(notificationsFile, JSON.stringify(curr))
  }
}