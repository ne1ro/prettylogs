#!/usr/bin/env node
"use strict";

var fs = require('fs'),
  prettyjson = require('prettyjson'),
  program = require('commander');

program
  .version('0.0.2')
  .parse(process.argv);

if (program.args.length) {
  var file = program.args[0];

  fs.readFile(file, function (err, data) {
    if (err) {
      throw err;
    }

    // Fix JSON logs with commas
    var log = data
      .toString()
      .replace(/\n/g, ',')
      .slice(0, -1); // remove last comma

    // Wrap logs data in JSON array
    var jsonLogs = JSON.parse('[' + log + ']');
    console.log(prettyjson.render(jsonLogs));
  });

} else {
  program.help();
}
