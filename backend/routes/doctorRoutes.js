const express = require('express');
const Doctor = require('../models/Doctor'); // Assuming filename is Doctor.js
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log("--- New request to /api/doctors ---"); // Log every time the route is hit
    const { location } = req.query;
    const query = location ? { location: { $regex: location, $options: 'i' } } : {};
    
    const doctors = await Doctor.find(query);
    
    // THIS IS THE MOST IMPORTANT LINE FOR DEBUGGING
    console.log(`DATABASE QUERY: Found ${doctors.length} doctors.`);

    res.json(doctors);

  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
});

module.exports = router;