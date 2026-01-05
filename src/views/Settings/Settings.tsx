import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { SettingsContext } from './SettingsContext';
import type { UserThemeMode } from '../../theme/store/theme-slice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Settings: React.FC = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('Settings deve essere usato all’interno di <SettingsProvider>');

  const { themeForm, updateTheme, saveChanges, discardChanges } = context;

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>

          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Typography variant="h4" gutterBottom>
              IMPOSTAZIONI
            </Typography>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>
            <Box sx={{paddingBottom: 2}}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Grafica
              </Typography>

              <FormControl>
                <FormLabel>Preferenza del tema</FormLabel>
                <RadioGroup
                  value={themeForm}
                  onChange={(_event, value) => updateTheme(value as UserThemeMode)}
                >
                  <FormControlLabel value="auto" control={<Radio />} label="Automatico" />
                  <FormControlLabel value="light" control={<Radio />} label="Chiaro" />
                  <FormControlLabel value="dark" control={<Radio />} label="Scuro" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

          <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />
          <Grid size={{ xs: 12, md: 6, lg: 10, xl: 8 }}>

            <Grid size={{ md: 3, lg: 1, xl: 2 }} sx={{ display: { xs: 'none', lg: 'block' } }} />

            {/* Azioni disponibili */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={() => discardChanges()}
                  sx={{ marginRight: 1 }}
                >
                  Annulla
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => saveChanges()}
                >
                  Salva
                </Button>
              </Box>
            </Grid>


          </Grid>
        </Grid>
      </Box >
    </>
  );
};

export default Settings;
