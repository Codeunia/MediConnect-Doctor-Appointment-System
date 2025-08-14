// backend/routes/bookingRoutes.js

const express = require('express');
const { 
  createBooking, 
  getUpcomingBookings, 
  getPreviousBookings,
  getDoctorBookings // 👈 Import the new function
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Patient routes
router.post('/', protect, createBooking);
router.get('/upcoming', protect, getUpcomingBookings);
router.get('/previous', protect, getPreviousBookings);

// --- START: NEW ROUTE FOR DOCTORS ---
router.get('/doctor', protect, getDoctorBookings);
// --- END: NEW ROUTE ---

module.exports = router;