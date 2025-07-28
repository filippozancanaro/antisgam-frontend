import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppToolbarContext } from './AppToolbarContext';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../SideDrawer/store/drawer-slice';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const AppToolbarProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('ANTISGAM');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuClickHandler = () => {
    dispatch(toggleDrawer());
  };

  const navigateToHomepage = () => {
    navigate('/');
  };

  return (
    <AppToolbarContext.Provider value={{ title, menuClickHandler, navigateToHomepage }}>
      {children}
    </AppToolbarContext.Provider>
  );
};

export default AppToolbarProvider;
