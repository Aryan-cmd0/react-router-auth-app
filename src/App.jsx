import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css";

// Layout & Route Guards
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Components
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";

// Pages
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Bookmarks from "./pages/bookmarks";

function App() {
  const { darkMode } = useContext(AppContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/login", element: <Login /> },
        {
          path: "/user/:username",
          element: (
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          ),
        },
        {
          path: "/posts",
          element: <Posts />,
        },
        {
          path: "/posts/:id",
          element: <PostDetails />,
        },
        {
          path: "/create",
          element: <CreatePost />,
        },
        {
          path: "/bookmarks",
          element: (
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;