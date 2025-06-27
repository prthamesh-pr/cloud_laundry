const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./src/models/Service');

dotenv.config();

const services = [
  {
    name: "Regular Wash",
    description: "Standard washing service for everyday clothes",
    price: 15.99,
    category: "wash",
    duration: 24,
    isActive: true
  },
  {
    name: "Dry Cleaning",
    description: "Professional dry cleaning for delicate fabrics",
    price: 25.99,
    category: "dry-clean",
    duration: 48,
    isActive: true
  },
  {
    name: "Iron Only",
    description: "Professional ironing service",
    price: 8.99,
    category: "iron",
    duration: 12,
    isActive: true
  },
  {
    name: "Wash & Iron",
    description: "Complete wash and iron service",
    price: 22.99,
    category: "wash-iron",
    duration: 36,
    isActive: true
  },
  {
    name: "Premium Care",
    description: "Premium washing with fabric softener and special care",
    price: 35.99,
    category: "premium",
    duration: 48,
    isActive: true
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new services
    await Service.insertMany(services);
    console.log('Services seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
