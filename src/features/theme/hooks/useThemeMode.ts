import { useSyncExternalStore } from "react";
import { useAtom, useAtomValue } from "jotai";
import { resolveThemeMode, userThemeModeAtom, type ThemeMode } from "../store/themeAtoms";

const DARK_QUERY = "(prefers-color-scheme: dark)";

const subscribeToSystemTheme = (onChange: () => void) => {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Preferenza di sistema (`prefers-color-scheme`), reattiva ai cambi. */
export const usePrefersDarkMode = (): boolean =>
  useSyncExternalStore(
    subscribeToSystemTheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  );

/** Tema effettivo, reattivo sia alla preferenza utente sia a quella di sistema. */
export const useThemeMode = (): ThemeMode => {
  const choice = useAtomValue(userThemeModeAtom);
  return resolveThemeMode(choice, usePrefersDarkMode());
};

export const useUserThemeMode = () => useAtom(userThemeModeAtom);
