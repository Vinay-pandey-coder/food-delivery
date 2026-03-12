import React from 'react'
import {Route, Routes} from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

export const serverUrl = "http://localhost:3000"


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App