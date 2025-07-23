import React, { useContext, useEffect, useState } from 'react';
import { LoadingScreenContext } from './LoadingScreenContext';
import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingScreen: React.FC = () => {
  const context = useContext(LoadingScreenContext);
  if (!context) throw new Error('LoadingScreen deve essere usato all’interno di <LoadingScreenProvider>');

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prev) => (prev + 1) % context.suggerimenti.length);
    }, 5000); // Cambia suggerimento ogni 5 sec

    return () => clearInterval(interval);
  }, [context.suggerimenti.length]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // bgcolor: '#f5f5f5',
      }}
    >
      <CircularProgress color="primary" />

      <Box sx={{ mt: 4, maxWidth: 400, px: 2 }}>
        <Typography variant="body1" align="center">
          {context.suggerimenti[indice]}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
