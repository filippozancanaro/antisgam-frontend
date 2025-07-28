import React, { useContext, useEffect, useState } from 'react';
import { LoadingScreenContext } from './LoadingScreenContext';
import { Box, Typography, CircularProgress, Card, CardContent, Container } from '@mui/material';

const LoadingScreen: React.FC = () => {
  const context = useContext(LoadingScreenContext);
  if (!context) throw new Error('LoadingScreen deve essere usato all’interno di <LoadingScreenProvider>');

  const [indice, setIndice] = useState(() => Math.floor(Math.random() * context.suggerimenti.length) ?? 0);

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
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        py: 3,
        maxWidth: { xs: '100%', md: '900px' },
        mx: 'auto',
      }}
    >

      {/* Blocco centrale */}
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={'/assets/images/loading.svg'}
          alt="Loading"
          sx={{
            width: {
              xs: '60%',
              sm: '50%',
              md: '40%',
            },
            maxWidth: 300,
            mb: 4,
            mx: 'auto',
          }}
        />

        <CircularProgress color="primary" size={90} />
      </Box>

      {/* Card fissa in fondo */}
      <Box sx={{ mt: 4, px: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="body1" align="center">
              {context.suggerimenti[indice]}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoadingScreen;
