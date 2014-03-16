window.YChat = window.YChat || {};

window.YChat.LocalAdapter = window.YChat.LocalAdapter || {
  init: function(chat, done) {
    this.server = {
      readChatMessages: function(userId, done) {
        if (done) {
          done();
        }
      },
      getMessageHistory: function(userId, done) {
        if (done) {
          var history = [];
          if (userId === 2) {
            history.push({
              content: 'I\'ll eat your soul! Hahha!', 
              fromId: 2
            });
            history.push({
              content: 'Shit!',
              fromId: 2
            });
            history.push({
              content: 'Bulgaria!!!',
              fromId: 2
            });
            history.push({
              content: 'Devil',
              fromId: 2
            });
            history.push({
              content: 'You are the devil?',
              fromId: 1
            });
            history.push({
              content: 'Yes',
              fromId: 2
            });
            history.push({
              content: 'Y\'m from (bg)',
              fromId: 2
            });
            history.push({
              content: '(devil)',
              fromId: 2
            });
            history.push({
              content: 'No way :O',
              fromId: 1
            });
            history.push({
              content: 'Mhm',
              fromId: 2
            });
            history.push({
              content: 'Ask the monkey :)',
              fromId: 2
            });
            history.push({
              content: 'Monkey',
              fromId: 4
            });
            history.push({
              content: ':o:O wow!',
              fromId: 1
            });
            history.push({
              content: 'See the monkey is here!',
              fromId: 2
            });
            history.push({
              content: 'I\'m the devil and I\'m here to do the devil\'s work...',
              fromId: 2
            });
          } else if (userId === 3) {
            history.push({
              content: 'file:///home/meddle/development/js/ychatjs/dist/index.html',
              fromId: 3
            });
            history.push({
              content: 'file:///home/meddle/development/js/ychatjs/doc/index.html',
              fromId: 3
            });
          }
          done(history);
        }
      },
      sendTypingSignal: function(userId, done) {
        if (done) {
          done();
        }
      },
      sendMessage: function(userId, message, guid, done) {
        if (done) {
          done(message);
        }

        if (userId === 4) {
          var which = Math.floor(Math.random() * (5 - 1 + 1) + 1),
              content = 'Hey!';
          if (message === 'How are you?') {
            chat.client.sendMessage({
              fromId: 4,
              content: 'Fine...'
            });
            content = 'You?';
          } else if (message === 'Hello') {
            content = 'Hello to you!';
          } else if (message === 'asl') {
            chat.client.sendMessage({
              fromId: 4,
              content: '29, male, Sofia'
            });
            content = 'asl??';
          } else if (message === 'are you insane?') {
            content = 'Луд съм, луд за връзване :)';
          } else if (message === 'monkey!') {
            chat.client.sendTypingSignal(4);
            content = 'дебил...';
          } else if (message === 'man?') {
            chat.client.sendTypingSignal(4);
            content = 'no, I\'m the monkey!';
          } else {
            if (which === 1) {
              content = 'What\'s up??'
            }
            if (which === 2) {
              content = 'Mya!';
            }
            if (which === 3) {
              content = 'I am superman!';
            }
            if (which === 4) {
              content = 'Don\'t meddle with the meddle!';
            }
            if (which === 5) {
              content = 'Smerch is da God and I\'m his man!!!';
            }
          }

          setTimeout(function() {
            chat.client.sendMessage({
              fromId: 4,
              content: content
            });
          }, 1000);
        }
      },

      getUsersList: function(done) {
        if (done) {
          done([
            {
              id: 2,
              name: 'Satan 666',
              avatar: 'images/dummy/evil.png',
              online_status: true
            },
            {
              id: 3,
              name: 'Man',
              avatar: 'images/dummy/man.png'
            },
            {
              id: 4,
              name: 'Monkey G',
              avatar: 'images/dummy/monkey.png'
            },
            {
              id: 5,
              name: 'Hippo',
              avatar: 'images/dummy/hippo.png'
            },
            {
              id: 6,
              name: 'AVGN',
              avatar: 'images/dummy/angry.png'
            },
            {
              id: 7,
              name: 'Flower Power',
              avatar: 'images/dummy/flower.png'
            },
            {
              id: 8,
              name: 'Some girl',
              avatar: 'images/dummy/girl.png'
            },
            {
              id: 9,
              name: 'Mario',
              avatar: 'images/dummy/mario.png'
            },
          ]);
        }
      }
    };
    done();
  }
};
