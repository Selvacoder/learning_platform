const User = require('./models/userModel');


// Signupseserver.js",.js",
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user: ' + error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

// Logout
exports.logout = (req, res) => {
    // Here we assume the frontend handles logout (clearing session, etc.)
    res.status(200).json({ message: 'Logged out successfully!' });
};
