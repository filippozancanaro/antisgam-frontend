import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type ThemeMode = 'light' | 'dark';
export type UserThemeMode = 'auto' | 'light' | 'dark';

export interface ThemeState {
  userchoice: UserThemeMode;
  mode: ThemeMode;
}

const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const themeAtom = atomWithStorage<ThemeState>(
  'antisgamtheme',
  {
    userchoice: 'auto',
    mode: getSystemTheme(),
  }
);

export const effectiveThemeAtom = atom((get) => {
  const { userchoice, mode } = get(themeAtom);

  if (userchoice === 'auto') {
    return getSystemTheme();
  }

  return mode;
});

export const themeModeAtom = atom((get) => get(themeAtom).mode);
export const userThemeChoiceAtom = atom((get) => get(themeAtom).userchoice);

export const setThemeAtom = atom(
  null,
  (get, set, newChoice: UserThemeMode) => {
    const prev = get(themeAtom);

    if (newChoice === 'auto')
        set(themeAtom, { ...prev, userchoice: newChoice });
    else
        set(themeAtom, { ...prev, userchoice: newChoice, mode: newChoice });
  }
);

