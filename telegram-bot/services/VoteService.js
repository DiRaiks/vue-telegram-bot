const VoteService = {
  isNew(telegramId, question, callback) {
    VoteModel.findOne({telegramId, question}, (err, existingVote) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (existingVote) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    });
  },
  saveVote(voteInfo, callback) {
    this.isNew(voteInfo.telegramId, voteInfo.question, () => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result) {
        let newVoteDto = new VoteModel({
          telegramId: voteInfo.telegramId,
          question: voteInfo.question,
          answer: voteInfo.answer,
          time: voteInfo.time
        });
        newVoteDto.save((err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, true);
          }
        });
      } else {
        callback(null, false);
      }
    })
  }
};

module.exports = VoteService;
