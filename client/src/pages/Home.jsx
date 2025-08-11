// src/pages/Home.jsx
import React, { useEffect, useState, useCallback } from 'react';
import DoctorCard from '../components/DoctorCard';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState('');

  const fetchDoctors = useCallback(async () => {
    try {
      const query = location ? `?location=${location}` : '';
      const res = await fetch(`/api/doctors${query}`);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }, [location]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Find Your Doctor
      </h1>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
}
