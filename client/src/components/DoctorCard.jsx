// src/components/DoctorCard.jsx
import React from 'react';

export default function DoctorCard({ name, specialty, rating }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-green-700">{name}</h3>
      <p className="text-sm text-gray-600">{specialty}</p>
      <p className="text-sm mt-1 text-yellow-500">⭐ {rating}</p>
    </div>
  );
}
