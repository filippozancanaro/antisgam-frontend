import React, { useContext } from 'react';
import { HomepageContext } from './HomepageContext';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { FilePicker } from '../../components';


const Homepage: React.FC = () => {
  const context = useContext(HomepageContext);
  if (!context) throw new Error('Toolbar deve essere usato all’interno di <HomepageProvider>');

  // const { title } = context;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Titolo: 1 - CARICA LE LISTE */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mr: 1 }}>
              1 - CARICA LE LISTE
            </Typography>
            <FormatListBulletedIcon color="primary" />
          </Box>
        </Grid>

        {/* Spazio a sinistra su XL (2/12) */}
        <Grid size={{ xl: 2 }} sx={{ display: { xs: 'none', xl: 'block' } }} />

        {/* Followers */}
        <Grid size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
          <Box sx={{ bgcolor: '#e0f7fa', p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{color: 'common.black'}}>FOLLOWERS</Typography>
            {/* drag & drop placeholder */}

            <FilePicker
              acceptedFiles={['application/json']}
              pageTitle="Followers"
              enabled={true}
              onUploadStarted={(name) => console.log('START:', name)}
              onUploadCompleted={(name, content) => console.log('DONE:', name, content)}
              onSelectionCleaned={() => console.log('CLEANED')}
            />

          </Box>
        </Grid>

        {/* Following */}
        <Grid size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
          <Box sx={{ bgcolor: '#fce4ec', p: 2, textAlign: 'center' }}>
            <Typography variant="h6"  sx={{color: 'common.black'}}>SEGUITI</Typography>
            {/* drag & drop placeholder */}

            <FilePicker
              acceptedFiles={['application/json']}
              pageTitle="Followers"
              enabled={true}
              onUploadStarted={(name) => console.log('START:', name)}
              onUploadCompleted={(name, content) => console.log('DONE:', name, content)}
              onSelectionCleaned={() => console.log('CLEANED')}
            />

          </Box>
        </Grid>

        {/* Spazio a destra su XL (2/12) */}
        <Grid size={{ xl: 2 }} sx={{ display: { xs: 'none', xl: 'block' } }} />

        {/* Bottone "Dove li trovo?" */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" size="large">
              Dove li trovo?
            </Button>
          </Box>
        </Grid>

        {/* Titolo: 2 - ESEGUI */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mr: 1 }}>
              2 - ESEGUI
            </Typography>
            <RocketLaunchIcon color="primary" />
          </Box>
        </Grid>

        {/* Bottone "ANDIAMO!" */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large">
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
