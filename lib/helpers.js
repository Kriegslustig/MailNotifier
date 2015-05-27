var fs = require('fs')
var _ = require('underscore')

var globalFilePaths = {
  config: '/etc/mail-notifier/',
  data: '~/.mail-notifier/',
  log: '/var/log/'
}

module.exports = {

  // Reads a file
  readFile: function (fileName) {
    return fs.existsSync(fileName) ? fs.readFileSync(fileName, {encoding: 'utf8'}) : false
  },

  // Checks if the package was installed and run globally
  isGlobal: function (command) {
    return (process.argv[0] === 'node' || process.argv[0].substr(-2) === '.js') ? false : true
  },

  // Returns a file path which is either global or local (depending of course on isGlobal())
  getFilePath: function (type, fileName) {
    return this.isGlobal() && globalFilePaths[type] ? globalFilePaths[type] + filename : './' + fileName
  },

  // Returns the JSON.parsed contents of the config file
  getConfig: function () {
    return this.readJSONFile('config', 'config.json', false) || error('No config file found')
  },

  // Resolves a files location and appends a string to that file
  appendToFile: function (fileName, text) {
    fs.writeFileSync(this.getFilePath('data', fileName), text)
  },

  overWriteFile: function (fileName, text) {
    fs.writeFileSync(this.getFilePath('data', fileName), text, {flag: 'w'})
  },

  readJSONFile: function (type, file, fallback) {
    return JSON.parse(this.readFile(this.getFilePath(type, file)) || fallback)
  },

  // Passes a string to errout
  error: function (error) {
    console.error(error)
    return false
  },

  secondIndex: function (array, value) {
    var returnVal = -1
    array.forEach(function (val, ind) {
      if(val[1] == value) return (returnVal = ind, false)
    })
    return returnVal
  },

  firstIndex: function (array, value) {
    return (array[0] == value) ? true : false
  },

  extractAdder: function (str) {
    str = str.split('+')
    return [str[0], (str[1] ? str[1] : 0)]
  },

  // returns a day of the moth (can be over 31)
  formatWeekDay: function (weekDay) {
    var days = [
      ['Sunday', 'sun'],
      ['Monday', 'mon'],
      ['Tuesday', 'tue'],
      ['Wednsday', 'wed'],
      ['Thursday', 'thu'],
      ['Friday', 'fri'],
      ['Saturday', 'sat']
    ]
    var extracted = this.extractAdder(weekDay)
    var adder = (extracted[1] || 0) * 7
    var wantedDayIndex
    var diff
    weekDay = extracted[0]
    wantedDayIndex = this.secondIndex(days, weekDay)
    diff = wantedDayIndex - (new Date()).getDay()
    return ((diff < 1 ? diff + 7 : diff) + adder) * 86400000
  },

  // returns the timestamp of last midnight
  getDateNow: function () {
    return Date.now() - (Date.now() % 86400000)
  },

  // Formats a date to unixtimestamp
  formatDate: function (date) {
    if(!date) return this.getDateNow()
    var dateSplit = date.split('.')
    var year = dateSplit[2] || (new Date()).getFullYear()
    var month = dateSplit[1] || (new Date()).getUTCMonth()
    if(dateSplit.length == 1) return this.getDateNow() + this.formatWeekDay(dateSplit[0])
    return (new Date(year, month, dateSplit[0])).getTime()
  },

  // converts a time to miliseconds [1200, 12.00, 12:00]
  formatTime: function (time) {
    var timeSplit = time.split(':').concat(_.rest(time.split('.')))
    if(timeSplit.length == 1) {
      timeSplit[1] = timeSplit[0].substr(2, 4)
      timeSplit[0] = timeSplit[0].substr(0, 2)
    }
    return (new Date(0, 0, 0, timeSplit[0], timeSplit[1], timeSplit[2])).getTime()

  },

  // Takes a date and a time delimited by a - and formats it as a unixtimestamp
  formatDateTime: function (dateTime) {
    if(dateTime == 'now') return (new Date())()
    var dateTimeSplit = dateTime.split('-')
    var date = this.formatDate(dateTimeSplit[0])
    date += dateTimeSplit[1] ? this.formatTime(dateTimeSplit[1]) : 28800000
    var myDate = new Date()
    myDate.setTime(date)
    return date
  }

}
