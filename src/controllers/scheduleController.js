const Schedule = require('../models/Schedule');
const Service = require('../models/Service');

// Get all schedules for current user
const getUserSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({ userId: req.user.id })
            .populate('serviceId', 'name price category')
            .sort({ scheduledDate: 1 });

        res.status(200).json({
            success: true,
            count: schedules.length,
            data: schedules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Create a new schedule
const createSchedule = async (req, res) => {
    try {
        const { serviceId, scheduledDate, timeSlot, addressId, notes } = req.body;

        // Verify service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        const schedule = await Schedule.create({
            userId: req.user.id,
            serviceId,
            scheduledDate,
            timeSlot,
            addressId,
            notes: notes || ''
        });

        await schedule.populate('serviceId', 'name price category');

        res.status(201).json({
            success: true,
            message: 'Schedule created successfully',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get schedule by ID
const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
            .populate('serviceId', 'name price category');

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        // Check if user owns the schedule
        if (schedule.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this schedule'
            });
        }

        res.status(200).json({
            success: true,
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update schedule
const updateSchedule = async (req, res) => {
    try {
        const { scheduledDate, timeSlot, addressId, notes } = req.body;
        
        const schedule = await Schedule.findById(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        // Check if user owns the schedule
        if (schedule.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this schedule'
            });
        }

        // Update fields
        if (scheduledDate) schedule.scheduledDate = scheduledDate;
        if (timeSlot) schedule.timeSlot = timeSlot;
        if (addressId) schedule.addressId = addressId;
        if (notes !== undefined) schedule.notes = notes;

        await schedule.save();
        await schedule.populate('serviceId', 'name price category');

        res.status(200).json({
            success: true,
            message: 'Schedule updated successfully',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Cancel schedule
const cancelSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        // Check if user owns the schedule
        if (schedule.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this schedule'
            });
        }

        await Schedule.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Schedule cancelled successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all schedules (Admin only)
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('serviceId', 'name price category')
            .populate('userId', 'name email phone')
            .sort({ scheduledDate: 1 });

        res.status(200).json({
            success: true,
            count: schedules.length,
            data: schedules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get schedule history for current user
const getScheduleHistory = async (req, res) => {
    try {
        const schedules = await Schedule.find({ 
            userId: req.user.id,
            $or: [
                { status: 'completed' },
                { status: 'cancelled' }
            ]
        })
            .populate('serviceId', 'name price category')
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: schedules.length,
            data: schedules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getUserSchedules,
    createSchedule,
    getScheduleById,
    updateSchedule,
    cancelSchedule,
    getAllSchedules,
    getScheduleHistory
};