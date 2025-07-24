import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import pageEaten from '../../../public/assets/images/page-eaten.svg';

const NotFoundComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center'
        }}
      >

        <Box
          component="img"
          src={pageEaten}
          alt="Pagina mangiata"
          sx={{
            width: {
              xs: '30%',   // su schermi piccoli (<600px)
              sm: '50%',   // su schermi medi (≥600px)
              md: '80%',   // su schermi più grandi (≥900px)
            },
            maxWidth: 300,
            mx: 'auto',
            mb: 4,
            display: 'block',
          }}
        />

        <Typography variant="h1" color="primary">
          404
        </Typography>

        <Typography variant="h2" gutterBottom>
          NOT FOUND
        </Typography>

        <Typography variant="h5" gutterBottom>
          nel senso che questa pagina non esiste
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          o magari esiste, ma palesemente non è quello che cercavi.
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Torniamo alla Home, ok?
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFoundComponent;
