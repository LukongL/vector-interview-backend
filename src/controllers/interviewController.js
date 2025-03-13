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

module.exports = { createInterview };