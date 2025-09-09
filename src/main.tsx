import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/normalize.scss';
import './styles/globals.scss';
import './styles/fontello.css';
import './styles/fontelloThemes.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
