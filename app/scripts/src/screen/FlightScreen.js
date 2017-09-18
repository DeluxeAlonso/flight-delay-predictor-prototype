var APP = APP || {};

APP.FlightScreen = function () {
  APP.BaseScreen.call(this, 'flight');
};

APP.FlightScreen.constructor = APP.FlightScreen;
APP.FlightScreen.prototype = Object.create(APP.BaseScreen.prototype);

APP.FlightScreen.prototype.setupUI = function () {
  this.evalBtn = $('.eval-btn');
  container = ".score-circle";
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
	  to: { color: '#333', width: 4 },
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

APP.FlightScreen.prototype.evalBtnHandler = function () {
  this.bar.animate(1);
};
