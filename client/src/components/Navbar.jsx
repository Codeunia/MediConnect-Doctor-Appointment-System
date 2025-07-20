// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-green-600">MediConnect</Link>

        {/* Desktop Nav Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 transition">About</Link>
          <Link to="/appointments" className="text-gray-700 hover:text-green-600 transition">Appointments</Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600 transition">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
