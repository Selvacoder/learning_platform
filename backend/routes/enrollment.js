const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to handle enrollment submission
router.post('/enrollment/enroll', async (req, res) => {
    console.log('Received enrollment request:', req.body);
    const { username, email, courseName } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !courseName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Initialize the courses array if it doesn't exist
        if (!user.courses) {
            user.courses = []; // Initialize to an empty array if not present
        }

        // Check if the user is already enrolled in the course
        const isAlreadyEnrolled = user.courses.some(course => course.courseName === courseName);
        if (isAlreadyEnrolled) {
            return res.status(409).json({ message: 'Already enrolled in this course' });
        }

        // If not enrolled, add the course to the user's courses array
        user.courses.push({ courseName });
        const updatedUser = await user.save(); // Save the updated user

        // Check if the save was successful
        if (!updatedUser) {
            return res.status(500).json({ message: 'Error saving the updated user document' });
        }

        console.log("User successfully enrolled in course:", updatedUser);

        return res.status(201).json({
            message: 'Enrollment successful',
            user: {
                username: updatedUser.username,
                email: updatedUser.email,
                courses: updatedUser.courses,
            }
        });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
});

module.exports = router;
