const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
