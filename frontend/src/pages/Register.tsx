import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Fade,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { styled, keyframes } from '@mui/material/styles';

// Use the same Unsplash finance/expenses background image
const BACKGROUND_URL =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=80';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  minWidth: '100vw',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${BACKGROUND_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 0,
  padding: 0,
  margin: 0,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(5, 4),
  borderRadius: theme.spacing(2),
  background: 'rgba(255,255,255,0.85)',
  boxShadow: theme.shadows[8],
  animation: `${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1)`,
  backdropFilter: 'blur(10px)',
  '&:hover': {
    boxShadow: theme.shadows[12],
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease-in-out',
  },
}));

const AnimatedTextField = styled(TextField)(({ theme }) => ({
  animation: `${fadeInUp} 0.5s cubic-bezier(0.23, 1, 0.32, 1)`,
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4],
    },
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  animation: `${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1)`,
  '&:hover': {
    animation: `${pulse} 1s infinite`,
  },
}));

const AnimatedLink = styled(Link)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    color: theme.palette.primary.main,
  },
}));

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <BackgroundContainer maxWidth={false} disableGutters>
      <AnimatedPaper elevation={8}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            animation: `${fadeInUp} 0.5s cubic-bezier(0.23, 1, 0.32, 1)`,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Register
        </Typography>
        <Fade in={!!error}>
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        </Fade>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > *': {
              animation: `${fadeInUp} 0.5s cubic-bezier(0.23, 1, 0.32, 1)`,
              animationFillMode: 'both',
              '&:nth-of-type(1)': { animationDelay: '0.1s' },
              '&:nth-of-type(2)': { animationDelay: '0.2s' },
              '&:nth-of-type(3)': { animationDelay: '0.3s' },
              '&:nth-of-type(4)': { animationDelay: '0.4s' },
            },
          }}
        >
          <AnimatedTextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            autoFocus
          />
          <AnimatedTextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <AnimatedTextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <AnimatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                boxShadow: 6,
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              },
            }}
          >
            Register
          </AnimatedButton>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <AnimatedLink href="/login" variant="body2">
              Already have an account? Login
            </AnimatedLink>
          </Box>
        </Box>
      </AnimatedPaper>
    </BackgroundContainer>
  );
};

export default Register; 