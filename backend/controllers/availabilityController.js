// backend/controllers/availabilityController.js

const Availability = require('../models/Availability');
const Booking = require('../models/Booking');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// This function remains correct
exports.setAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const doctorId = req.user.id; // This is the User ID of the logged-in doctor

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please provide date, start time, and end time.' });
    }

    await Availability.updateOne(
      { doctor: doctorId, date: new Date(date) },
      { $set: { startTime, endTime } },
      { upsert: true } 
    );

    res.status(201).json({ message: 'Availability set successfully.' });
  } catch (error) {
    console.error('Error setting availability:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// --- GET A DOCTOR'S AVAILABLE SLOTS (NEW & CORRECTED) ---
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Doctor ID and date are required.' });
    }
    
    const selectedDate = new Date(date);
    
    // --- THE FIX ---
    // The doctorId from the frontend is the Doctor's PROFILE ID (_id from doctors collection).
    const doctorProfile = await Doctor.findById(doctorId);
    if (!doctorProfile) {
        return res.status(404).json({ message: 'Doctor profile not found.' });
    }
    // We get the linked USER ID from the profile.
    const doctorUserId = doctorProfile.user;

    // 1. Find the doctor's specific availability for that day using their USER ID
    const specificAvailability = await Availability.findOne({
      doctor: doctorUserId,
      date: selectedDate,
    });

    let startTime, endTime;

    if (specificAvailability) {
      // If specific availability is set, use it
      startTime = specificAvailability.startTime;
      endTime = specificAvailability.endTime;
    } else {
      // --- FALLBACK LOGIC ---
      // If no specific availability, use the default hours from the doctor's profile
      const parts = doctorProfile.consultationHours.split(' - ');
      const start = parts[0];
      const end = parts[1];

      let startHour = parseInt(start.split(':')[0]);
      if (start.includes('PM') && startHour !== 12) startHour += 12;
      if (start.includes('AM') && startHour === 12) startHour = 0;
      startTime = `${String(startHour).padStart(2, '0')}:${start.split(':')[1].slice(0,2)}`;

      let endHour = parseInt(end.split(':')[0]);
      if (end.includes('PM') && endHour !== 12) endHour += 12;
      if (end.includes('AM') && endHour === 12) endHour = 0;
      endTime = `${String(endHour).padStart(2, '0')}:${end.split(':')[1].slice(0,2)}`;
    }

    // 2. Find all existing bookings for that doctor on that day
    const existingBookings = await Booking.find({
      doctor: doctorId, // Bookings are stored with the Doctor Profile ID
      date: selectedDate,
    });
    const bookedTimes = new Set(existingBookings.map(booking => booking.time));

    // 3. Generate all possible time slots
    const allSlots = [];
    let currentTime = new Date(`${date}T${startTime}:00`);
    const finalEndTime = new Date(`${date}T${endTime}:00`);

    while (currentTime < finalEndTime) {
      const timeString = currentTime.toTimeString().substring(0, 5);
      allSlots.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    // 4. Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

    res.json({ availableSlots });

  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};