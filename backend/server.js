const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import auth routes
const enrollmentRoutes = require('./routes/enrollment');
const User = require('./models/User');  // Adjust the path if necessary


dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Allow credentials like cookies
}));

// Handle CORS preflight requests
app.options('*', (req, res) => {
    res.sendStatus(200); // Handle OPTIONS request
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-platform')
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Routes
app.use('/api/auth', authRoutes); // Use the authRoutes for signup/login
app.use('/api', enrollmentRoutes); // Use the enrollment route for course enrollment


app.get('/api/courses', async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if courses exist
      if (user.courses && user.courses.length > 0) {
        return res.json(user.courses);  // Send back the courses
      } else {
        return res.json([]);  // If no courses, return an empty array
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching courses', error: err });
    }
  });
  

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is working');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
