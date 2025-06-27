const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orders');
const serviceRoutes = require('./routes/services');
const scheduleRoutes = require('./routes/schedules');
const paymentRoutes = require('./routes/payment');
const notificationRoutes = require('./routes/notifications');

const app = express();

// Security middleware
app.use(helmet());

// CORS - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'https://cloud-laundry.onrender.com',
  'your-frontend-domain.com' // Replace with actual frontend domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/schedules', scheduleRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Debug route to test auth routes
app.get('/debug/routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        const path = middleware.regexp.source.replace('\\', '').replace('/?$', '');
        if (handler.route) {
          routes.push({
            path: path + handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  
  res.json({
    success: true,
    message: 'Available routes',
    routes: routes
  });
});

// Test auth specifically
app.get('/debug/auth', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes should be mounted at /api/v1/auth',
    testEndpoints: [
      'POST /api/v1/auth/login',
      'POST /api/v1/auth/register', 
      'GET /api/v1/auth/me'
    ]
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🧺 Cloud Laundry API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      orders: '/api/v1/orders',
      services: '/api/v1/services',
      schedules: '/api/v1/schedules',
      payments: '/api/v1/payments',
      notifications: '/api/v1/notifications'
    },
    documentation: 'https://github.com/prthamesh-pr/cloud_laundry'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/v1/auth/register',
      'POST /api/v1/auth/login',
      'GET /api/v1/services',
      'GET /api/v1/orders'
    ]
  });
});

// Error Handling Middleware
app.use(errorHandler);

// Export the app
module.exports = app;