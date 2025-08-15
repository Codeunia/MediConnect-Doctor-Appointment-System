// backend/routes/doctorRoutes.js

const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// This single route now handles all filtering logic
router.get('/', async (req, res) => {
  try {
    const { name, specialty, location } = req.query;
    
    // Build a dynamic query object
    const query = {};
    if (name) {
      // Case-insensitive search for the doctor's name
      query.name = { $regex: name, $options: 'i' };
    }
    if (specialty) {
      query.specialty = specialty;
    }
    if (location) {
      query.location = location;
    }
    
    const doctors = await Doctor.find(query);
    
    res.json(doctors);

  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
});

module.exports = router;