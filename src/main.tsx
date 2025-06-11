
import './polyfills';
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './hooks/use-theme'

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error('Root element not found')

const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      
    </ThemeProvider>
  </React.StrictMode>
);
