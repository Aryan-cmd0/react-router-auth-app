import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, Links } from "react-router-dom";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  const {posts} = useContext(AppContext)

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>Find Ideas You Love</h1>
        <p>Explore posts created by users</p>
      </section>

      {/* GRID */}
      <section className="home-grid">
        {posts.length === 0 ? (
          <p>No posts yet. Create one!</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <div className="home-card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body.slice(0, 80)}...</p>
              </div>
            </Link>
          ))
        )}
      </section>

    </div>
  );
};

export default Home;