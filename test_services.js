const { default: fetch } = require('node-fetch');

async function testServices() {
  try {
    console.log('Testing services endpoint...');
    const response = await fetch('https://cloud-laundry.onrender.com/api/v1/services');
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.success && data.data && data.data.length > 0) {
      console.log('✅ Services endpoint working correctly');
      console.log(`Found ${data.data.length} services`);
    } else {
      console.log('❌ No services found or API error');
    }
  } catch (error) {
    console.error('❌ Error testing services:', error.message);
  }
}

testServices();
