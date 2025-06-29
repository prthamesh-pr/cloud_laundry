const mongoose = require('mongoose');
const Service = require('./models/Service');

const defaultServices = [
  {
    name: "Wash & Fold",
    description: "Professional washing and folding service for your everyday clothes",
    price: 2.50,
    category: "wash",
    duration: 24,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Wash%26Fold",
    priceUnit: "per_item",
    instructions: ["Sort by color", "Use mild detergent"]
  },
  {
    name: "Dry Cleaning",
    description: "Expert dry cleaning for delicate and formal wear",
    price: 8.99,
    category: "dry-clean",
    duration: 48,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Dry+Clean",
    priceUnit: "per_item",
    instructions: ["Check care labels", "Handle with care"]
  },
  {
    name: "Iron & Press",
    description: "Professional ironing and pressing service",
    price: 3.99,
    category: "iron",
    duration: 12,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Iron%26Press",
    priceUnit: "per_item",
    instructions: ["Steam pressing", "Wrinkle-free guarantee"]
  },
  {
    name: "Wash & Iron",
    description: "Complete wash and iron service combination",
    price: 5.99,
    category: "wash-iron",
    duration: 36,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Wash%26Iron",
    priceUnit: "per_item",
    instructions: ["Full service", "Ready to wear"]
  },
  {
    name: "Premium Care",
    description: "Premium washing with fabric softener and special care",
    price: 12.99,
    category: "premium",
    duration: 48,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Premium+Care",
    priceUnit: "per_item",
    instructions: ["Luxury treatment", "Fabric softener included"]
  },
  {
    name: "Comforters & Bedding",
    description: "Special care for bulky comforters and bedding",
    price: 25.00,
    category: "premium",
    duration: 72,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Comforters",
    priceUnit: "flat_rate",
    instructions: ["Special handling for bulky items", "Extra drying time"]
  },
  {
    name: "Specialty Items",
    description: "Custom care for specialty and delicate items",
    price: 15.99,
    category: "premium",
    duration: 48,
    isActive: true,
    image: "https://via.placeholder.com/150?text=Specialty",
    priceUnit: "per_item",
    instructions: ["Custom pricing available", "Special handling"]
  }
];

const initializeServices = async () => {
  try {
    // Check if services already exist
    const existingServices = await Service.find();
    
    if (existingServices.length === 0) {
      console.log('🔄 No services found, initializing default services...');
      await Service.insertMany(defaultServices);
      console.log('✅ Default services initialized successfully');
    } else {
      console.log(`✅ Found ${existingServices.length} existing services`);
    }
  } catch (error) {
    console.error('❌ Error initializing services:', error.message);
  }
};

module.exports = { initializeServices };
