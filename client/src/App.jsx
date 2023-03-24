import { useState, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup'
import Home from './components/Home'
import { fetchCurrentUserData } from './utils/api'
import Sprint from './components/Sprint'

function App() {

  useEffect(() => {

    fetchCurrentUserData()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })

  })


  return (
    <div className="App">
      <div>
        <ToastContainer position="top-right" />

        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/sprints/:teamId' element={<Sprint />} />
        </Routes>

      </div>
    </div>
  )
}

export default App
