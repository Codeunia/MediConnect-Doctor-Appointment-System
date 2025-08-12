// src/pages/MyBookings.jsx
import React, { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError('');
        const upcomingRes = await API.get('/api/bookings/upcoming');
        const previousRes = await API.get('/api/bookings/previous');
        
        const allBookings = [
          ...upcomingRes.data,
          ...previousRes.data,
        ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent

        setBookings(allBookings);
      } catch (err) {
        setError('Failed to fetch your bookings. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 py-12 bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-6 shadow-md bg-green-50">
              <div className="flex justify-between items-start">
                  <div>
                      <h2 className="text-xl font-semibold text-green-800">Dr. {booking.doctor.name}</h2>
                      <p className="text-gray-600">{booking.doctor.email}</p>
                      <p className="text-gray-600 mt-2">
                        <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                      </p>
                  </div>
                  <span className={`font-semibold capitalize px-3 py-1 text-sm rounded-full ${
                      booking.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 
                      booking.status === 'completed' ? 'bg-gray-200 text-gray-700' : 
                      'bg-red-100 text-red-700'
                  }`}>
                      {booking.status}
                  </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}