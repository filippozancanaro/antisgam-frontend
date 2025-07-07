import React from 'react';
import { Drawer, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleDrawer } from './store/drawer-slice';

interface SideDrawerProps {
  children: React.ReactNode;
  width?: number;
}
// source: https://stackblitz.com/edit/react-usnmyx?file=demo.tsx
// copy pasting isn't bad, but it is not the best practice
// it is better to understand the code and then write it yourself
// but in this case, it is a good example of how to use MUI Drawer component
// and how to manage the state with Redux
// so... let's do it! :D
const SideDrawer: React.FC<SideDrawerProps> = ({ children, width = 250 }) => {
  const dispatch = useDispatch();
  const { open, position } = useSelector((state: RootState) => state.drawer);

  const handleToggle = () => {
    dispatch(toggleDrawer());
  };

  const drawerSx =
    position === 'top' || position === 'bottom'
      ? { height: width, width: '100%' }
      : { width };

  const boxSx = {
    width: position === 'top' || position === 'bottom' ? 'auto' : width,
    height: position === 'top' || position === 'bottom' ? width : '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Drawer
      anchor={position}
      open={open}
      onClose={handleToggle}
      PaperProps={{ sx: drawerSx }}
    >
      <Box sx={boxSx} onClick={handleToggle} onKeyDown={handleToggle}>
        {children}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
