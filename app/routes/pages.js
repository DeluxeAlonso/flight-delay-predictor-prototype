var express = require ('express');
var router = express.Router();

var controller = require('../controllers/pages');

router.get('/', controller.flight);
router.get('/flight_score', controller.findFlightScore);

module.exports = router;