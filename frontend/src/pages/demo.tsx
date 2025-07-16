import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid
} from '@mui/material';
import Link from 'next/link';

export default function Demo() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Experience AI-Powered Coaching
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          See how our platform can transform your executive leadership
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Interactive Demo Coming Soon
          </Typography>
          <Typography variant="body1" paragraph>
            We're preparing an interactive demonstration of our AI coaching platform. 
            In the meantime, you can explore these features:
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🎯 Personalized Insights
                </Typography>
                <Typography variant="body2">
                  Our AI analyzes your business context to provide tailored recommendations
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  📊 Real-Time Analytics
                </Typography>
                <Typography variant="body2">
                  Track progress with comprehensive dashboards and KPI monitoring
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🤖 Multi-Agent AI System
                </Typography>
                <Typography variant="body2">
                  Specialized agents for revenue, leadership, operations, and finance
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  💡 Actionable Advice
                </Typography>
                <Typography variant="body2">
                  Get specific action items and implementation strategies
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => router.push('/signup')}
            >
              Start Free Trial
            </Button>
            <Link href="/" passHref>
              <Button variant="outlined" size="large">
                Back to Home
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 