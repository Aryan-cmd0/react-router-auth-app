import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    alert("Logged out")
    navigate("/login")
  }

  return (
    <nav>
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