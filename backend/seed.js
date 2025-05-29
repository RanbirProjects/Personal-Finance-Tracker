const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Expense = require('./models/Expense');
require('dotenv').config();

const sampleUsers = [
  {
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    password: "password123", // Will be hashed
    createdAt: new Date("2025-05-01T10:00:00Z")
  },
  {
    name: "Priya Singh",
    email: "priya.singh@example.com",
    password: "password123", // Will be hashed
    createdAt: new Date("2025-05-02T12:00:00Z")
  }
];

const sampleExpenses = [
  {
    amount: 1500,
    category: "Food",
    description: "Grocery shopping",
    date: new Date("2025-05-10T08:30:00Z")
  },
  {
    amount: 3000,
    category: "Transport",
    description: "Monthly bus pass",
    date: new Date("2025-05-12T09:00:00Z")
  },
  {
    amount: 500,
    category: "Entertainment",
    description: "Movie tickets",
    date: new Date("2025-05-15T18:00:00Z")
  },
  {
    amount: 2000,
    category: "Bills",
    description: "Electricity bill",
    date: new Date("2025-05-20T11:00:00Z")
  },
  {
    amount: 800,
    category: "Food",
    description: "Restaurant dinner",
    date: new Date("2025-05-25T19:00:00Z")
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Expense.deleteMany({});
    console.log('Cleared existing data');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log('Created users');

    // Create expenses with user references
    const expenses = sampleExpenses.map((expense, index) => ({
      ...expense,
      userId: createdUsers[index % 2]._id // Alternate between users
    }));

    await Expense.insertMany(expenses);
    console.log('Created expenses');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 