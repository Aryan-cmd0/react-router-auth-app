import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppContext } from "./context/AppContext";

function Root() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode, posts: [] }}>
      <App />
    </AppContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);