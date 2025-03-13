// src/controllers/authController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/auth'); // Import utility

// Signup Controller
const signup = async (req, res, next) => {
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.data = errors.array();
    return next(error);
  }

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate and set token in HTTP-only cookie
    const token = generateToken(user._id); // ✅ Use utility function
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

// Login Controller
const login = async (req, res, next) => {
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.data = errors.array();
    return next(error);
  }

  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Generate and set token in HTTP-only cookie
    const token = generateToken(user._id); // ✅ Use utility function
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };