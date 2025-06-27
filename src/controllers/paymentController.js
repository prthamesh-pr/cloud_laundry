const Payment = require('../models/Payment');
const ApiResponse = require('../utils/apiResponse');
const paymentService = require('../services/paymentService');

// Process a payment
exports.processPayment = async (req, res) => {
    try {
        const { amount, paymentMethodId, orderId } = req.body;

        // Validate request data
        if (!amount || !paymentMethodId || !orderId) {
            return res.status(400).json(ApiResponse.error('Missing required fields'));
        }

        // Call payment service to process the payment
        const paymentResult = await paymentService.processPayment(amount, paymentMethodId, orderId);

        if (paymentResult.success) {
            // Save payment details to the database
            const payment = new Payment({
                amount,
                paymentMethodId,
                orderId,
                status: 'completed',
                transactionId: paymentResult.transactionId,
            });

            await payment.save();

            return res.status(200).json(ApiResponse.success(payment));
        } else {
            return res.status(400).json(ApiResponse.error(paymentResult.message));
        }
    } catch (error) {
        return res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// Get payment details by ID
exports.getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json(ApiResponse.error('Payment not found'));
        }

        return res.status(200).json(ApiResponse.success(payment));
    } catch (error) {
        return res.status(500).json(ApiResponse.error('Internal server error'));
    }
};

// List all payments
exports.listPayments = async (req, res) => {
    try {
        const payments = await Payment.find();

        return res.status(200).json(ApiResponse.success(payments));
    } catch (error) {
        return res.status(500).json(ApiResponse.error('Internal server error'));
    }
};