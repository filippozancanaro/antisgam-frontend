import { createContext } from 'react';

interface IHomepageContext {
  title: string;
  // menuClickHandler: () => void;
}

export const HomepageContext = createContext<IHomepageContext | null>(null);
