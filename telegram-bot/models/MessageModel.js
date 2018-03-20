const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  title: String,
  text: String
});
const Message = mongoose.model('message', MessageSchema);
