/**
 * Creates a new YChat.Container.
 * YChat container manages the html for a chat window's content.
 * Think of the YChat.Container as the base class of all the views of the plugin
 *
 * @constructor
 *
 * @param {object} parentElement
 *    The element to ehich this chat container should be appended.
 *    Can be null for containers that should be appended to the body DOM element.
 * @param {object} options
 *    Options for this container.
 *    These options overide the {@link YChat.containerDefaults}.
 *    <p>
 *      Available options:
 *      <ul>
 *        <li>
 *          title - The title of the container,
 *          for exampe the name of the person in this chat.
 *        </li>
 *        <li>
 *          canClose - If the container should have close button.
 *        </li>
 *        <li>
 *          initialState - The initial state of this container - maxinized or minimized.
 *        </li>
 *      </ul>
 *    </p>
 */
YChat.Container = function (parentElement, options) {
  this.opts = $.extend({}, YChat.Container.Defaults, options);

  this.$parentEl = parentElement ? $(parentElement) : $('body');

  // TODO $window should be renamed to $el!
  this.$window = null;
  this.$windowTitle = null;
  this.$windowContent = null;
  this.$windowInnerContent = null;
  this.$toggleStateButton = null;
};

/**
 * Initializes the container.
 * Creates the html of a container view using the options passed to the constructor.
 * Adds this container to the list with active containers.
 * A container consists of a main part and a title bar.
 */
YChat.Container.prototype.init = function () {
  var _this = this,
      $closeButton,
      i;

  this.$window = $('<div/>').addClass(YChat.Container.CssClassName).appendTo(this.$parentEl);
  this.$windowTitle = $('<div/>')
                        .addClass(YChat.Container.TitleCssClassName)
                        .appendTo(this.$window);

  if (this.opts.canClose) {
    $closeButton = $('<div/>')
                      .addClass('close')
                      .addClass('ychat-button')
                      .appendTo(this.$windowTitle);
    $closeButton.on('click.' + YChat.Name + 'ContainerClose', function (e) {
      e.stopPropagation();

      // TODO Refactor the list of containers!
      for (i = 0; i < $._chatContainers.length; i++) {
        if ($._chatContainers[i] === _this) {
          $._chatContainers.splice(i, 1);
          break;
        }
      }

      _this.$window.remove();

      // TODO Trigger as event!
      _this.opts.onClose(_this);
    });
  }

  this.$toggleStateButton = $('<div/>')
                        .addClass('toggleState')
                        .addClass(YChat.Name + '-button')
                        .appendTo(this.$windowTitle);
  if (this.opts.initialState === 'minimized') {
    this.$toggleStateButton.addClass('maximize');
  } else {
    this.$toggleStateButton.addClass('minimize');
  }

  this.$toggleStateButton.on('click.' + YChat.Name + 'ContainerState', function () {
    var state;

    _this.$windowContent.toggle();
    if (_this.$windowContent.is(':visible')) {
      _this.$toggleStateButton.removeClass('maximize').addClass('minimize');
    } else {
      _this.$toggleStateButton.addClass('maximize').removeClass('minimize');
    }
    state = _this.$windowContent.is(':visible') ? 'maximized' : 'minimized';

    // TODO This should be an event!
    _this.opts.onStateChanged(state);
  });

  $('<div/>').addClass('text').text(this.opts.title).appendTo(this.$windowTitle);

  this.$windowContent = $('<div/>')
                          .addClass(YChat.Container.ContentCssClassName)
                          .appendTo(this.$window);
  if (this.opts.initialState === YChat.Container.StateMinimized) {
    this.$windowContent.hide();
  }

  this.$windowInnerContent = $('<div/>')
                              .addClass(YChat.Container.InnerContentCssClassName)
                              .appendTo(this.$windowContent);


  // TODO The containers list should be a variable to the namespace!
  if (!$._chatContainers) {
    $._chatContainers = [];
  }
  $._chatContainers.push(this);

  $.organizeChatContainers();

  // TODO trigger as event!
  this.opts.onCreated(this);
};

// TODO remove this!
$.organizeChatContainers = function () {
  var rightOffset = 10,
      deltaOffset = 10,
      windowWidth = $(document).width(),
      currentWidth,
      i;

  for (i = 0; i < $._chatContainers.length; i++) {
    $._chatContainers[i].$window.css('right', rightOffset);
    currentWidth = rightOffset + $._chatContainers[i].$window.outerWidth() + deltaOffset

    if ((currentWidth + $._chatContainers[i].$window.outerWidth() + deltaOffset) >= windowWidth) {
      rightOffset = $._chatContainers[0].$window.outerWidth() + (deltaOffset * 2);
    } else {
      rightOffset = currentWidth;
    }
  }
};

/**
 * Getter of the inner content of the cotainer.
 *
 * @return {object}
 *    A jQuery representation of the inner content of the container.
 */
YChat.Container.prototype.getContent = function () {
  return this.$windowInnerContent;
};

/**
 * Sets a new title to the container.
 *
 * @param {string} title
 *    The new title of the container.
 */
YChat.Container.prototype.setTitle = function (title) {
  $('div[class=text]', this.$windowTitle).text(title);
};

/**
 * Gets the title of the container, the one displayed in the title bar.
 *
 * @return {string}
 *    The title of the container.
 */
YChat.Container.prototype.getTitle = function () {
  return $('div[class=text]', this.$windowTitle).text();
};

/**
 * Hides or shows the container.
 *
 * @param {boolean} visible
 *    True if the container should be visible or false, otherwise.
 */
YChat.Container.prototype.setVisible = function (visible) {
  if (visible) {
    this.$window.show();
  } else {
    this.$window.hide();
  }
};

/**
 * Getter of the state of the container.
 *
 * @return
 *    The state of the container - maximized or minimized.
 */
YChat.Container.prototype.getState = function () {
  return this.$windowContent.is(':visible') ?
    YChat.Container.StateMaximized :
    YChat.Container.StateMinimized;
};

/**
 * Sets the state of the container.
 *
 * @param {string}
 *    The state to set.
 *
 * @see YChat.Container.StateMinimized
 * @see YChat.Container.StateMaximized
 */
YChat.Container.prototype.setState = function (state) {
  if (state === YChat.Container.StateMinimized) {
    this.$windowContent.hide();
  } else if (state === YChat.Container.StateMaximized) {
    this.$windowContent.show();
  }
};
