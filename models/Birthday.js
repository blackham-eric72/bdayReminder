const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BirthdaySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Birthday = mongoose.model('birthday', BirthdaySchema);
