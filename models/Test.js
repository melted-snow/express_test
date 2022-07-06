const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  name: String,
  data: Array
});

module.exports = mongoose.model('Test',TestSchema);