// src/components/DoctorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
  // Use a default image if none is provided
  const imageUrl = doctor.image || `https://i.pravatar.cc/300?u=${doctor._id}`;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <img
        src={imageUrl}
        alt={`Dr. ${doctor.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-green-700">Dr. {doctor.name}</h3>
        <p className="text-gray-600 font-medium">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-1">{doctor.experience} of experience</p>
        <p className="text-sm text-gray-500 mt-1">📍 {doctor.location}</p>
        
        <Link to="/appointments">
          <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-semibold">
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
}