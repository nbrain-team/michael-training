import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'AI-Powered Coaching',
      description: 'Get personalized insights from our advanced multi-agent AI system trained on proven executive coaching methodologies.'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Revenue Growth Strategies',
      description: 'Unlock new revenue streams and optimize pricing with data-driven recommendations tailored to your industry.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Leadership Excellence',
      description: 'Build high-performing teams and create a culture of innovation with expert leadership guidance.'
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Real-Time Analytics',
      description: 'Track your progress with comprehensive dashboards showing key performance indicators and growth metrics.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
            >
              Executive Coaching Reimagined
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, opacity: 0.9, maxWidth: '600px' }}
            >
              Harness the power of AI to accelerate your business growth with personalized coaching designed for C-suite executives.
            </Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                {isLoggedIn ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/dashboard')}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => router.push('/signup')}
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem'
                      }}
                    >
                      Start Free Trial
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => router.push('/demo')}
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      View Demo
                    </Button>
                  </>
                )}
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Transform Your Leadership
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
          >
            Our platform combines cutting-edge AI technology with proven coaching methodologies to deliver results that matter.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      boxShadow: 3,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ p: 6, textAlign: 'center', boxShadow: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Ready to Accelerate Your Growth?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Join leading executives who are transforming their businesses with AI-powered coaching.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/signup')}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)'
                  }
                }}
              >
                Get Started Today
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 