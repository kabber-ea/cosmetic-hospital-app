import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import HospitalDetails from './pages/HospitalDetails.jsx'
import ProcedureDetails from './pages/ProcedureDetails.jsx'
import Helpdesk from './pages/Helpdesk.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="hospital/:hospitalId" element={<HospitalDetails />} />
            <Route path="hospital/:hospitalId/procedure/:procedureId" element={<ProcedureDetails />} />
            <Route path="helpdesk" element={<Helpdesk />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
)
