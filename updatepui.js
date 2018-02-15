#!/usr/bin/env node

// Load Profound.js
var profoundjs = require("profoundjs");

// Apply configuration
var config = require("./config.js");
profoundjs.applyConfig(config);

// Try updating Profound UI
profoundjs.updatepui();
