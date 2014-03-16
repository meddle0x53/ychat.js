/**
 * The CSS class name of the container html element.
 *
 * @constant
 */
YChat.Container.CssClassName = YChat.Name + '-window';

/**
 * The CSS class name of the title bar of the container's html.
 *
 * @constant
 */
YChat.Container.TitleCssClassName = YChat.Container.CssClassName + '-title';

/**
 * The CSS class name of the content element of the container's html.
 *
 * @constant
 */
YChat.Container.ContentCssClassName = YChat.Container.CssClassName + '-content';

/**
 * The CSS class anme of the main content of the container's html.
 *
 * @constant
 */
YChat.Container.InnerContentCssClassName = YChat.Container.CssClassName + '-inner-content';

/**
 * The CSS class name of loading annimation widget.
 *
 * @constant
 */
YChat.Container.LoadingCssClassName = 'loading-box';

/**
 * The name of the minimized state of the container.
 *
 * @constant
 */
YChat.Container.StateMinimized = 'minimized';

/**
 * The name of the maximized state of the container.
 *
 * @constant
 */
YChat.Container.StateMaximized = 'maximized';

/**
 * Default properties for the container views.
 *
 * @todo All the on* methods should be removed and instead of them we should us event handlers.
 * @todo The uiDecorator is not needed if there are events!
 *
 * @constant
 */
YChat.Container.Defaults = {
  title: null,
  canClose: true,
  initialState: YChat.Container.StateMaximized,
  uiDecorator: null,
  onCreated: function (container) {
    if (container.opts.uiDecorator && container.opts.uiDecorator.onCreatedChatContainer) {
      container.opts.uiDecorator.onCreatedChatContainer(container);
    }
  },
  onClose: function () {},
  onStateChanged: function () {}
};

/**
 * Class name of the new message text field CSS class.
 *
 * @constant
 */
YChat.ChatContainer.TextBoxCssClassName = YChat.Container.CssClassName + '-text-box';

/**
 * The name of the click event for clicking the state button of a {@link YChat.ChatContainer}.
 *
 * @constant
 */
YChat.ChatContainer.ClickState = 'click.' + YChat.Name + 'ChatContainerState';

/**
 * Default options for the {@link YChat.ChatController}.
 *
 * @todo All the on* methods should be removed and instead of them we should us event handlers.
 * @todo The uiDecorator is not needed if there are events!
 * @todo The adapter should be replaced with events.
 * @todo Extract 'focused' to constant.
 */
YChat.ChatController.Defaults = {
  chat: null,
  myUser: null,
  otherUser: null,
  typingText: null,
  initialState: YChat.Container.StateMaximized,
  initialFocusState: 'focused',
  userIsOnline: false,
  adapter: null,
  uiDecorator: null,
  onReady: function () { },
  onClose: function () { },
  onToggleStateChanged: function () { }
};

/**
 * The CSS class name of the application's main view.
 *
 * @constant
 */
YChat.ApplicationView.CssClassName = 'ychat-window-main';

/**
 * Default options for the {@link YChat.ApplicationView}.
 *
 * @constant
 */
YChat.ApplicationView.Defaults = {
  canClose: false
};

/**
 * Default options for the {@link YChat.ApplicationController}.
 *
 * @constant
 */
YChat.ApplicationController.Defaults = {
  user: null,
  adapter: null,
  uiDecorator: null,
  titleText: 'Chat',
  emptyRoomText: 'There\'s no other users',
  typingText: ' is typing...',
  playSound: true
};
