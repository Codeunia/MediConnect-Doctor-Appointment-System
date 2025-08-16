const User = require('../models/User');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  // We now expect 'specialty' from the frontend if the role is 'doctor'
  const { name, email, password, role, specialty } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({ name, email, password, role });

    // If the new user is a doctor, create their professional profile
    if (user && role === 'doctor') {
      await Doctor.create({
        user: user._id, // Link the user account to the doctor profile
        name: `Dr. ${user.name}`,
        specialty: specialty || 'General Physician', // Use selected specialty or a default
        experience: '0 years',
        // Location and other fields will use the defaults from the Doctor model
      });
    }

    if (user) {
      res.status(201).json({
        message: 'User registered successfully!',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
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