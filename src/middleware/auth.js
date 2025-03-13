//middleware to verify JWT tokens for protected routes
const jwt = require('jsonwebtoken');

// middleware/auth.js
const auth = (req, res, next) => {
    const token = req.cookies.token; // Read from cookie instead of header
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  module.exports = auth;