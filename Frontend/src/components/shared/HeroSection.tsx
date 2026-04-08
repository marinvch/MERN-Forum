import React from 'react';
import { Box, Container, Typography, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: backgroundImage
          ? `linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%), url(${backgroundImage})`
          : `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant={isMobile ? 'h2' : 'h1'}
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadeInDown 0.6s ease-out',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
              fontWeight: 500,
              animation: 'fadeInUp 0.6s ease-out 0.1s backwards',
            }}
          >
            {subtitle}
          </Typography>

          {description && (
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                color: theme.palette.text.secondary,
                fontSize: '1.125rem',
                animation: 'fadeInUp 0.6s ease-out 0.2s backwards',
              }}
            >
              {description}
            </Typography>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ animation: 'fadeInUp 0.6s ease-out 0.3s backwards' }}
          >
            {primaryAction && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                href={primaryAction.href}
                onClick={primaryAction.onClick}
                endIcon={<ArrowRightIcon />}
                sx={{ minWidth: '200px' }}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                href={secondaryAction.href}
                onClick={secondaryAction.onClick}
                sx={{ minWidth: '200px' }}
              >
                {secondaryAction.label}
              </Button>
            )}
          </Stack>
        </Box>
      </Container>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};
