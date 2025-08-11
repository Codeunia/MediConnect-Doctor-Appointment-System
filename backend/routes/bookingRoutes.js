const express = require('express');
const { createBooking, getUpcomingBookings, getPreviousBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/upcoming', protect, getUpcomingBookings);
router.get('/previous', protect, getPreviousBookings);

module.exports = router;
