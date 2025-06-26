import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/router';
import { ThemeManager } from './theme';
import './App.scss'

function App() {

  return (
    <>
      <ThemeManager>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeManager>
    </>
  )
}

export default App
