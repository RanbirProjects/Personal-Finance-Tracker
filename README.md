 Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
Website Screen recorder Demo
[https://github.com/user-attachments/assets/53fb8ddb-6b14-4d43-bc74-dcb1c6159907](https://github.com/RanbirProjects/Personal-Finance-Tracker/issues/1#issue-3100988647)
Login page 
![19701EF8-898F-4F17-8E67-143723D45EC9_1_105_c](https://github.com/user-attachments/assets/ef87c287-472a-4996-95cf-c760ee684794)

Registration page

![9299FEF9-7AD1-4FE4-9F84-9D4B09DA9728_1_105_c](https://github.com/user-attachments/assets/88aae386-3d00-46e2-860c-55ad25488cff)



 Features

- User authentication (register/login)
- Add, edit, and delete expenses
- Categorize expenses
- View expense history
- Dashboard with expense statistics
- Visual charts for expense analysis
- Responsive design

 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

 Setup

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

Running the Application

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

API Endpoints

Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

 Expenses
- GET /api/expenses - Get all expenses
- POST /api/expenses - Create a new expense
- PUT /api/expenses/:id - Update an expense
- DELETE /api/expenses/:id - Delete an expense
- GET /api/expenses/stats - Get expense statistics
 Technologies Used

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

Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

License

This project is licensed under the MIT License.

Personal-Finance-Tracker
 Finaince-Tracker-webiste

A comprehensive personal finance tracking application built with modern web technologies.

Video Demonstration

https://github.com/RanbirProjects/Finaince-Tracker-webiste/assets/your-github-username/your-video-id
Features

- User authentication (register/login)
- Add, edit, and delete expenses
- Categorize expenses
- View expense history
- Dashboard with expense statistics
- Visual charts for expense analysis
- Responsive design
 Personal-Finance-Tracker
