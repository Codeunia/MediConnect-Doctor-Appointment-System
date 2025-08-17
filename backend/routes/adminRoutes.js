const express = require('express');
const { 
  getAllUsers, 
  deleteUser,
  getPendingDoctors,    // NEW
  updateDoctorStatus    // NEW
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware'); 

const router = express.Router();

// All routes in this file are protected and require an admin role
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);

// NEW: Routes for admin to manage doctor approvals
router.get('/doctors/pending', protect, isAdmin, getPendingDoctors);
router.put('/doctors/:id/status', protect, isAdmin, updateDoctorStatus);

module.exports = router;
