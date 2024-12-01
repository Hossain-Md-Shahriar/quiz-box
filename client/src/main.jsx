import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
