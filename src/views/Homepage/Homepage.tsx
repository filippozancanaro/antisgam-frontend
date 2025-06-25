import React, { useContext } from 'react';
import { AppBar, Toolbar as MuiToolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HomepageContext } from './HomepageContext';

const Homepage: React.FC = () => {
  const context = useContext(HomepageContext);
  if (!context) throw new Error('Toolbar deve essere usato all’interno di <HomepageProvider>');

  const { title, menuClickHandler } = context;

  return (
    <AppBar position="static">
      <MuiToolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={menuClickHandler}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ ml: 2 }}>
          {title}
        </Typography>
      </MuiToolbar>
    </AppBar>
  );
};

export default Homepage;
