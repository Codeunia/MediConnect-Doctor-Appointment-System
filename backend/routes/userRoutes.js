// backend/routes/userRoutes.js

const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All these routes are protected and operate on the logged-in user
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put('/profile/password', protect, updateUserPassword);

module.exports = router;