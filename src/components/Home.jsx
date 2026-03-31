import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { setUser } = useContext(AppContext);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => setUser("Aarya")}>
        Login as Aarya
      </button>
    </div>
  );
};

export default Home;
