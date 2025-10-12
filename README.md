# BLACKSITE - Personal Finance Tracker

A comprehensive personal finance management application that helps you track expenses, set financial goals, and gain insights into your spending habits.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.3.1-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Security](#-security)

## ✨ Features

### Core Functionality
- **User Authentication**: Secure signup and login system with JWT tokens
- **Onboarding Flow**: Interactive questionnaire to gather user financial information
- **Dashboard**: Comprehensive financial overview with charts and visualizations
- **Transaction Management**: Add, view, and categorize income and expenses
- **Goal Setting**: Create and track financial goals with progress monitoring
- **Financial Reports**: Generate monthly and yearly financial summaries
- **Real-time Analytics**: Visual representations of spending patterns and trends

### User Experience
- **Dark Mode Interface**: Modern, eye-friendly dark theme
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Interactive Charts**: Bar charts and pie charts for data visualization
- **Real-time Updates**: Instant updates when adding transactions or goals

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14.2.15 (React 18.3.1)
- **Styling**: Tailwind CSS with custom components
- **UI Components**: 
  - Radix UI primitives
  - Lucide React icons
  - Headless UI
  - Framer Motion for animations
- **State Management**: React Context API
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios & Fetch API

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MySQL 2
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for cross-origin requests

### Development Tools
- **Package Manager**: npm
- **Development Server**: Nodemon (backend), Next.js dev server (frontend)
- **Version Control**: Git

## 🏗 Architecture

```
BLACKSITE/
│
├── Frontend/              # Next.js frontend application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React Context providers
│   │   └── pages/        # Next.js pages/routes
│   └── package.json
│
├── Backend/              # Express.js backend API
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware (auth, etc.)
│   ├── db.js           # Database connection
│   ├── index.js        # Server entry point
│   └── package.json
│
├── README.md           # This file
├── LICENSE            # MIT License
└── SECURITY.md        # Security policy

```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)
- **MySQL** (v5.7 or higher)
- **Git**

## 💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/K-R-DRUVA/BLACKSITE.git
cd BLACKSITE
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `Backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=blacksite_db

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Server Port (optional)
PORT=5000
```

2. Set up the MySQL database:

```sql
CREATE DATABASE blacksite_db;
USE blacksite_db;

-- Create Users table
CREATE TABLE User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Account table
CREATE TABLE Account (
    Account_ID INT AUTO_INCREMENT PRIMARY KEY,
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);

-- Create Income table
CREATE TABLE Income (
    Income_ID INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    source VARCHAR(255) NOT NULL,
    description TEXT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);

-- Create Expense table
CREATE TABLE Expense (
    Expense_ID INT AUTO_INCREMENT PRIMARY KEY,
    Amount DECIMAL(10, 2) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Date DATE NOT NULL,
    Description TEXT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
);

-- Create Savings Goal table
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

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:5000`. If you need to change this, update the API URLs in the respective page files (`login.js`, `signup.js`, `transactions.js`, `goals.js`, etc.).

## 🚀 Running the Application

### Start the Backend Server

```bash
cd Backend
npm start
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

Open a new terminal:

```bash
cd Frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Create a new account via the signup page
3. Complete the onboarding questionnaire
4. Start tracking your finances!

## 📁 Project Structure

### Frontend Pages

- `/login` - User login page
- `/signup` - User registration page
- `/onboarding` - Interactive questionnaire for new users
- `/` - Dashboard (home page)
- `/transactions` - Transaction management
- `/goals` - Financial goal setting and tracking

### Backend API Routes

- `/api/auth` - Authentication endpoints (signup, login)
- `/api/transactions` - Transaction management endpoints
- `/api/goals` - Goal management endpoints
- `/api/dashboard` - Dashboard data aggregation

## 📚 API Documentation

### Authentication Endpoints

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

#### POST `/api/auth/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "authToken": "jwt_token_here"
}
```

### Transaction Endpoints

#### GET `/api/transactions/`
Retrieve all transactions for authenticated user.

**Headers:**
```
auth-token: your_jwt_token
```

#### POST `/api/transactions/add`
Add a new transaction.

**Headers:**
```
auth-token: your_jwt_token
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

### Goal Endpoints

#### GET `/api/goals/`
Retrieve all financial goals for authenticated user.

#### POST `/api/goals/add`
Create a new financial goal.

**Request Body:**
```json
{
  "title": "Vacation Fund",
  "target_amount": 5000,
  "deadline": "2026-06-01"
}
```

### Dashboard Endpoint

#### GET `/api/dashboard/`
Retrieve comprehensive dashboard data including recent transactions, spending by category, and monthly trends.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please review our [SECURITY.md](SECURITY.md) file for information on reporting vulnerabilities.

## 👥 Authors

- **Advay Sanketi** - Initial work

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Made with ❤️ for better financial management**
