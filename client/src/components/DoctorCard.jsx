// client/src/components/DoctorCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
  // The image path from your database, e.g., "/images/doctor1.jpg"
  const imagePath = doctor.image;

  // A function to handle cases where the image fails to load
  const handleImageError = (e) => {
    // If an error occurs, replace the src with a placeholder image
    e.target.onerror = null; // Prevents infinite loops if the placeholder also fails
    e.target.src = `https://i.pravatar.cc/300?u=${doctor._id}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col">
      <img
        src={imagePath}
        alt={`Dr. ${doctor.name}`}
        onError={handleImageError} // This will run if the image is not found
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-green-700">Dr. {doctor.name}</h3>
        <p className="text-gray-600 font-medium">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-1">{doctor.experience} of experience</p>
        <p className="text-sm text-gray-500 mt-1">📍 {doctor.location}</p>
        
        {/* This pushes the button to the bottom of the card */}
        <div className="mt-auto pt-4">
          <Link to="/appointments">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-semibold">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}