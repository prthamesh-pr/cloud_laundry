const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import dependencies
const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const { initializeServices } = require('./src/utils/initializeServices');

// Connect to database and initialize services
const initializeApp = async () => {
  await connectDB();
  await initializeServices();
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await initializeApp();
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📱 API available at: http://localhost:${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});