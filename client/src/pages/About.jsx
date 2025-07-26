// src/pages/About.jsx
import React from 'react';
export default function About() {
  return (
    <div className="min-h-screen bg-green-50 px-6 py-12 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 text-center">
          About MediConnect
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
          MediConnect bridges the gap between patients and healthcare providers using modern technology.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🌍 Our Mission</h2>
            <p className="text-gray-700">
              To provide accessible, real-time, and hassle-free healthcare appointments to people around the world,
              empowering them with timely medical support and seamless booking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-600 mb-4">💡 Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Verified and trusted doctors</li>
              <li>Real-time availability & instant booking</li>
              <li>Secure and user-friendly dashboards</li>
              <li>Dedicated support for patients and doctors</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🔐 Privacy First</h2>
            <p className="text-gray-700">
              We respect your privacy. All your data is securely stored, and appointments are handled with utmost
              confidentiality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <h2 className="text-2xl font-bold text-green-600 mb-4">📈 Our Vision</h2>
            <p className="text-gray-700">
              To revolutionize how people connect with healthcare providers by using AI and modern tools to eliminate
              delays and confusion in the healthcare system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
