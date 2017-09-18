var jwt = require('jsonwebtoken');

exports.isLogged = function (req, res, next) {
  console.log('is loggeed : ', req.originalUrl, req.isAuthenticated());

  if (!req.isAuthenticated()) {
    if (req.xhr)
      return res.badRequest(global.lg.isNotLogged);

    var returnTo = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.cookie('return_to', returnTo, {maxAge: 3600000, domain: '.' + global.cf.app.domain});

    req.flash('errorMessage', global.lg.isNotLogged);
    return res.redirect('/auth/login');
  }
  console.log('loggeeeed');
  next();
};

exports.token = function(req, res , next) {
  if (req.isMobile || req.header('test-mobile')) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.badRequest(null, 'token no definido');

    jwt.verify(token, process.env.TOKEN_SIGN, function(err, decoded) {
      if (err)
        return res.send(401, {
                              "status": 401,
                                "data": {},
                              "message": "Error al autenticar el token"
                            });

      req.decoded = decoded;
      var query = {where:{email: decoded.email}};
      return global.db.User.find(query).then(function(user) {
        req.user = user;
        next();
      });
    });
  } else {
    if(!req.user)
      return res.badRequest(null, 'Accesso no autorizado');

    next();
  }
};