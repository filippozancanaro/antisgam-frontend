import { createContext } from 'react';

interface IHomepageContext {
  uploaderETag: number; // ETag per forzare il re-render del componente Uploader
  mode: 'zip' | 'json';
  formFollowers: Set<string> | null;
  formFollowing: Set<string> | null;
  
  changeMode: (value: 'zip' | 'json') => void;
  manageJsonFile: (file: File, mode: 'followers' | 'following') => Promise<void>;
  manageZipFile: (file: File) => Promise<void>;
  cleanupFormField: (fieldName: 'followers' | 'following') => void;
  analyzeData: () => Promise<void>;
  resetForm: () => Promise<void>;
}

export const HomepageContext = createContext<IHomepageContext | null>(null);
