const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
      try {
        const { name, email, password } = req.body;
        
        console.log('📝 Registration attempt:', { name, email }); // Debug log
        
        // Validate input
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'Name, email and password are required' });
        }
    
        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        
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
    
        console.log('✅ User created successfully:', user._id); // Debug log
    
        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: '7d' }
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
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: error.message });
      }
}

// login or getuser?
const login = async (req, res) => {
      try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

const getUser = (req, res) => {
    // None
}

module.exports = {
    registerUser,
    login,
    getUser
}