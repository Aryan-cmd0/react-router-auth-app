import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectesRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if(!isLoggedIn){
        return <Navigate to="/login" />
    }        
  return children
}

export default ProtectesRoute