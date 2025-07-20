const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.registerUser)
router.post('/login', authController.login)

// Get current user (protected route)
router.get('/me', authMiddleware, authController.getUser);

module.exports = router;