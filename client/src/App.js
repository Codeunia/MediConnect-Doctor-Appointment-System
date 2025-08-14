// client/src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import your components and pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import MyBookings from './pages/MyBookings';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard'; // 👈 Import the new page

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-white min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* --- Protected Routes for Patients & Doctors --- */}
              <Route
                path="/appointments"
                element={<ProtectedRoute><Appointments /></ProtectedRoute>}
              />
              <Route
                path="/my-bookings"
                element={<ProtectedRoute><MyBookings /></ProtectedRoute>}
              />
              <Route
                path="/doctor-dashboard"
                element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}
              />

              {/* --- New Protected Admin Route --- */}
              <Route
                path="/admin-dashboard"
                element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;