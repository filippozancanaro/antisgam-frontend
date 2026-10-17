import { useEffect, type ReactNode } from "react";
import { useThemeMode } from "./hooks/useThemeMode";

interface Props {
  children: ReactNode;
}

/**
 * Applica il tema risolto come `data-theme` su <html>: i token in
 * `src/styles/tokens.scss` fanno il resto, senza re-render dei componenti.
 */
const ThemeManager = ({ children }: Props) => {
  const mode = useThemeMode();

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return <>{children}</>;
};

export default ThemeManager;
