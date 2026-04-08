import React from 'react';
import { Container, Box, Typography, CircularProgress, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetAllPostsQuery } from '../features/forum/api/postsApi';

const ForumPage: React.FC = () => {
  const { data: posts, isLoading, error } = useGetAllPostsQuery();

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ py: 4 }}>
          <Typography color="error">Error loading posts</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">Forum</Typography>
          <Button component={Link} to="/forum/create" variant="contained">
            Create Post
          </Button>
        </Box>

        {posts && posts.length > 0 ? (
          <Box sx={{ display: 'grid', gap: 2 }}>
            {posts.map((post) => (
              <Card key={post._id}>
                <CardContent>
                  <Typography variant="h6" component={Link} to={`/forum/${post._id}`} sx={{ textDecoration: 'none' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.content?.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography>No posts yet. Be the first to create one!</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForumPage;
