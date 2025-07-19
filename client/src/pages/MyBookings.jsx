// src/pages/MyBookings.jsx
import React, { useState, useEffect } from 'react';

const dummyBookings = [
  {
    id: 1,
    doctor: 'Dr. Neha Sharma',
    location: 'Delhi',
    date: '2025-07-20',
    time: '11:30 AM',
    status: 'Confirmed',
    editable: true,
    reason: 'Regular check-up',
  },
  {
    id: 2,
    doctor: 'Dr. Ajay Mehta',
    location: 'Hyderabad',
    date: '2025-07-10',
    time: '2:00 PM',
    status: 'Completed',
    editable: false,
    reason: 'Fever and cold',
  },
];

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setBookings(dummyBookings);
  }, []);

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setFormData({ ...booking });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const updated = bookings.map(b =>
      b.id === editingId ? { ...b, ...formData } : b
    );
    setBookings(updated);
    setEditingId(null);
  };

  const isPast = (date) => new Date(date) < new Date();

  return (
    <div className="px-4 sm:px-8 md:px-16 py-12 bg-white text-gray-800">
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Bookings</h1>

      {bookings.length === 0 && <p>No bookings found.</p>}

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded-lg p-4 shadow bg-gray-50">
            {editingId === booking.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <button
                  onClick={handleSave}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <p><strong>Doctor:</strong> {booking.doctor}</p>
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Status:</strong> <span className={`font-semibold ${booking.status === 'Confirmed' ? 'text-blue-600' : 'text-gray-600'}`}>{booking.status}</span></p>
                <p><strong>Reason:</strong> {booking.reason}</p>

                {!isPast(booking.date) && booking.editable && (
                  <button
                    onClick={() => handleEdit(booking)}
                    className="mt-2 text-green-600 underline hover:text-green-800"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
