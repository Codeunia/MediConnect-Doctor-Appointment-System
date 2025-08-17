import React, { useState, useEffect, useCallback, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

// --- Sub-component for User Management Tab ---
const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await API.get('/api/admin/users');
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/api/admin/users/${userId}`);
        fetchUsers(); 
      } catch (err) {
        alert('Failed to delete user.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4 capitalize">{u.role}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- NEW: Sub-component for Doctor Approvals Tab ---
const DoctorApprovals = () => {
    const [doctors, setDoctors] = useState([]);
    const fetchPendingDoctors = useCallback(async () => {
        try {
            const { data } = await API.get('/api/admin/doctors/pending');
            setDoctors(data);
        } catch (error) {
            console.error("Failed to fetch pending doctors", error);
        }
    }, []);

    useEffect(() => {
        fetchPendingDoctors();
    }, [fetchPendingDoctors]);

    const handleStatusUpdate = async (id, status) => {
        if (window.confirm(`Are you sure you want to ${status} this doctor?`)) {
            try {
                await API.put(`/api/admin/doctors/${id}/status`, { status });
                alert(`Doctor has been ${status}.`);
                fetchPendingDoctors(); // Refresh the list
            } catch (error) {
                alert('Action failed.');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pending Doctor Approvals</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {doctors.length > 0 ? doctors.map(doc => (
                            <tr key={doc._id}>
                                <td className="px-6 py-4">{doc.name}</td>
                                <td className="px-6 py-4">{doc.specialty}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => handleStatusUpdate(doc._id, 'approved')} className="font-semibold text-green-600 hover:text-green-800">Approve</button>
                                    <button onClick={() => handleStatusUpdate(doc._id, 'rejected')} className="font-semibold text-red-600 hover:text-red-800">Reject</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="3" className="text-center py-10 text-gray-500">No pending doctor applications.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Main Dashboard Component ---
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-20 text-red-600">Access Denied.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('users')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              User Management
            </button>
            <button onClick={() => setActiveTab('approvals')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'approvals' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Doctor Approvals
            </button>
          </nav>
        </div>

        <div>
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'approvals' && <DoctorApprovals />}
        </div>
      </div>
    </div>
  );
}
