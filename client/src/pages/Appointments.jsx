// client/src/pages/Appointments.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 👈 Import useLocation
import API from '../api/axios';

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }
  return slots;
};

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation(); // 👈 Get the location object

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get('/api/doctors');
        setDoctors(data);

        // --- THIS IS THE NEW LOGIC ---
        // Check if a doctor object was passed in the location state
        if (location.state && location.state.doctor) {
          // If so, set that doctor's ID in the form state
          setForm(prevForm => ({ ...prevForm, doctorId: location.state.doctor._id }));
        }

      } catch (err) {
        setError('Could not fetch the list of doctors. Please try again later.');
      }
    };
    fetchDoctors();
  }, [location.state]); // Re-run if the location state changes

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!form.doctorId || !form.date || !form.time) {
      setError('Please select a doctor, date, and time.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.post('/api/bookings', form);
      setMessage(data.message);
      setForm({ doctorId: '', date: '', time: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-8 rounded-xl shadow-lg border border-green-100 bg-white">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Book an Appointment</h2>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-200 px-4 py-3 mb-4 rounded-lg text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-700 bg-green-100 border border-green-300 px-4 py-3 mb-4 rounded-lg text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose a Doctor</label>
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Select a Time --</option>
                {generateTimeSlots().map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}