import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { ResultsContext } from './ResultsContext';
import { DlgResults } from './components';

const Results: React.FC = () => {
  const context = useContext(ResultsContext);
  if (!context) throw new Error('Results deve essere usato all’interno di <ResultsProvider>');

  const { unfollowers, removedSuggestions, pendingRequests, copyToClipboard, restart } = context;
  const hasUnfollowers = unfollowers?.length > 0;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen === true &&
        <DlgResults open={modalOpen} onClose={() => setModalOpen(false)} />
      }

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>

          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Typography variant="h4" gutterBottom>
              ECCO CHI SEGUI MA NON TI SEGUE
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Ora va e vendicati, ma fai attenzione ai <Button variant="outlined" size="small" onClick={() => setModalOpen(true)}> limiti di Instagram </Button>
            </Typography>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Box
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                mt: 1,
                mb: 1,
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 1,
              }}
            >
              {hasUnfollowers ? (
                <List>
                  {unfollowers.map((nickname, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <PersonIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={nickname} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    mt: 4,
                    mb: 4
                  }}
                >
                  <CelebrationIcon color="primary" sx={{ fontSize: 48 }} />
                  <Typography variant="h5" mt={2}>
                    Tutti i tuoi seguiti ti seguono a loro volta, ottimo!
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          {/* Azioni disponibili */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<ContentCopyIcon />}
                onClick={() => copyToClipboard('unfollowers')}
                disabled={!hasUnfollowers}
              >
                Copia negli appunti
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={restart}
              >
                Ricominciamo!
              </Button>
            </Box>
          </Grid>

          {/* Altri dati */}
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Typography variant="h5" gutterBottom>
              ALTRI DATI
            </Typography>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />


          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 12, lg: 5, xl: 4 }}>
            {/* Richieste inviate e mai accettate */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Richieste inviate e mai accettate</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 1,
                    mb: 2
                  }}
                >
                  <List>
                    {pendingRequests?.length > 0 ? 
                      pendingRequests.map((nickname, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <PersonIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={nickname} />
                        </ListItem>
                    )) : <ListItem>Nessuna richiesta trovata</ListItem>}
                  </List>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    fullWidth
                    onClick={() => copyToClipboard('pending')}
                  >
                    Copia
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 5, xl: 4 }}>
            {/* Suggerimenti rimossi */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Suggerimenti rimossi</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 1,
                    mb: 2
                  }}
                >
                  <List>
                    {removedSuggestions?.length > 0 ? 
                      removedSuggestions.map((nickname, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <PersonIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={nickname} />
                        </ListItem>
                    )) : <ListItem>Nessun suggerimento rimosso</ListItem>}
                  </List>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyToClipboard('suggestions')}
                  >
                    Copia
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

        </Grid>
      </Box >
    </>
  );
};

export default Results;
