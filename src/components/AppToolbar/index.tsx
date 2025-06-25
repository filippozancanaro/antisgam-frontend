import React from 'react';
import AppToolbarProvider from './AppToolbarProvider';
import AppToolbar from './AppToolbar';

const ExportedComponent: React.FC = () => {
  return (
    <AppToolbarProvider>
      <AppToolbar />
    </AppToolbarProvider>
  );
};

export default ExportedComponent;
