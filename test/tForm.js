var assert = require('assert')
var tForm = require('../lib/tForm')

describe('tForm', function () {

  describe('daysToMS', function () {
    it('should convert days to ms', function () {
      assert.equal(0, tForm.daysToMS(0))
      assert.equal(86400000, tForm.daysToMS(1))
      assert.equal(86400000 * 3, tForm.daysToMS(3))
    })
  })

  describe('makeDate', function () {
    it('should take miliseconds UTC and return a dateobject', function () {
      assert.ok(tForm.makeDate(0).getTime)
      assert.ok(tForm.makeDate(86400000).getTime)
    })
  })

  describe('getNthDay', function () {
    it('should return the nth day counting from 0 and sunday', function () {
      assert.equal(4, tForm.getNthDay(0))
      assert.equal(5, tForm.getNthDay(86400000))
      assert.equal(6, tForm.getNthDay(86400000 * 2))
      assert.equal(0, tForm.getNthDay(86400000 * 3))
    })
  })

  describe('unnormalize', function () {
    it('should return the passed time plus the offset', function () {
      var currentOffset = (new Date).getTimezoneOffset() * 60 * 1000
      assert.equal(currentOffset, tForm.unnormalize(0))
    })
  })

  describe('threeLetterFormat', function () {
    it('Should take now as an argument and then return 0', function () {
      assert.equal(0, tForm.threeLetterFormat('now'))
    })
    it('Should return miliseconds from last midnight to midnight on the passed day', function () {
      assert.equal(86400000, tForm.threeLetterFormat('fri', 0))
      assert.equal(86400000 * 7, tForm.threeLetterFormat('thu', 0))
      assert.equal(86400000 * 6, tForm.threeLetterFormat('wed', 0))
    })
  })
  describe('formatDay', function () {
    it('should return three lowercase letters', function () {
      assert.equal('aaa', tForm.formatDay('AAAa'))
    })
  })

  describe('time', function () {
    it('Should be able to parse hh.mm[.ss]', function () {
      assert.equal(3600000, tForm.time('01.00'))
      assert.equal(3600000, tForm.time('01.00.00'))
    })
    it('Should be able to parse hh:mm[:ss]', function () {
      assert.equal(3600000, tForm.time('01:00'))
      assert.equal(3600000, tForm.time('01:00:00'))
    })
    it('Should be able to parse hhmm[ss]', function () {
      assert.equal(3600000, tForm.time('0100'))
    })
  })

  describe('date', function () {
    it('should be able to parse dd.mm', function () {
      assert.ok(tForm.date('01.01'))
    })
  })

  describe('year', function () {
    it('should return the current year plus one if the date has passed', function () {
      var today = new Date
      assert.equal(today.getUTCFullYear() + 1, tForm.year(1, 1))
    })
    it('should return the current year if the date hasn\'t passed', function () {
      var today = new Date
      assert.equal(today.getUTCFullYear(), tForm.year(today.getUTCDate() + 1, today.getUTCMonth()))
    })
  })

  describe('()', function () {})
})