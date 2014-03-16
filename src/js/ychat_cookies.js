/**
 * Provides a set of static methods for working with cookies.
 * @todo Will be replaced with YStore
 *
 * @namespace YChat.Cookies
 */
YChat.Cookies = {};

/**
 * The cookie name for the main container's satate.
 *
 * @constant
 */
YChat.Cookies.MainContainerViewState = 'main_container_state';

YChat.Cookies.ChatViewsState = 'chat_views_state';

YChat.Cookies.readCookie = function (name) {
  var nameEq = name + '=',
      ca = document.cookie.split(';'),
      i, c;

  for (i = 0; i < ca.length; i++) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEq) === 0) {
      return c.substring(nameEq.length, c.length);
    }
  }

  return null;
};

YChat.Cookies.createCookie = function (name, value, days) {
  var expires,
      date = new Date();

  if (days) {
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }

  document.cookie = name + '=' + value + expires + '; path=/';
};


YChat.Cookies.eraseCookie = function (name) {
  YChat.Cookies.createCookie(name, '', -1);
};
