import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

interface Props {
  open: boolean;
  onClose: () => void;
}

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(2)
}));

const TutorialModal: React.FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle variant='h6'>
        Tutorial
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: fullScreen ? '100%' : 600, overflowY: 'auto' }}>
        <Grid container spacing={4}>
          {/* Step 1 */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" gutterBottom>
              👋 Benvenuto! Ecco come funziona l'app.
            </Typography>
            <StyledImage src="/assets/tutorial/1.jpg" alt="Step 1" />
            <Typography variant="body2">
              Carica i tuoi file ZIP o JSON con i dati di Instagram. Segui le istruzioni nella sezione 1 della homepage.
            </Typography>
          </Grid>

          {/* Step 2 */}
          <Grid size={{ xs: 12 }}>
            <StyledImage src="/assets/tutorial/2.jpg" alt="Step 2" />
            <Typography variant="body2">
              Una volta caricati, premi "Andiamo!" per vedere chi ha smesso di seguirti. L'app farà tutto in automatico.
            </Typography>
          </Grid>

          {/* Step 3 */}
          <Grid size={{ xs: 12 }}>
            <StyledImage src="/assets/tutorial/3.jpg" alt="Step 3" />
            <Typography variant="body2">
              Puoi copiare la lista, esportarla, oppure… semplicemente perdonarli 😄
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          startIcon={<CheckCircleIcon />}
        >
          Ok, ho capito!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialModal;
