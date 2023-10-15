const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: String,
    required: true
  },
  departureDetails: {
    departureLocation: {
      type: String,
      required: true
    },
    departureDateTime: {
      type: Date,
      required: true
    }
  },
  destinationDetails: {
    destinationLocation: {
      type: String,
      required: true
    },
    estimatedArrivalTime: {
      type: String,
      required: true
    }
  },
  additionalInformation: {
    type: String,
    required: true
  },
  pricing: {
    pricePerSeat: {
      type: String,
      required: true
    }
  },
  availableSeats: {
    numberOfAvailableSeats: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('Ride', rideSchema);