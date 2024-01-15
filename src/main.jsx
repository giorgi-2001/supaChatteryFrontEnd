import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuhtContextProvider } from './context/AuthContxt.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuhtContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuhtContextProvider>
 
)
