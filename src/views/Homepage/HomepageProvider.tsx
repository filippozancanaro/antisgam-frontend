import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { HomepageContext } from './HomepageContext';

interface Props {
  children: ReactNode;
}

const HomepageProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('Homepage');
  const [mode, setMode] = useState<'zip' | 'json'>('zip');

  const changeMode = (value: 'zip' | 'json') => {
    setMode(value);
  };

  return (
    <HomepageContext.Provider value={{ title, mode, changeMode }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
