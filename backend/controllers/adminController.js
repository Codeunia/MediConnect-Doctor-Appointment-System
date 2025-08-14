// backend/controllers/adminController.js

const User = require('../models/User');

// --- GET ALL USERS (FOR ADMIN) ---
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude their passwords from the result
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

// --- DELETE A USER (FOR ADMIN) ---
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.deleteOne(); // Use deleteOne() method on the document
    res.json({ message: 'User removed successfully.' });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error while deleting user.' });
  }
};