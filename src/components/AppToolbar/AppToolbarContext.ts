import { createContext } from 'react';

interface IAppToolbarContext {
  title: string;
  menuClickHandler: () => void;
  navigateToHomepage: () => void;
}

export const AppToolbarContext = createContext<IAppToolbarContext | null>(null);
