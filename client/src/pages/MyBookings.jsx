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
    const fetchAndCategorizeBookings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError('');
        
        const { data } = await API.get('/api/bookings/mybookings');

        const validBookings = data.filter(booking => booking.doctor);

        // --- START: MODIFIED LOGIC ---
        const now = new Date(); // Get the current date and time

        const upcoming = [];
        const past = [];

        validBookings.forEach(booking => {
          // Combine the booking date and time into a single, precise Date object
          const datePart = new Date(booking.date).toISOString().split('T')[0];
          const appointmentDateTime = new Date(`${datePart}T${booking.time}`);

          // Compare the full appointment time with the current time
          if (appointmentDateTime >= now) {
            upcoming.push(booking);
          } else {
            past.push(booking);
          }
        });
        // --- END: MODIFIED LOGIC ---

        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        setUpcomingBookings(upcoming);
        setPastBookings(past);

      } catch (err) {
        setError('Failed to fetch your appointments. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCategorizeBookings();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateDateString(undefined, options);
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

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-green-200">
            Upcoming
          </h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking._id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-lg font-semibold text-green-700">Dr. {booking.doctor.name}</p>
                      <p className="text-sm text-gray-500">{booking.doctor.specialty}</p>
                      <p className="text-sm text-gray-500">📍 {booking.doctor.location}</p>
                    </div>
                    <div className="text-left sm:text-right">
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

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">
            Past
          </h2>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 opacity-70">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-lg font-semibold text-gray-600">Dr. {booking.doctor.name}</p>
                      <p className="text-sm text-gray-500">{booking.doctor.specialty}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-gray-600">{formatDate(booking.date)}</p>
                      <p className="text-sm text-gray-500">Completed</p>
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