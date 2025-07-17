import React, { useState } from 'react';

const Appointments = () => {
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked for ${formData.name} with Dr. ${formData.doctor}`);
    setFormData({ name: '', doctor: '', date: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-6 py-12">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-[#1D267D] mb-6 text-center">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
            />
          </div>

          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
              Choose Doctor
            </label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
            >
              <option value="">Select Doctor</option>
              <option value="Rahul Mehta">Dr. Rahul Mehta (Cardiologist)</option>
              <option value="Sana Iqbal">Dr. Sana Iqbal (Dermatologist)</option>
              <option value="Arun Patel">Dr. Arun Patel (General Physician)</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0C134F] hover:bg-[#1D267D] text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointments;
