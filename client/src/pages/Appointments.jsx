import React, { useState } from 'react';
const locationWiseDoctors = {
  Hyderabad: [
    { id: 1, name: 'Dr. A. Sharma', specialty: 'Cardiologist', rating: null },
    { id: 2, name: 'Dr. R. Rao', specialty: 'Orthopedic', rating: 4.2 },
  ],
  Delhi: [
    { id: 3, name: 'Dr. K. Mehta', specialty: 'Dermatologist', rating: 4.0 },
    { id: 4, name: 'Dr. S. Kapoor', specialty: 'Neurologist', rating: null },
  ],
  Mumbai: [
    { id: 5, name: 'Dr. L. Singh', specialty: 'General Physician', rating: 3.8 },
    { id: 6, name: 'Dr. Z. Khan', specialty: 'Psychiatrist', rating: 4.5 },
  ],
  Chennai: [
    { id: 7, name: 'Dr. T. Rajan', specialty: 'ENT', rating: null },
  ],
  Bangalore: [
    { id: 8, name: 'Dr. V. Nair', specialty: 'Pulmonologist', rating: 4.6 },
  ],
};

const generateTimeSlots = () => {
  const slots = [];
  const start = 10;
  const end = 17;
  for (let hour = start; hour < end; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  slots.push(`${end}:00`);
  return slots;
};

export default function Appointments() {
  const [form, setForm] = useState({
    location: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const doctors = form.location ? locationWiseDoctors[form.location] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset doctor field when location changes
    if (name === 'location') {
      setForm({ ...form, location: value, doctor: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { location, doctor, date, time, reason } = form;
    if (!location || !doctor || !date || !time || !reason) {
      setError('Please fill in all the fields.');
      setMessage('');
      return;
    }
    setError('');
    setMessage('✅ Appointment successfully booked!');
    // TODO: Save to backend
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
          {/* Location Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
            >
              <option value="">-- Choose Location --</option>
              {Object.keys(locationWiseDoctors).map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Selection (filtered by location) */}
          {form.location && (
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
                    {doc.name} – {doc.specialty} {doc.rating ? `⭐ ${doc.rating}` : '🆕 New'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date and Time Slot */}
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

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment</label>
            <textarea
              name="reason"
              rows={3}
              value={form.reason}
              onChange={handleChange}
              placeholder="e.g. Chest pain, fever, anxiety..."
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
            />
          </div>

          {/* Optional Feedback After Booking */}
          {message && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback (optional)</label>
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="How was your experience?"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-green-500"
              />
            </div>
          )}

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
