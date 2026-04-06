import React, { useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Posts.css";

const Posts = () => {
  const { posts, search, setSearch, deletePost } = useContext(AppContext);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [posts, search]);

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
            {/* 🗑 Delete button — lives on post-card directly, NOT inside image-wrapper */}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.preventDefault(); // stops Link navigation
                e.stopPropagation(); // stops card click
                deletePost(post.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>

            {/* 🔗 Entire card is clickable via Link */}
            <Link
              to={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Title ABOVE image */}
              <div className="post-content">
                <h3 className="post-title-text">{post.title}</h3>
              </div>

              {/* Image IN THE MIDDLE */}
              <div className="image-wrapper">
                <img src={post.image} alt={post.title} className="post-img" />
              </div>

              {/* Body text BELOW image */}
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
