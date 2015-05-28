// tForm is short for "Time Format" and provides a function to format dates and time in various ways

var _ = require('underscore')

var tForm = function () {
}

var extend = {

daysToMS: function (nDays) {
  return (nDays * 86400000)
},

makeDate: function (timestamp) {
  var date = new Date
  date.setTime(timestamp)
  return date
},

getNthDay: function (timestamp) {
  console.log(timestamp)
  return this.makeDate(timestamp).getDay()
},

formatDay: function (str) {
  return str.toLowerCase().substr(0, 3)
},

threeLetterFormat: function (day, currUTC) {
  var weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  if(day == 'now') return 0
  day = weekDays.indexOf(day) - this.getNthDay(currUTC)
  return this.daysToMS(day < 1 ? day + 7 : day)
},

unnormalize: function (timestamp) {
  return timestamp + (new Date).getTimezoneOffset() * 60 * 1000
},

time: function (timeStr) {
  var ctimeStr = timeStr.replace(':', '').replace('.', '')
  var hours = parseInt(ctimeStr.substr(0, 2))
  var minutes = parseInt(ctimeStr.substr(2).substr(0, 2))
  var seconds = parseInt(ctimeStr.substr(2).substr(0, 2) || 0)
  return (hours * 3600000) + (minutes * 60000) + (seconds * 1000)
}

}
module.exports = _.extend(tForm, extend)