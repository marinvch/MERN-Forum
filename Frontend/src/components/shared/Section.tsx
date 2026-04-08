import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  py?: number | { xs: number; md: number };
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isDark?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  py = 8,
  maxWidth = 'lg',
  isDark = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py,
        background: isDark
          ? theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(15, 23, 42, 0.05)'
          : 'transparent',
      }}
    >
      <Container maxWidth={maxWidth}>
        {(title || description) && (
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            {title && (
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 500 }}>
                {description}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};
