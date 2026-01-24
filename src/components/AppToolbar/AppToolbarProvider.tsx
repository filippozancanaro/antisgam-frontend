import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppToolbarContext } from './AppToolbarContext';
import { useNavigate } from 'react-router-dom';
import { useGlobalCleanup } from '../../shared/antisgam-cleanup/AntisgamCleanup';

interface Props {
  onToggleDrawer: () => void;

  children: ReactNode;
}

const AppToolbarProvider: React.FC<Props> = ({ onToggleDrawer, children }) => {
  const [title] = useState('ANTISGAM');
  const navigate = useNavigate();
  const cleanup = useGlobalCleanup();

  const menuClickHandler = () => {
    onToggleDrawer();
  };

  const navigateToHomepage = () => {
    cleanup();
    
    navigate('/');
  };

  return (
    <AppToolbarContext.Provider value={{ title, menuClickHandler, navigateToHomepage }}>
      {children}
    </AppToolbarContext.Provider>
  );
};

export default AppToolbarProvider;
