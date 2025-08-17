const User = require('../models/User');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password, role, specialty } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({ name, email, password, role });

    if (user && role === 'doctor') {
      // FIX: Intelligently add "Dr." prefix to prevent duplication like "Dr. Dr. Name"
      const doctorName = user.name.toLowerCase().startsWith('dr.') 
        ? user.name 
        : `Dr. ${user.name}`;

      await Doctor.create({
        user: user._id,
        name: doctorName,
        specialty: specialty || 'General Physician',
        experience: '0 years',
        status: 'pending', // MODIFIED: All new doctors are now pending approval
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
