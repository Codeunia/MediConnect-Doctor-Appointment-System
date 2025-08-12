const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: '' },
});

// This line ensures Mongoose looks for the correct collection named "doctors".
module.exports = mongoose.model('Doctor', doctorSchema, 'doctors');