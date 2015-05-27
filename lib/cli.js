var _ = require('underscore')

var h = require('./helpers')
var notification = require('./notification')

var config = h.getConfig()

module.exports = {
  add: function (argv) {
    if(!argv._[1]) return h.error('Missing argument 1 (date)')
    var date = h.formatDateTime(argv._[1])
    var body = argv.body || 'Notification'
    var subject = argv.subj || date + ' - Notification'
    var recipient = argv.rec || config.defaultRecipient
    notification.add(date, body, subject, recipient)
  }
}