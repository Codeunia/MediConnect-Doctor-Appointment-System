const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, default: 'N/A' },
  image: { type: String, default: '/images/doctor-placeholder.jpg' },
  phone: { 
    type: String, 
    default: 'Not provided' 
  },
  bio: { 
    type: String, 
    default: 'A dedicated healthcare professional. Please update your bio.' 
  },
  consultationHours: { 
    type: String, 
    default: '10:00 AM - 05:00 PM' 
  },
  // NEW: Status for admin approval workflow
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Doctor', doctorSchema, 'doctors');
