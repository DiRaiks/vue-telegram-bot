const UserModel = require('../models/UserModel');

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

  saveUser(clientInfo, callback) {
    //проверка на что что пользователя нет в бд
    this.isNew(clientInfo.telegramId, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result) {
        console.log(result)
        //создаем новый дата объект на основе модели, вызываем метод save
        const newUserDto = new UserModel({
          telegramId: clientInfo.telegramId,
          firstName: clientInfo.firstName,
          lastName: clientInfo.lastName
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

module.exports = UserService;
