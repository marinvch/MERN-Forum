import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../features/forum/api/postsApi';
import { useAppSelector } from '../hooks/useRedux';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [createPost, { isLoading: isCreating, error }] = useCreatePostMutation();
  const [formData, setFormData] = useState({ title: '', content: '' });

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Alert severity="warning">You must be logged in to create a post</Alert>
          <Button
            variant="contained"
            onClick={() => navigate('/auth')}
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(formData).unwrap();
      navigate('/forum');
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Create a New Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {typeof error === 'object' && 'data' in error && typeof error.data === 'object' && 'message' in error.data
              ? (error.data as any).message
              : 'Failed to create post'}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Post Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

          <TextField
            label="Post Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={6}
            variant="outlined"
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/forum')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isCreating || !formData.title || !formData.content}
            >
              {isCreating ? 'Creating...' : 'Create Post'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreatePostPage;
