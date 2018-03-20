const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');
const telegramToken = config.telegram.token;

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds117759.mlab.com:17759/telegram-bot`, {userMongoClient: true});

const bot = new TelegramBot(telegramToken, {polling: true});
