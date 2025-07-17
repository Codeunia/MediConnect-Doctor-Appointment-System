import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="bg-[#1D267D] text-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#E7B10A] mb-6 leading-tight">
          MediConnect – Book Appointments, Anytime, Anywhere.
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Connect with top doctors and healthcare providers near you. Easy scheduling. Real-time availability.
        </p>
        <Link
          to="/appointments"
          className="inline-block bg-[#E7B10A] text-[#1D267D] font-semibold px-6 py-3 rounded-full text-lg hover:bg-white hover:text-[#0C134F] transition duration-300"
        >
          Book Appointment
        </Link>
      </section>

      <section className="mt-20 grid md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        <div className="bg-[#0C134F] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#E7B10A] mb-2">Verified Doctors</h3>
          <p className="text-gray-300">We only list certified, experienced, and trusted medical professionals.</p>
        </div>
        <div className="bg-[#0C134F] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#E7B10A] mb-2">Real-time Scheduling</h3>
          <p className="text-gray-300">Instantly see and book available slots without waiting.</p>
        </div>
        <div className="bg-[#0C134F] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-[#E7B10A] mb-2">Role-based Dashboards</h3>
          <p className="text-gray-300">Separate panels for doctors, patients, and admins to manage appointments easily.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
