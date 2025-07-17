import { createContext } from 'react';

interface IHomepageContext {
  title: string;
  mode: 'zip' | 'json';
  
  changeMode: (value: 'zip' | 'json') => void;
}

export const HomepageContext = createContext<IHomepageContext | null>(null);
