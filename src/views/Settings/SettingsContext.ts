import { createContext } from 'react';
import type { UserThemeMode } from '../../theme/store/theme-slice';

interface ISettingsContext {
  themeForm: UserThemeMode;
  
  updateTheme: (value: UserThemeMode) => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

export const SettingsContext = createContext<ISettingsContext | null>(null);
