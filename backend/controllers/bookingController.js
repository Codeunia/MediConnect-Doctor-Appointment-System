const Booking = require('../models/Booking');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// --- CREATE A NEW BOOKING (Your existing code) ---
exports.createBooking = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Please provide doctor, date, and time.' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // Ensure the doctor is approved before allowing a booking
    if (doctor.status !== 'approved') {
        return res.status(400).json({ message: 'This doctor is not currently approved for bookings.' });
    }

    const existingBooking = await Booking.findOne({ doctor: doctorId, date: new Date(date), time });
    if (existingBooking) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
    }

    const newBooking = new Booking({
      doctor: doctorId,
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

// --- GET ALL BOOKINGS FOR A DOCTOR (Your existing code) ---
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

// --- GET ALL BOOKINGS FOR A PATIENT (Your existing code) ---
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id })
      .populate({
          path: 'doctor',
          select: 'name specialty location user',
          populate: {
              path: 'user',
              select: 'name'
          }
      })
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings.' });
  }
};

// --- NEW FUNCTION to update a booking's status ---
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;
    const user = await User.findById(req.user.id);

    if (!status || !['completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const doctorProfile = await Doctor.findOne({ _id: booking.doctor });

    // Authorization check: User must be the patient or the doctor for this booking
    const isPatient = booking.patient.toString() === user._id.toString();
    const isDoctor = doctorProfile.user.toString() === user._id.toString();

    if (!isPatient && !isDoctor) {
      return res.status(403).json({ message: 'Not authorized to update this booking.' });
    }

    // Prevent patient from marking an appointment as 'completed'
    if (isPatient && status === 'completed') {
        return res.status(403).json({ message: 'Only a doctor can mark an appointment as completed.' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking successfully ${status}.`, booking });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error while updating booking status.' });
  }
};
