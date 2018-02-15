#!/usr/bin/env node

// Load Profound.js
var profoundjs = require("profoundjs");

// Process command line arguments
profoundjs.rlog = process.argv.includes("-rlog");
profoundjs.tlog = process.argv.includes("-tlog");

// Apply configuration
var config = require("./config.js");
profoundjs.applyConfig(config);

// Start Profound.js server
var isWorker = profoundjs.server.listen();
if (isWorker) {

  // This is the top-level Express Application.
  // Custom Express coding can be added here.
  var express = profoundjs.server.express;
  var app = profoundjs.server.app;
  app.use(express.json());  // default to use JSON-encoded post data
  
  app.get("/prodorders/:id", profoundjs.express("myapp/prodorders"));
  app.get("/genprodinfo/:id", profoundjs.express("myapp/genprodinfo"));
}
