import React from 'react';
import AppToolbarProvider from './AppToolbarProvider';
import AppToolbar from './AppToolbar';

interface ToolbarProps {
  toggleDrawer: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({toggleDrawer}) => {
  return (
    <AppToolbarProvider onToggleDrawer={toggleDrawer}>
      <AppToolbar />
    </AppToolbarProvider>
  );
};

export default Toolbar;
