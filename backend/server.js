// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes from the './routes' directory
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

// --- START: DEFINITIVE CORS SOLUTION ---
// This middleware will run on every request and manually add the required headers.
// This is a more direct approach than just using the cors() package alone.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  // For pre-flight requests, which browsers send first to check CORS.
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// --- END: DEFINITIVE CORS SOLUTION ---


// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/doctors', doctorRoutes);

// Basic route to confirm the API is running
app.get('/', (req, res) => {
  res.send('MediConnect API is up and running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));