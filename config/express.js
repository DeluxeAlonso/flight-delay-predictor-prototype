/**
 * Load dependencies
 * ====================================================
 */
var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var flash = require('connect-flash');
var swig = require('swig');
var moment = require('moment');
var minify = require('html-minifier').minify;
var RedisStore = require('connect-redis')(expressSession);
var cors = require('cors');
var device = require('express-device');

module.exports = function (app, passport) {
  /**
   * View engine setup
   * ====================================================
   */
  if (process.env.NODE_ENV === 'production') {
    app.engine('html', function (pathName, locals, cb) {
      function cb_(err, result) {
        var html;
        if (!err) {
          html = minify(result, {
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true
          });
        }
        return cb(err, html);
      }

      return swig.renderFile(pathName, locals, cb_);
    });

  } else {
    app.engine('html', swig.renderFile);
  }

  app.set('views', global.cf.views);
  app.set('view engine', 'html');
  app.set('view cache', false);

  swig.setDefaults({cache: false});
  swig.setFilter('addFilter', function (url, filter) {
    return url.replace('upload/', 'upload/' + filter + '/');
  });

  swig.setFilter('formatDate', function (date) {
    return moment(date).fromNow();
  });

  app.use(cors());

  /**
   * Setup express middlewares
   * ====================================================
   */
  app.use(morgan('dev'));
  app.use(cookieParser('luelennuckyinleDfOfkugGEsErLQQDcS'));

  app.use(expressSession({
    secret: "2x4Zvgd93yMbP,4NQEj4[Qzjqqrq,;n#PynZMawWc",
    resave: false,
    saveUninitialized: false,
    name: 'drokasa-session',
    cookie: {domain: '.' + global.cf.app.domain}
  }));



  app.use(flash());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:500000}));
  app.use(device.capture());

  app.use(express.static(global.cf.public));

  /**
   * Passport initialize
   * ====================================================
   */
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    var ua = req.headers['user-agent'].toLowerCase();
    req.isMobile = /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua);
    req.isFirefox = /firefox/i.test(ua);
    next();
  });

};