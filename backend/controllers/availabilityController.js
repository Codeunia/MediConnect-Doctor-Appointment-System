// backend/controllers/availabilityController.js

const Availability = require('../models/Availability');
const Booking = require('../models/Booking');

// --- SET DOCTOR'S AVAILABILITY FOR A SPECIFIC DATE ---
exports.setAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const doctorId = req.user.id; // From 'protect' middleware

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please provide date, start time, and end time.' });
    }

    // Use updateOne with 'upsert' to create a new entry or update an existing one
    await Availability.updateOne(
      { doctor: doctorId, date: new Date(date) },
      { $set: { startTime, endTime } },
      { upsert: true } // This option creates the document if it doesn't exist
    );

    res.status(201).json({ message: 'Availability set successfully.' });
  } catch (error) {
    console.error('Error setting availability:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// --- GET A DOCTOR'S AVAILABLE SLOTS FOR A SPECIFIC DATE ---
// This will be used by patients on the booking page
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Doctor ID and date are required.' });
    }

    // 1. Find the doctor's general availability for that day
    const availability = await Availability.findOne({
      doctor: doctorId,
      date: new Date(date),
    });

    if (!availability) {
      return res.json({ availableSlots: [] }); // Doctor is not available on this day
    }

    // 2. Find all existing bookings for that doctor on that day
    const existingBookings = await Booking.find({
      doctor: doctorId,
      date: new Date(date),
    });

    const bookedTimes = new Set(existingBookings.map(booking => booking.time));

    // 3. Generate all possible time slots based on the doctor's schedule
    const allSlots = [];
    let currentTime = new Date(`${date}T${availability.startTime}:00`);
    const endTime = new Date(`${date}T${availability.endTime}:00`);

    while (currentTime < endTime) {
      const timeString = currentTime.toTimeString().substring(0, 5);
      allSlots.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Assuming 30-minute slots
    }

    // 4. Filter out the slots that are already booked
    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

    res.json({ availableSlots });

  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};