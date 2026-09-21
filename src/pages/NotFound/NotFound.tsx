import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <Box
          component="img"
          src="/assets/images/page-eaten.svg"
          alt="Pagina mangiata"
          sx={{
            width: { xs: "30%", sm: "50%", md: "80%" },
            maxWidth: 300,
            mx: "auto",
            mb: 4,
            display: "block",
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

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          o magari esiste, ma palesemente non è quello che cercavi.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Torniamo alla Home, ok?
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFound;
