const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createEvaluation } = require('../controllers/evaluationController');
const { validateEvaluation } = require('../middleware/validators');


/**
 * @swagger
 * /api/interviews/{interviewId}/evaluations:
 *   post:
 *     summary: Submit evaluation for an interview
 *     tags: [Evaluations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: interviewId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - scores
 *               - comments
 *             properties:
 *               scores:
 *                 type: object
 *                 properties:
 *                   technical:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                   communication:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                   problemSolving:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *               comments:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       201:
 *         description: Evaluation submitted successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Interview not found
 */

router.post(
  '/interviews/:interviewId/evaluations',
  auth,
  validateEvaluation,
  createEvaluation
);

module.exports = router;