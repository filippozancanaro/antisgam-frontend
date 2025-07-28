import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppToolbar, SideDrawer } from '..';
import { RoutingList } from './components';

const ApplicationRoute = () => {

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideDrawer>
        <Box sx={{ padding: 2 }}>
          <RoutingList />
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
