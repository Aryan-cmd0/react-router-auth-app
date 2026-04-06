import React, { useContext } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Layout = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout