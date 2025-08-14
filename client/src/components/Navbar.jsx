import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-green-600">
          MediConnect
        </Link>

        {/* Desktop Nav Links */}
        <div className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 transition">
            About
          </Link>
          
          {/* Show these links only if a user is logged in */}
          {user && (
            <>
              <Link to="/appointments" className="text-gray-700 hover:text-green-600 transition">
                Book Appointment
              </Link>
              <Link to="/my-bookings" className="text-gray-700 hover:text-green-600 transition">
                My Bookings
              </Link>
            </>
          )}

          {/* Show Doctor Dashboard link only if the user is a doctor */}
          {user && user.role === 'doctor' && (
            <Link to="/doctor-dashboard" className="text-gray-700 hover:text-green-600 transition">
              Doctor Dashboard
            </Link>
          )}

        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            // If user is logged in, show their name and a Logout button
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-medium">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            // If user is logged out, show Login and Register buttons
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
