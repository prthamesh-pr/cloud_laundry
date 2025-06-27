module.exports = {
  hashPassword: async (password) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  comparePassword: async (password, hashedPassword) => {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, hashedPassword);
  },

  generateToken: (user) => {
    const jwt = require('jsonwebtoken');
    const { JWT_SECRET, JWT_EXPIRATION } = process.env;
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  },

  validateEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  formatResponse: (status, message, data = null) => {
    return {
      status,
      message,
      data,
    };
  },
};