const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');

// Getting all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one ride
router.get('/:id', getRide, (req, res) => {
  res.json(res.ride);
});

// Creating a ride
router.post('/', async (req, res) => {
  const ride = new Ride({
    driver: req.body.driver,
    departureDetails: req.body.departureDetails,
    destinationDetails: req.body.destinationDetails,
    additionalInformation: req.body.additionalInformation,
    pricing: req.body.pricing,
    availableSeats: req.body.availableSeats,
  });
  try {
    const newRide = await ride.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a ride
router.patch('/:id', getRide, async (req, res) => {
  if (req.body.driver != null) {
    res.ride.driver = req.body.driver;
  }
  // Similarly update other fields accordingly
  try {
    const updatedRide = await res.ride.save();
    res.json(updatedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a ride
router.delete('/:id', getRide, async (req, res) => {
  try {
    await res.ride.remove();
    res.json({ message: 'Deleted Ride' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRide(req, res, next) {
  let ride;
  try {
    ride = await Ride.findById(req.params.id);
    if (ride == null) {
      return res.status(404).json({ message: 'Cannot find ride' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.ride = ride;
  next();
}

module.exports = router;
