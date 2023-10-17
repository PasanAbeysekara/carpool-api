const express = require('express');
const router = express.Router();
const RequestForASeat = require('../models/request');

// Getting the count of requests
router.get('/count', async (req, res) => {
  try {
    const requests = await RequestForASeat.find();
    const count = requests.length;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting all requests
router.get('/', async (req, res) => {
  try {
    const requests = await RequestForASeat.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one request
router.get('/:id', getRequest, (req, res) => {
  res.json(res.request);
});


// Creating a request
router.post('/', async (req, res) => {
  const request = new RequestForASeat({
    yourName: req.body.yourName,
    yourEmail: req.body.yourEmail,
    messageToDriver: req.body.messageToDriver,
    rideId: req.body.rideId
  });
  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a request
router.patch('/:id', getRequest, async (req, res) => {
  if (req.body.yourName != null) {
    res.request.yourName = req.body.yourName;
  }
  // Similarly update other fields accordingly
  try {
    const updatedRequest = await res.request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a request
router.put('/:id', getRequest, async (req, res) => {
  if (req.body.yourName != null) {
    res.request.yourName = req.body.yourName;
  }
  if (req.body.yourEmail != null) {
    res.request.yourEmail = req.body.yourEmail;
  }
  if (req.body.messageToDriver != null) {
    res.request.messageToDriver = req.body.messageToDriver;
  }
  if (req.body.rideId != null) {
    res.request.rideId = req.body.rideId;
  }

  try {
    const updatedRequest = await res.request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a request
router.delete('/:id', getRequest, async (req, res) => {
  try {
    await res.request.remove();
    res.json({ message: 'Deleted Request' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRequest(req, res, next) {
  let request;
  try {
    request = await RequestForASeat.findById(req.params.id);
    if (request == null) {
      return res.status(404).json({ message: 'Cannot find request' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.request = request;
  next();
}

module.exports = router;
