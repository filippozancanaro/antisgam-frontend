import { createContext } from 'react';

interface ILoadingScreenContext {
  suggerimenti: string[];
}

export const LoadingScreenContext = createContext<ILoadingScreenContext | null>(null);
