import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/main.css'
import { Providers } from './providers'

const rootElement = document.getElementById('root')

if (rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!)
  root.render(
    <React.StrictMode>
      <Providers />
    </React.StrictMode>,
  )
}
