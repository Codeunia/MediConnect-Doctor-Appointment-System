// backend/routes/availabilityRoutes.js

const express = require('express');
const { setAvailability, getAvailableSlots } = require('../controllers/availabilityController');
const { protect } = require('../middleware/authMiddleware');
const { isDoctor } = require('../middleware/roleMiddleware'); // We will create this next

const router = express.Router();

// Route for a doctor to set their availability (protected and role-restricted)
router.post('/', protect, isDoctor, setAvailability);

// Public route for anyone to get a doctor's available slots
router.get('/slots', getAvailableSlots);

module.exports = router;