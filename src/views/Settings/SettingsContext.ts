import { createContext } from 'react';
import type { UserThemeMode } from '../../theme/store/theme-slice';

interface ISettingsContext {
  themeForm: UserThemeMode;
  enableJsonFilesForm: boolean;
  
  updateTheme: (value: UserThemeMode) => void;
  updateEnableJsonFiles: (value: boolean) => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

export const SettingsContext = createContext<ISettingsContext | null>(null);
