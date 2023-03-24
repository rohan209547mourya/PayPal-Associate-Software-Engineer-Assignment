import { useState, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup'
import Home from './components/Home'
import { fetchCurrentUserData } from './utils/api'
import Sprint from './components/Sprint'
import { getjwtToken } from './utils/setJwtToken'
import { useNavigate } from 'react-router-dom'
import Logout from './components/Logout'
import Task from './components/Task'


function App() {

  const navigate = useNavigate()
  const temp = useParams()

  const [isLoggedIn, setLogin] = useState(false)

  useEffect(() => {
    if (getjwtToken()) {
      setLogin(true)
    }
  }, [])




  return (
    <div className="App">
      <div>
        <ToastContainer position="top-right" />

        <Navbar isUserLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/tasks/:teamId/:sprintId' element={<Task />} />
          <Route path='/sprints/:teamId' element={<Sprint />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>

      </div>
    </div>
  )
}

export default App
