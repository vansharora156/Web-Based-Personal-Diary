// const mongoose = require('mongoose');

// const entrySchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   emotion: String,
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Entry', entrySchema);

const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  emotion: String,
  date: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Entry', entrySchema);
