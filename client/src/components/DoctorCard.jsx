import React from 'react';

const DoctorCard = ({ name, specialty, location, image }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#1D267D]"
      />
      <h3 className="text-xl font-semibold text-[#1D267D] text-center">{name}</h3>
      <p className="text-sm text-gray-600 text-center">{specialty}</p>
      <p className="text-sm text-gray-500 text-center">{location}</p>
    </div>
  );
};

export default DoctorCard;
