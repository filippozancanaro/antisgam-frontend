import { createContext } from 'react';
import type { UserThemeMode } from '../../store/atoms/theme-atoms';

interface ISettingsContext {
  themeForm: UserThemeMode;
  
  updateTheme: (value: UserThemeMode) => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

export const SettingsContext = createContext<ISettingsContext | null>(null);
