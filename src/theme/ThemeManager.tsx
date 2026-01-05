import { ThemeProvider, CssBaseline } from '@mui/material';
import lightTheme from './material-ui/light';
import darkTheme from './material-ui/dark';
import { useAtomValue } from 'jotai/react';
import { effectiveThemeAtom } from '../store/atoms/theme-atoms';

interface Props {
  children: React.ReactNode;
}

const ThemeManager = ({ children }: Props) => {
  const themeSelection = useAtomValue(effectiveThemeAtom);

  const theme = themeSelection === 'dark'  ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeManager;
