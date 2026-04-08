import React from 'react';
import { Box, Card, CardContent, Typography, Stack, useTheme } from '@mui/material';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)`
          : `linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(124, 58, 237, 0.02) 100%)`,
        backdropFilter: 'blur(10px)',
        borderColor: theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
      }}
    >
      <CardContent sx={{ pt: 4, pb: 4 }}>
        <Stack spacing={2}>
          {icon && (
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '0.75rem',
                background: color || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                color: '#fff',
              }}
            >
              {icon}
            </Box>
          )}

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
