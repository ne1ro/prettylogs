#!/usr/bin/env node
// Generated by CoffeeScript 1.7.1
(function() {
  var files, fs, prettyjson, program;

  fs = require('fs');

  prettyjson = require('prettyjson');

  program = require('commander');

  program.version('0.0.1').option('-p, --path', 'Log file path').parse(process.argv);

  if (program.args.length != null) {
    files = program.args;
    if (files.length !== 1) {
      throw new Error('Should be specified only one file');
    }
    fs.readFile(files[0], function(err, data) {
      var jsonLogs, log;
      if (err != null) {
        throw err;
      }
      log = data.toString().replace(/\n/g, ',');
      jsonLogs = JSON.parse("[" + log.slice(0, log.length - 1) + "]");
      return console.log(prettyjson.render(jsonLogs));
    });
  } else {
    program.help();
  }

}).call(this);
