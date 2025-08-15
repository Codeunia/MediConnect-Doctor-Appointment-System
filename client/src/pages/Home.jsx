// client/src/pages/Home.jsx

import React, { useEffect, useState, useCallback } from 'react';
import DoctorCard from '../components/DoctorCard';
import API from '../api/axios';

export default function Home() {
  const [allDoctors, setAllDoctors] = useState([]); // To store the original list
  const [filteredDoctors, setFilteredDoctors] = useState([]); // To display
  
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  const [specialties, setSpecialties] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all doctors once on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await API.get('/api/doctors');
        setAllDoctors(data);
        setFilteredDoctors(data);

        // Get unique specialties and locations for the filter dropdowns
        const uniqueSpecialties = [...new Set(data.map(doc => doc.specialty))];
        const uniqueLocations = [...new Set(data.map(doc => doc.location))];
        setSpecialties(uniqueSpecialties.sort());
        setLocations(uniqueLocations.sort());

      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // This function will now filter the data on the frontend
  const applyFilters = useCallback(() => {
    let doctors = [...allDoctors];

    if (searchTerm) {
      doctors = doctors.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (specialtyFilter) {
      doctors = doctors.filter(doc => doc.specialty === specialtyFilter);
    }
    if (locationFilter) {
      doctors = doctors.filter(doc => doc.location === locationFilter);
    }

    setFilteredDoctors(doctors);
  }, [searchTerm, specialtyFilter, locationFilter, allDoctors]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSpecialtyFilter('');
    setLocationFilter('');
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Find and Book Your Doctor
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your health is our priority. Connect with trusted specialists.
        </p>

        {/* --- Search and Filter Bar --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by doctor's name..."
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow"
          >
            Filter
          </button>
        </div>

        {/* --- Filter Modal/Panel --- */}
        {isFilterOpen && (
          <div className="bg-white p-6 rounded-lg shadow-lg border mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <select 
                  value={specialtyFilter} 
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  value={locationFilter} 
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Locations</option>
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              {/* Reset Button */}
              <div className="flex items-end">
                <button 
                  onClick={handleResetFilters}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Display Area --- */}
        {loading && <p className="text-center text-gray-500">Loading doctors...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No doctors found matching your criteria.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}