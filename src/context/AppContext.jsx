import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load posts once
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(data);
  }, []);

  // ✅ Sync posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ✅ Delete post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
