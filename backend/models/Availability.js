// backend/models/Availability.js

const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model, assuming doctors are users
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // e.g., "09:00"
    required: true,
  },
  endTime: {
    type: String, // e.g., "17:00"
    required: true,
  },
});

// Prevent a doctor from creating duplicate availability for the same date
availabilitySchema.index({ doctor: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);