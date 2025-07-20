const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser)
router.post('/login', authController.login)

// Get current user (protected route)
router.get('/me', authController.getUser);

module.exports = router;