// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Example login logic
    const isValid = true;
    if (!isValid) {
      setError('Invalid email or password. Please try again.');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Login to MediConnect</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded-xl transition-all"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
