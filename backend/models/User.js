const mongoose = require('mongoose');

// Define the Course schema first
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
});

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    courses: [courseSchema], // Embed the Course schema as an array of subdocuments
}, { timestamps: true }); // Include createdAt and updatedAt timestamps

// Export the User model
module.exports = mongoose.model('User', UserSchema);
