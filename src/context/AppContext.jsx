import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  // ✅ Load posts from localStorage (ONLY ONCE)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(data);
  }, []);

  // ✅ Delete post (clean)
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};