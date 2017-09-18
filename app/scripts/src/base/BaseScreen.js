var APP = APP || {};

APP.BaseScreen = function (id) {
  this.id = id;

  this.setupUI();
  this.listeners();
};

APP.BaseScreen.prototype = Object.create(Object.prototype);

APP.BaseScreen.constructor = APP.BaseScreen;
APP.BaseScreen.prototype.setupUI = function () {

};

APP.BaseScreen.prototype.listeners = function () {

};

APP.BaseScreen.prototype.requestHandler = function (url, payload, next, error, free) {
  !free && Utils.checkAuthentication();

    $.ajax({
      url: url,
      method: "POST",
      data: payload,
      xhrFields: {
        withCredentials: false
      }
    }).done(this.requestComplete.bind(this, next, error));

  // $.post(url, payload).then(this.requestComplete.bind(this, next, error));
};

APP.BaseScreen.prototype.requestComplete = function (next, error, response) {
  if (response.status !== 200) {
    var errors = response.data.errors || ['Algo sucedió mal'];
    error && error.bind(this)();
    return this.showFlash('error', errors);
  }
  next.bind(this)(response);
};

APP.BaseScreen.prototype.showFlash = function (meta, data) {
  if (meta === 'error')
    alertify.error(data[0]);
  else
    alertify.success(data);
};

APP.BaseScreen.prototype.getTemplate = function (path) {
  var temp = '';
  if (['followings', 'followers'].indexOf(path) !== -1) temp = 'user';
  if ('portfolio' === path) temp = 'work';
  if ('store' === path) temp = 'product';
  if ('collections' === path) temp = 'collection';
  return temp;
};

APP.BaseScreen.prototype.clean = function () {

};
