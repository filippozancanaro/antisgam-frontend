import React, { useContext } from 'react';
import { HomepageContext } from './HomepageContext';
import {
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Uploader } from './components';


const Homepage: React.FC = () => {
  const context = useContext(HomepageContext);
  if (!context) throw new Error('Homepage deve essere usato all’interno di <HomepageProvider>');

  const modeSelectionHandler = (value: 'zip' | 'json') => {
    context.changeMode(value);
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
        {/* Titolo: 1 - CARICA LE LISTE */}
        <Grid size={{ xs: 12, md: 6, lg: 5, xl: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mr: 1 }}>
              1 - CARICA I TUOI DATI O LE LISTE
            </Typography>
            <FormatListBulletedIcon color="primary" />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 5, xl: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tabs value={context.mode} onChange={(_e, value: 'zip' | 'json') => modeSelectionHandler(value)} aria-label="basic tabs example">
              <Tab label="Carica ZIP" value="zip" />
              <Tab label="Carica JSON" value="json" />
            </Tabs>
          </Box>
        </Grid>
        <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

        <Uploader />

        {/* Bottone "Dove li trovo?" */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" size="large">
              Spiegami tutto
            </Button>
          </Box>
        </Grid>

        {/* Titolo: 2 - ESEGUI */}
        <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
        <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mr: 1 }}>
              2 - ESEGUI
            </Typography>
            <RocketLaunchIcon color="primary" />
          </Box>
        </Grid>
        <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

        {/* Bottone "ANDIAMO!" */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large" onClick={() => context.analyzeData()}>
              ANDIAMO!
            </Button>
          </Box>
        </Grid>

        {/* Bottone testo "oppure, ricominciamo" */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="text" size="medium">
              oppure, ricominciamo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
