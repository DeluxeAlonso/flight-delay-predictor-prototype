var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/**
 * Serialize Sessions
 */
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

/**
 * Deserialize user data
 */
passport.deserializeUser(function (id, done) {
    global.db.User.findById(id).then(function (user) {
        done(null, user);
    })
});

/**
 * Authentication by Local strategy
 */
var localStrategyHandler = function (email, password, done) {
    global.db.User.find({where: {email: email}}).then(function (user) {
        if (!user)
            done(null, false,  'Email no encontrado');
        else if (!user.authenticate(password))
            done(null, false, 'Contraseña incorrecta');
        else if (user.status == 0)
            done(null, false, 'Cuenta no habilitada');
        else
            done(null, user);
    });
};

var localStrategyData = {usernameField: 'email', passwordField: 'password'};
passport.use(new LocalStrategy(localStrategyData, localStrategyHandler));

module.exports = passport;