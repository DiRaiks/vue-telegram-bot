const UserModel = require('../models/UserModel')

const UserService = {
  isNew(telegramId, callback) {
    //поиск по id, проверка есть ли пользователь, если нет возврат true
    UserModel.findOne({telegramId}, (err, existingUser) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (existingUser) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    })
  },

  saveUser(telegramId, callback) {
    //проверка на что что пользователя нет в бд
    this.isNew(telegramId, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result) {
        //создаем новый дата объект на основе модели, вызываем метод save
        const newUserDto = new UserModel({
          telegramId
        });
        newUserDto.save((err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, true);
          }
        });
      } else {
        callback(null, false);
      }
    });
  }
};
