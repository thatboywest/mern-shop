const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  id_num: {
    type: Number,
    required: false,
    unique: true // Ensure ID number uniqueness
  },
  password: {
    type: String,
    required: true
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
