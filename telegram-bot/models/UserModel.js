const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  telegramId: String
});
const User = mongoose.model('user', UserSchema);