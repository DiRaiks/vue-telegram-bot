const StartHandler = {
  register(bot, messageOptions) {
    const clientId = new RegExp('\/start');

    bot.onText(clientId, (message, match) => {
      //get id user
      const clientId = BotUtils.getClientFromMessage(message);

      //вызов UserService с помощью которого сохраняем пользователя в базу при первом обращении к боту
      bot.saveUser(clientId, (saveErr, result) => {
        if (saveErr) {
          bot.sendMessage(clientId, 'some error! sorry', messageOptions);
          return;
        }
        //получаем текст сообщения из базы, чтобы потом редактировать из админки не сиправляя код проекта
        MessageService.getByTitle('start', (getErr, message) => {
          if (getErr) {
            bot.sendMessage(clientId, 'some error!', messageOptions);
          } else {
            bot.sendMessage(clientId, message.text, messageOptions);
          }
        })
      })
    })
  }
};
