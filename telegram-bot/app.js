const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');
const telegramToken = config.telegram.token;

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds117759.mlab.com:17759/telegram-bot`, {userMongoClient: true});

const bot = new TelegramBot(telegramToken, {polling: true});

const messageOptions = {
  parse_mode: 'HTML',
  disable_web_page_preview: false,
  reply_markup: JSON.stringify({
    inline_keyboard: [[{
      text: 'Name button',
      callback_data: 'do something'
    }]]
  })
};

bot.onText(new RegExp('\/start'), (message, match) => {
  //id клиента
  const clientId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
  //ответ
  bot.sendMessage(clientId, 'Some message', messageOptions);
});

// bot.on('callback_query', (message) => {
//   const clientId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
//   // то что писали в коллбэк у кнопок приходит в message.data
//   if (message.data === 'do something') {
//     bot.sendMessage(clientId, 'Button clicked', messageOptions);
//   }
// });
