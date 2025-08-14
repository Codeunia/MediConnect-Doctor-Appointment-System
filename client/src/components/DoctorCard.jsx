// client/src/components/DoctorCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
  const imagePath = doctor.image;

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = `https://i.pravatar.cc/300?u=${doctor._id}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col">
      <div className="w-full h-48 bg-gray-100">
        <img
          src={imagePath}
          alt={`Dr. ${doctor.name}`}
          onError={handleImageError}
          className="w-full h-full object-contain" 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-green-700">Dr. {doctor.name}</h3>
        <p className="text-gray-600 font-medium">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-1">{doctor.experience} of experience</p>
        <p className="text-sm text-gray-500 mt-1">📍 {doctor.location}</p>
        
        <div className="mt-auto pt-4">
          {/* --- THIS IS THE CHANGE --- */}
          {/* We are now passing the doctor object in the link's state */}
          <Link to="/appointments" state={{ doctor: doctor }}>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-semibold">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}