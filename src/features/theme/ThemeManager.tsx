import { useMemo, type ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/useThemeMode";
import darkTheme from "./themes/dark";
import lightTheme from "./themes/light";

interface Props {
  children: ReactNode;
}

const ThemeManager = ({ children }: Props) => {
  const mode = useThemeMode();
  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeManager;
