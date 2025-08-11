const express = require('express');
const Doctor = require('../models/Doctor'); // You'll create this model
const router = express.Router();

// GET doctors by location (optional)
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    let query = {};
    if (location) {
      query.location = location;
    }
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
