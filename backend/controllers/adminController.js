const User = require('../models/User');
const Doctor = require('../models/Doctor'); // NEW: Import Doctor model

// --- GET ALL USERS (FOR ADMIN) ---
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

// --- DELETE A USER (FOR ADMIN) ---
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
        // Also delete doctor profile if it exists
        if (user.role === 'doctor') {
          await Doctor.deleteOne({ user: user._id });
        }
        await user.deleteOne();
        res.json({ message: 'User removed successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Server error while deleting user.' });
      }
};

// --- NEW: Controller to get all doctors with pending approval ---
exports.getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: 'pending' }).populate('user', 'email name');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pending doctors.' });
  }
};

// --- NEW: Controller to approve or reject a doctor ---
exports.updateDoctorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    doctor.status = status;
    await doctor.save();
    res.json({ message: `Doctor has been ${status}.` });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating doctor status.' });
  }
};
