const mongoose = require('mongoose');

const requestForASeatSchema = new mongoose.Schema({
  yourName: {
    type: String,
    required: true
  },
  yourEmail: {
    type: String,
    required: true
  },
  messageToDriver: {
    type: String
  },
  rideId: {
    type: String
  }
});

module.exports = mongoose.model('RequestForASeat', requestForASeatSchema);