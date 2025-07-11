import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './context/UserContext.jsx'
import DarkModeProvider from './context/DarkModeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <>

    <AuthProvider>

      <UserProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </UserProvider>
    </AuthProvider>

  </>,
)
