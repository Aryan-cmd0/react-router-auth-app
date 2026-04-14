import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);

  const addComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), commentText] }
          : post
      )
    );
  };

  // ✅ NEW: logout function
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser("Guest");
    window.location.href = "/login"; // optional redirect
  };

  // Load posts once
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(data);
  }, []);

  // Sync posts to localStorage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        search,
        setSearch,
        posts,
        setPosts,
        deletePost,
        darkMode,
        setDarkMode,
        addComment,
        logoutUser, // ✅ ADDED HERE
      }}
    >
      {children}
    </AppContext.Provider>
  );
};