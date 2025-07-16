import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AppToolbarContext } from './AppToolbarContext';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../SideDrawer/store/drawer-slice';

interface Props {
  children: ReactNode;
}

const AppToolbarProvider: React.FC<Props> = ({ children }) => {
  const [title] = useState('ANTISGAM');
  const dispatch = useDispatch();

  const menuClickHandler = () => {
    dispatch(toggleDrawer());
  };

  return (
    <AppToolbarContext.Provider value={{ title, menuClickHandler }}>
      {children}
    </AppToolbarContext.Provider>
  );
};

export default AppToolbarProvider;
