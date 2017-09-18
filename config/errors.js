module.exports = function (app) {
    /**
     * Catch and set response status to 404
     * ====================================================
     */
    app.use(function (req, res, next) {
        res.status(404);
        return res.render('errors/404');
    });
    
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
};
