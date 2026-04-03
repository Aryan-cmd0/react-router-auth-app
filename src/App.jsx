// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
import About from './components/About'
import Login from './components/Login'
import PostDetails from './pages/PostDetails'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Layout from './components/Layout'
import ProtectesRoute from './components/ProtectesRoute'
import './App.css'
import Posts from './pages/Posts'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> }, {
          path: "/user/:username",
          element: (
            <ProtectesRoute>
              <User />
            </ProtectesRoute>
          )
        },
        {
          path: "/posts",
          element: <Posts />
        },
        {
          path:"/posts/:id",
          element:<PostDetails />
        }

      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />;
    </>
  )
}

export default App
