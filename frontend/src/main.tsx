import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import Homepage from "./components/Homepage/Homepage.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Homepage/>
  </StrictMode>,
)
