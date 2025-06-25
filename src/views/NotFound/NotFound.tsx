import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>

        <Typography variant="h5" gutterBottom>
          Oops! La pagina che cerchi non esiste.
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Forse hai scritto male l’indirizzo o la pagina è stata rimossa.
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Torna alla Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFoundComponent;
