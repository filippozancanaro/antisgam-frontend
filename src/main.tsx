import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { Provider as JotaiProvider } from 'jotai';
import { store } from './store/store';

// Styles
import './index.scss'
// material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </JotaiProvider>
  </StrictMode>,
)
