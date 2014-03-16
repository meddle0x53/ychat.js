YChat.ApplicationController = function (element, options) {
  this.opts = $.extend({}, YChat.ApplicationController.Defaults, options);
  this.$el = $(element);

  this.chatControllers = {};
  this.lastMessageCheckTimeStamp = null;
  this.view = null;
  this.usersById = {};
};

YChat.ApplicationController.prototype.init = function () {
  var _this = this,
  mainChatWindowChatState = YChat.Cookies.readCookie(YChat.Cookies.ApplicationViewState);

  if (!mainChatWindowChatState) {
    mainChatWindowChatState = YChat.Container.StateMaximized;
  }

  // TODO For the toggle state - event
  this.view = new YChat.ApplicationView(this.$el, {
    title: this.opts.titleText,
    initialToggleState: mainChatWindowChatState,
    onToggleStateChanged: function (toggleState) {
      YChat.Cookies.createCookie('main_window_chat_state', toggleState);
    }
  });
  this.view.init();

  // TODO Big refactoring - view logic in the view, events, no client sub-object!
  // TODO API methods
  this.client = {
    sendMessage: function (message) {
      if (message.fromId !== _this.opts.user.id) {
        if (!_this.chatControllers[message.fromId]) {
          _this.makeChatController(message.fromId);
        } else {
          _this.chatControllers[message.fromId].addMessage(message);
        }
        if (_this.opts.playSound) {
          _this.playSound('/assets/ychat/chat');
        }

        if (_this.chatControllers[message.fromId]) {
          var $textBox = _this.chatControllers[message.fromId].chatContainer.$textBox;
          if (!$textBox.is(':focus')) {
            _this.chatControllers[message.fromId].view.$windowTitle.addClass('unread');
          }
        }
      } else {
        if (_this.chatControllers[message.UserToId]) {
          _this.chatControllers[message.UserToId].addMessage(message);
        }
      }
    },

    sendTypingSignal: function (otherUserId) {
      if (_this.chatControllers[otherUserId]) {
        var otherUser = _this.usersById[otherUserId];
        _this.chatControllers[otherUserId].showTypingSignal(otherUser);
      }
    },

    updateUser: function (userId, updateData) {
      if (!_this.usersById) {
        return;
      }

      var userData = _this.usersById[userId];

      if (userData) {
        if (updateData.online !== undefined) {
          if (userData.onlineStatus === 1 && updateData.online) {
            return;
          }
          if (userData.onlineStatus === 0 && !updateData.online) {
            return;
          }
          userData.onlineStatus = updateData.online ? 1 : 0;
          this.usersListChanged(_this.usersList || []);
        }
      }
    },

    usersListChanged: function (usersList) {
      _this.usersById = {};
      _this.usersById[_this.opts.user.id] = _this.opts.user;

      _this.view.getContent().html('');

      if (_this.opts.uiDecorator && _this.opts.uiDecorator.contactsSortFunction) {
        usersList = usersList.sort(_this.opts.uiDecorator.contactsSortFunction);
      }
      _this.usersList = usersList;

      if (usersList.length === 0) {
        $('<div/>')
          .addClass('user-list-empty')
          .text(_this.opts.emptyRoomText)
          .appendTo(_this.view.getContent());
      } else {
        for (var i = 0; i < usersList.length; i++) {
          if (usersList[i].id !== _this.opts.user.id) {
            _this.usersById[usersList[i].id] = usersList[i];
            var $userListItem = $('<div/>')
                .addClass('user-list-item')
                .attr('data-val-id', usersList[i].id)
                .appendTo(_this.view.getContent());

            if (_this.opts.uiDecorator && _this.opts.uiDecorator.profilePicture) {
              _this.opts.uiDecorator.profilePicture(usersList[i]).appendTo($userListItem);
            } else {
              $('<img/>').addClass('profile-picture')
                .attr('src', usersList[i].avatar)
                .appendTo($userListItem);
            }

            $('<div/>')
                .addClass('profile-status')
                .addClass(usersList[i].onlineStatus === 0 ? 'offline' : 'online')
                .appendTo($userListItem);

            $('<div/>')
                .addClass('profile-unread')
                .addClass(usersList[i].unreadMessagesNumber > 0 ? 'has-unread' : '')
                .appendTo($userListItem);

            $('<div/>')
                .addClass('content')
                .text(usersList[i].name)
                .appendTo($userListItem);

            (function (otherUserId) {
              $userListItem.click(function () {
                if (_this.chatControllers[otherUserId]) {
                  _this.chatControllers[otherUserId].focus();
                } else {
                  _this.makeChatController(otherUserId);
                }
              });
            })(usersList[i].id);
          }
        }
      }

      for (var i in _this.chatControllers) {
        if (_this.usersById && _this.usersById[i]) {
          _this.chatControllers[i].setOnlineStatus(_this.usersById[i].onlineStatus === 1);
        } else {
          _this.chatControllers[i].setOnlineStatus(false);
        }
      }

      _this.view.setVisible(true);
    },

    showError: function () {
        //TODO Implements it!
    }
  };

  this.opts.adapter.init(this, function () {
    _this.opts.adapter.server.getUsersList(function (usersList) {
      _this.client.usersListChanged(usersList);
      _this.readChatViewsState();
    });
  });
};

