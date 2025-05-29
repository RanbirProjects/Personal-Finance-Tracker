export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  paymentMethod: string;
  user: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ExpenseStats {
  _id: string;
  total: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
} 