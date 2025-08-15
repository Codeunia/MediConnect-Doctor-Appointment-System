// backend/middleware/roleMiddleware.js

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// --- ADD THIS NEW FUNCTION ---
exports.isDoctor = (req, res, next) => {
  if (req.user && req.user.role === 'doctor') {
    next(); // User is a doctor, proceed
  } else {
    res.status(403).json({ message: 'Not authorized as a doctor' });
  }
};