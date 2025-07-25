import React, { useContext, useEffect, useState } from 'react';
import { LoadingScreenContext } from './LoadingScreenContext';
import { Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';

const LoadingScreen: React.FC = () => {
  const context = useContext(LoadingScreenContext);
  if (!context) throw new Error('LoadingScreen deve essere usato all’interno di <LoadingScreenProvider>');

  const [indice, setIndice] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndice((prev) => (prev + 1) % context.suggerimenti.length);
  //   }, 5000); // Cambia suggerimento ogni 5 sec

  //   return () => clearInterval(interval);
  // }, [context.suggerimenti.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * context.suggerimenti.length);
        } while (next === prev && context.suggerimenti.length > 1);
        return next;
      });
    }, 5000);

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
      <CircularProgress color="primary" size={90} />

      <Box sx={{ mt: 4, maxWidth: 400, px: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="body1" align="center">
              {context.suggerimenti[indice]}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
