/**
 * Provides a set of static methods for working with textual content.
 *
 * @namespace YChat.Content
 */
YChat.Content = {};

/**
 * The default emoticon theme name for YChat.
 *
 * @constant
 */
YChat.Content.EmotTheme = 'yemoticon';

/**
 * Emoticon signs to CSS classes map.
 *
 * @constant
 */
YChat.Content.Emoticons = [
  { pattern: /:\)/, cssClass: 'happy' },
  { pattern: ':D', cssClass: 'very_happy' },
  { pattern: ':(', cssClass: 'sad' },
  { pattern: ':|', cssClass: 'wary' },
  { pattern: /:O/gi, cssClass: 'astonished' },
  { pattern: /:P/gi, cssClass: 'tongue' },
  { pattern: /\(hug\)/gi, cssClass: 'hug' },
  { pattern: /\(bear\)/gi, cssClass: 'hug' },
  { pattern: /\(bg\)/gi, cssClass: 'bulgaria' },
  { pattern: /\(inlove\)/gi, cssClass: 'inlove' },
  { pattern: /:\*/, cssClass: 'kiss' },
  { pattern: /\(h\)/gi, cssClass: 'heart' },
  { pattern: /\(heart\)/gi, cssClass: 'heart' },
  { pattern: /;\)/, cssClass: 'wink' },
  { pattern: /:S/gi, cssClass: 'worried' },
  { pattern: /\(panda\)/gi, cssClass: 'panda' },
  { pattern: /\(devil\)/gi, cssClass: 'devil' },
  { pattern: /\(yes\)/gi, cssClass: 'yes' },
  { pattern: /\(y\)/gi, cssClass: 'yes' },
  { pattern: /\(no\)/gi, cssClass: 'no' },
  { pattern: /\(n\)/gi, cssClass: 'no' }
];

/**
 * Replaces all URLs in html content with html links to these URLs
 *
 * @function linkify
 * @memberof YChat.Content
 * @static
 * @param {string} content
 *    The content to linkify.
 */
YChat.Content.linkify = function (content) {
  var result,
      protocolPattern = 
        /(\b(https?|ftp|file):\/\/\/?[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gim,
      wwwPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
      emailPattern = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

  result = content.replace(protocolPattern, '<a href="$1" target="_blank">$1</a>');
  result = result.replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');
  result = result.replace(emailPattern, '<a href="mailto:$1">$1</a>');

  return result;
};

/**
 * Processes html content and replaces all ocurrences
 * of given emoticons patterns defined in {@link YChat.Content.Emoticons} to
 * html tags with the right css classes.
 *
 * @param {string} content
 *    The html to process and emotify.
 * @param {string} theme
 *    The theme of the emoticons to put - CSS class name.
 *    Can be null for the default - {@link YChat.Content.EmotTheme}.
 */
YChat.Content.emotify = function (content, theme) {
  var i, emoticon, replacement,
      eTheme = (theme ? theme : YChat.Content.EmotTheme);

  for (i = 0; i < YChat.Content.Emoticons.length; i++) {
    emoticon = YChat.Content.Emoticons[i];
    replacement = '<span class="' + eTheme + ' ' + emoticon.cssClass + '"></span>';
    content = content.replace(emoticon.pattern, replacement);
  }

  return content;
};
