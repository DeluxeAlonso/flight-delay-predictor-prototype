var APP = APP || {};

APP.FlightScreen = function () {
  APP.BaseScreen.call(this, 'flight');
};

APP.FlightScreen.constructor = APP.FlightScreen;
APP.FlightScreen.prototype = Object.create(APP.BaseScreen.prototype);

APP.FlightScreen.prototype.setupUI = function () {
  this.evalBtn = $('.eval-btn');
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
	  from: { color: '#aaa', width: 1 },
	  to: { color: '#a4a3bf', width: 4 },
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

APP.FlightScreen.prototype.listeners = function () {
  APP.BaseScreen.prototype.listeners.call(this);
  this.evalBtn.click(this.evalBtnHandler.bind(this));
};

APP.FlightScreen.prototype.onCalendarChange = function (dates, el) {
  
};

APP.FlightScreen.prototype.evalBtnHandler = function () {
	var scope = this;
  $.ajax({
      url: '/flight_score',
      method: "GET",
      data: {
        date: scope.date.val(),
        departure: scope.departure.val(),
        originAirport: scope.originAirport.val(),
        destAirport: scope.destAirport.val(),
        flightNumber: scope.flightNumber.val(),
        tailNumber: scope.tailNumber.val(),
        estimatedTime: scope.estimatedTime.val(),
        temp: scope.temp.val(),
        skyCondition: scope.skyCondition.val(),
        windSpeed: scope.windSpeed.val(),
        pressure: scope.pressure.val(),
        humidity: scope.humidity.val(),
        altimeter: scope.altimeter.val(),
        rain: scope.rain.is(':checked') == true ? 1 : 0,
        snow: scope.snow.is(':checked') == true ? 1 : 0,
        fog: scope.fog.is(':checked') == true ? 1 : 0,
        mist: scope.mist.is(':checked') == true ? 1 : 0,
        freezing: scope.freezing.is(':checked') == true ? 1 : 0
      }
  }).done(function(response) {
  	  console.log(response.data.score)
      scope.bar.animate(response.data.score);
  	  scope.footerDiv.fadeIn('slow');
  });
};
