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
  location: { type: String, default: 'N/A' }, // Default location
  image: { type: String, default: '/images/doctor-placeholder.jpg' }, // Default image
  
  // --- START: NEW FIELDS ---
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
  // --- END: NEW FIELDS ---
});

module.exports = mongoose.model('Doctor', doctorSchema, 'doctors');