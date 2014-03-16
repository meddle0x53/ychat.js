/**
 * Represents the main view of application, the one that contains the contact list
 * and is used to open all other views.
 *
 * @constructor
 * @augments YChat.Container
 *
 * @param {object} parentElement {@link YChat.Container}
 * @param {object} options {@link YChat.Container}
 */
YChat.ApplicationView = function (parentElement, options) {
  YChat.Container.call(this, parentElement, $.extend({}, YChat.ApplicationView.Defaults, options));
};

YChat.ApplicationView.prototype = new YChat.Container();
YChat.ApplicationView.constructor = YChat.ApplicationView;

/**
 * Initializes the view.
 * Creates the html of an application view using the options passed to the constructor.
 * Maintains a list of contacts and user options
 *
 * @see YChat.Container#init
 */
YChat.ApplicationView.prototype.init = function () {
  YChat.Container.prototype.init.call(this);

  if (!this.$windowInnerContent.html()) {
    $('<div/>').addClass(YChat.Container.LoadingCssClassName).appendTo(this.$windowInnerContent);
  }

  this.$window.addClass(YChat.ApplicationView.CssClassName);
};

