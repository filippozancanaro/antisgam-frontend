import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/router';
import { ThemeManager } from './theme';
import { SnackbarProvider } from 'notistack';
import './App.scss'

function App() {

  return (
    <>
      <ThemeManager>
        <SnackbarProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeManager>
    </>
  )
}

export default App
