const express = require('express');
const { getDoctorProfile, updateDoctorProfile } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const { isDoctor } = require('../middleware/roleMiddleware');
const Doctor = require('../models/Doctor');

const router = express.Router();

// --- Doctor-specific routes (protected and role-restricted) ---
router.route('/profile')
  .get(protect, isDoctor, getDoctorProfile)
  .put(protect, isDoctor, updateDoctorProfile);

// --- Public route to get all doctors for the home page ---
router.get('/', async (req, res) => {
  try {
    const { name, specialty, location } = req.query;
    
    const query = {};
    if (name) {
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