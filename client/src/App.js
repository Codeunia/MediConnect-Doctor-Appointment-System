// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments'; // ✅ Import Appointments

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/appointments" element={<Appointments />} /> {/* ✅ Added */}
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
