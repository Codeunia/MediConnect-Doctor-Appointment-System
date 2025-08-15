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
  location: { type: String, required: true },
  image: { type: String, default: '' },
  
  // --- START: NEW FIELDS ---
  phone: { 
    type: String, 
    default: 'Not provided' 
  },
  bio: { 
    type: String, 
    default: 'A dedicated healthcare professional.' 
  },
  consultationHours: { 
    type: String, 
    default: '10:00 AM - 05:00 PM' 
  },
  // --- END: NEW FIELDS ---
});

module.exports = mongoose.model('Doctor', doctorSchema, 'doctors');