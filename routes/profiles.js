const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

// Getting all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one profile
router.get('/:id', getProfile, (req, res) => {
  res.json(res.profile);
});

// Creating a profile
router.post('/', async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
  });
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a profile
router.patch('/:id', getProfile, async (req, res) => {
  if (req.body.name != null) {
    res.profile.name = req.body.name;
  }
  // Similarly update other fields accordingly
  try {
    const updatedProfile = await res.profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a profile
router.delete('/:id', getProfile, async (req, res) => {
  try {
    await res.profile.remove();
    res.json({ message: 'Deleted Profile' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProfile(req, res, next) {
  let profile;
  try {
    profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Cannot find profile' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.profile = profile;
  next();
}

module.exports = router;
