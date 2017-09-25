var _ = require('lodash');
var request = require('request');

exports.flight = function (req,res){
  global.db.Airport.findAll().then(function(airports) {
    var airportNames = airports.map(function(obj){               
            return obj.name;
    });
    console.log(airportNames)
    return res.render('pages/flight', {
      airports: airportNames
    });
  });
}

exports.findFlightScore = function (req, res) {
  var url = 'http://localhost:3000';
    request({
      hostname: 'localhost',
      url: url,
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
        json:{
        	'date': req.query.date,
    		  'departure': req.query.departure,
    		  'origin': req.query.originAirport,
    		  'destination': req.query.destAirport,
    		  'flightNumber': req.query.flightNumber,
        	'tailNumber': req.query.tailNumber,
        	'estimatedTime': req.query.estimatedTime,
          'temp': req.query.temp,
          'skyCondition': req.query.skyCondition,
          'windSpeed': req.query.windSpeed,
          'pressure': req.query.pressure,
          'humidity': req.query.humidity,
          'altimeter': req.query.altimeter,
          'rain': req.query.rain,
          'snow': req.query.snow,
          'fog': req.query.fog,
          'mist': req.query.mist,
          'freezing': req.query.freezing
			}
    }, function(error, response, body) {
    	return res.ok({score: response.body.score}, 'Flight processed');
    });
}