const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getUserProfile, 
  updateUserProfile, 
  changePassword,
  updateNotificationSettings,
  updateAppSettings
} = require('../controllers/userController');

const router = express.Router();

// User profile routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Password change route
router.put('/change-password', protect, changePassword);

// Settings routes
router.put('/notification-settings', protect, updateNotificationSettings);
router.put('/app-settings', protect, updateAppSettings);

module.exports = router;