import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useContext(AppContext)
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    alert("Logged out")
    navigate("/login")
  }

  return (
    <nav>
      <h3>User: {user}</h3>
      <NavLink className={(e)=> e.isActive ? "red" : ""} to="/">Home</NavLink>
      <NavLink className={(e)=> e.isActive ? "red" : ""} to="/about">About</NavLink>

      {!isLoggedIn ? (
        <NavLink className={(e)=> e.isActive ? "red" : ""} to="/login">Login</NavLink>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  )
}

export default Navbar