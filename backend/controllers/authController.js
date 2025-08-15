const User = require('../models/User');
const Doctor = require('../models/Doctor'); // Import the Doctor model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate a JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// --- REGISTER USER ---
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. Create the new user in the 'users' collection
    const user = await User.create({ name, email, password, role });

    // 3. START: Synchronize Doctor Profile
    // If the new user's role is 'doctor', automatically create a corresponding
    // document in the 'doctors' collection.
    if (user && role === 'doctor') {
      await Doctor.create({
        user: user._id, // Link to the user's ID
        name: `Dr. ${user.name}`,
        specialty: 'General Physician', // Assign a default specialty
        experience: '1 year', // Assign default experience
        location: 'To be updated', // Assign default location
        image: `/images/doctor-placeholder.jpg` // A default placeholder image
      });
    }
    // END: Synchronize Doctor Profile

    // 4. Respond with a success message
    if (user) {
      res.status(201).json({
        message: 'User registered successfully!',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error)
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// --- LOGIN USER ---
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: 'Login successful!',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};