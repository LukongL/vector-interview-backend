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
  		[vector-interview-backend](https://vector-interview-backend.onrender.com)

	
	2. Testing the Live Backend
	   
		Once deployed, tested on cURL the live backend using the provided Render URL.


---
<br><br>


# Task 2: Create Interview API

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

	Successfully tested POST /api/interviews using curl (successfully added data to MongoDB Atlas database - interviews collection):
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

 ### 

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
	
	👉 [Swagger UI](http://localhost:5000/api-docs)

## Updated Project Structure

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
---
<br><br>
 # Task 3: Interview Fetching & Pagination

## Features Implemented

### 1. Interview Fetching Endpoints
- **GET /api/interviews** - Get paginated list of interviews
- **GET /api/interviews/{id}** - Get single interview by ID

### 2. Pagination System
- Page number and limit parameters
- Response metadata (total interviews, pages, etc.)
- Input validation for pagination parameters

### 3. Security Enhancements
- Ownership checking for interview access
- MongoDB ID format validation

## Files Updated/Added

### 1. interviewController.js
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
	    // Validate MongoDB ID format first
	    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
	      const error = new Error('Invalid interview ID format');
	      error.statusCode = 400;
	      throw error;
	    }
	
	    const interview = await Interview.findOne({ 
	      _id: req.params.id, 
	      createdBy: req.userId 
	    }).select('-__v');
	
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

### 2. routes/interview.js
	// Updated routes:
	router.get('/', auth, validatePagination, getInterviews);
	router.get('/:id', auth, getInterview);

### 3. middleware/validators.js
	// Added pagination validation:
	exports.validatePagination = [
	query('page').optional().isInt({ min: 1 }),
	query('limit').optional().isInt({ min: 1, max: 100 })
	];

## Testing
**Testing APIs**

	1. Clear old cookies
	rm cookies.txt

	2. Login with proper cookie handling
	curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	--cookie-jar cookies.txt \
	-d '{"email":"test@example.com","password":"password123"}'

	3. Get interviews with cookies
	curl --cookie cookies.txt http://localhost:5000/api/interviews

**Testing Documentation**

	Get Paginated Interviews
	curl --cookie cookies.txt "http://localhost:5000/api/interviews?page=2&limit=5"
	Get Single Interview
	curl --cookie cookies.txt http://localhost:5000/api/interviews/65f31a1d9c9d4a3f4c7e7c7a

### API Documentation Updates
	Swagger UI now includes:
	Pagination parameters documentation
	New GET endpoints documentation
	Response schema examples
	Access updated docs at:
	👉 Swagger UI
 <img width="960" alt="swagger ui" src="https://github.com/user-attachments/assets/645f9c6b-359a-4c45-84a5-8af8ef619c0b" />




 ### Deployment on Render
<img width="662" alt="Render deployed" src="https://github.com/user-attachments/assets/36b9bb71-3f0f-4d19-a460-9a2cbb5e8b65" />
---
<br><br>


# Task 4: Video Upload & Management

## Features Implemented

### Video Upload System
- **Cloudinary Integration**
  - 🎥 Secure video file storage
  - 🔗 Automatic URL generation
  - ⏱ Duration extraction (seconds)
  
### Database Management
  - 💾 Stores video metadata in MongoDB:
    ```json
    {
      "video": {
        "public_id": "interview-videos/abc123",
        "url": "https://res.cloudinary.com/.../video.mp4",
        "duration": 120
      }
    }
    ```

### Validation & Security
- ✅ File type validation (MP4, MOV, AVI)
- 📏 Size limit: 50MB
- 🔒 Owner-only access control
- 🔑 JWT authentication required

---

## Implementation Details

### Files Added/Modified
1. **middleware/upload.js**
   ```javascript
   const upload = multer({
     storage: multer.memoryStorage(),
     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
     fileFilter: (req, file, cb) => {
       if (file.mimetype.startsWith('video/')) cb(null, true)
       else cb(new Error('Invalid file type'), false)
     }
   });

2. **models/Interview.js (Schema Update)**
	video: {
	  public_id: String,
	  url: String,
	  duration: Number
	}

4. **controllers/videoController.js**
	const result = await cloudinary.uploader.upload(req.file.buffer, {
	  resource_type: "video",
	  folder: "interview-videos"
	});

5. **routes/interview.js**
   	router.put('/:id/video', auth, upload.single('video'), uploadVideo);

6. config/cloudinary.js
	cloudinary.config({
	  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	  api_key: process.env.CLOUDINARY_API_KEY,
	  api_secret: process.env.CLOUDINARY_API_SECRET
	});
### Testing Documentation
	$ curl -X PUT http://localhost:5000/api/interviews/67d40f0609df34817caef235/video \
	  -b cookies.txt \
	  -H "Content-Type: multipart/form-data" \
	  -F "video=@./tests/videos/video1.mp4;type=video/mp4"
	{"message":"Video uploaded successfully","video":{"public_id":"interview-videos/ubd5vnutnmd0a9yzbwlj","url":"https://res.cloudinary.com/dm9dj05if/video/upload/v1742383504/interview-videos/ubd5vnutnmd0a9yzbwlj.mp4","duration":10}}

 <img width="960" alt="cloudinary-video1" src="https://github.com/user-attachments/assets/692bb917-2ed7-4306-91d7-7e87cc60b3e2" />

 ### Updated Project Structure
	 vector-interview-backend/
	├── config/
	│   └── cloudinary.js       # Cloudinary configuration
	├── middleware/
	│   └── upload.js           # File upload handling
	└── controllers/
	    └── videoController.js  # Video upload logic

### API Documentation Update
	Swagger Endpoint:
	PUT /api/interviews/{id}/video

### Security Considerations
	Authentication
	
		HTTP-only cookies for JWT
	
		Owner verification before upload
	
	Cloudinary Security
	
		Secure URLs (HTTPS)
	
		Private folder structure
	
		API key rotation
	
	Validation
	
		File type whitelisting
	
		Server-side size validation
	
		MIME type verification
	
	Rate Limiting
	
		100 requests/15 minutes
	
		Separate limit for video endpoints

