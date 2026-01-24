import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppToolbar, SideDrawer } from '..';
import { RoutingList } from './components';
import { useState } from 'react';

const ApplicationRoute: React.FC = () => {

  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  }

  const handleCloseDrawer = () => {
    setDrawerOpened(false);
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideDrawer position='left' closeDrawer={handleCloseDrawer} isOpened={drawerOpened}>
        <Box sx={{ padding: 2 }}>
          <RoutingList />
        </Box>
      </SideDrawer>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppToolbar toggleDrawer={toggleDrawer} />

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
