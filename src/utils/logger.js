const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware to log requests
const requestLogger = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
};

// Middleware to log errors
const errorLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  next(err);
};

module.exports = {
  logger,
  requestLogger,
  errorLogger,
};