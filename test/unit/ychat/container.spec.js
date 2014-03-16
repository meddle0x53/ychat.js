'use strict';

// TODO Test events when added!
describe('YChat.Container', function () {
  afterEach(function() {
    removeTestContainer();
  });

  it('can be created without options', function () {
    var container = new YChat.Container();

    expect(container.opts).toEqual(YChat.Container.Defaults);
  });

  describe('YChat.Container#init', function () {

    it('creates container html and appends it to an existing element', function () {
      var container = new YChat.Container();
      expect($('.' + YChat.Container.CssClassName).size()).toBe(0);

      container.init();
      expect($('.' + YChat.Container.CssClassName).size()).toBe(1);

    });

    it('has the passed title as container title in the html', function () {
      var title = 'My titile',
          container = new YChat.Container(null, {title: title}),
          $titleEl;
      container.init();

      $titleEl = $('.' + YChat.Container.TitleCssClassName);
      expect($titleEl.size()).toBe(1);
      expect($titleEl.text()).toEqual(title);
    });

    it('has no close button in the html if the canClose option is set to false', function () {
      var container = new YChat.Container(null, {canClose: false}),
          $closeButtonEl;
      container.init();

      $closeButtonEl = $('.' + YChat.Container.CssClassName).find('.close');
      expect($closeButtonEl.size()).toBe(0);
    });


    it('has working close button in the html if the canClose option is set to true', function () {
      var container = new YChat.Container(null, {canClose: true}),
          $closeButtonEl;
      container.init();

      $closeButtonEl = $('.' + YChat.Container.CssClassName).find('.close');
      expect($closeButtonEl.size()).toBe(1);

      $closeButtonEl.click();
      expect($('.' + YChat.Container.CssClassName).size()).toBe(0);
    });

    it('has a working toggle state button by default for minimizing', function () {
      var container = new YChat.Container();
      container.init();

      expect($('.toggleState').size()).toBe(1);
      expect($('.toggleState.minimize').size()).toBe(1);
      expect($('.' + YChat.Container.ContentCssClassName).is(':visible')).toBe(true);

      $('.toggleState.minimize').click();

      expect($('.toggleState.minimize').size()).toBe(0);
      expect($('.toggleState.maximize').size()).toBe(1);
      expect($('.' + YChat.Container.ContentCssClassName).is(':visible')).toBe(false);
    });

    it('is minimized and has a maximize button if initialState is passed as minimized', function () {
      var container = new YChat.Container($('body'), {initialState: YChat.Container.StateMinimized});
      container.init();

      expect($('.toggleState').size()).toBe(1);
      expect($('.toggleState.maximize').size()).toBe(1);
      expect($('.' + YChat.Container.ContentCssClassName).is(':visible')).toBe(false);
    });
  });

  describe('YChat.Container#getContent', function () {
    it('returns the inner content of the container.', function () {
      var container = new YChat.Container();
      container.init();

      expect(container.getContent().html()).toEqual($('.' + YChat.Container.InnerContentCssClassName).html());
    });
  });

  describe('YChat.Container#setTitle', function () {
    it('sets a new title in the html of the container.', function () {
      var title = 'Initial title',
          newTitle = 'New title',
          container = new YChat.Container(null, {title: title});
      container.init();

      expect($('.' + YChat.Container.TitleCssClassName).text()).toEqual(title);

      container.setTitle(newTitle);
      expect($('.' + YChat.Container.TitleCssClassName).text()).toEqual(newTitle);
    });
  });

  describe('YChat.Container#setVisible', function () {
    it('it should hide the container if called with false and show it if called with true', function () {
      var container = new YChat.Container();
      container.init();

      expect($('.' + YChat.Container.CssClassName).is(':visible')).toBe(true);

      container.setVisible(false);
      expect($('.' + YChat.Container.CssClassName).is(':visible')).toBe(false);

      container.setVisible(true);
      expect($('.' + YChat.Container.CssClassName).is(':visible')).toBe(true);
    });
  });

  describe('YChat.Container#getState', function () {
    it('retrieves the right state of the container - maximized or minimized', function () {
      var container = new YChat.Container();
      container.init();

      expect(container.getState()).toBe(YChat.Container.Defaults.initialState);
    });
  });

  describe('YChat.Container#setState', function () {
    it('changes the state of the container', function () {
      var container = new YChat.Container(null, {initialState: YChat.Container.StateMinimized});
      container.init();

      expect($('.toggleState.maximize').size()).toBe(1);
      expect($('.' + YChat.Container.ContentCssClassName).is(':visible')).toBe(false);
    });
  });
});
