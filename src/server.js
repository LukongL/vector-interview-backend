const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const interviewRoutes = require('./routes/interview');
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vector Interview API',
      version: '1.0.0',
      description: 'API documentation for Vector Interview Backend',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});

// Trust first proxy (Render uses proxies)
app.set('trust proxy', 1); 

// Middleware (order matters!)
app.use(helmet()); // Security headers first
app.use(limiter); // Rate limiting early
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB only in non-test environments
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.VECTOR_MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.error('Check your environment variables.');
    });
}

// Routes
app.get('/', (req, res) => {
  res.send('Vector Interview Backend is running!');
});
app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);

// Error handling (must be last!)
app.use(errorHandler);

// Export the app (for testing)
module.exports = app;

// Start the server only if run directly (not imported)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API docs: http://localhost:${PORT}/api-docs`);
  });
}