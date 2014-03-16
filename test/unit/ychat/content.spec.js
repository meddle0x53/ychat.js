'use strict';

describe('YChat.Content', function () {
  describe('YChat.Content.linkify', function () {
    it('turns http urls to links', function () {
      var text = 'This is my http://www.some.bg link!',
          res = YChat.Content.linkify(text);

      expect(res).not.toBeNull();
      expect(res).toContain('<a');
      expect(res).toContain('target="_blank"');
      expect(res).toContain('href="http://www.some.bg"');
      expect(res).toContain('>http://www.some.bg</a>');
      expect(res).toEqual('This is my <a href="http://www.some.bg" target="_blank">http://www.some.bg</a> link!');
    });

    it('turns https urls to links', function () {
      var text = 'This is my https://some.bg link!',
          res = YChat.Content.linkify(text);

      expect(res).not.toBeNull();
      expect(res).toContain('<a');
      expect(res).toContain('target="_blank"');
      expect(res).toContain('href="https://some.bg"');
      expect(res).toContain('>https://some.bg</a>');
      expect(res).toEqual('This is my <a href="https://some.bg" target="_blank">https://some.bg</a> link!');
    });

    it('turns ftp urls to links', function () {
      var text = 'This is my ftp://some.bg link!',
          res = YChat.Content.linkify(text);

      expect(res).not.toBeNull();
      expect(res).toContain('<a');
      expect(res).toContain('target="_blank"');
      expect(res).toContain('href="ftp://some.bg"');
      expect(res).toContain('>ftp://some.bg</a>');
      expect(res).toEqual('This is my <a href="ftp://some.bg" target="_blank">ftp://some.bg</a> link!');
    });

    it('turns file urls to links', function () {
      var text = 'This is my file:///some.bg link!',
          res = YChat.Content.linkify(text);

      expect(res).not.toBeNull();
      expect(res).toContain('<a');
      expect(res).toContain('target="_blank"');
      expect(res).toContain('href="file:///some.bg"');
      expect(res).toContain('>file:///some.bg</a>');
      expect(res).toEqual('This is my <a href="file:///some.bg" target="_blank">file:///some.bg</a> link!');
    });

    it('turns www urls to links', function () {
      var text = 'This is my www.some.bg link!',
          res = YChat.Content.linkify(text);

      expect(res).not.toBeNull();
      expect(res).toContain('<a');
      expect(res).toContain('target="_blank"');
      expect(res).toContain('href="http://www.some.bg"');
      expect(res).toContain('>www.some.bg</a>');
      expect(res).toEqual('This is my <a href="http://www.some.bg" target="_blank">www.some.bg</a> link!');
    });

    it('turns email urls to links', function () {
      var text = 'This is my me@some.bg e-mail!',
          res = YChat.Content.linkify(text);

      expect(res).not.toBeNull();
      expect(res).toContain('<a');
      expect(res).toContain('href="mailto:me@some.bg"');
      expect(res).toContain('>me@some.bg</a>');
      expect(res).toEqual('This is my <a href="mailto:me@some.bg">me@some.bg</a> e-mail!');
    });
  });

  describe('YChat.Content.emotify', function () {
    it('works with the default theme', function () {
      var text = 'hello :)!',
          res = YChat.Content.emotify(text);
      expect(res).not.toBeNull();
      expect(res).toEqual('hello <span class="' + YChat.Content.EmotTheme + ' happy"></span>!');
    });
  });
});
