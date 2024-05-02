import { useState } from 'react'
import './App.css'
import RoleSelection from './components/RoleSelection'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import Attendance from './components/Attendance'
import UserLogin from './components/UserLogin'
import UserPage from './components/UserPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='h-screen w-svw'>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/userpage" element={<UserPage/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
