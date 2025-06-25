import React from 'react';
import HomepageProvider from './HomepageProvider';
import Homepage from './Homepage';

const ExportedComponent: React.FC = () => {
  return (
    <HomepageProvider>
      <Homepage />
    </HomepageProvider>
  );
};

export default ExportedComponent;
