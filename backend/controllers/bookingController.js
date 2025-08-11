const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { doctor, date } = req.body;
    const booking = await Booking.create({
      patient: req.user.id,
      doctor,
      date
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id, status: 'upcoming' })
      .populate('doctor', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPreviousBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id, status: 'completed' })
      .populate('doctor', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
