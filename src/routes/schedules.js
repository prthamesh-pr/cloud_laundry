const express = require('express');
const router = express.Router();
const { getUserSchedules, createSchedule, getScheduleById, updateSchedule, cancelSchedule, getAllSchedules, getScheduleHistory } = require('../controllers/scheduleController');
const { protect, authorize } = require('../middleware/auth');

// Get current user's schedules
router.get('/', protect, getUserSchedules);

// Get current user's schedule history (MUST be before /:id route)
router.get('/history', protect, getScheduleHistory);

// Get all schedules (Admin only)
router.get('/admin/all', protect, authorize('admin'), getAllSchedules);

// Create a new schedule
router.post('/', protect, createSchedule);

// Get a specific schedule by ID (MUST be after /history route)
router.get('/:id', protect, getScheduleById);

// Update a schedule
router.put('/:id', protect, updateSchedule);

// Cancel a schedule
router.delete('/:id', protect, cancelSchedule);

module.exports = router;