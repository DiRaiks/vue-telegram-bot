const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VoteSchema = new Schema({
  telegramId: String,
  question: String,
  answer: String,
  time: String
});
const Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;
