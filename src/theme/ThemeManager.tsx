import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import lightTheme from './material-ui/light';
import darkTheme from './material-ui/dark';

interface Props {
  children: React.ReactNode;
}

const ThemeManager = ({ children }: Props) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeManager;
