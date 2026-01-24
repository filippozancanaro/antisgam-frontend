import React from 'react';
import { Drawer, Box } from '@mui/material';

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

interface SideDrawerProps {
  isOpened: boolean;
  position: DrawerAnchor;
  children: React.ReactNode;
  width?: number;

  closeDrawer: () => void
}
// source: https://stackblitz.com/edit/react-usnmyx?file=demo.tsx
const SideDrawer: React.FC<SideDrawerProps> = ({ position, isOpened, closeDrawer, children, width = 250 }) => {

  const handleToggle = () => {
    closeDrawer();
  };

  const boxSx = {
    width: position === 'top' || position === 'bottom' ? 'auto' : width,
    height: position === 'top' || position === 'bottom' ? width : '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Drawer
      anchor={position}
      open={isOpened}
      onClose={handleToggle}
    >
      <Box sx={boxSx} onClick={handleToggle} onKeyDown={handleToggle}>
        {children}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
