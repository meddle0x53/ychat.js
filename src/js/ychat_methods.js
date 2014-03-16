YChat.methods = {
  init: function(options) {
    return this.each(function() {
      if (!$.data(this, YChat.Name)) {
        var chat = new YChat.ApplicationController(this, options);
        chat.init();

        $.data(this, YChat.Name, chat);
        return chat;
      }
    });
  },
  createContainer: function (options) {
    var container = new YChat.Container(this, options);
    container.init();

    return container;
  },
  createChatContainer: function (options) {
    var container = new YChat.ChatContainer(this, options);
    container.init();

    return container;
  },
  createChat: function (options) {
    var chatController = new YChat.ChatController(options);
    chatController.init();

    return this;
  }
};
