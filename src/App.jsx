import { useState } from 'react'
import './App.css'
import RoleSelection from './components/RoleSelection'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import Attendance from './components/Attendance'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='h-screen w-svw'>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/attendance" element={<Attendance/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
