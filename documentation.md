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

