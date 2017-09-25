var APP = APP || {};

APP.FlightScreen = function () {
  APP.BaseScreen.call(this, 'flight');
};

APP.FlightScreen.constructor = APP.FlightScreen;
APP.FlightScreen.prototype = Object.create(APP.BaseScreen.prototype);

APP.FlightScreen.prototype.setupUI = function () {
  this.evalBtn = $('.eval-btn');
  this.titleBottom = $('.title-bottom');
  this.footerDiv = $('.footer-container');
  container = ".score-circle";

  this.date = $('.date');
  this.departure = $('.departure');
  this.originAirport = $('.originAirport');
  this.destAirport = $('.destAirport');
  this.flightNumber = $('.flightNumber');
  this.tailNumber = $('.tailNumber');
  this.estimatedTime = $('.estimatedTime');
  this.temp = $('.temp');
  this.skyCondition = $('.skyCondition');
  this.windSpeed = $('.windSpeed');
  this.pressure = $('.pressure');
  this.humidity = $('.humidity');
  this.altimeter = $('.altimeter');
  this.rain = $('.rain');
  this.snow = $('.snow');
  this.fog = $('.fog');
  this.mist = $('.mist');
  this.freezing = $('.freezing');

  this.departure.timepicker({ 'step': 10, 'scrollDefault': 'now', 'timeFormat': 'H:i', 'disableTextInput': true });
  this.setupProgressBar();
};

APP.FlightScreen.prototype.listeners = function () {
  APP.BaseScreen.prototype.listeners.call(this);
  this.originAirport.bind("awesomplete-selectcomplete", this.checkWeatherAvailability.bind(this));
  this.evalBtn.click(this.evalBtnHandler.bind(this));
  this.destAirport.on()
};

APP.FlightScreen.prototype.setupProgressBar = function () {
  this.bar = new ProgressBar.Circle(container, {
	  color: '#aaa',
	  strokeWidth: 4,
	  trailWidth: 1,
	  easing: 'easeInOut',
	  duration: 1400,
	  text: {
	    autoStyleContainer: false
	  },
	  from: { color: '#a4a3bf', width: 1 },
	  to: { color: '#FF0000', width: 4 },
	  step: function(state, circle) {
	    circle.path.setAttribute('stroke', state.color);
	    circle.path.setAttribute('stroke-width', state.width);
	    var value = Math.round(circle.value() * 100);
	    if (value === 0) {
	      circle.setText('');
	    } else {
	      circle.setText(value);
	    }
	  }
	});
  this.bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  this.bar.text.style.fontSize = '2rem';
};

APP.FlightScreen.prototype.checkWeatherAvailability = function () {
  if (this.date.val() != '' && this.departure.val() != '' && this.originAirport.val() != '') {
    this.temp.val('80')
    this.skyCondition.val('BKN')
    this.windSpeed.val('20')
    this.pressure.val('33')
    this.humidity.val('50')
    this.altimeter.val('33')
  }
};

APP.FlightScreen.prototype.evalBtnHandler = function () {
  errors = this.validateFields();
  if (errors.length > 0) {
    alertify.alert("Error",errors[0], function(){
    });
    return
  }
	var scope = this;
  $.ajax({
      url: '/flight_score',
      method: "GET",
      data: {
        date: scope.date.val(),
        departure: scope.departure.val(),
        originAirport: scope.originAirport.val(),
        destAirport: scope.destAirport.val(),
        flightNumber: scope.flightNumber.val() != '' ? scope.flightNumber.val() : 197,
        tailNumber: scope.tailNumber.val(),
        estimatedTime: scope.estimatedTime.val() != '' ? scope.estimatedTime.val() : 120,
        temp: scope.temp.val() != '' ? scope.temp.val() : 80,
        skyCondition: scope.skyCondition.val(),
        windSpeed: scope.windSpeed.val() != '' ? scope.windSpeed.val() : 20,
        pressure: scope.pressure.val() != '' ? scope.pressure.val() : 33,
        humidity: scope.humidity.val() != '' ? scope.humidity.val() : 50,
        altimeter: scope.altimeter.val() != '' ? scope.altimeter.val() : 33,
        rain: scope.rain.is(':checked') == true ? 1 : 0,
        snow: scope.snow.is(':checked') == true ? 1 : 0,
        fog: scope.fog.is(':checked') == true ? 1 : 0,
        mist: scope.mist.is(':checked') == true ? 1 : 0,
        freezing: scope.freezing.is(':checked') == true ? 1 : 0
      }
  }).done(function(response) {
  	  console.log(response.data.score)
      scope.bar.animate(response.data.score);
      if (response.data.score > 0.5) {
        scope.titleBottom.text("El vuelo se retrasará.");
      } else {
        scope.titleBottom.text("El vuelo no se retrasará.");
      }
  	  scope.footerDiv.fadeIn('slow');
  });
};

APP.FlightScreen.prototype.validateFields = function () {
  errors = [];
  if (this.date.val() == '') errors.push("El campo de fecha es obligatorio.");
  if (this.departure.val() == '') errors.push("El campo de hora de despegue es obligatorio.");
  if (this.humidity.val() < 0 || this.humidity.val() > 100) errors.push("El porcentaje de humedad tiene que estar entre 0 y 100.");
  return errors;
};
