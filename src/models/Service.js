const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  basePrice: {
    type: Number,
    get: function() { return this.price; }
  },
  category: {
    type: String,
    enum: ['wash', 'dry-clean', 'iron', 'wash-iron', 'premium'],
    required: true
  },
  duration: {
    type: Number, // in hours
    required: true,
    min: 0,
  },
  estimatedDurationHours: {
    type: Number,
    get: function() { return this.duration; }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    get: function() { return this.isActive; }
  },
  image: String,
  imageUrl: {
    type: String,
    get: function() { return this.image || ''; }
  },
  priceUnit: {
    type: String,
    default: 'per_item'
  },
  instructions: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before saving
serviceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Transform the output to include virtual fields
serviceSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.basePrice = ret.price;
    ret.estimatedDurationHours = ret.duration;
    ret.isAvailable = ret.isActive;
    ret.imageUrl = ret.image || '';
    return ret;
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;