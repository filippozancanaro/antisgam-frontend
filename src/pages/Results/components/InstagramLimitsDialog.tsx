import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  open: boolean;
  onClose: () => void;
}

const InstagramLimitsDialog = ({ open, onClose }: Props) => {
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
      <DialogTitle variant='h5'>
        Informazioni importanti
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: fullScreen ? '100%' : 600, overflowY: 'auto' }}>
        <Grid container spacing={4}>
          {/* Introduzione */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
              ALCUNE INFORMAZIONI IMPORTANTI
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', fontSize: 16 }}>
              OVVERO COME NON FARSI SOSPENDERE L'ACCOUNT PER LA TROPPA CATTIVERIA
            </Typography>
          </Grid>

          {/* Step 0 */}
          <Grid size={{ xs: 12 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              LIMITI DI INSTAGRAM
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" sx={{ fontSize: 18 }}>
                    Quanti Follow/Unfollow posso fare e in quanto tempo?
                  </Typography>
                }
              />

              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography variant="body2" gutterBottom>
                  Massimo 50 o 60 follows e unfollows (sommati) all'ora al momento dovrebbero essere considerati sicuri.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Il limite giornaliero dovrebbe essere attorno ad un massimo 150 operazioni di segui e unfollow.
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" sx={{ fontSize: 18 }}>
                    Che succede se eccedo questi limiti?
                  </Typography>
                }
              />

              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography variant="body2" gutterBottom>
                  L'account potrebbe essere sospeso o shadowbannato per comportamenti sospetti.
                </Typography>

                <Typography variant="body2" gutterBottom>
                  Potrebbero inoltre sospendere alcune azioni come i direct, commenti, reaction, ecc...
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" sx={{ fontSize: 18 }}>
                    Parlavi di somma tra follow e unfollow: come mai?
                  </Typography>
                }
              />

              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography variant="body2" gutterBottom>
                  Meta equipara le due azioni, ragion per cui vanno sommate.
                </Typography>

              </CardContent>
            </Card>
          </Grid>


          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" sx={{ fontSize: 18 }}>
                    Perché parli col condizionale?
                  </Typography>
                }
              />

              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography variant="body2" gutterBottom>
                  Perché Meta è Meta e a Meta piace cambiare: un po' come le scale di Harry Potter, ma peggio.
                </Typography>

              </CardContent>
            </Card>
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

export default InstagramLimitsDialog;
