const express = require('express');
const router = express.Router();
const { 
    getNotifications, 
    sendNotification, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    getAllNotifications 
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');
const { validateNotification, validateRequest } = require('../middleware/validation');

// Get current user's notifications
router.get('/', protect, getNotifications);

// Mark all notifications as read for current user
router.put('/mark-all-read', protect, markAllAsRead);

// Get all notifications (Admin only)
router.get('/admin/all', protect, authorize('admin'), getAllNotifications);

// Send notification (Admin only)
router.post('/', protect, authorize('admin'), validateNotification, validateRequest, sendNotification);

// Mark specific notification as read
router.put('/:id/read', protect, markAsRead);

// Delete specific notification
router.delete('/:id', protect, deleteNotification);

module.exports = router;