import React from 'react';

export default function DoctorCard({ name, specialty, experience, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-all">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-green-700">{name}</h3>
        <p className="text-gray-600">{specialty}</p>
        <p className="text-sm text-gray-500 mt-1">{experience} experience</p>
        <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
          Book Appointment
        </button>
      </div>
    </div>
  );
}
