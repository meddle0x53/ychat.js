'use strict';

describe('YChat.ApplicationView', function () {
  afterEach(function() {
    removeTestContainer();
  });

  it('can not be closed', function () {
    var view = new YChat.ApplicationView(), $closeButtonEl;
    view.init();

    $closeButtonEl = $('.' + YChat.Container.CssClassName).find('.close');
    expect($closeButtonEl.size()).toBe(0);
  });

  describe('YChat.ApplicationView#init', function () {
    it('adds loading animation if the user list is not loaded', function () {
      var view = new YChat.ApplicationView();
      view.init();

      expect($('.' + YChat.Container.LoadingCssClassName).size()).toBe(1);
    });

    it('has css class of main view', function () {
      var view = new YChat.ApplicationView();
      view.init();

      expect($('.' + YChat.ApplicationView.CssClassName).size()).toBe(1);
    });
  });
});
