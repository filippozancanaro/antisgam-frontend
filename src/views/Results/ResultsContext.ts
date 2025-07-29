import { createContext } from 'react';

interface IResultsContext {
  unfollowers: string[];
  pendingRequests: string[];
  removedSuggestions: string[];
  
  copyToClipboard: (what: 'unfollowers' | 'pending' | 'suggestions') => void;
  restart: () => void;
}

export const ResultsContext = createContext<IResultsContext | null>(null);
