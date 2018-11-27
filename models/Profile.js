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
  bday: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', BirthdaySchema);
