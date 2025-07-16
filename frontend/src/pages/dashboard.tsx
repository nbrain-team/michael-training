import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  Assignment,
  CheckCircle,
  Schedule,
  Chat,
  Lightbulb,
  BarChart
} from '@mui/icons-material';

export default function Dashboard() {
  const router = useRouter();
  const [openCoachingDialog, setOpenCoachingDialog] = useState(false);
  const [coachingQuery, setCoachingQuery] = useState('');
  const [coachingResponse, setCoachingResponse] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Mock data
  const kpis = [
    { label: 'Revenue Growth', value: '+23%', icon: <TrendingUp />, color: 'success.main' },
    { label: 'Team Performance', value: '87/100', icon: <People />, color: 'primary.main' },
    { label: 'Profit Margin', value: '18.5%', icon: <AttachMoney />, color: 'warning.main' },
    { label: 'Projects Complete', value: '12/15', icon: <Assignment />, color: 'info.main' }
  ];

  const goals = [
    { id: 1, title: 'Increase Q4 Revenue by 25%', progress: 68, status: 'in-progress' },
    { id: 2, title: 'Hire 5 Senior Engineers', progress: 40, status: 'in-progress' },
    { id: 3, title: 'Launch New Product Line', progress: 100, status: 'completed' },
    { id: 4, title: 'Improve Customer Retention to 95%', progress: 85, status: 'in-progress' }
  ];

  const recentInsights = [
    {
      id: 1,
      type: 'revenue',
      title: 'Opportunity: Upsell to Enterprise Clients',
      description: 'Analysis shows 40% of your mid-tier clients are ready for enterprise features.',
      actionable: true
    },
    {
      id: 2,
      type: 'leadership',
      title: 'Team Morale Alert',
      description: 'Recent survey indicates engineering team satisfaction dropped 15%. Consider 1-on-1s.',
      actionable: true
    },
    {
      id: 3,
      type: 'operations',
      title: 'Process Optimization',
      description: 'Your sales cycle could be reduced by 20% with automated follow-ups.',
      actionable: true
    }
  ];

  const upcomingSessions = [
    { id: 1, title: 'Weekly Strategy Review', time: 'Today, 2:00 PM', type: 'strategy' },
    { id: 2, title: 'Leadership Coaching', time: 'Tomorrow, 10:00 AM', type: 'leadership' },
    { id: 3, title: 'Financial Planning', time: 'Friday, 3:00 PM', type: 'finance' }
  ];

  const handleCoachingSubmit = () => {
    // Mock AI response
    const responses = [
      "Based on your revenue goals, I recommend focusing on your existing enterprise clients. Schedule meetings with your top 10 accounts this week to discuss expansion opportunities. Also, consider implementing a referral program - your NPS score of 72 indicates satisfied customers who would likely refer others.",
      "To improve team morale, start with weekly 1-on-1s with each team lead. Focus on understanding their challenges and career aspirations. Consider implementing a peer recognition program and reviewing your compensation structure against market rates.",
      "For operational efficiency, prioritize automating your sales follow-up process. Tools like HubSpot or Salesforce can reduce manual work by 60%. Also, analyze your sales funnel data - you're losing 30% of leads at the demo stage, suggesting a need for better demo training."
    ];
    
    setCoachingResponse(responses[Math.floor(Math.random() * responses.length)]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Welcome back, Executive
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's your personalized coaching dashboard
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: kpi.color, mr: 2 }}>
                      {kpi.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h4">{kpi.value}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {kpi.label}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Goals Progress */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Assignment sx={{ mr: 1 }} /> Active Goals
              </Typography>
              <List>
                {goals.map((goal) => (
                  <ListItem key={goal.id} sx={{ px: 0 }}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{goal.title}</Typography>
                        {goal.status === 'completed' ? (
                          <CheckCircle color="success" fontSize="small" />
                        ) : (
                          <Chip label={`${goal.progress}%`} size="small" />
                        )}
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={goal.progress} 
                        color={goal.status === 'completed' ? 'success' : 'primary'}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* AI Insights */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Lightbulb sx={{ mr: 1 }} /> AI-Powered Insights
              </Typography>
              <List>
                {recentInsights.map((insight) => (
                  <ListItem key={insight.id} sx={{ px: 0, display: 'block' }}>
                    <Typography variant="subtitle2" color="primary">
                      {insight.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {insight.description}
                    </Typography>
                    {insight.actionable && (
                      <Button size="small" variant="outlined">
                        Take Action
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<Chat />}
                  onClick={() => setOpenCoachingDialog(true)}
                >
                  Start Coaching Session
                </Button>
                <Button variant="outlined" fullWidth startIcon={<BarChart />}>
                  View Analytics
                </Button>
                <Button variant="outlined" fullWidth startIcon={<People />}>
                  Team Dashboard
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Upcoming Sessions */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ mr: 1 }} /> Upcoming Coaching Sessions
              </Typography>
              <List>
                {upcomingSessions.map((session) => (
                  <ListItem key={session.id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={session.title}
                      secondary={session.time}
                    />
                    <Button size="small">Join</Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Coaching Dialog */}
      <Dialog open={openCoachingDialog} onClose={() => setOpenCoachingDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>AI Coaching Assistant</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Ask me anything about your business, leadership, revenue growth, or operations.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="What would you like to discuss?"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={coachingQuery}
            onChange={(e) => setCoachingQuery(e.target.value)}
            placeholder="E.g., How can I improve team productivity? What strategies can increase revenue this quarter?"
          />
          {coachingResponse && (
            <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2">
                <strong>AI Coach:</strong> {coachingResponse}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenCoachingDialog(false);
            setCoachingQuery('');
            setCoachingResponse('');
          }}>
            Close
          </Button>
          <Button onClick={handleCoachingSubmit} variant="contained" disabled={!coachingQuery}>
            Get Advice
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 