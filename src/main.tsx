import React from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css";
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </AuthProvider>
  </React.StrictMode>,
)


