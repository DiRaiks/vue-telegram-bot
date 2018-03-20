const TelegramBot = require('node-telegram-bot-api');
const BotUtils = require('./utils');
const StartHandler = require('./handlers/StartHandler');

const Bot = {
  configure(telegramToken) {
    this.telegramBot = new TelegramBot(telegramToken, {polling: true});

    // const buttonsJson = JSON.parse()
    const buttons = [];
    buttons.push(BotUtils.buildShareButton('share text', 'www.google.ru'));

    this.messageOptions = BotUtils.buildMessageOptions(buttons);

    StartHandler.register(this.telegramBot, this.messageOptions);
  }
};

module.exports = Bot;
