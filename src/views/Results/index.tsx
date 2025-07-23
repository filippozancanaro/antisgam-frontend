import React from 'react';
import ResultsProvider from './ResultsProvider';
import Results from './Results';

const ExportedComponent: React.FC = () => {
  return (
    <ResultsProvider>
      <Results />
    </ResultsProvider>
  );
};

export default ExportedComponent;
