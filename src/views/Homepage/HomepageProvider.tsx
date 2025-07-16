import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { HomepageContext } from './HomepageContext';

interface Props {
  children: ReactNode;
}

const HomepageProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('Homepage');


  return (
    <HomepageContext.Provider value={{ title }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
