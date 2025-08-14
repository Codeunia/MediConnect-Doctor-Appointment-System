// backend/routes/adminRoutes.js

const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
// We will create this new middleware next
const { isAdmin } = require('../middleware/roleMiddleware'); 

const router = express.Router();

// All routes in this file are protected and require an admin role
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);

module.exports = router;