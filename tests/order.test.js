const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Order = require('../src/models/Order');

describe('Order API', () => {
  let orderId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await Order.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a new order', async () => {
    const orderData = {
      userId: 'sample_user_id',
      items: [
        {
          serviceId: 'service_id',
          quantity: 2,
          totalPrice: 20.00,
        },
      ],
      totalAmount: 20.00,
      status: 'pending',
    };

    const response = await request(app)
      .post('/api/orders') // Adjust the endpoint as necessary
      .send(orderData)
      .expect(201);

    orderId = response.body._id;
    expect(response.body).toHaveProperty('_id');
    expect(response.body.totalAmount).toBe(orderData.totalAmount);
  });

  it('should retrieve an order by ID', async () => {
    const response = await request(app)
      .get(`/api/orders/${orderId}`) // Adjust the endpoint as necessary
      .expect(200);

    expect(response.body).toHaveProperty('_id', orderId);
    expect(response.body).toHaveProperty('totalAmount');
  });

  it('should update an order', async () => {
    const updatedData = {
      status: 'completed',
    };

    const response = await request(app)
      .put(`/api/orders/${orderId}`) // Adjust the endpoint as necessary
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('_id', orderId);
    expect(response.body.status).toBe(updatedData.status);
  });

  it('should delete an order', async () => {
    await request(app)
      .delete(`/api/orders/${orderId}`) // Adjust the endpoint as necessary
      .expect(204);

    const response = await request(app)
      .get(`/api/orders/${orderId}`) // Adjust the endpoint as necessary
      .expect(404);
  });
});