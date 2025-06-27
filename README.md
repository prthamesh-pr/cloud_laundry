# Cloud Laundry Backend - Setup & Testing Guide

## Overview
A comprehensive Node.js backend for a cloud laundry service with MongoDB, featuring JWT authentication, password hashing, input validation, and role-based access control.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment**
   Create a `.env` file with:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cloud-laundry
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex-2024
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   ```

3. **Start MongoDB**
   Make sure MongoDB is running locally or use MongoDB Atlas.

4. **Seed Database (Optional)**
   ```bash
   node seeder.js
   ```

5. **Start Server**
   ```bash
   npm run dev
   ```

## API Testing with Postman

### Base URL: `http://localhost:5000`

### 1. Health Check
```http
GET /health
```

### 2. Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

### 3. Login User
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```
**Save the token from response for authenticated requests!**

### 4. Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 5. Get All Services
```http
GET /api/v1/services
```

### 6. Get My Orders
```http
GET /api/v1/orders/my-orders
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## Security Features
```
cloud-laundry-backend
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── app.js
├── tests
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/prthamesh-pr/cloud_laundry.git
   cd cloud-laundry-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and configure your environment variables.

4. Start the MongoDB server (if not using a cloud service).

5. Run the application:
   ```
   npm start
   ```

## API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user
  - `POST /api/auth/reset-password` - Reset user password

- **User Management**
  - `GET /api/user/profile` - Get user profile
  - `PUT /api/user/profile` - Update user profile

- **Order Management**
  - `POST /api/orders` - Create a new order
  - `GET /api/orders` - Retrieve all orders
  - `GET /api/orders/:id` - Retrieve a specific order
  - `PUT /api/orders/:id` - Update an order
  - `DELETE /api/orders/:id` - Delete an order

- **Service Management**
  - `GET /api/services` - Retrieve all services
  - `POST /api/services` - Create a new service
  - `PUT /api/services/:id` - Update a service
  - `DELETE /api/services/:id` - Delete a service

- **Scheduling**
  - `POST /api/schedules` - Create a new schedule
  - `GET /api/schedules` - Retrieve all schedules

- **Payment Processing**
  - `POST /api/payment` - Process a payment

- **Notifications**
  - `GET /api/notifications` - Retrieve notifications

## Security Considerations
- Passwords are hashed using bcrypt before being stored in the database.
- JWTs are used for authentication, ensuring secure access to protected routes.
- Rate limiting is implemented to prevent abuse from excessive requests.

## Testing
Unit tests are provided for key functionalities. To run the tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.