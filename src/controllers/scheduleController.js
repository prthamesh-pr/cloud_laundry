const Schedule = require('../models/Schedule');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create a new schedule
exports.createSchedule = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, serviceId, scheduledDate, timeSlot, notes } = req.body;

    try {
        const schedule = new Schedule({
            user: userId,
            service: serviceId,
            scheduledDate,
            timeSlot,
            notes,
        });

        await schedule.save();
        res.status(201).json({ message: 'Schedule created successfully', schedule });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all schedules for a user
exports.getUserSchedules = async (req, res) => {
    const userId = req.params.userId;

    try {
        const schedules = await Schedule.find({ user: userId }).populate('service');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a schedule
exports.updateSchedule = async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const updates = req.body;

    try {
        const schedule = await Schedule.findByIdAndUpdate(scheduleId, updates, { new: true });
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json({ message: 'Schedule updated successfully', schedule });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
    const scheduleId = req.params.scheduleId;

    try {
        const schedule = await Schedule.findByIdAndDelete(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};