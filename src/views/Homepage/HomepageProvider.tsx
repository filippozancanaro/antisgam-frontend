import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { HomepageContext } from './HomepageContext';

interface Props {
  children: ReactNode;
}

const HomepageProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('Titolo iniziale');

  const menuClickHandler = () => {
    console.log('Hamburger cliccato!');
  };

  return (
    <HomepageContext.Provider value={{ title, menuClickHandler }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageProvider;
