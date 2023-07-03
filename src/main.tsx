import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/style/css/style.css'
import {BrowserRouter} from "react-router-dom";

const prodUrl = "/project/tic-tac-toe"
//const prodUrl = "/"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter basename={prodUrl}>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
)
