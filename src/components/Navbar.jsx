import React, { useContext,useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
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
        background: "#ffffff",
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

        <button
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
      </div>
    </nav>
  );
};

export default Navbar;
