import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#C6DCBA] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-[#1D267D] mb-6">
        Welcome to MediConnect
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        Your trusted platform for booking doctor appointments, managing your medical schedule, and accessing health services — anytime, anywhere.
      </p>
      <div className="space-x-4">
        <Link
          to="/appointments"
          className="bg-[#0C134F] hover:bg-[#1D267D] text-white font-semibold px-6 py-3 rounded-full transition duration-300"
        >
          Book Appointment
        </Link>
        <Link
          to="/about"
          className="bg-white border border-[#1D267D] text-[#1D267D] hover:bg-[#EEF5FF] font-semibold px-6 py-3 rounded-full transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;
