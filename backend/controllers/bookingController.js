// backend/controllers/bookingController.js

const Booking = require('../models/Booking');
const Doctor = require('../models/Doctor');

// --- CREATE A NEW BOOKING (CORRECTED) ---
exports.createBooking = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Please provide doctor, date, and time.' });
    }

    // --- THE FIX ---
    // The doctorId from the frontend is the Doctor Profile ID, not the User ID.
    // We check if a doctor with this PROFILE ID exists.
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    const existingBooking = await Booking.findOne({ doctor: doctorId, date: new Date(date), time });
    if (existingBooking) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
    }

    const newBooking = new Booking({
      doctor: doctorId, // Use the provided Doctor Profile ID
      patient: patientId,
      date: new Date(date),
      time: time,
      status: 'upcoming'
    });

    await newBooking.save();

    res.status(201).json({ 
      message: 'Appointment booked successfully!', 
      booking: newBooking 
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error while creating booking.' });
  }
};

// --- GET ALL BOOKINGS FOR A DOCTOR (CORRECTED) ---
exports.getDoctorBookings = async (req, res) => {
  try {
    const doctorProfile = await Doctor.findOne({ user: req.user.id });
    if (!doctorProfile) {
        return res.status(404).json({ message: 'Doctor profile not found.' });
    }

    const bookings = await Booking.find({ doctor: doctorProfile._id })
      .populate('patient', 'name email')
      .sort({ date: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching doctor bookings:', error);
    res.status(500).json({ message: 'Server error while fetching appointments.' });
  }
};

// --- NEW FUNCTION to get all bookings for a patient ---
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id })
      .populate('doctor', 'name specialty location')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings.' });
  }
};