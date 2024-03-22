import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js'
import { SnackbarProvider } from 'notistack'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </Provider>
)
