const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrderById, updateOrderStatus, cancelOrder, getAllOrders } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateOrder, validateRequest } = require('../middleware/validation');

// Create a new order (Authenticated users)
router.post('/', protect, validateOrder, validateRequest, createOrder);

// Get current user's orders
router.get('/my-orders', protect, getUserOrders);

// Get all orders (Admin only)
router.get('/', protect, authorize('admin'), getAllOrders);

// Get a specific order by ID
router.get('/:id', protect, getOrderById);

// Update order status (Admin/Delivery only)
router.patch('/:id/status', protect, authorize('admin', 'delivery'), updateOrderStatus);

// Cancel an order
router.patch('/:id/cancel', protect, cancelOrder);

module.exports = router;