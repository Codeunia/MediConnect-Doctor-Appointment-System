import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api/axios';

// --- START: New, Smarter Time Slot Generation Logic ---
const generateValidTimeSlots = (selectedDate) => {
  const slots = [];
  const now = new Date();
  
  // Set the booking start time to 2 hours from now
  const bookingStartTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  // Define the working hours for the clinic
  const dayStartTime = new Date(selectedDate);
  dayStartTime.setHours(10, 0, 0, 0); // 10:00 AM

  const dayEndTime = new Date(selectedDate);
  dayEndTime.setHours(17, 0, 0, 0); // 5:00 PM (17:00)

  // Determine the starting point for generating slots
  let currentTime = new Date(dayStartTime);

  // If the selected date is today, make sure the first slot is not in the past or within the next 2 hours
  if (dayStartTime.toDateString() === now.toDateString()) {
    if (bookingStartTime > currentTime) {
      currentTime = bookingStartTime;
      // Round up to the next 30-minute interval
      if (currentTime.getMinutes() > 30) {
        currentTime.setHours(currentTime.getHours() + 1, 0, 0, 0);
      } else if (currentTime.getMinutes() > 0) {
        currentTime.setMinutes(30, 0, 0);
      }
    }
  }

  // Generate slots in 30-minute increments until the end of the working day
  while (currentTime <= dayEndTime) {
    slots.push(currentTime.toTimeString().substring(0, 5));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return slots;
};
// --- END: New, Smarter Time Slot Generation Logic ---

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [validTimeSlots, setValidTimeSlots] = useState([]); // Holds the 10am-5pm slots
  const [form, setForm] = useState({
    doctorId: '',
    date: '',
    time: '',
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const location = useLocation();

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get('/api/doctors');
        setDoctors(data);
        if (location.state?.doctor) {
          setForm(prev => ({ ...prev, doctorId: location.state.doctor._id }));
        }
      } catch (err) {
        setError('Could not fetch the list of doctors.');
      }
    };
    fetchDoctors();
  }, [location.state]);

  // Fetch the doctor's available slots from the backend when doctor/date changes
  useEffect(() => {
    const fetchBackendSlots = async () => {
      if (form.doctorId && form.date) {
        setSlotsLoading(true);
        setAvailableSlots([]);
        try {
          const { data } = await API.get(`/api/availability/slots?doctorId=${form.doctorId}&date=${form.date}`);
          setAvailableSlots(data.availableSlots);
        } catch (err) {
          setError('Could not fetch available slots for this doctor.');
        } finally {
          setSlotsLoading(false);
        }
      }
    };
    fetchBackendSlots();
  }, [form.doctorId, form.date]);

  // Generate the valid time window (10am-5pm, etc.) when the date changes
  useEffect(() => {
    if (form.date) {
      setValidTimeSlots(generateValidTimeSlots(form.date));
    } else {
      setValidTimeSlots([]);
    }
  }, [form.date]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!form.doctorId || !form.date || !form.time) {
      setError('Please select a doctor, date, and an available time slot.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.post('/api/bookings', form);
      setMessage(data.message);
      setForm({ doctorId: form.doctorId, date: '', time: '' });
      setAvailableSlots([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. The slot may have just been taken.');
    } finally {
      setLoading(false);
    }
  };

  // Final list of slots to show = intersection of doctor's availability and valid booking times
  const finalDisplaySlots = availableSlots.filter(slot => validTimeSlots.includes(slot));

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-8 rounded-xl shadow-lg border border-green-100 bg-white">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Book an Appointment</h2>

        {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center mb-4">{error}</p>}
        {message && <p className="text-green-700 bg-green-100 p-3 rounded-lg text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose a Doctor</label>
            <select name="doctorId" value={form.doctorId} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doc) => <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialty})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} disabled={!form.doctorId} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
              <select name="time" value={form.time} onChange={handleChange} disabled={!form.date || slotsLoading} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100">
                <option value="">-- Select a Time --</option>
                {slotsLoading ? (
                  <option>Loading...</option>
                ) : finalDisplaySlots.length > 0 ? (
                  finalDisplaySlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)
                ) : (
                  <option disabled>No available slots</option>
                )}
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}