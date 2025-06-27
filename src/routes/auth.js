const express = require('express');
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidation, loginValidation, validateUpdateProfile, validateRequest } = require('../middleware/validation');

const router = express.Router();

// Test route to verify auth routes are loaded
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Simple login without validation (for testing)
router.post('/login-simple', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    res.json({
      success: true,
      message: 'Login endpoint is working',
      received: { email, passwordLength: password.length }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// User registration route
router.post('/register', registerValidation, validateRequest, register);

// User login route
router.post('/login', loginValidation, validateRequest, login);

// Get current user
router.get('/me', protect, getMe);

// Update user profile
router.put('/profile', protect, validateUpdateProfile, validateRequest, updateProfile);

module.exports = router;