const botUtils = {
  //получение id из сообщения
  getClientFromMessage: (message) => {
    let telegramId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
    let firstName = message.hasOwnProperty('chat') ? message.chat.first_name : message.from.first_name;
    let lastName = message.hasOwnProperty('chat') ? message.chat.last_name ? messgae.chat.last_name : message.from.last_name : message.from.last_name;
    let userInfo = {
      telegramId,
      firstName,
      lastName
    }
    return userInfo;
  },

  //создание обычной кнопки с callback_data
  buildDefaultButton: (text, callback_data) => {
    return [{
      text,
      callback_data
    }]
  },

  //создание кнопки ссылки на внеш ресурс
  buildUrlButton: (text, url) => {
    return [{
      text,
      url
    }]
  },

  //заготовка под кнопку "поделиться"
  buildShareButton: (text, shareUrl) => {
    return [{
      text,
      url: `https://telegram.me/share/url?url=${shareUrl}`
    }]
  },

  //сборка настррек для сообщения
  buildMessageOptions: (buttons) => {
    return {
      parse_mode: 'HTML',
      disable_web_page_preview: false,
      reply_markup: JSON.stringify({
        inline_keyboard: buttons
      })
    }
  },
  getLastMessage(message) {
    return message.message.text;
  }
};

module.exports = botUtils;
