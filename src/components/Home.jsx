import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { setUser } = useContext(AppContext);

  return (
    <div style={{
      width:"60%",
      margin:"20px auto"
    }}>
      <h1>Home Page</h1>
      <button onClick={() => setUser("Aarya")}>
        Login
      </button>
    </div>
  );
};

export default Home;
