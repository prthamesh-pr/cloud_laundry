const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.zipCode').notEmpty().withMessage('Zip code is required')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateUpdateProfile = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().notEmpty().withMessage('Phone number cannot be empty'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty'),
];

const validateOrder = [
  body('services').isArray().withMessage('Services must be an array'),
  body('services.*.service').notEmpty().withMessage('Service ID is required'),
  body('services.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('pickupAddress.street').notEmpty().withMessage('Pickup street address is required'),
  body('deliveryAddress.street').notEmpty().withMessage('Delivery street address is required'),
];

const validateSchedule = [
  body('serviceId').notEmpty().withMessage('Service ID is required'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('addressId').notEmpty().withMessage('Address ID is required'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
];

const validateNotification = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('message').notEmpty().withMessage('Message is required'),
  body('title').optional().isString().withMessage('Title must be a string'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  validateUpdateProfile,
  validateOrder,
  validateSchedule,
  validateNotification,
  validateRequest,
};