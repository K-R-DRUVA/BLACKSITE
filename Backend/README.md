# BLACKSITE Backend

Express.js REST API for the BLACKSITE Personal Finance Tracker application.

## 📋 Overview

This is the backend server for BLACKSITE, providing RESTful APIs for user authentication, transaction management, goal tracking, and dashboard data aggregation. Built with Express.js and MySQL.

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.20.0
- **Database**: MySQL 2 (mysql2 driver)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for cross-origin requests
- **Development**: Nodemon for auto-restart

## 📁 Project Structure

```
Backend/
│
├── routes/
│   ├── auth.js          # Authentication routes (signup, login)
│   ├── transactions.js  # Transaction management routes
│   ├── goals.js        # Financial goals routes
│   └── dashboard.js    # Dashboard data aggregation routes
│
├── middleware/
│   └── fetchuser.js    # JWT authentication middleware
│
├── db.js              # Database connection configuration
├── index.js           # Application entry point
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

### Configuration

Create a `.env` file in the Backend directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=blacksite_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Optional: Server Port (defaults to 5000)
PORT=5000
```

### Database Setup

Run the following SQL commands to set up the database schema:

```sql
-- Create database
CREATE DATABASE blacksite_db;
USE blacksite_db;

-- Users table
CREATE TABLE User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table
CREATE TABLE Account (
    Account_ID INT AUTO_INCREMENT PRIMARY KEY,
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);

-- Income table
CREATE TABLE Income (
    Income_ID INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    source VARCHAR(255) NOT NULL,
    description TEXT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);

-- Expenses table
CREATE TABLE Expense (
    Expense_ID INT AUTO_INCREMENT PRIMARY KEY,
    Amount DECIMAL(10, 2) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Date DATE NOT NULL,
    Description TEXT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);

-- Savings goals table
CREATE TABLE savings_goal (
    Goal_ID INT AUTO_INCREMENT PRIMARY KEY,
    target_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);
```

### Running the Server

Development mode (with auto-restart):
```bash
npm start
```

The server will start on `http://localhost:5000`

### Testing

Basic API test:
```bash
curl http://localhost:5000/api/test
```

Expected response: `Backend is working!`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user with complete financial profile.

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "dob": "1990-01-01",
  "phone": "1234567890",
  "account_type": "Savings",
  "balance": 5000,
  "income_amount": 60000,
  "income_source": "Salary",
  "income_description": "Monthly salary",
  "savings_target": 10000,
  "savings_title": "Emergency Fund",
  "savings_deadline": "2025-12-31"
}
```

**Validation Rules:**
- `username`: Minimum 3 characters
- `email`: Valid email format
- `password`: Minimum 5 characters
- `dob`: Valid ISO 8601 date
- `phone`: Minimum 10 characters
- `account_type`: Required, not empty
- `balance`: Must be numeric
- `income_amount`: Must be numeric
- All other fields: Required as specified

**Success Response (201):**
```json
{
  "success": true,
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "errors": [
    {
      "msg": "Enter a valid email",
      "param": "email"
    }
  ]
}
```

#### POST `/api/auth/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400/401):**
```json
{
  "error": "Invalid credentials"
}
```

### Transaction Routes (`/api/transactions`)

All transaction routes require authentication. Include the JWT token in the `auth-token` header.

#### GET `/api/transactions/`
Retrieve all transactions for the authenticated user.

**Headers:**
```
auth-token: your_jwt_token_here
```

**Success Response (200):**
```json
[
  {
    "Expense_ID": 1,
    "Amount": -150.50,
    "Category": "Food",
    "Date": "2025-10-12",
    "Description": "Grocery shopping",
    "User_ID": 1
  },
  {
    "Expense_ID": 2,
    "Amount": -45.00,
    "Category": "Transportation",
    "Date": "2025-10-11",
    "Description": "Gas",
    "User_ID": 1
  }
]
```

#### GET `/api/transactions/recent`
Retrieve the 5 most recent transactions.

**Headers:**
```
auth-token: your_jwt_token_here
```

**Success Response (200):**
```json
[
  {
    "Expense_ID": 5,
    "Amount": -50.00,
    "Category": "Entertainment",
    "Date": "2025-10-12",
    "Description": "Movie tickets",
    "User_ID": 1
  }
]
```

#### POST `/api/transactions/add`
Add a new transaction.

**Headers:**
```
auth-token: your_jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "Description": "Grocery shopping",
  "Amount": -150.50,
  "Category": "Food",
  "Date": "2025-10-12"
}
```

**Validation Rules:**
- `amount`: Must be numeric
- `category`: Cannot be blank
- `date`: Valid ISO 8601 date format
- `description`: Cannot be blank

**Success Response (201):**
```json
{
  "message": "Transaction added successfully"
}
```

### Goal Routes (`/api/goals`)

All goal routes require authentication.

#### GET `/api/goals/`
Retrieve all financial goals for the authenticated user.

**Headers:**
```
auth-token: your_jwt_token_here
```

**Success Response (200):**
```json
[
  {
    "Goal_ID": 1,
    "target_amount": 10000,
    "current_amount": 2500,
    "title": "Emergency Fund",
    "deadline": "2025-12-31",
    "User_ID": 1
  },
  {
    "Goal_ID": 2,
    "target_amount": 5000,
    "current_amount": 1000,
    "title": "Vacation Fund",
    "deadline": "2026-06-01",
    "User_ID": 1
  }
]
```

