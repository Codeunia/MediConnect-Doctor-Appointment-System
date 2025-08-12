import React, { useEffect, useState, useCallback } from 'react';
import DoctorCard from '../components/DoctorCard';
import API from '../api/axios'; // Your proxy-enabled axios instance

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState(''); // State for the search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const query = location ? `?location=${location}` : '';
      const { data } = await API.get(`/api/doctors${query}`);
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      // More specific error message for the user
      if (err.response && err.response.status === 403) {
        setError("Error: Connection Forbidden. This is likely a firewall issue on your computer.");
      } else {
        setError("Failed to load doctors. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [location]); // Re-run the fetch when the location changes

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
        Find & Book Your Doctor
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Search by location to find the best specialists near you.
      </p>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location (e.g., Delhi, Mumbai...)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
        />
      </div>

      {/* Display Area */}
      {loading && <p className="text-center text-gray-500">Loading doctors...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {doctors.length > 0 ? (
            doctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No doctors found. Try a different location or clear the search.
            </p>
          )}
        </div>
      )}
    </div>
  );
}