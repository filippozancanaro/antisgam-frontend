import { createContext } from 'react';

interface IResultsContext {
  unfollowers: string[];
  
  copyToClipboard: () => void;
  restart: () => void;
}

export const ResultsContext = createContext<IResultsContext | null>(null);
