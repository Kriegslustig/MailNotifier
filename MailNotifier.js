#!/usr/bin/env node

var fs = require('fs')

var _ = require('underscore')

var helpers = require('./lib/helpers')
var deamon = require('./lib/deamon')
var cli = require('./lib/cli')

; (function main (argv) {
  var action = argv._[0]
  if(action == 'deamon') deamon.main()
  if(action == 'add') cli.add()
})(require('optimist').argv)