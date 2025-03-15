// src/middleware/validators.js
const { body, validationResult } = require('express-validator');

// Validation rules for signup
exports.validateSignup = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),

  body('email')
    .trim()
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Validation rules for login
exports.validateLogin = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
];

exports.validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .default(1),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100')
    .default(10)
];

// Validation rules for interview creation
exports.validateInterview = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be ≤500 characters'),

  body('questions')
    .isArray({ min: 1 }).withMessage('At least one question is required'),

  body('questions.*')
    .trim()
    .notEmpty().withMessage('Question cannot be empty')
    .isLength({ min: 5, max: 200 }).withMessage('Questions must be 5-200 characters'),
];

/*
exports.validateInterviewUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be ≤500 characters'),

  body('questions')
    .optional()
    .isArray({ min: 1 }).withMessage('At least one question is required'),

  body('questions.*')
    .optional()
    .trim()
    .notEmpty().withMessage('Question cannot be empty')
    .isLength({ min: 5, max: 200 }).withMessage('Questions must be 5-200 characters'),

  body().custom((value, { req }) => {
    const updatableFields = ['title', 'description', 'questions'];
    const hasValidField = updatableFields.some(field => req.body[field] !== undefined);
    
    if (!hasValidField) {
      throw new Error('At least one field must be provided for update');
    }
    return true;
  })
];
*/