const MessageService = {
  getBuTitle(title, callback) {
    MessageModel.findOne({title}, (err, message) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, message)
      }
    });
  }
};
