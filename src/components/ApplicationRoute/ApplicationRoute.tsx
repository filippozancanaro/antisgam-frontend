import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppToolbar, SideDrawer } from '..';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setUserThemePreference } from '../../theme/store/theme-slice';


const ApplicationRoute = () => {

  const dispatch = useDispatch();
  const userThemeChoice = useSelector((state: RootState) => state.theme.userchoice);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserThemePreference(event.target.value as 'auto' | 'light' | 'dark'));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideDrawer>
        <Box sx={{ padding: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Preferenza del tema
          </Typography>
          <RadioGroup value={userThemeChoice} onChange={handleChange}>
            <FormControlLabel value="auto" control={<Radio />} label="Automatico" />
            <FormControlLabel value="light" control={<Radio />} label="Chiaro" />
            <FormControlLabel value="dark" control={<Radio />} label="Scuro" />
          </RadioGroup>
        </Box>
      </SideDrawer>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppToolbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ApplicationRoute;
