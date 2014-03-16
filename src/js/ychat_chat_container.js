/**
 * Creates a new YChat.ChatContainer.
 * The ChatContainer is the view for a single chat window. 
 * It provides a 'send new message' text field and message history.
 *
 * @constructor
 * @augments YChat.Container
 *
 * @param {object} parentElement {@link YChat.Container}
 * @param {object} options {@link YChat.Container}
 */
YChat.ChatContainer = function (parentElement, options) {
  YChat.Container.call(this, parentElement, options);

  this.$textBox = null;
};
YChat.ChatContainer.prototype = new YChat.Container();
YChat.ChatContainer.constructor = YChat.ChatContainer;

/**
 * Initializes the container.
 * Creates the html of a chat view using the options passed to the constructor.
 * Adds this container to the list with active containers.
 * A chat container consists of main part - message history and text field
 * and a title bar.
 *
 * @see YChat.Container#init
 */
YChat.ChatContainer.prototype.init = function () {
  var _this = this,
      $windowTextBoxWrapper;

  YChat.Container.prototype.init.call(this);

  $windowTextBoxWrapper = $('<div/>')
                            .addClass(YChat.Name + '-window-text-box-wrapper')
                            .appendTo(this.$windowContent);
  this.$textBox = $('<textarea />')
                    .attr('rows', '1')
                    .addClass(YChat.ChatContainer.TextBoxCssClassName)
                    .appendTo($windowTextBoxWrapper);

  this.$toggleStateButton.on(YChat.ChatContainer.ClickState, function () {
    if (_this.$windowContent.is(':visible')) {
      _this.$textBox.focus();
    }
  });
};

/**
 * Focuses this chat container putting it text field on focus.
 */
YChat.ChatContainer.prototype.focus = function () {
  // TODO No uiDecorator use the on focus event, or option.
  if (this.opts.uiDecorator && this.opts.uiDecorator.canFocus) {
    if (this.opts.uiDecorator.canFocus()) {
      this.$textBox.focus();
    }
  } else {
    this.$textBox.focus();
  }
};

/**
 * Scrolls the message history view to the bottom, showing
 * the newest messages.
 */
YChat.ChatContainer.prototype.scrollToBottom = function () {
  this.$windowInnerContent.scrollTop(
    this.$windowInnerContent[0].scrollHeight
  );
};
