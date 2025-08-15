const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import all your route files
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const userRoutes = require('./routes/userRoutes'); // For user profiles

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// --- API Routes ---
// Use the imported routers for your API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/users', userRoutes); // Use the new user routes

// --- Database Connection and Server Startup ---
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to the database using the URI from your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
    console.log(`✅ Connected to database: "${mongoose.connection.name}"`);

    // Start listening for requests ONLY after the database connection is successful
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  } catch (err) {
    // If the connection fails, log the error and stop the server
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Call the function to start the server
startServer();