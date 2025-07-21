const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_EXPIRY = '7d';

const registerUser = async (req, res) => {
      try {
        const { name, email, password } = req.body;
        console.log('Processing user registration request for:', email);
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Create new user
        const user = new User({ 
          name: name.trim(), 
          email: email.toLowerCase(), 
          password
        });
        
        await user.save();
        console.log('User account created successfully. User ID:', user._id);
    
        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: JWT_EXPIRY }
        );
    
        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: { 
            id: user._id, 
            name: user.name, 
            email: user.email 
          }
        });
        
      } catch (error) {
        console.error('Registration failed:', error.message);
        res.status(500).json({ error: error.message });
      }
}

// Actual login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Processing login request for:', email);
    

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('User authentication successful. User ID:', user._id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });
    
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: error.message });
  }
}

// Get current user (protected route)
const getUser = async (req, res) => {
  try {
    // User is already attached by authMiddleware
    res.json({ 
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('Failed to retrieve user information:', error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    registerUser,
    login,
    getUser
}