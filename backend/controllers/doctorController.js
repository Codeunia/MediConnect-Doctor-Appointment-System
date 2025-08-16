// backend/controllers/doctorController.js

const Doctor = require('../models/Doctor');

// --- GET A DOCTOR's OWN PROFILE ---
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctorProfile = await Doctor.findOne({ user: req.user.id });

    if (!doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found.' });
    }
    res.json(doctorProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- UPDATE A DOCTOR's OWN PROFILE ---
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { name, specialty, experience, location, image, phone, bio, consultationHours } = req.body;

    const doctorProfile = await Doctor.findOne({ user: req.user.id });

    if (!doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found.' });
    }

    // Update fields with new data, keeping old data if a field is not provided
    doctorProfile.name = name || doctorProfile.name;
    doctorProfile.specialty = specialty || doctorProfile.specialty;
    doctorProfile.experience = experience || doctorProfile.experience;
    doctorProfile.location = location || doctorProfile.location;
    doctorProfile.image = image || doctorProfile.image;
    doctorProfile.phone = phone || doctorProfile.phone;
    doctorProfile.bio = bio || doctorProfile.bio;
    doctorProfile.consultationHours = consultationHours || doctorProfile.consultationHours;

    const updatedProfile = await doctorProfile.save();
    res.json(updatedProfile);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};