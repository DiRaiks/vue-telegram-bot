const MessageModel = require('../models/MessageModel');

const MessageService = {
  getByTitle(title, callback) {
    MessageModel.findOne({title}, (err, message) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, message)
      }
    });
  }
};

module.exports = MessageService;
