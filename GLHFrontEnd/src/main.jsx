import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import { UserProvider } from './Contexts/UserContexts.jsx'
import App from './App.jsx'
import { BasketProvider } from './Contexts/BasketContext.jsx'
import { ProductProvider } from './Contexts/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode >
)
