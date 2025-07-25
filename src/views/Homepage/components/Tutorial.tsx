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
  useTheme,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material/styles';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SvgImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  marginBottom: theme.spacing(2)
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
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
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle variant='h5'>
        Tutorial
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: fullScreen ? '100%' : 600, overflowY: 'auto' }}>
        <Grid container spacing={4}>
          {/* Introduzione */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
              👋 BENVENUTO/A IN ANTISGAM 👋 
            </Typography>
            <Typography variant="subtitle1" gutterBottom fontSize="16" sx={{ textAlign: 'center' }}>
              LA PRIMA ED UNICA APP PER SGAMARE GLI UNFOLLOWERS E NON FARSI BANNARE!
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'center' }}>
              se sei qui probabilmente starai cercando di capire quali dati caricare e come funziona l'app: non preoccuparti, è un po' lungo ma è tutto molto semplice!
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ textAlign: 'center' }}>
              e...si, purtroppo è l'unico modo per non essere bannati da Meta: triste ma vero.
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom sx={{ textAlign: 'center' }}>
              Ah, prima di cominciare, ricorda: <b>FAI ATTENZIONE ALLO STEP 10</b>. Mi raccomando! 😁
            </Typography>
          </Grid>

          {/* Step 0 */}
          <Grid size={{ xs: 12 }} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              COME RECUPERARE I DATI
            </Typography>
          </Grid>

          {/* Step 1 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    1.
                  </Typography>
                }
              />

              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography variant="body2" gutterBottom>
                  Fai click sul tasto "menu" (<MenuIcon fontSize='small' color="secondary" />) in alto a sinistra sulla pagina del tuo profilo Instagram
                </Typography>
                <StyledImage src="/assets/tutorial/1.jpg" alt="Step 1" />

              </CardContent>
            </Card>
          </Grid>
          {/* Step 2 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    2.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Clicca su "Centro gestione account"
                </Typography>
                <StyledImage src="/assets/tutorial/2.jpg" alt="Step 2" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 3 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    3.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Seleziona "le tue informazioni e autorizzazioni"
                </Typography>
                <StyledImage src="/assets/tutorial/3.jpg" alt="Step 3" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 4 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    4.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Clicca su "Scarica le tue informazioni"
                </Typography>
                <StyledImage src="/assets/tutorial/4.jpg" alt="Step 4" />
              </CardContent>
            </Card>
          </Grid>

          {/* Pro Tip */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    🚀 Pro Tip!
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Dallo step 1 puoi anche usare la ricerca per arrivare rapidamente a "Scarica le tue informazioni"!
                </Typography>
                <StyledImage src="/assets/tutorial/3_5.jpg" alt="Pro Tip" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 5 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    5.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Clicca su "Scarica sul dispositivo"
                </Typography>
                <StyledImage src="/assets/tutorial/5.jpg" alt="Step 5" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 6 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    6.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Seleziona "Scarica o trasferisci informazioni"
                </Typography>
                <StyledImage src="/assets/tutorial/6.jpg" alt="Step 6" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 7 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    7.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Seelziona "Alcune delle tue informazioni"
                </Typography>
                <StyledImage src="/assets/tutorial/7.jpg" alt="Step 7" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 8 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    8.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Trova "Follower e persone/Pagine seguite", selezionalo e fai click su "Avanti"
                </Typography>
                <StyledImage src="/assets/tutorial/8.jpg" alt="Step 8" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 9 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    9.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Verifica che la mail su "Notifica" sia corretta, dopo di che clicca su "Formato"
                </Typography>
                <StyledImage src="/assets/tutorial/9.jpg" alt="Step 9" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 10 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    10. <b>(IMPORTANTE)</b>
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" color="primary" gutterBottom>
                  <b>Seleziona "JSON" e fai click su "X"</b>
                </Typography>
                <StyledImage src="/assets/tutorial/10.jpg" alt="Step 10" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 11 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    11.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Opzionale ma può velocizzare il download: seleziona "Bassa" come "Qualità dei contenuti multimediali"
                </Typography>
                <StyledImage src="/assets/tutorial/11.jpg" alt="Step 11" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 12 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    12.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Opzionale, per la prima esecuzione seleziona "Dall'inizio" come "Intervallo di date"
                </Typography>
                <StyledImage src="/assets/tutorial/12.jpg" alt="Step 12" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 13 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    13.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Verifica che sia tutto impostato come nello screen successivo, dopo di che clicca su "Crea file"
                </Typography>
                <StyledImage src="/assets/tutorial/13.jpg" alt="Step 13" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 14 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    14.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Apparirà un messaggio di conferma della richiesta ed una box con la richiesta in corso: ora devi solo...
                </Typography>
                <StyledImage src="/assets/tutorial/14.jpg" alt="Step 14" />
              </CardContent>
            </Card>
          </Grid>

          {/* Step 15 */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    ATTENDERE 🕑
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2">
                  Esatto: attendere pazientemente che Meta elabori i dati.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Di solito è abbastanza veloce, ma nel frattempo puoi sempre uscire per un aperitivo (o giocare con il gatto, che ne so).
                </Typography>

                <SvgImage src="/assets/images/wait.svg" alt="Wait" />

              </CardContent>
            </Card>
          </Grid>

          {/* Step 16 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    16.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  Appena arriva la mail di Meta (tipo questa)...
                </Typography>
                <StyledImage src="/assets/tutorial/16.jpg" alt="Step 16" />
              </CardContent>
            </Card>
          </Grid>


          {/* Step 17 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    17.
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" gutterBottom>
                  ...torna a "Scarica le tue informazioni" e clicca su "Scarica" per scaricare il file ZIP con i tuoi dati.
                </Typography>
                <StyledImage src="/assets/tutorial/17.jpg" alt="Step 17" />
              </CardContent>
            </Card>
          </Grid>


          {/* Step 18 */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader
                sx={{ paddingBottom: 0 }}
                title={
                  <Typography variant="h6" fontSize={18}>
                    TORNA QUI E DECOLLIAMO! 🚀
                  </Typography>
                }
              />
              <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2">
                 ...sei ancora qui? Dai, corri ad analizzare il file!
                </Typography>

                <SvgImage src="/assets/images/launch.svg" alt="Andiamo!" />

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

export default TutorialModal;
