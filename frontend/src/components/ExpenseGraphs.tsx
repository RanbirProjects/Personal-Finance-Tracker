import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  useTheme,
  GridProps,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { styled } from '@mui/material/styles';

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

interface ExpenseData {
  category: string;
  amount: number;
  date: string;
}

interface ExpenseGraphsProps {
  expenses: ExpenseData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ExpenseGraphs: React.FC<ExpenseGraphsProps> = ({ expenses }) => {
  const theme = useTheme();

  // Process data for different chart types
  const categoryData = expenses.reduce((acc: any[], expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, []);

  const monthlyData = expenses.reduce((acc: any[], expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ month, amount: expense.amount });
    }
    return acc;
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid {...({ item: true, xs: 12, md: 6 } as GridProps)}>
        <AnimatedPaper>
          <Typography variant="h6" gutterBottom>
            Expenses by Category
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </AnimatedPaper>
      </Grid>

      <Grid {...({ item: true, xs: 12, md: 6 } as GridProps)}>
        <AnimatedPaper>
          <Typography variant="h6" gutterBottom>
            Monthly Expenses
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill={theme.palette.primary.main}
                  name="Total Expenses"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </AnimatedPaper>
      </Grid>

      <Grid {...({ item: true, xs: 12 } as GridProps)}>
        <AnimatedPaper>
          <Typography variant="h6" gutterBottom>
            Expense Trends
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={theme.palette.secondary.main}
                  name="Expense Trend"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </AnimatedPaper>
      </Grid>
    </Grid>
  );
};

export default ExpenseGraphs; 