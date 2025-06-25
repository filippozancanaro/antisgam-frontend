import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppToolbarContext } from './AppToolbarContext';

interface Props {
  children: ReactNode;
}

const AppToolbarProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('Titolo iniziale');

  const menuClickHandler = () => {
    console.log('Hamburger cliccato!');
  };

  return (
    <AppToolbarContext.Provider value={{ title, menuClickHandler }}>
      {children}
    </AppToolbarContext.Provider>
  );
};

export default AppToolbarProvider;
