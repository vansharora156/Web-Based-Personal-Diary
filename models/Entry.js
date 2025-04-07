const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  emotion: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);
