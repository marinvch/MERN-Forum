import React from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { HeroSection, FeatureCard, Section } from '../components/shared';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to MERN Forum"
        subtitle="Discuss topics, share ideas, and connect with the community"
        description="A modern platform for meaningful discussions. Join thousands of users sharing insights and connecting with like-minded individuals."
        primaryAction={{
          label: 'Browse Forum',
          onClick: () => navigate('/forum'),
        }}
        secondaryAction={{
          label: 'Join Now',
          onClick: () => navigate('/auth'),
        }}
      />

      {/* Features Section */}
      <Section
        title="Why Choose Our Forum?"
        description="Everything you need for a thriving community"
        isDark={false}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<ForumIcon />}
              title="Discussion Threads"
              description="Create and participate in active discussions on topics you care about"
              color="linear-gradient(135deg, #3b82f6, #2563eb)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<PeopleIcon />}
              title="Active Community"
              description="Connect with thousands of members and build meaningful relationships"
              color="linear-gradient(135deg, #7c3aed, #6d28d9)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<TrendingUpIcon />}
              title="Growing Platform"
              description="Join a rapidly growing community of engaged users and thinkers"
              color="linear-gradient(135deg, #10b981, #059669)"
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
};

export default HomePage;
