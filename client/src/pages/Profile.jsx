// client/src/pages/Profile.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

// --- Main Profile Page Component ---
export default function Profile() {
  const { user } = useContext(AuthContext);
  
  // State to control which modal is open ('editDoctor', 'changePassword', or null)
  const [modal, setModal] = useState(null); 
  
  // State to hold the doctor's professional details
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the logged-in user is a doctor, fetch their professional profile
    if (user && user.role === 'doctor') {
      const fetchDoctorProfile = async () => {
        try {
          const { data } = await API.get('/api/doctors/profile');
          setDoctorProfile(data);
        } catch (error) {
          console.error("Failed to fetch doctor profile", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDoctorProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-20">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- User Account Details Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Account</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p className="capitalize"><strong>Role:</strong> {user?.role}</p>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => setModal('changePassword')}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* --- Doctor Professional Details Card (only for doctors) --- */}
        {user && user.role === 'doctor' && doctorProfile && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Public Doctor Profile</h2>
            <div className="space-y-2">
              <p><strong>Display Name:</strong> {doctorProfile.name}</p>
              <p><strong>Specialty:</strong> {doctorProfile.specialty}</p>
              <p><strong>Experience:</strong> {doctorProfile.experience}</p>
              <p><strong>Location:</strong> {doctorProfile.location}</p>
              <p><strong>Phone:</strong> {doctorProfile.phone}</p>
              <p><strong>Consultation Hours:</strong> {doctorProfile.consultationHours}</p>
              <p><strong>Bio:</strong> {doctorProfile.bio}</p>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setModal('editDoctor')}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Edit Doctor Details
              </button>
            </div>
          </div>
        )}

        {/* --- Modals for Editing --- */}
        {modal === 'editDoctor' && (
          <EditDoctorProfileModal 
            profile={doctorProfile}
            onClose={() => setModal(null)}
            onSave={(updatedProfile) => {
              setDoctorProfile(updatedProfile);
              setModal(null);
            }}
          />
        )}
        {modal === 'changePassword' && (
          <ChangePasswordModal onClose={() => setModal(null)} />
        )}
      </div>
    </div>
  );
}


// --- Modal Component for Editing Doctor Profile ---
const EditDoctorProfileModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState(profile);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put('/api/doctors/profile', formData);
      onSave(data); // Pass the updated data back to the parent
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Doctor Details</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Display Name" className="w-full p-2 border rounded" />
          <input name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Specialty" className="w-full p-2 border rounded" />
          <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" className="w-full p-2 border rounded" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" />
          <input name="consultationHours" value={formData.consultationHours} onChange={handleChange} placeholder="Consultation Hours (e.g., 10 AM - 5 PM)" className="w-full p-2 border rounded" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short Bio" className="w-full p-2 border rounded" />
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Modal Component for Changing Password ---
const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setError('');
    setMessage('');
    try {
      const { data } = await API.put('/api/users/profile/password', { currentPassword, newPassword });
      setMessage(data.message);
      // Clear fields after success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Change Your Password</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" required className="w-full p-2 border rounded" />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required className="w-full p-2 border rounded" />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required className="w-full p-2 border rounded" />
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};