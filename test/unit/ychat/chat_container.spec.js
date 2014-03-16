'use strict';

describe('YChat.ChatContainer', function () {
  afterEach(function() {
    removeTestContainer();
  });

  describe('YChat.ChatContainer#init', function () {
    it('adds a text box field for entering messages', function () {
      var container = new YChat.ChatContainer();
      expect($('.' + YChat.ChatContainer.TextBoxCssClassName).size()).toBe(0);

      container.init();
      expect($('.' + YChat.ChatContainer.TextBoxCssClassName).size()).toBe(1);
    });

    it('makes sure the text field is focused on maximize', function () {
      var container = new YChat.ChatContainer(null, {
            initialState: YChat.Container.StateMinimized
          }),
          focused = false;
      container.init();

      expect($('.toggleState.maximize').size()).toBe(1);
      expect($('.' + YChat.Container.ContentCssClassName).is(':visible')).toBe(false);

      $('.' + YChat.ChatContainer.TextBoxCssClassName).on('focus', function () {
        focused = true;
      });
      $('.toggleState').click();

      expect($('.' + YChat.Container.ContentCssClassName).is(':visible')).toBe(true);
      expect(focused).toBe(true);
    });
  });
});
