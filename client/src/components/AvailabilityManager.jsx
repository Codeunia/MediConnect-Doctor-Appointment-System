// client/src/components/AvailabilityManager.jsx

import React, { useState } from 'react';
import API from '../api/axios';

// Helper to generate time options in 30-min increments (e.g., 09:00, 09:30)
const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = String(i).padStart(2, '0');
    times.push(`${hour}:00`);
    times.push(`${hour}:30`);
  }
  return times;
};

export default function AvailabilityManager() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!date) {
      setError('Please select a date.');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/api/availability', { date, startTime, endTime });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to set availability.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Your Availability</h2>
      
      {message && <p className="text-green-600 bg-green-50 p-3 rounded-md mb-4">{message}</p>}
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-md mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Start Time Selector */}
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              {timeOptions.map(time => <option key={`start-${time}`} value={time}>{time}</option>)}
            </select>
          </div>

          {/* End Time Selector */}
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
            <select
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              {timeOptions.map(time => <option key={`end-${time}`} value={time}>{time}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-sm disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Set Availability'}
          </button>
        </div>
      </form>
    </div>
  );
}