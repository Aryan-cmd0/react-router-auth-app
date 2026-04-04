import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

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
            <div className="home-card" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body.slice(0, 80)}...</p>
            </div>
          ))
        )}
      </section>

    </div>
  );
};

export default Home;