import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  // {/* </StrictMode>, */}
)
