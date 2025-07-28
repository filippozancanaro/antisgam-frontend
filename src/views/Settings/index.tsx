import React from 'react';
import SettingsProvider from './SettingsProvider';
import Settings from './Settings';

const ExportedComponent: React.FC = () => {
  return (
    <SettingsProvider>
      <Settings />
    </SettingsProvider>
  );
};

export default ExportedComponent;
