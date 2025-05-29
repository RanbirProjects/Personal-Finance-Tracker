# Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (register/login)
- Add, edit, and delete expenses
- Categorize expenses
- View expense history
- Dashboard with expense statistics
- Visual charts for expense analysis
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Expenses
- GET /api/expenses - Get all expenses
- POST /api/expenses - Create a new expense
- PUT /api/expenses/:id - Update an expense
- DELETE /api/expenses/:id - Delete an expense
- GET /api/expenses/stats - Get expense statistics

## Technologies Used

- Frontend:
  - React.js with TypeScript
  - Material-UI for components
  - Recharts for data visualization
  - React Router for navigation
  - Axios for API calls

- Backend:
  - Node.js with Express
  - MongoDB with Mongoose
  - JWT for authentication
  - bcryptjs for password hashing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. # Fitness-Tracker
# Personal-Finance-Tracker
