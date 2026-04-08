import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { logoutSuccess } from '../features/auth/authSlice';
import { useAuthInit } from '../hooks/useAuthInit';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  // Initialize auth from localStorage on app load
  useAuthInit();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ px: 0 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flex: 1,
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              MERN Forum
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button component={Link} to="/forum" color="inherit">
                Forum
              </Button>

              {isAuthenticated ? (
                <>
                  <Button
                    startIcon={<AccountCircleIcon />}
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    {user?.username || 'Profile'}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleMenuClose}
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button component={Link} to="/auth" variant="outlined" size="small">
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: '#f5f5f5',
          py: 3,
          mt: 4,
          borderTop: '1px solid #ddd',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            © 2026 MERN Forum. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
