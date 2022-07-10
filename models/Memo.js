const mongoose = require('mongoose');

const MemoSchema = mongoose.Schema({
  userId:String,
  largeData: Array
});

module.exports = mongoose.model('Memo',MemoSchema);