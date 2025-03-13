// src/routes/interview.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const interviewController = require('../controllers/interviewController');
const { validateInterview } = require('../middleware/validators');

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: Interview management endpoints
 */

/**
 * @swagger
 * /api/interviews:
 *   post:
 *     summary: Create a new interview
 *     tags: [Interviews]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 example: Technical Interview
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 example: Backend developer position interview
 *                 maxLength: 500
 *               questions:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                   example: Explain REST principles
 *                 description: At least one question required
 *     responses:
 *       201:
 *         description: Interview created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Interview'
 *       400:
 *         description: Validation error (missing title/questions)
 *       401:
 *         description: Unauthorized (missing/invalid token)
 */
router.post('/', auth, validateInterview, interviewController.createInterview);

module.exports = router;