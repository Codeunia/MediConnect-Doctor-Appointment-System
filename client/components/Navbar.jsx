import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0C134F] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#E7B10A] hover:text-white transition-colors">
          MediConnect
        </Link>
        <div className="space-x-6 text-lg hidden md:flex">
          <Link to="/" className="hover:text-[#E7B10A] transition-colors">Home</Link>
          <Link to="/about" className="hover:text-[#E7B10A] transition-colors">About</Link>
          <Link to="/appointments" className="hover:text-[#E7B10A] transition-colors">Appointments</Link>
          <Link to="/contact" className="hover:text-[#E7B10A] transition-colors">Contact</Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu icon will be added later */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
