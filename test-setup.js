// Simple test to verify server setup
console.log('🧪 Testing Cloud Laundry Backend Setup...\n');

// Test environment variables
if (!process.env.MONGODB_URI) {
    console.log('❌ MONGODB_URI not found in environment variables');
    console.log('💡 Please create a .env file with MONGODB_URI');
} else {
    console.log('✅ MONGODB_URI found');
}

if (!process.env.JWT_SECRET) {
    console.log('❌ JWT_SECRET not found in environment variables');
    console.log('💡 Please add JWT_SECRET to your .env file');
} else {
    console.log('✅ JWT_SECRET found');
}

// Test if we can require our main modules
try {
    const app = require('./src/app');
    console.log('✅ App module loaded successfully');
} catch (error) {
    console.log('❌ Error loading app module:', error.message);
}

try {
    const User = require('./src/models/User');
    console.log('✅ User model loaded successfully');
} catch (error) {
    console.log('❌ Error loading User model:', error.message);
}

try {
    const Service = require('./src/models/Service');
    console.log('✅ Service model loaded successfully');
} catch (error) {
    console.log('❌ Error loading Service model:', error.message);
}

try {
    const Order = require('./src/models/Order');
    console.log('✅ Order model loaded successfully');
} catch (error) {
    console.log('❌ Error loading Order model:', error.message);
}

console.log('\n📋 Setup Check Complete!');
console.log('🚀 If all checks passed, run: npm run dev');
console.log('🩺 Then test: http://localhost:5000/health');
