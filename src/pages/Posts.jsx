import React, { useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Posts.css";

const Posts = () => {
  const { posts, search, setSearch, deletePost, setPosts } = useContext(AppContext);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  // ✅ Like handler — toggles like, not just increments
  const handleLike = (e, id) => {
    e.preventDefault();     // stops card navigation
    e.stopPropagation();
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, likes: post.liked ? post.likes - 1 : (post.likes || 0) + 1, liked: !post.liked }
          : post
      )
    );
  };

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">

            {/* 🗑 Delete button */}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deletePost(post.id);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>

            {/* ❤️ Like button — bottom left of card */}
            <button
              className="like-btn"
              onClick={(e) => handleLike(e, post.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24"
                fill={post.liked ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {post.likes || 0}
            </button>

            {/* 🔗 Entire card is clickable */}
            <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="post-content">
                <h3 className="post-title-text">{post.title}</h3>
              </div>
              <div className="image-wrapper">
                <img src={post.image} alt={post.title} className="post-img" />
              </div>
              <div className="post-content">
                <p>{post.body.slice(0, 100)}...</p>
              </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;