#!/usr/bin/env node

// Load Profound.js
var profoundjs = require("profoundjs");

// Apply configuration
var config = require("./config.js");
profoundjs.applyConfig(config);

// Process command line parameters
profoundjs.rlog = process.argv.includes("-rlog");
profoundjs.tlog = process.argv.includes("-tlog");
var login = process.argv.includes("-login");
  
var moduleName = process.argv[2];
if (moduleName == null) {
	console.log("You must specify a module.");
	return;
}

var parms = [];
for (var i = 3; i < process.argv.length; i++) {
  var arg = process.argv[i];
  if (arg.startsWith("-")) continue;
  parms.push(arg);
}

// Call module
profoundjs.commandLineCall(moduleName, parms, login);
