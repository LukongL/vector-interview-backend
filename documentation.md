# What I've Completed So Far

## Task 1

### Project Setup:

	Initialized a Node.js project with npm init.

	Installed necessary dependencies (express, mongoose, jsonwebtoken, bcryptjs, dotenv, cors).

	Set up the folder structure (src/controllers, src/models, src/routes, src/middleware).

### Environment Configuration:

	Created a .env file to store environment variables (PORT, MONGO_URI, JWT_SECRET).

	Loaded environment variables using dotenv.

### Express Server Setup:

	Created an Express server in server.js.

	Configured middleware (cors, express.json).

### MongoDB Connection:

	Connected to MongoDB Atlas using Mongoose.

	Handled connection errors and logged success/error messages.

### Authentication System:

	Created a User model with fields for name, email, and password.

	Implemented password hashing using bcryptjs.

	Created routes for user signup and login (/api/auth/signup, /api/auth/login).

	Generated JWT tokens upon successful signup/login.

#### Protected Route:

	Created an auth middleware to verify JWT tokens.

	Implemented a protected route (/api/protected) to demonstrate authentication.

### Testing:

	Tested the signup, login, and protected routes using curl.

	Verified that the authentication system works as expected.

