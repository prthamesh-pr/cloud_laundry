const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User routes - coming soon'
  });
});

module.exports = router;