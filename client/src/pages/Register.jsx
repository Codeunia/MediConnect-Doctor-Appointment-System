import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

const specialties = [
  "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist", 
  "Orthopedic Surgeon", "Gynecologist", "ENT Specialist", "Ophthalmologist",
  "Psychiatrist", "Oncologist", "General Physician"
];

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    specialty: '' 
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.role === 'doctor' && !formData.specialty) {
        setError('Please select a specialty.');
        return;
    }

    try {
      await API.post('/api/auth/register', formData);
      
      const loginData = await login({ email: formData.email, password: formData.password });
      
      if (loginData.user.role === 'doctor') {
        navigate('/profile'); // Redirect doctor to profile to complete details
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Create an Account</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex justify-around items-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formData.role === 'patient'}
                onChange={handleChange}
                className="form-radio text-green-600"
              />
              <span className="text-gray-700">I am a Patient</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={formData.role === 'doctor'}
                onChange={handleChange}
                className="form-radio text-green-600"
              />
              <span className="text-gray-700">I am a Doctor</span>
            </label>
          </div>

          {formData.role === 'doctor' && (
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">Specialty</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="">-- Select Specialty --</option>
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded-xl transition-all"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}