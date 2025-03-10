const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth'); // Import the auth middleware


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.VECTOR_MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        console.error('Full error:', err);
        console.log('MONGO_URI:', process.env.VECTOR_MONGO_URI);
    });


// Routes
app.get('/', (req, res) => {
    res.send('Vector Interview Backend is running!');
});
app.use('/api/auth', authRoutes);

// Protected Route
//app.get('/api/protected', auth, (req, res) => {
   // res.json({ message: 'This is a protected route', userId: req.userId });
//});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});