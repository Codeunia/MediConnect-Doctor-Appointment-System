const Booking = require('../models/Booking');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// --- CREATE A NEW BOOKING ---
// This function is called when a patient books an appointment.
exports.createBooking = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id; // This comes from the 'protect' middleware

    // 1. Validation: Check if all required fields are provided
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Please provide doctor, date, and time.' });
    }

    // 2. Check if the selected doctor actually exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // 3. Create and save the new booking document
    const newBooking = new Booking({
      doctor: doctorId,
      patient: patientId,
      date: new Date(date), // Store as a proper Date object
      time: time,
      status: 'upcoming'
    });

    await newBooking.save();

    // 4. Send a success response
    res.status(201).json({ 
      message: 'Appointment booked successfully!', 
      booking: newBooking 
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error while creating booking.' });
  }
};

// --- GET UPCOMING BOOKINGS FOR A PATIENT ---
// This is for the "My Bookings" page for patients.
exports.getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      patient: req.user.id, 
      status: 'upcoming' 
    }).populate('doctor', 'name specialty location'); // Populate with doctor's info

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching upcoming bookings.' });
  }
};

// --- GET PREVIOUS BOOKINGS FOR A PATIENT ---
// This is also for the "My Bookings" page for patients.
exports.getPreviousBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      patient: req.user.id, 
      status: { $in: ['completed', 'cancelled'] } // Find bookings that are completed or cancelled
    }).populate('doctor', 'name specialty location');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching previous bookings.' });
  }
};

// --- GET ALL BOOKINGS FOR A DOCTOR ---
// This is the new function for the Doctor Dashboard.
exports.getDoctorBookings = async (req, res) => {
  try {
    // The user ID from the token will be the doctor's ID
    const doctorId = req.user.id;

    // Find all bookings linked to this doctor's ID
    const bookings = await Booking.find({ doctor: doctorId })
      .populate('patient', 'name email') // Populate with the patient's info
      .sort({ date: -1 }); // Show the most recent bookings first

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching doctor bookings:', error);
    res.status(500).json({ message: 'Server error while fetching appointments.' });
  }
};