require('dotenv').load();

var http = require('http');
var https = require('https');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var path = require("path");
var fs = require('fs');
var swig = require('swig');
global.cf = require('./config/config');
global.db = require('./config/sequelize');
global.utils = require('./config/utils');

/**
 * Setup server configuration and sessions
 * ====================================================
 */
var passport = require('./config/passport');
var app = express();

require('json-response');
require('./config/express')(app, passport);
require('./config/routes').init(app);
require('./config/errors')(app);

global.db.sequelize.sync({force: false}).then(function () {
});

exports = module.exports = server;

var server = http.createServer(app).listen(8080, function () {
  console.log('Express server listening  on http://127.0.0.1:8080');
});
