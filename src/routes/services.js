const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

// Route to get all services (Public)
router.get('/', getAllServices);

// Route to get a specific service by ID (Public)
router.get('/:id', getServiceById);

// Route to create a new service (Admin only)
router.post('/', protect, authorize('admin'), createService);

// Route to update an existing service by ID (Admin only)
router.put('/:id', protect, authorize('admin'), updateService);

// Route to delete a service by ID (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;