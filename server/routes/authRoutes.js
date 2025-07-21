const express = require('express');
const authController = require('../controllers/authController');

// Middlewares
const authMiddleware = require('../middleware/authMiddleware');
const validateRegister = require('../middleware/validateRegister');
const validateLogin = require('../middleware/validateLogin')

const router = express.Router();

router.post('/register', validateRegister, authController.registerUser)
router.post('/login', validateLogin, authController.login)

// Get current user (protected route)
router.get('/me', authMiddleware, authController.getUser);

module.exports = router;