import { useMediaQuery } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { resolveThemeMode, userThemeModeAtom, type ThemeMode } from "../store/themeAtoms";

/** Tema effettivo, reattivo sia alla preferenza utente sia a quella di sistema. */
export const useThemeMode = (): ThemeMode => {
  const choice = useAtomValue(userThemeModeAtom);
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)", { noSsr: true });
  return resolveThemeMode(choice, systemPrefersDark);
};

export const useUserThemeMode = () => useAtom(userThemeModeAtom);
