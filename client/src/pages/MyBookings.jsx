// client/src/pages/MyBookings.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

export default function MyBookings() {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return; // Make sure we have a logged-in user

      try {
        setLoading(true);
        setError('');
        
        // Fetch both sets of bookings in parallel for efficiency
        const [upcomingRes, pastRes] = await Promise.all([
          API.get('/api/bookings/upcoming'),
          API.get('/api/bookings/previous')
        ]);

        setUpcomingBookings(upcomingRes.data);
        setPastBookings(pastRes.data);

      } catch (err) {
        setError('Failed to fetch your appointments. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]); // Re-fetch bookings if the user changes

  // Helper to format date and time for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="text-center py-20">Loading your appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600 bg-red-50">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">My Appointments</h1>

        {/* Upcoming Appointments Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-green-200">
            Upcoming
          </h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking._id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-green-700">Dr. {booking.doctor.name}</p>
                      <p className="text-sm text-gray-500">{booking.doctor.specialty}</p>
                      <p className="text-sm text-gray-500">📍 {booking.doctor.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatDate(booking.date)}</p>
                      <p className="text-sm text-gray-600">{booking.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have no upcoming appointments.</p>
          )}
        </section>

        {/* Past Appointments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
            Past
          </h2>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 opacity-70">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-600">Dr. {booking.doctor.name}</p>
                      <p className="text-sm text-gray-500">{booking.doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-600">{formatDate(booking.date)}</p>
                      <p className="text-sm text-gray-500">{booking.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have no past appointments.</p>
          )}
        </section>
      </div>
    </div>
  );
}