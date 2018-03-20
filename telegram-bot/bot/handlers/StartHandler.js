const BotUtils = require('../utils');
const MessageService = require('../../services/MessageService');
const UserService = require('../../services/UserService');

const StartHandler = {
  register(telegramBot, messageOptions) {
    const clientMessage = new RegExp('\/start');

    telegramBot.onText(clientMessage, (message, match) => {
      //get id user
      const clientInfo = BotUtils.getClientFromMessage(message);

      //вызов UserService с помощью которого сохраняем пользователя в базу при первом обращении к боту
      UserService.saveUser(clientInfo, (saveErr, result) => {
        if (saveErr) {
          telegramBot.sendMessage(clientInfo.telegramId, 'some error! sorry', messageOptions);
          return;
        }
        //получаем текст сообщения из базы, чтобы потом редактировать из админки не сиправляя код проекта
        MessageService.getByTitle('start', (getErr, message) => {
          if (getErr) {
            telegramBot.sendMessage(clientInfo.telegramId, 'some error!', messageOptions);
          } else {
            telegramBot.sendMessage(clientInfo.telegramId, `${message.text} ${clientInfo.firstName}!`, messageOptions);
          }
        })
      })
    })
  }
};

module.exports = StartHandler;
