import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="bottom-center"
  toastOptions={{
    duration: 2000,
    style: {
      background: "#FFFDF9",
      color: "#6B7AA1",
      border: "3px solid #A267AC",
      borderRadius: "14px",
      fontFamily: '"Pixelify Sans", sans-serif',
      boxShadow: "4px 4px 0 #DDB7F8",
      padding: "12px 16px",
    },
  }}
/>
  </StrictMode>,
)
