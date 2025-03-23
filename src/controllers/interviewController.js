const mongoose = require('mongoose');
const Interview = require('../models/Interview');

const createInterview = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;

    // Validation using express-validator rules
    if (!title || !questions || questions.length === 0) {
      const error = new Error('Title and at least one question are required');
      error.statusCode = 400;
      throw error;
    }

    const interview = new Interview({
      title,
      description,
      questions,
      createdBy: req.userId,
    });

    await interview.save();
    res.status(201).json(interview);
  } catch (err) {
    next(err);
  }
};

const getInterviews = async (req, res, next) => {
  try {
    // Get pagination parameters from validated request
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Execute parallel queries for data and count
    const [interviews, total] = await Promise.all([
      Interview.find({ createdBy: req.userId })
        .select('-__v')
        .sort({ createdAt: -1 }) // Newest first
        .skip(skip)
        .limit(limit),
      
      Interview.countDocuments({ createdBy: req.userId })
    ]);

    res.json({
      totalInterviews: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      interviewsPerPage: limit,
      interviews
    });
  } catch (err) {
    next(err);
  }
};

const getInterview = async (req, res, next) => {
  try {
    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error('Invalid interview ID format');
      error.statusCode = 400;
      throw error;
    }

    const interview = await Interview.findOne({ 
      _id: req.params.id, 
      createdBy: req.userId 
    });

    if (!interview) {
      const error = new Error('Interview not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.json(interview);
  } catch (err) {
    next(err);
  }
};

module.exports = { createInterview, getInterviews, getInterview };

/*
const updateInterview = async (req, res, next) => {
  try {
    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error('Invalid interview ID format');
      error.statusCode = 400;
      throw error;
    }

    // Update and validate in single operation
    const updatedInterview = await Interview.findOneAndUpdate(
      { 
        _id: req.params.id,
        createdBy: req.userId 
      },
      req.body,
      { 
        new: true,         // Return updated document
        runValidators: true // Run model validations on update
      }
    );

    if (!updatedInterview) {
      const error = new Error('Interview not found');
      error.statusCode = 404;
      throw error;
    }

    res.json(updatedInterview);
  } catch (err) {
    next(err);
  }
};

const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });
    if (!interview) {
      const error = new Error('Interview not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Interview deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createInterview, getInterviews, getInterview, updateInterview, deleteInterview };
*/

