/**
 * Load routers
 * ====================================================
 */

var router = require(global.cf.routes + '/pages');

/**
 * Setup routers
 * ====================================================
 */
exports.init = function (app) {
  app.use('/', router);
};