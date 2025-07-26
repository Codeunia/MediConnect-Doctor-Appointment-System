// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import DoctorCard from '../components/DoctorCard';
export default function Home() {
  const navigate = useNavigate(); 
  return (
    <div className="px-4 sm:px-8 md:px-16 py-12 bg-white text-gray-800">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">MediConnect</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Book Appointments, Anytime, Anywhere. Connect with top doctors and healthcare providers near you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/appointments')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Book Appointment
          </button>

          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            My Bookings
          </button>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-blue-700">Verified Doctors</h2>
          <p className="mt-2 text-sm">Certified and trusted professionals only.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-blue-700">Real-time Scheduling</h2>
          <p className="mt-2 text-sm">See and book slots instantly.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-blue-700">Role-based Dashboards</h2>
          <p className="mt-2 text-sm">Separate portals for doctors, patients, and admins.</p>
        </div>
      </section>
    </div>
  );
}
