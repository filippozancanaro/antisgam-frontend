import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserThemeMode = 'auto' | 'light' | 'dark';
type ThemeMode = 'light' | 'dark';

interface ThemeState {
  userchoice: UserThemeMode;
  mode: ThemeMode;
}

const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState: ThemeState = {
  userchoice: 'auto',
  mode: getSystemTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setUserThemePreference: (state, action: PayloadAction<UserThemeMode>) => {
      state.userchoice = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setUserThemePreference, setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
