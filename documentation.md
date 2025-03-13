## Tasks Completed So Far


# Task 1 Project Setup & signup/Login 

### Project Setup:

	Initialized a Node.js project with npm init.

	Installed necessary dependencies (express, mongoose, jsonwebtoken, bcryptjs, dotenv, cors).

	Set up the folder structure (src/controllers, src/models, src/routes, src/middleware).

	  	vector-interview-backend/
		├── src/
		│   ├── controllers/        # Route handlers
		│   ├── models/             # Database models
		│   ├── routes/             # API routes
		│   ├── middleware/         # Custom middleware (e.g., auth)
		│   └── server.js           # Entry point
		├── .env                    # Environment variables
		├── .gitignore              # Files to ignore in Git
		├── package.json            # Project dependencies and scripts
		└── README.md               # Project documentation

### Environment Configuration:

	Created a .env file to store environment variables (PORT, VECTOR_MONGO_URI, JWT_SECRET).
		PORT=5000
		VECTOR_MONGO_URI=mongodb+srv://<username>:<password>@cluster1.scljo.mongodb.net/vector-database?retryWrites=true&w=majority
		JWT_SECRET=my_jwt_secret_key

	Loaded environment variables using dotenv.
 		const dotenv = require('dotenv');
		dotenv.config();

### Express Server Setup:

	Created an Express server in server.js.
		const express = require('express');
		const app = express();
		
		// Start the server
		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
		    console.log(`Server is running on port ${PORT}`);
		});

	Configured middleware (cors, express.json).
		 // Middleware
		app.use(cors());
		app.use(express.json());

### MongoDB Connection:

	Connected to MongoDB Atlas using Mongoose.
	 	mongoose.connect(process.env.MONGO_URI)
	    	.then(() => console.log('MongoDB connected'))
	    	.catch(err => console.error('MongoDB connection error:', err));

	Handled connection errors and logged success/error messages.

### Authentication System:

	Created a User model with fields for name, email, and password.

	Implemented password hashing using bcryptjs.

	Created routes for user signup and login in src/routes/auth.js (/api/auth/signup, /api/auth/login).

	Generated JWT tokens upon successful signup/login.

#### Protected Route:

	Created an auth middleware to verify JWT tokens.

	Implemented a protected route (/api/protected) to demonstrate authentication.

### Testing:

	Tested the signup, login, and protected routes using curl.

	Verified that the authentication system works as expected.

### Deployment

1. Deployment to Render
   
	The backend application is deployed on Render, a cloud platform for hosting web services.

2. Testing the Live Backend
   
	Once deployed, tested on cURL the live backend using the provided Render URL.


---
<br><br>


# Task 2: Interview API

## Features

### 1. Created Interview Model

	const mongoose = require('mongoose');
	const interviewSchema = new mongoose.Schema({
	    title: { type: String, required: true, minlength: 5, maxlength: 100 },
	    description: { type: String, maxlength: 500 },
	    questions: [{ type: String, required: true, minlength: 5, maxlength: 200 }],
	    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	    createdAt: { type: Date, default: Date.now }
	});
	module.exports = mongoose.model('Interview', interviewSchema);
 
 ### 2. Created Interview Routes
	const express = require('express');
	const router = express.Router();
	const auth = require('../middleware/auth');
	const interviewController = require('../controllers/interviewController');
	const { validateInterview } = require('../middleware/validators');
	
	// Create an interview
	router.post('/', auth, validateInterview, interviewController.createInterview);
	
	module.exports = router;

### 3. Mounted Interview Routes & Tested API

	Successfully tested POST /api/interviews using curl:
	 curl -X POST http://localhost:5000/api/interviews \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <JWT_TOKEN>" \
	-d '{
	    "title": "Software Engineer Interview",
	    "description": "Technical interview for software engineering role",
	    "questions": [
	        "What is your experience with Node.js?",
	        "Explain REST APIs."
	    ]
	}'

 ## Error Handling & Security Improvements

### 1. Centralized Error Handling

Created errorHandler.js to format all errors consistently.

Controllers now pass errors to next() for cleaner code.

#### 2. Input Validation

Used express-validator to validate requests for /signup, /login, and interview creation.

### 3. Security Enhancements

JWT in HTTP-Only Cookies (instead of response body).

Rate Limiting via express-rate-limit to prevent brute-force attacks.

Helmet Headers for secure HTTP headers.

### 4. Logging

Used morgan('dev') for HTTP request logging.

## Testing

### 1. Jest + Supertest Integration

Added unit tests for /signup, /login, and interview creation.

Used mongodb-memory-server for isolated testing.

	Test Suites: 2 passed, 2 total
	Tests:       2 passed, 2 total
	Time:        10.16 s

 ## API Documentation
 
 Swagger/OpenAPI Docs

Integrated swagger-jsdoc and swagger-ui-express.

API documentation available at:

👉 Swagger UI

## Second Project Structure

vector-interview-backend/

├── src/

│   ├── controllers/       # Business logic

│   ├── middleware/        # Auth, error handling, validators

│   ├── models/            # MongoDB schemas

│   ├── routes/            # Express routes

│   ├── utils/             # Token generation

│   └── server.js          # App entry point

├── tests/                 # Jest tests

│   ├── auth.test.js

│   ├── interview.test.js

│   └── setup.js

├── .env                   # Environment variables

└── package.json           # Scripts and dependencies

## Key Tools Used

✅ Security: helmet, express-rate-limit, cookie-parser
✅ Validation: express-validator
✅ Testing: jest, supertest, mongodb-memory-server
✅ Docs: swagger-jsdoc, swagger-ui-express
✅ Logging: morgan

