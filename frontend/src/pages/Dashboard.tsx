import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  GridProps,
  Box,
  useTheme,
  alpha,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { expenses } from '../services/api';
import { ExpenseStats, Expense } from '../types';
import { styled } from '@mui/material/styles';
import ExpenseGraphs from '../components/ExpenseGraphs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  animation: 'fadeInUp 0.5s ease-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<ExpenseStats[]>([]);
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, expensesData] = await Promise.all([
          expenses.getStats(),
          expenses.getAll()
        ]);
        setStats(statsData);
        setExpenseData(expensesData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" variant="h5">
          {error}
        </Typography>
      </Container>
    );
  }

  const totalExpenses = stats.reduce((sum, stat) => sum + stat.total, 0);
  const averageMonthly = (totalExpenses / 12).toFixed(2);
  const topCategory = stats.length > 0 
    ? stats.reduce((max, stat) => (stat.total > max.total ? stat : max), stats[0])._id 
    : 'No data';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontWeight: 'bold',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid {...({ item: true, xs: 12, md: 4 } as GridProps)}>
          <AnimatedPaper>
            <Typography variant="h6" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant="h4" sx={{ color: 'primary.main' }}>
              ₹{totalExpenses}
            </Typography>
          </AnimatedPaper>
        </Grid>
        <Grid {...({ item: true, xs: 12, md: 4 } as GridProps)}>
          <AnimatedPaper>
            <Typography variant="h6" gutterBottom>
              Average Monthly
            </Typography>
            <Typography variant="h4" sx={{ color: 'secondary.main' }}>
              ₹{averageMonthly}
            </Typography>
          </AnimatedPaper>
        </Grid>
        <Grid {...({ item: true, xs: 12, md: 4 } as GridProps)}>
          <AnimatedPaper>
            <Typography variant="h6" gutterBottom>
              Top Category
            </Typography>
            <Typography variant="h4" sx={{ color: 'success.main' }}>
              {topCategory}
            </Typography>
          </AnimatedPaper>
        </Grid>

        {/* Expense Graphs */}
        <Grid {...({ item: true, xs: 12 } as GridProps)}>
          <ExpenseGraphs expenses={expenseData} />
        </Grid>

        {/* Recent Expenses */}
        <Grid {...({ item: true, xs: 12 } as GridProps)}>
          <AnimatedPaper>
            <Typography variant="h6" gutterBottom>
              Recent Expenses
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.map((expense: Expense) => (
                    <TableRow key={expense._id}>
                      <TableCell>
                        {new Date(expense.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell align="right">₹{expense.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AnimatedPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 