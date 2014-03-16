$.fn.ychat = function(options) {
  if (YChat.methods[options]) {
    return YChat.methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
  } else if (typeof options === 'object' || !options) {
    return YChat.methods.init.apply(this, arguments);
  } else {
    $.error('Method ' +  options + ' does not exist on jQuery.ychat!!');
  }
};
