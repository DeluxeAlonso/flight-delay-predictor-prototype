var crypto = require('crypto');
var moment = require('moment');
var _ = require('lodash');
var jwt = require('jsonwebtoken');

global.generateToken = function (user) {
	console.log(user)
	console.log(process.env.TOKEN_SIGN)
  return jwt.sign(user, process.env.TOKEN_SIGN, {
    expiresIn: "5d"
  });
};

global.generateRefreshToken = function() {
  return crypto.randomBytes(16).toString('base64');
};