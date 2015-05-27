var _ = require('underscore')

var h = require('./helpers')
var notification = require('./notification')
var mandrill = require('./mandrill')

module.exports = {
  main: main
}

function main (argv) {

  setInterval(checkForNotifiers, 10000)
  setInterval(updateNotifiers, 100000)

  var config = h.getConfig()
  var notifications
  updateNotifiers()

  function updateNotifiers () {
    notifications = notification.read()
  }

  function hasPassed (time) {
    return (new Date).getTime() > time ? true : false
  }

  function notificationDeleter (ind) {
    return function (condition) {
      return condition ? notification.delete(ind) : false
    }
  }

  function checkNotifier (notifier, ind) {
    if(!hasPassed(notifier.date)) return
    mandrill.send(_.omit(notifier, 'date'), notificationDeleter(ind))
    console.log('sending mail: ' + notifier.subject)
  }

  function checkForNotifiers () {
    if(!notifications) return
    notifications.forEach(checkNotifier)
  }

}
