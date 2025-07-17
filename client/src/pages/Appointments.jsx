// src/pages/Appointments.jsx
import React, { useState } from 'react';

const doctors = [
  { id: 1, name: 'Dr. A. Sharma – Cardiologist' },
  { id: 2, name: 'Dr. R. Mehta – Pediatrician' },
  { id: 3, name: 'Dr. S. Gupta – Dermatologist' },
];

export default function Appointments() {
  const [form, setForm] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.doctor || !form.date || !form.time || !form.reason) {
      setError('Please fill in all the fields.');
      setMessage('');
      return;
    }
    setError('');
    setMessage('✅ Appointment successfully booked!');
    // TODO: Send form data to backend
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
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment</label>
            <textarea
              name="reason"
              rows={3}
              value={form.reason}
              onChange={handleChange}
              placeholder="e.g. Annual checkup, chest pain, skin rash..."
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
