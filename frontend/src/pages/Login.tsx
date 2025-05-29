import React, { useState, useEffect } from 'react';
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
  TypographyProps,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { styled, keyframes } from '@mui/material/styles';

// Royalty-free finance/expenses background image from Unsplash
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(33, 150, 243, 0);
  }
`;

const quotes = [
  {
    text: "The art is not in making money, but in keeping it.",
    author: "Proverb"
  },
  {
    text: "A wise person should have money in their head, but not in their heart.",
    author: "Jonathan Swift"
  },
  {
    text: "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus"
  },
  {
    text: "The lack of money is the root of all evil.",
    author: "Mark Twain"
  },
  {
    text: "Money is a tool. Used properly it makes something beautiful; used wrong, it makes a mess!",
    author: "Bradley Vinson"
  }
];

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
  animation: `${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1), ${float} 6s ease-in-out infinite`,
  backdropFilter: 'blur(10px)',
  '&:hover': {
    boxShadow: theme.shadows[12],
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease-in-out',
  },
}));

const ShimmerTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 50%, #2196F3 100%)',
  backgroundSize: '200% 100%',
  animation: `${shimmer} 3s infinite linear`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  letterSpacing: 1,
}));

const AnimatedTextField = styled(TextField)(({ theme }) => ({
  animation: `${fadeInUp} 0.5s cubic-bezier(0.23, 1, 0.32, 1)`,
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4],
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[8],
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
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '2px',
    bottom: -2,
    left: 0,
    backgroundColor: theme.palette.primary.main,
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease-out',
  },
  '&:hover:after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
}));

const QuoteContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: 0,
  right: 0,
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
  padding: theme.spacing(2),
  background: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(5px)',
  borderRadius: theme.spacing(1),
  maxWidth: '600px',
  margin: '0 auto',
  animation: `${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1)`,
}));

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentQuote, setCurrentQuote] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <BackgroundContainer maxWidth={false} disableGutters>
      <AnimatedPaper elevation={8}>
        <ShimmerTitle
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
        >
          Login
        </ShimmerTitle>
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
            },
          }}
        >
          <AnimatedTextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoFocus
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
            Login
          </AnimatedButton>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <AnimatedLink href="/register" variant="body2">
              Don't have an account? Register
            </AnimatedLink>
          </Box>
        </Box>
      </AnimatedPaper>
      <Fade in={true} timeout={1000}>
        <QuoteContainer>
          <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>
            "{quotes[currentQuote].text}"
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
            - {quotes[currentQuote].author}
          </Typography>
        </QuoteContainer>
      </Fade>
    </BackgroundContainer>
  );
};

export default Login; 