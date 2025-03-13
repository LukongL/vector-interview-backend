# Vector Interview Backend

## Overview
Vector Interview is an asynchronous video interview platform designed to streamline the hiring process. This Node.js/Express backend manages interviews with JWT authentication and MongoDB integration.

## Features

### Core Features
- **User Authentication**
  - 🔐 Signup and login with JWT-based authentication
  - 🔒 Password hashing using bcryptjs
  - 🍪 HTTP-only cookies for secure token storage

- **Interview Management**
  - 📝 Create interviews with titles, descriptions, and questions
  - ✅ Input validation with `express-validator`
  - 🛡️ Protected routes with auth middleware

- **Database Integration**
  - 🗄️ MongoDB Atlas cloud database
  - 📊 Mongoose schema validation
  - 🧹 Automatic test database cleanup

### Security Features
- ⚡ Rate limiting (100 requests/15 minutes)
- 🔒 Security headers via Helmet
- 🌐 CORS whitelisting

## Technologies Used

### Backend Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: 
  - MongoDB Atlas (production)
  - MongoDB Memory Server (testing)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: 
  - bcryptjs (password hashing)
  - cors (CORS management)
  - helmet (security headers)

### Development Tools
- 📝 Swagger API documentation
- 🧪 Jest + Supertest (testing)
- 🔄 Nodemon (development server)
- ⚙️ dotenv (environment management)

## Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account **OR** Docker for local development
- cURL/Postman for API testing

### Setup Guide
	1. Clone repo:
	```bash
	git clone https://github.com/yourusername/vector-interview-backend.git
	cd vector-interview-backend
	
	2. Install dependencies:
	npm install
	
	3. Create .env file:
	
		# Required
	
		JWT_SECRET=your_jwt_secret_here
	
		VECTOR_MONGO_URI=mongodb+srv://<user>:<password>@cluster.example.mongodb.net/dbname
	
		CLIENT_URL=http://localhost:3000
		
		# Optional
	
		PORT=5000
	
	4. Start server:
	npm run dev  # Development mode with hot-reload
	npm start    # Production mode

### API Documentation
Access interactive documentation at http://localhost:5000/api-docs

📄 Additional details in [documentation.md](https://github.com/LukongL/vector-interview-backend/blob/main/documentation.md)

### Testing Strategy
	tests/
	├── auth.test.js         # Authentication tests
	├── interview.test.js    # Interview CRUD tests
	└── setup.js             # Test database configuration

### Run tests:
	npm test                 # Standard test run
	npm test -- --verbose    # Detailed output

	
### Best Practices

	🧪 100% test coverage for auth and interview flows

	🔄 CI/CD-ready test configuration
	
	🚨 Centralized error handling
	
	📊 Database indexing for query optimization
	
	📈 Request logging with Morgan

### Support

	Contact Maintainer
	
	📧 liliane.haniel@gmail.com
	
	🐛 Report Issues

### Troubleshooting

	Common Issues:
	
		EADDRINUSE: Stop processes on port 5000 or modify PORT
		
		MongoDB connection failures: Verify credentials in .env
		
		Test timeouts: Increase timeout in jest.config.js

### Diagnostic Commands:

	npm test -- --detectOpenHandles  # Identify resource leaks

	npm run dev -- --trace-warnings  # Debug MongoDB warnings

## License

	MIT License



