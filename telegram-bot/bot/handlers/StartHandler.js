const BotUtils = require('../utils');
const MessageService = require('../../services/MessageService');
const UserService = require('../../services/UserService');

const StartHandler = {
  register(telegramBot, messageOptions) {
    const clientMessage = new RegExp('\/start');

    telegramBot.onText(clientMessage, (message, match) => {
      //get id user
      const clientId = BotUtils.getClientFromMessage(message);

      //вызов UserService с помощью которого сохраняем пользователя в базу при первом обращении к боту
      UserService.saveUser(clientId, (saveErr, result) => {
        if (saveErr) {
          telegramBot.sendMessage(clientId, 'some error! sorry', messageOptions);
          return;
        }
        //получаем текст сообщения из базы, чтобы потом редактировать из админки не сиправляя код проекта
        MessageService.getByTitle('start', (getErr, message) => {
          if (getErr) {
            telegramBot.sendMessage(clientId, 'some error!', messageOptions);
          } else {
            telegramBot.sendMessage(clientId, message.text, messageOptions);
          }
        })
      })
    })
  }
};

module.exports = StartHandler;
