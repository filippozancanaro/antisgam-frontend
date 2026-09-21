import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type ThemeMode = "light" | "dark";
export type UserThemeMode = "auto" | ThemeMode;

export const THEME_STORAGE_KEY = "antisgamtheme";
export const USER_THEME_MODES: readonly UserThemeMode[] = ["auto", "light", "dark"];

const isUserThemeMode = (value: unknown): value is UserThemeMode =>
  typeof value === "string" && (USER_THEME_MODES as readonly string[]).includes(value);

/**
 * Normalizza il valore letto dallo storage.
 * Supporta il formato legacy `{ userchoice, mode }` oltre alla semplice stringa.
 */
export const normalizeUserThemeMode = (raw: unknown): UserThemeMode | null => {
  if (isUserThemeMode(raw)) return raw;
  if (typeof raw === "object" && raw !== null && "userchoice" in raw && isUserThemeMode(raw.userchoice)) {
    return raw.userchoice;
  }
  return null;
};

const jsonStorage = createJSONStorage<UserThemeMode>(() => localStorage);

const themeStorage: typeof jsonStorage = {
  ...jsonStorage,
  getItem: (key, initialValue) => {
    try {
      return normalizeUserThemeMode(jsonStorage.getItem(key, initialValue)) ?? initialValue;
    } catch {
      return initialValue;
    }
  },
};

/** Preferenza dell'utente: "auto" segue il tema di sistema. */
export const userThemeModeAtom = atomWithStorage<UserThemeMode>(THEME_STORAGE_KEY, "auto", themeStorage, {
  getOnInit: true,
});

export const resolveThemeMode = (choice: UserThemeMode, systemPrefersDark: boolean): ThemeMode =>
  choice === "auto" ? (systemPrefersDark ? "dark" : "light") : choice;
