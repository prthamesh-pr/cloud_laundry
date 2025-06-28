const axios = require('axios');

const baseURL = 'http://localhost:5000';

async function testBackendEndpoints() {
  console.log('🧪 Testing Cloud Laundry Backend API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health Check:', healthResponse.data);

    // Test registration
    console.log('\n2. Testing User Registration...');
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const registerResponse = await axios.post(`${baseURL}/api/v1/auth/register`, {
      name: 'Test User',
      email: testEmail,
      password: 'Test123!',
      phone: '+1234567890',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345'
      }
    });
    console.log('✅ Registration:', registerResponse.data);

    // Test login
    console.log('\n3. Testing User Login...');
    const loginResponse = await axios.post(`${baseURL}/api/v1/auth/login`, {
      email: testEmail,
      password: 'Test123!'
    });
    console.log('✅ Login:', loginResponse.data);

    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test services
    console.log('\n4. Testing Services...');
    const servicesResponse = await axios.get(`${baseURL}/api/v1/services`, { headers });
    console.log('✅ Services:', `Found ${servicesResponse.data.count} services`);

    // Test user's orders
    console.log('\n5. Testing Orders...');
    const ordersResponse = await axios.get(`${baseURL}/api/v1/orders`, { headers });
    console.log('✅ Orders:', `Found ${ordersResponse.data.count} orders`);

    // Test order history
    console.log('\n6. Testing Order History...');
    const orderHistoryResponse = await axios.get(`${baseURL}/api/v1/orders/history`, { headers });
    console.log('✅ Order History:', `Found ${orderHistoryResponse.data.count} orders`);

    // Test schedules
    console.log('\n7. Testing Schedules...');
    const schedulesResponse = await axios.get(`${baseURL}/api/v1/schedules`, { headers });
    console.log('✅ Schedules:', `Found ${schedulesResponse.data.count} schedules`);

    // Test schedule history
    console.log('\n8. Testing Schedule History...');
    const scheduleHistoryResponse = await axios.get(`${baseURL}/api/v1/schedules/history`, { headers });
    console.log('✅ Schedule History:', `Found ${scheduleHistoryResponse.data.count} schedules`);

    // Test notifications
    console.log('\n9. Testing Notifications...');
    const notificationsResponse = await axios.get(`${baseURL}/api/v1/notifications`, { headers });
    console.log('✅ Notifications:', `Found ${notificationsResponse.data.count} notifications`);

    console.log('\n🎉 All backend tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testBackendEndpoints();
