import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Locationcards from './Components/AddLocation/AddLocation'
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Locations from './Pages/Locations/Locations'
import Login from "./Pages/Login/Login"
import Register from './Pages/Register/Register'
import Viewmore from './Pages/Viewmore/Viewmore'
const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}>
          </Route>

          <Route path='/locations' element={<Locations />}>
          </Route>

          <Route path='/login' element={<Login />}>
          </Route>

          <Route path='/register' element={<Register />}>
          </Route>

          <Route path='/viewmore' element={<Viewmore />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
