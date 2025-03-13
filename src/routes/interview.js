// src/routes/interview.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const interviewController = require('../controllers/interviewController');
const { validateInterview } = require('../middleware/validators'); // Add this

// Create an interview with validation
router.post('/', auth, validateInterview, interviewController.createInterview);

module.exports = router;