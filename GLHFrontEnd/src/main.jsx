import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import { UserProvider } from './Contexts/UserContexts.jsx'
import App from './App.jsx'
import { BasketProvider } from './Contexts/BasketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
      <BasketProvider>
          <App />
      </BasketProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode >
)
