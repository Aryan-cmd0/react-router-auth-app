import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        search,
        setSearch,
        posts,
        setPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};