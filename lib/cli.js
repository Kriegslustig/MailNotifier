var h = require('./helpers')
var _ = require('underscore')

// Appends a JSON object to the notifiers file
function addNotifier (date, body, subject) {
  var notificationsFile = 'notifications'
  h.appendToFile(notificationsFile, JSON.stringify(
    h.readJSONFile(notificationsFile, '[]').concat([{
        date: date,
        body: body,
        subject: subject
      }]
    )
  ))
}

module.exports = {
  add: function (argv) {
    if(!argv._[1]) return h.error('Missing argument 1 (date)')
    var date = h.formatDateTime(argv._[1])
    var body = argv.body || 'Notification'
    var subject = argv.subj || date + ' - Notification'
    addNotifier(date, body, subject)
  }
}