import React, { useContext, useState } from 'react';
import { HomepageContext } from './HomepageContext';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HelpIcon from '@mui/icons-material/Help';
import { Uploader, DlgTutorial } from './components';

const Homepage: React.FC = () => {
  const context = useContext(HomepageContext);
  if (!context) throw new Error('Homepage deve essere usato all’interno di <HomepageProvider>');

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen === true &&
        <DlgTutorial open={modalOpen} onClose={() => setModalOpen(false)} />
      }

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>

          {/* Bottone "Dove li trovo?" */}
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ pb: 2 }}>
                1 - LEGGI IL TUTORIAL E RECUPERA I DATI
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button fullWidth startIcon={<HelpIcon />} variant="outlined" size="large" onClick={() => setModalOpen(true)}>
                Spiegami tutto
              </Button>
            </Box>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />


          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          {/* Titolo: 1 - CARICA LE LISTE */}
          <Grid size={{ xs: 12, md: 6, lg: 5, xl: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                2 - CARICA I TUOI DATI
              </Typography>
              <FolderZipIcon color="primary" />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 5, xl: 4 }} />
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          <Uploader key={`uploader_${context.uploaderETag}`} />

          {/* Titolo: 2 - ESEGUI */}
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                3 - ESEGUI L'ANALISI
              </Typography>
              <RocketLaunchIcon color="primary" />
            </Box>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          {/* Bottone "ANDIAMO!" */}
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<RocketLaunchIcon />}
                onClick={() => context.analyzeData()}
              >
                ANDIAMO!
              </Button>
            </Box>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          {/* Bottone testo "oppure, ricominciamo" */}
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button fullWidth variant="text" size="medium" onClick={() => context.resetForm()}>
                oppure, ricominciamo
              </Button>
            </Box>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

        </Grid>
      </Box>
    </>
  );
};

export default Homepage;
