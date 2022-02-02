import React from 'react'
import { Routes, Route } from 'react-router-dom'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Homepage from '../pages/Homepage'
import Registration from '../pages/Registration'


import './default.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App