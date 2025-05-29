import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const tabConfig = [
  { label: 'Dashboard', path: '/dashboard', auth: true },
  { label: 'Expenses', path: '/expenses', auth: true },
  { label: 'Budgets', path: '/budgets', auth: true },
  { label: 'Reports', path: '/reports', auth: true },
  { label: 'Profile', path: '/profile', auth: true },
  { label: 'Register', path: '/register', auth: false },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine which tab is active
  const getActiveTab = () => {
    const found = tabConfig.find(
      (tab) => location.pathname.startsWith(tab.path)
    );
    return found ? found.path : false;
  };

  // Tabs to show based on auth
  const visibleTabs = tabConfig.filter((tab) =>
    user ? tab.auth : !tab.auth
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start', px: 0 }}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Expense Tracker
            </Typography>
            {user && (
              <Typography sx={{ mr: 2 }}>Welcome, {user.name}</Typography>
            )}
            {user && (
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
                Logout
              </Button>
            )}
          </Box>
          <Tabs
            value={getActiveTab()}
            onChange={(_, value) => navigate(value)}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: '100%' }}
          >
            {visibleTabs.map((tab) => (
              <Tab
                key={tab.path}
                label={tab.label}
                value={tab.path}
                sx={{ color: 'white', fontWeight: 'bold' }}
              />
            ))}
            {!user && (
              <Tab
                key="/login"
                label="Login"
                value="/login"
                sx={{ color: 'white', fontWeight: 'bold' }}
              />
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Expense Tracker
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 