// tForm is short for "Time Format" and provides a function to format dates and time in various ways

var _ = require('underscore')

var tForm = function (tString) {
  var tStringSplit = tString.split('-')
  var time = (tStringSplit.length === 2) ? extend.time(tStringSplit[0]) : 0
  return extend.formatDate(tStringSplit[1] || tStringSplit[0]) + time
}

var extend = {

formatDate: function (dateStr) {
  return dateStr.match(/\w{3}/g) ? this.threeLetterFormat(dateStr, Date.now()) : this.date(dateStr)
},

midnight: function (timestamp) {
  return timestamp - timestamp % this.daysToMS(1)
},

daysToMS: function (nDays) {
  return (nDays * 86400000)
},

makeDate: function (timestamp) {
  var date = new Date
  date.setTime(timestamp)
  return date
},

getNthDay: function (timestamp) {
  return this.makeDate(timestamp).getDay()
},

formatDay: function (str) {
  return str.toLowerCase().substr(0, 3)
},

threeLetterFormat: function (day, currUTC) {
  var weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  if(day == 'now') return Date.now()
  day = weekDays.indexOf(day) - this.getNthDay(currUTC)
  return currUTC + this.daysToMS(day < 1 ? day + 7 - 1 : day - 1)
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
},

year: function (day, month) {
  var today = new Date
  var thisYear = today.getUTCFullYear()
  var next = !!((new Date(thisYear, day, month)).getTime() < today.getTime())
  return thisYear + (next ? 1 : 0)
},

date: function (dateStr) {
  var day = parseInt(dateStr.split('.')[0])
  var month = parseInt(dateStr.split('.')[1]) - 1
  var year = this.year(day, month)
  return (new Date(year, month, day)).getTime()
}

}

module.exports = _.extend(tForm, extend)