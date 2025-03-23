const Evaluation = require('../models/Evaluation');
const Interview = require('../models/Interview');

const createEvaluation = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.interviewId);
    
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    const evaluation = new Evaluation({
      interview: req.params.interviewId,
      evaluator: req.userId,
      ...req.body
    });

    await evaluation.save();
    
    res.status(201).json({
      message: 'Evaluation submitted successfully',
      evaluation
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createEvaluation };