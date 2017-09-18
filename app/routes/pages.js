var express = require ('express');
var router = express.Router();

var controller = require('../controllers/pages');

router.get('/', controller.flight);

module.exports = router;