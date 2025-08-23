import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BookProvider } from './context/bookContext.jsx'
import { FolderProvider } from './context/folderContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
      <FolderProvider>
        <App />
      </FolderProvider>
    </BookProvider>
  </StrictMode>,
)
