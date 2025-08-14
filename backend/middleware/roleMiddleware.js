// backend/middleware/roleMiddleware.js

// This middleware checks if the user has the 'admin' role
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware/controller
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};