#### POST `/api/goals/add`
Create a new financial goal.

**Headers:**
```
auth-token: your_jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Car Fund",
  "target_amount": 15000,
  "deadline": "2026-12-31"
}
```

**Validation Rules:**
- `target_amount`: Must be numeric
- `title`: Cannot be blank
- `deadline`: Valid ISO 8601 date format

**Success Response (201):**
```json
{
  "message": "Goal added successfully"
}
```

### Dashboard Routes (`/api/dashboard`)

#### GET `/api/dashboard/`
Retrieve comprehensive dashboard data.

**Headers:**
```
auth-token: your_jwt_token_here
```

**Success Response (200):**
```json
{
  "recentTransactions": [...],
  "spendingByCategory": [...],
  "monthlySpending": [...],
  "summary": {
    "totalIncome": 60000,
    "totalExpenses": 25000,
    "balance": 35000,
    "savingsGoals": 3
  }
}
```

## 🔒 Authentication & Authorization

### JWT Token Structure

The JWT token contains the following payload:
```json
{
  "user": {
    "id": 1
  },
  "iat": 1697123456,
  "exp": 1697209856
}
```

### Middleware: `fetchuser`

The `fetchuser` middleware is used to protect routes that require authentication. It:
1. Extracts the JWT token from the `auth-token` header
2. Verifies the token using the JWT_SECRET
3. Adds the user information to `req.user`
4. Calls the next middleware/route handler

**Usage:**
```javascript
router.get('/protected', fetchUser, async (req, res) => {
  const userId = req.user.id;
  // Your route logic here
});
```

## 🗄️ Database Schema

### User Table
- `User_ID` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `username` (VARCHAR(255))
- `email` (VARCHAR(255), UNIQUE)
- `password` (VARCHAR(255), hashed)
- `dob` (DATE)
- `phone` (VARCHAR(20))
- `created_at` (TIMESTAMP)

### Account Table
- `Account_ID` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `account_type` (VARCHAR(50))
- `balance` (DECIMAL(10, 2))
- `User_ID` (INT, FOREIGN KEY)

### Income Table
- `Income_ID` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `amount` (DECIMAL(10, 2))
- `source` (VARCHAR(255))
- `description` (TEXT)
- `User_ID` (INT, FOREIGN KEY)

### Expense Table
- `Expense_ID` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `Amount` (DECIMAL(10, 2))
- `Category` (VARCHAR(100))
- `Date` (DATE)
- `Description` (TEXT)
- `User_ID` (INT, FOREIGN KEY)

### Savings Goal Table
- `Goal_ID` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `target_amount` (DECIMAL(10, 2))
- `current_amount` (DECIMAL(10, 2))
- `title` (VARCHAR(255))
- `deadline` (DATE)
- `User_ID` (INT, FOREIGN KEY)

## 🔍 Error Handling

The API uses standard HTTP status codes:

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid input or validation error
- `401 Unauthorized` - Missing or invalid authentication token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error response format:
```json
{
  "error": "Error message description"
}
```

Or with validation errors:
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

## 🧪 Development

### Available Scripts

- `npm start` - Start the development server with Nodemon
- `npm test` - Run tests (if configured)

### Code Structure Best Practices

1. **Routes**: Keep route handlers focused and delegate business logic to separate functions if needed
2. **Validation**: Use express-validator for input validation
3. **Error Handling**: Always wrap async operations in try-catch blocks
4. **Database Queries**: Use parameterized queries to prevent SQL injection
5. **Authentication**: Always use the fetchuser middleware for protected routes

### Adding New Routes

1. Create a new route file in the `routes/` directory
2. Import required dependencies and middleware
3. Define your routes with proper validation
4. Export the router
5. Register the router in `index.js`:

```javascript
app.use('/api/your-route', require('./routes/your-route'));
```

## 🔐 Security Considerations

- Passwords are hashed using bcryptjs before storage
- JWT tokens expire after a set duration
- SQL injection protection through parameterized queries
- CORS is enabled but should be configured for production
- Environment variables store sensitive configuration
- Input validation on all user inputs

### Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure CORS for specific origins
- [ ] Use HTTPS in production
- [ ] Set up proper error logging
- [ ] Enable rate limiting
- [ ] Use environment-specific configurations
- [ ] Set up database backups
- [ ] Implement request logging

## 📝 Dependencies

### Production Dependencies
- `express` - Web framework
- `mysql2` - MySQL database driver
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation and verification
- `express-validator` - Input validation
- `cors` - CORS middleware
- `dotenv` - Environment variable management

### Development Dependencies
- `nodemon` - Auto-restart development server

## 🤝 Contributing

When contributing to the backend:

1. Follow the existing code structure
2. Add input validation for all user inputs
3. Use async/await for asynchronous operations
4. Handle errors appropriately
5. Document new API endpoints
6. Test your changes thoroughly

## 📄 License

This project is part of BLACKSITE and is licensed under the MIT License.

---

For frontend documentation, see the [Frontend README](../Frontend/README.md)

For overall project documentation, see the [Main README](../README.md)
