const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: false // Adjust the requirement based on your needs
  },
  bio: {
    type: String,
    required: false // Adjust the requirement based on your needs
  }
});

module.exports = mongoose.model('Profile', profileSchema);
