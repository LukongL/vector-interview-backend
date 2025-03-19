// src/routes/interview.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const interviewController = require('../controllers/interviewController');
const { validateInterview } = require('../middleware/validators');
const { validatePagination } = require('../middleware/validators');
const { uploadVideo } = require('../controllers/videoController');
const { upload } = require('../middleware/upload');

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

/**
 * @swagger
 * /api/interviews:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of interviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalInterviews:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 interviewsPerPage:
 *                   type: integer
 *                 interviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Interview'
 */

router.get(
    '/',
    auth,
    validatePagination,
    interviewController.getInterviews
  );

/**
 * @swagger
 * /api/interviews/{id}:
 *   get:
 *     summary: Get a single interview by ID
 *     tags: [Interviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interview details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Interview'
 *       404:
 *         description: Interview not found
 */

router.get('/:id', auth, interviewController.getInterview);

/**
 * @swagger
 * /api/interviews/{id}/video:
 *   put:
 *     summary: Upload video for an interview
 *     tags: [Interviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *       400:
 *         description: Invalid file type or size
 *       404:
 *         description: Interview not found
 */
router.put(
    '/:id/video',
    auth,
    upload.single('video'),
    uploadVideo
  );

module.exports = router;

/*
router.put('/:id', auth, validateInterviewUpdate, interviewController.updateInterview);

/**
 * @swagger
 * /api/interviews/{id}:
 *   put:
 *     summary: Update an existing interview
 *     tags: [Interviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Interview'
 *     responses:
 *       200:
 *         description: Updated interview
 *       404:
 *         description: Interview not found
 */

/*
router.delete('/:id', auth, interviewController.deleteInterview);
/**
 * @swagger
 * /api/interviews/{id}:
 *   delete:
 *     summary: Delete an interview
 *     tags: [Interviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Interview deleted
 *       404:
 *         description: Interview not found
 */
