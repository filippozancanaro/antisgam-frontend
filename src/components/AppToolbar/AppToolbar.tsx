import React, { useContext } from 'react';
import { AppBar, Toolbar as MuiToolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppToolbarContext } from './AppToolbarContext';

const AppToolbar: React.FC = () => {
  const context = useContext(AppToolbarContext);
  if (!context) throw new Error('Toolbar deve essere usato all’interno di <AppToolbarProvider>');

  const { title, menuClickHandler, navigateToHomepage } = context;

  return (
    <AppBar position="static" color="default">
      <MuiToolbar>
        <IconButton edge="start" color="primary" aria-label="menu" onClick={menuClickHandler}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" color='primary' sx={{ ml: 2, cursor: 'pointer' }} onClick={() => navigateToHomepage()}>
          {title}
        </Typography>
      </MuiToolbar>
    </AppBar>
  );
};

export default AppToolbar;
