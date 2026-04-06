import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, darkMode, setDarkMode } = useContext(AppContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "inherit",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <h2
          style={{ color: "#4f46e5", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          DevConnect
        </h2>
        <span style={{ fontSize: "14px" }}>User: {user}</span>
      </div>

      {/* CENTER */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "35%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={() => navigate("/create")}
        style={{
          padding: "6px 12px",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Create Post
      </button>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <NavLink to="/posts" className="nav-btn">Posts</NavLink>
        <NavLink to="/" className="nav-btn">Home</NavLink>
        <NavLink to="/about" className="nav-btn">About</NavLink>

        {!isLoggedIn ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}

        {/* ✅ Dark/Light Mode Toggle with SVG icons */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            // ☀️ Sun icon — shown in dark mode to switch to light
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
              viewBox="0 0 24 24" fill="none" stroke="#facc15"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ) : (
            // 🌙 Moon icon — shown in light mode to switch to dark
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
              viewBox="0 0 24 24" fill="none" stroke="#4f46e5"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;