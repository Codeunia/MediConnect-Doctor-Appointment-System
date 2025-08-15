const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  // This links the doctor profile to a user account
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user can only have one doctor profile
  },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: '' },
});

module.exports = mongoose.model('Doctor', doctorSchema, 'doctors');