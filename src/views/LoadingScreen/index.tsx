import React from 'react';
import LoadingScreenProvider from './LoadingScreenProvider';
import LoadingScreen from './LoadingScreen';

const ExportedComponent: React.FC = () => {
  return (
    <LoadingScreenProvider>
      <LoadingScreen />
    </LoadingScreenProvider>
  );
};

export default ExportedComponent;
