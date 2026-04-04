import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Posts.css";

const Posts = () => {
  const { posts, setPosts, search } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const colors = ["post-blue", "post-green", "post-yellow", "post-purple"];

  useEffect(() => {
    if (posts.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const filteredPosts = useMemo(() => {
    console.log("Filtering...");
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [posts, search]);

  // 🔥 SKELETON UI
  if (loading) {
    return (
      <div style={{ width: "60%", margin: "30px auto" }}>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            style={{
              background: "#fff",
              padding: "16px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <div
              className="skeleton"
              style={{
                height: "20px",
                width: "60%",
                background: "#e5e7eb",
                marginBottom: "10px",
              }}
            />

            <div
              className="skeleton"
              style={{
                height: "15px",
                width: "90%",
                background: "#e5e7eb",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "60%",
        margin: "30px auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* ✅ No posts found message (FIXED POSITION) */}
      {filteredPosts.length === 0 && <p>No posts found...</p>}

      {filteredPosts.slice(0, 10).map((post) => (
        <div
          key={post.id}
          style={{
            background: "#fff",
            padding: "16px",
            marginBottom: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Link to={`/posts/${post.id}`}>
            <div className="posts-container">
              {posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-content">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
