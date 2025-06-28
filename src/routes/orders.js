const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrderById, updateOrderStatus, cancelOrder, getAllOrders, getOrderHistory } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateOrder, validateRequest } = require('../middleware/validation');

// Get current user's orders (this should be the main endpoint for regular users)
router.get('/', protect, getUserOrders);

// Get current user's order history (MUST be before /:id route)
router.get('/history', protect, getOrderHistory);

// Get all orders (Admin only) - moved to admin-specific route
router.get('/admin/all', protect, authorize('admin'), getAllOrders);

// Create a new order (Authenticated users)
router.post('/', protect, validateOrder, validateRequest, createOrder);

// Get a specific order by ID (MUST be after /history route)
router.get('/:id', protect, getOrderById);

// Update order status (Admin/Delivery only)
router.patch('/:id/status', protect, authorize('admin', 'delivery'), updateOrderStatus);

// Cancel an order
router.patch('/:id/cancel', protect, cancelOrder);

module.exports = router;