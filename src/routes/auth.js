const express = require('express');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidation, loginValidation, validateUpdateProfile, validateRequest } = require('../middleware/validation');

const router = express.Router();

// User registration route
router.post('/register', registerValidation, validateRequest, register);

// User login route
router.post('/login', loginValidation, validateRequest, login);

// Get current user
router.get('/me', protect, getMe);

// Update user profile
router.put('/profile', protect, validateUpdateProfile, validateRequest, updateProfile);

module.exports = router;