import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup.jsx'
import Login from './login.jsx'
import Home from './home.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 


function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route> 
        <Route path='/home' element={<Home />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
