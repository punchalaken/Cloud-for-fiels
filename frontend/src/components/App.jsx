import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Authorization from './pages/Authorization.jsx'
import Home from './pages/Home.jsx'
import Registration from './pages/Registration.jsx'


function App() {
 
  return (
    <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path="/" element={<Authorization/>}/>
          <Route path="/files" element={<Home/>}/>
          <Route path="/register" element={<Registration/>}/>
        </Routes>
    </BrowserRouter>
  
  )
}

export default App