import { createContext } from 'react';

interface IHomepageContext {
  mode: 'zip' | 'json';
  formFollowers: Set<string> | null;
  formFollowing: Set<string> | null;
  
  changeMode: (value: 'zip' | 'json') => void;
  manageJsonFile: (file: File, mode: 'followers' | 'following') => Promise<void>;
  manageZipFile: (file: File) => Promise<void>;
  cleanupFormField: (fieldName: 'followers' | 'following') => void;
  analyzeData: () => Promise<void>;
}

export const HomepageContext = createContext<IHomepageContext | null>(null);
