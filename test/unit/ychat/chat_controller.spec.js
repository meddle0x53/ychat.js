'use strict';

describe('YChat.ChatController', function () {
  var opts, adapter;
  beforeEach(function () {
    var applicationView = new YChat.ApplicationView();

    adapter = YChat.LocalAdapter;
    adapter.init({}, function () {});
    adapter.server.getMessageHistory = function (unused, callback) {
      callback([]);
    };
    applicationView.init();

    opts = {
      chat: {
        '$el': $('body'),
        view: applicationView,
        usersById: {1: {id: 1, avatar: ''}, 2: {id: 2, avatar: ''}}
      },
      otherUser: {
        id: 2,
        avatar: '',
        name: 'I\'m an error!'
      },
      myUser: {
        id: 1,
        avatar: ''
      },
      adapter: adapter
    };
  });

  it('is created by default with the YChat.ChatController.Defaults', function () {
    var chatController = new YChat.ChatController();

    expect(chatController.opts).toEqual(YChat.ChatController.Defaults);
  });

  describe('YChat.ChatController#init', function () {
    it('associates a new YChat.ChatContainer as a view with this controller', function () {
      var chatController = new YChat.ChatController(opts);
      chatController.init();

      expect(chatController.chatContainer).not.toBeNull();
      expect(chatController.chatContainer.constructor.name).toEqual(YChat.ChatContainer.name);
      expect(chatController.chatContainer.getTitle()).toEqual(opts.otherUser.name);
    });

    it('gives the text field of its container the ability to send messages', function () {
      var chatController = new YChat.ChatController(opts),
          message = 'Hello!', press;
      chatController.init();

      chatController.chatContainer.$textBox.val(message);

      spyOn(chatController, 'sendMessage');

      press = jQuery.Event('keypress');
      press.ctrlKey = false;
      press.shiftKey = false;
      press.which = 13;
      chatController.chatContainer.$textBox.trigger(press);

      expect(chatController.sendMessage).toHaveBeenCalled();
    });

    it('retrieves the message history from the source', function () {
      var chatController = new YChat.ChatController(opts);
      spyOn(chatController, 'showMessageHistory');

      chatController.init();
      expect(chatController.showMessageHistory).toHaveBeenCalled();
    });
  });

  describe('YChat.ChatController#showMessageHistory', function () {
    it('adds all the messages using YChat.ChatController#addMessage', function () {
      var messages = [{id: 2, constent: 'a', fromId: 1}, {id:2, content: 'b', fromId: 1}],
          chatController = new YChat.ChatController(opts);
      chatController.init();

      spyOn(chatController, 'addMessage');
      chatController.showMessageHistory(messages);

      expect(chatController.addMessage.callCount).toBe(2);
    });

    it('focuses the send message text field of the view - ChatContainer', function () {
      var chatController = new YChat.ChatController(opts), focused = false;
      chatController.init();

      chatController.chatContainer.$textBox.on('focus', function () {
        focused = true;
      });
      chatController.showMessageHistory([]);
      expect(focused).toBe(true);
    });
  });

  describe('YChat.ChatController#addMessage', function () {
    it('maximizes the YChat.ChatContainer view', function () {
      opts.initialState = YChat.Container.StateMinimized;
      var chatController = new YChat.ChatController(opts), focused = false;
      chatController.init();
      expect(chatController.chatContainer.getState()).toEqual(YChat.Container.StateMinimized);

      chatController.addMessage({fromId: 1}, '5555');
      expect(chatController.chatContainer.getState()).toEqual(YChat.Container.StateMaximized);
    });

    it('removes typing signal when needed', function () {
      var chatController = new YChat.ChatController(opts);
      chatController.init();

      spyOn(chatController, 'removeTypingSignal');
      chatController.addMessage({fromId: opts.myUser.id}, '5555');
      chatController.addMessage({fromId: opts.otherUser.id}, '55556');

      expect(chatController.removeTypingSignal.callCount).toBe(1);
    });

    it('uses the passed guid to update already existing message', function () {
      var chatController = new YChat.ChatController(opts),
          msg1 = 'Hey', msg2 = 'brey';
      chatController.init();

      chatController.addMessage({fromId: opts.myUser.id, content: msg1}, '5555');
      expect(chatController.chatContainer.$windowInnerContent.find('.temp-message').size()).toBe(1);

      chatController.addMessage({fromId: opts.myUser.id, content: msg2, ClientGuid: '5555'}, '5555');
      expect(chatController.chatContainer.$windowInnerContent.find('.temp-message').size()).toBe(0);
    });

    it('processes the messages using a processor', function() {
      var chatController = new YChat.ChatController(opts),
          msg1 = 'Hey :) www.some.bg';
      chatController.init();

      spyOn(YChat.Content, 'linkify');
      spyOn(YChat.Content, 'emotify');
      chatController.addMessage({fromId: opts.myUser.id, content: msg1}, '5555');

      expect(YChat.Content.linkify).toHaveBeenCalled();
      expect(YChat.Content.emotify).toHaveBeenCalled();
    });
  });

  describe('YChat.ChatController#sendMessage', function () {
    it('uses YChat.ChatController#addMessage to show the message to send', function () {
      var chatController = new YChat.ChatController(opts),
          msg = 'Hey';
      chatController.init();

      spyOn(chatController, 'addMessage');
      chatController.sendMessage(msg);

      expect(chatController.addMessage).toHaveBeenCalled();
    });
  });
});
