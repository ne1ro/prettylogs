#!/usr/bin/env coffee
# Simple tool for watching JSON logs with prettyjson tool
fs = require 'fs'
prettyjson = require 'prettyjson'
program = require 'commander'

program
  .version '0.0.1'
  .option '-p, --path', 'Log file path'
  .parse process.argv

if program.args.length?
  files = program.args
  throw new Error('Should be specified only one file') if files.length isnt 1

  fs.readFile files[0], (err, data) ->
    throw err if err?

    # Winston logs use newlines instead of commas
    log = data.toString().replace /\n/g, ','
    jsonLogs = JSON.parse "[#{ log[0 ... log.length - 1] }]"
    console.log prettyjson.render(jsonLogs)
else
  program.help()
