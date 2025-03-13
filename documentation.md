## Tasks Completed So Far


# Task 1

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


# Task 2

1. Created the Interview Model in MongoDB using Mongoose

	src/models/Interview.js:
	
	const mongoose = require('mongoose');
	
	const interviewSchema = new mongoose.Schema({
	    title: { 
	        type: String, 
	        required: true,
	        minlength: 5,
	        maxlength: 100,
	    },
	    description: { 
	        type: String, 
	        maxlength: 500,
	    },
	    questions: [{ 
	        type: String, 
	        required: true,
	        minlength: 5,
	        maxlength: 200,
	    }],
	    createdBy: { 
	        type: mongoose.Schema.Types.ObjectId, 
	        ref: 'User', 
	        required: true,
	    },
	    createdAt: { 
	        type: Date, 
	        default: Date.now,
	    },
	});
	
	module.exports = mongoose.model('Interview', interviewSchema);


3. Created the Interview Routes
   Started with creating endpoints


Create a new file src/routes/interview.js:
1. Error Handling
Centralized Error Middleware:
Created errorHandler.js to catch and format all errors consistently.
Controllers now pass errors to next() instead of sending responses directly.
Result: Cleaner code, standardized error responses, and easier debugging.

2. Input Validation
Structured Validation with express-validator:
Added validation rules for /signup, /login, and interview creation in validators.js.
Controllers check validation results before processing requests.
Result: Safer inputs, reduced manual checks, and detailed error messages.

3. Security Improvements
JWT in HTTP-Only Cookies:
Tokens are stored in secure, HTTP-only cookies (instead of response bodies).
Added cookie-parser middleware.
Rate Limiting:
Added express-rate-limit to prevent brute-force attacks.
Helmet Headers:
Enabled secure HTTP headers via helmet().
Result: Reduced risk of XSS, CSRF, and brute-force attacks.

4. Logging
HTTP Request Logging with morgan:
Added morgan('dev') to log requests (e.g., GET /api/interviews 200 15ms).
Result: Better monitoring and debugging of API activity.

5. Testing
Jest + Supertest Integration:
Added unit tests for /signup, /login, and interview creation.
Used mongodb-memory-server for isolated testing.
Result: Reliable tests to catch regressions and edge cases.

6. API Documentation
Swagger/OpenAPI Docs:
Added swagger-jsdoc and swagger-ui-express.
Documented endpoints with JSDoc comments.
Result: Interactive API docs at http://localhost:5000/api-docs.

7. Project Structure
vector-interview-backend/
├── src/
│   ├── controllers/       # Business logic (authController, interviewController)
│   ├── middleware/        # Auth, error handling, validators
│   ├── models/            # MongoDB schemas (User, Interview)
│   ├── routes/            # Express routes (auth, interview)
│   ├── utils/             # Token generation (auth.js)
│   └── server.js          # App entry point
├── tests/                 # Jest tests
│   ├── auth.test.js
│   ├── interview.test.js
│   └── setup.js
├── .env                   # Environment variables
└── package.json           # Updated scripts and dependencies


Key Tools Added
Security: helmet, express-rate-limit, cookie-parser.
Validation: express-validator.
Testing: jest, supertest, mongodb-memory-server.
Docs: swagger-jsdoc, swagger-ui-express.
Logging: morgan.


