const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const interviewRoutes = require('./routes/interview');
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});

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
  });
}