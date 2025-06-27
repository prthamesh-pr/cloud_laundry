const Payment = require('../models/Payment');
const mongoose = require('mongoose');

// Function to create a new payment
const createPayment = async (paymentData) => {
    try {
        const payment = new Payment(paymentData);
        await payment.save();
        return payment;
    } catch (error) {
        throw new Error('Error creating payment: ' + error.message);
    }
};

// Function to retrieve a payment by ID
const getPaymentById = async (paymentId) => {
    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    } catch (error) {
        throw new Error('Error retrieving payment: ' + error.message);
    }
};

// Function to update a payment
const updatePayment = async (paymentId, updateData) => {
    try {
        const payment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    } catch (error) {
        throw new Error('Error updating payment: ' + error.message);
    }
};

// Function to delete a payment
const deletePayment = async (paymentId) => {
    try {
        const payment = await Payment.findByIdAndDelete(paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    } catch (error) {
        throw new Error('Error deleting payment: ' + error.message);
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
};