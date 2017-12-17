var mongoose = require('mongoose');

var StockSchema = mongoose.Schema({
  userId: String,
  name: String,
  number: Number,
  price: Number,
  date: String,
  pid: String
});

module.exports = StockSchema;
