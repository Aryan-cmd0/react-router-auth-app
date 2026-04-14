import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";
import { getNotifications, markAsRead } from "../services/notification";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { darkMode, setDarkMode, search, setSearch } = useContext(AppContext);
  const { logoutUser } = useContext(AppContext);
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null; // 🚀 hides entire navbar
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications();
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (logoutUser) logoutUser();
    alert("Logged out");
    navigate("/login");
  };

  return (
    <>
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
            Threadly
          </h2>
        </div>

        {/* CENTER — Search */}
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

        {/* Create Post Button */}
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
          <NavLink to="/posts" className="nav-btn">
            Posts
          </NavLink>
          <NavLink to="/" className="nav-btn">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-btn">
            About
          </NavLink>

          {/* 🔔 Notification Bell */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setNotifOpen((prev) => !prev)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "background 0.2s",
              }}
              title="Notifications"
            >
              {/* Bell SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={darkMode ? "#facc15" : "#4f46e5"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>

              {/* Unread Badge */}
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: "10px",
                    fontWeight: "bold",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {notifOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "110%",
                  width: "280px",
                  background: darkMode ? "#1f1f2e" : "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid #e5e5e5",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: darkMode ? "#fff" : "#111",
                  }}
                >
                  Notifications
                </div>

                {notifications.length === 0 ? (
                  <div
                    style={{
                      padding: "16px 14px",
                      fontSize: "13px",
                      color: "#888",
                      textAlign: "center",
                    }}
                  >
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => handleRead(n._id)}
                      style={{
                        padding: "10px 14px",
                        fontSize: "13px",
                        cursor: "pointer",
                        background: n.read
                          ? darkMode
                            ? "#2a2a3d"
                            : "#f9f9f9"
                          : darkMode
                            ? "#2e2e50"
                            : "#eef2ff",
                        color: darkMode ? "#ddd" : "#333",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = darkMode
                          ? "#33335a"
                          : "#e0e7ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = n.read
                          ? darkMode
                            ? "#2a2a3d"
                            : "#f9f9f9"
                          : darkMode
                            ? "#2e2e50"
                            : "#eef2ff")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{n.message}</span>
                        {!n.read && (
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#4f46e5",
                              flexShrink: 0,
                              marginLeft: "8px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Login / Logout */}
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

          {/* Dark / Light Mode Toggle */}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#facc15"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
