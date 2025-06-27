const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('User API', () => {
  let userId;

  beforeAll(async () => {
    // Create a user for testing
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      phone: '1234567890',
      address: '123 Test St, Test City, TC 12345',
    });
    userId = user._id;
  });

  afterAll(async () => {
    // Clean up the database after tests
    await User.deleteMany({});
  });

  it('should fetch a user profile', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(response.body).toHaveProperty('name', 'Test User');
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should update a user profile', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        name: 'Updated User',
        phone: '0987654321',
      })
      .expect(200);

    expect(response.body).toHaveProperty('name', 'Updated User');
    expect(response.body).toHaveProperty('phone', '0987654321');
  });

  it('should return 404 for non-existing user', async () => {
    const response = await request(app)
      .get('/api/users/60d0fe4f5311236168a109ca') // Example non-existing ID
      .expect(404);

    expect(response.body).toHaveProperty('error', 'User not found');
  });
});