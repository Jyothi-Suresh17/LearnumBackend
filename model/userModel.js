const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // Default role is 'user', but can be 'admin'
  }
});

const users = mongoose.model("users", userSchema);

module.exports = users;
