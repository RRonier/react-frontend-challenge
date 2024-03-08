import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
        <App />
      </SnackbarProvider>
  </React.StrictMode>,
)
