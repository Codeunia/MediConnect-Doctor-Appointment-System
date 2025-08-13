const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log("--- New request to /api/doctors ---");
    const { location } = req.query;
    const query = location ? { location: { $regex: location, $options: 'i' } } : {};
    
    const doctors = await Doctor.find(query);
    

    console.log(`DATABASE QUERY: Found ${doctors.length} doctors.`);

    res.json(doctors);

  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
});

module.exports = router;