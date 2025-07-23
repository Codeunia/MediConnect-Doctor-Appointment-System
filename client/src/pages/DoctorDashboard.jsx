import React from 'react';

const DoctorDashboard = () => {
  const appointments = [
    {
      id: 1,
      patient: 'Raj Sharma',
      date: '2025-07-20',
      time: '11:00 AM',
      status: 'Scheduled',
    },
    {
      id: 2,
      patient: 'Anjali Verma',
      date: '2025-07-21',
      time: '01:30 PM',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Doctor Dashboard</h1>
      <div className="bg-white border shadow rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">{appt.patient}</p>
                <p className="text-sm text-gray-500">
                  {appt.date} | {appt.time}
                </p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">
                {appt.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