YChat.ApplicationController.prototype.playSound = function (filename) {
  var $soundContainer = $('#soundContainer');

  if (this.opts.uiDecorator && this.opts.uiDecorator.canPlaySound) {
    if (!this.opts.uiDecorator.canPlaySound()) {
      return;
    }
  }

  if (!$soundContainer.length) {
    $soundContainer = $('<div>').attr('id', 'soundContainer').appendTo($('body'));
  }

  if (this.opts.uiDecorator && this.opts.uiDecorator.soundMsgReceived) {
    $soundContainer.html(this.opts.uiDecorator.soundMsgReceived());
  } else {
    $soundContainer.html(
      '<audio autoplay="autoplay"><source src="' +
      filename +
      '.mp3" type="audio/mpeg" /><source src="' +
      filename +
      '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' +
      filename +
      '.mp3" /></audio>'
    );
  }
};

YChat.ApplicationController.prototype.readChatViewsState = function () {
  var _this = this,
      cookie = YChat.Cookies.readCookie(YChat.Cookies.ChatViewsState),
      openedChatViews, i, peerId;

  if (cookie) {
    openedChatViews = JSON.parse(cookie);
    for (i = 0; i < openedChatViews.length; i++) {
      peerId = openedChatViews[i].userId;

      this.opts.adapter.server.getUserInfo(peerId, function (user) {
        if (user) {
          if (!_this.chatControllers[peerId]) {
            _this.makeChatController(peerId, null, 'blured');
          }
        } else {
          YChat.Cookies.eraseCookie(YChat.Cookies.ChatViewsState);
        }
      });
    }
  }
};

YChat.ApplicationController.prototype.updateChatState = function () {
  var openedChatViews = [], peerId;

  for (peerId in this.chatControllers) {
    openedChatViews.push({
      userId: peerId,
      toggleState: this.chatControllers[peerId].getState()
    });
  }

  YChat.Cookies.createCookie(YChat.Cookies.ChatViewsState, JSON.stringify(openedChatViews), 365);
};

/**
 * Creates a new ChatController for managing the chats with the passed user.
 *
 * @param {number} otherUserId
 *    The id of the user the new chat controller should manage chat with.
 * @param {string} initialState
 *    The initial state of the view the new controller should manage.
 * @param {string} initialFocusState
 *    The initial focus state of the view the new controller should manage.
 */
YChat.ApplicationController.prototype.makeChatController = function (otherUserId, initialState, initialFocusState) {
  var _this = this,
     otherUser = this.usersById[otherUserId],
     newChatController;

  if (!initialState) {
    initialState = YChat.Container.StateMaximized;
  }
  if (!initialFocusState) {
    initialFocusState = 'focused';
  }

  if (!otherUser) {
    throw 'TODO : Not implemented!';
  }

  newChatController = new YChat.ChatController({
    chat: this,
    myUser: this.opts.user,
    otherUser: otherUser,
    newMessageUrl: this.opts.newMessageUrl,
    messageHistoryUrl: this.opts.messageHistoryUrl,
    initialState: initialState,
    initialFocusState: initialFocusState,
    userIsOnline: otherUser.onlineStatus === 1,
    adapter: this.opts.adapter,
    uiDecorator: this.opts.uiDecorator,
    typingText: this.opts.typingText,
    onClose: function () {
      delete _this.chatControllers[otherUser.id];
      $.organizeChatContainers();
      _this.updateChatState();
    },
    onToggleStateChanged: function () {
      _this.updateChatState();
    }
  });
  newChatController.init();

  this.chatControllers[otherUser.id.toString()] = newChatController;
  this.updateChatState();
};
