const express = require('express');
const { 
  createBooking, 
  getDoctorBookings,
  getMyBookings // 👈 Import the new function
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { isDoctor } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/doctor', protect, isDoctor, getDoctorBookings);

// --- NEW ROUTE for patients to get all their bookings ---
router.get('/mybookings', protect, getMyBookings);

module.exports = router;