import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useAppSelector } from '../hooks/useRedux';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please log in to view your profile
          </Typography>
          <Button variant="contained" onClick={() => navigate('/auth')}>
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Username</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.username}
            </Typography>

            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">
              {user.email}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="error">
            Delete Account
          </Button>
          <Button variant="outlined">
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
