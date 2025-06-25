import { createContext } from 'react';

interface IAppToolbarContext {
  title: string;
  menuClickHandler: () => void;
}

export const AppToolbarContext = createContext<IAppToolbarContext | null>(null);
