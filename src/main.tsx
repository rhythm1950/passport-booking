import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { useTheme } from './stores/useTheme';
import './index.css';

// Initialize theme on app start
const initializeTheme = () => {
  const stored = localStorage.getItem('passport-booking-theme');
  if (stored) {
    const { state } = JSON.parse(stored);
    if (state?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
};

initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
