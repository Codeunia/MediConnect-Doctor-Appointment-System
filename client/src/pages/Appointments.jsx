// src/pages/Appointments.jsx
import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const generateTimeSlots = () => {
  const slots = [];
  const start = 9; // 9 AM
  const end = 17; // 5 PM
  for (let hour = start; hour < end; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }
  return slots;
};

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: '', // This will now store the doctor's ID
    date: '',
    time: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch doctors from the backend when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get('/api/doctors');
        setDoctors(data);
      } catch (err) {
        setError('Could not fetch doctors. Please try again later.');
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { doctor, date, time } = form;
    if (!doctor || !date || !time) {
      setError('Please fill in all the fields.');
      setMessage('');
      return;
    }
    setError('');
    setMessage('');

    try {
      await API.post('/api/bookings', {
        doctor, // The doctor's ID
        date,
      });
      setMessage('✅ Appointment successfully booked!');
      setForm({ doctor: '', date: '', time: '' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please check the details and try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-8 rounded-xl shadow-lg border border-green-100 bg-green-50">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Book an Appointment</h2>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 px-4 py-2 mb-4 rounded text-sm text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-700 bg-green-100 border border-green-300 px-4 py-2 mb-4 rounded text-sm text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose Doctor</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name} – {doc.specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time Slot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // Prevent booking past dates
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
              >
                <option value="">-- Select Time --</option>
                {generateTimeSlots().map((slot, i) => (
                  <option key={i} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}