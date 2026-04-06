import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./PostDetail.css";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost, darkMode, setPosts } = useContext(AppContext); // ✅ ADDED setPosts
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setTimeout(() => setLoaded(true), 100);
      });
  }, [id]);

  if (!post) return (
    <div style={{ textAlign: "center", marginTop: "80px", color: "#9ca3af", fontFamily: "Georgia, serif" }}>
      <p style={{ fontSize: "48px" }}>404</p>
      <p>Post not found</p>
    </div>
  );

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/posts");
  };

  // ✅ ADDED — like toggle handler
  const handleLike = () => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id
          ? { ...p, likes: p.liked ? (p.likes || 1) - 1 : (p.likes || 0) + 1, liked: !p.liked }
          : p
      )
    );
  };

  const dark = darkMode;

  return (
    <div className={`pd-page ${loaded ? "pd-loaded" : ""}`} style={{
      minHeight: "100vh",
      background: dark ? "#0d0d0d" : "#f5f3ee",
      paddingBottom: "80px",
    }}>

      <button className="pd-back" onClick={() => navigate(-1)} style={{ color: dark ? "#ccc" : "#333" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8L2 12L6 16"/><path d="M2 12H22"/>
        </svg>
        <span>Back</span>
      </button>

      <div className="pd-wrapper">

        {post.image && (
          <div className="pd-hero">
            <img src={post.image} alt={post.title} className="pd-hero-img" />
            <div className="pd-hero-overlay" />
          </div>
        )}

        <div className="pd-card" style={{
          background: dark ? "rgba(255,255,255,0.04)" : "#fff",
          border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #e8e3dc",
          color: dark ? "#f0ece4" : "#1a1a1a",
        }}>

          <div className="pd-meta">
            <span className="pd-tag" style={{
              background: dark ? "rgba(79,70,229,0.2)" : "#eef2ff",
              color: "#4f46e5",
            }}>
              Post #{post.id}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              {/* ✅ ADDED — Like button */}
              <button
                onClick={handleLike}
                className={`pd-like-btn ${post.liked ? "pd-liked" : ""}`}
                style={{
                  background: post.liked
                    ? "#ef4444"
                    : dark ? "rgba(255,255,255,0.07)" : "#f3f4f6",
                  color: post.liked ? "white" : dark ? "#ccc" : "#555",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  viewBox="0 0 24 24"
                  fill={post.liked ? "currentColor" : "none"}
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{post.likes || 0}</span>
              </button>

              <button onClick={handleDelete} className="pd-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                  <path d="M3 6h18"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Delete
              </button>
            </div>
          </div>

          <h1 className="pd-title">{post.title}</h1>

          <div className="pd-divider" style={{
            background: dark ? "rgba(255,255,255,0.08)" : "#e8e3dc",
          }} />

          <p className="pd-body" style={{ color: dark ? "#b0aaa0" : "#4b4540" }}>
            {post.body}
          </p>
        </div>

        <div className="pd-comments-section">
          <div className="pd-comments-header">
            <h3 style={{ color: dark ? "#f0ece4" : "#1a1a1a" }}>Comments</h3>
            <span className="pd-comment-count" style={{
              background: dark ? "rgba(255,255,255,0.08)" : "#eef2ff",
              color: dark ? "#aaa" : "#4f46e5",
            }}>
              {comments.length}
            </span>
          </div>

          <div className="pd-comments-list">
            {comments.map((comment, i) => (
              <div key={comment.id} className="pd-comment"
                style={{
                  background: dark ? "rgba(255,255,255,0.03)" : "#faf9f6",
                  border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #ede9e2",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <div className="pd-avatar" style={{
                  background: `hsl(${(comment.id * 47) % 360}, 60%, ${dark ? "35%" : "75%"})`,
                }}>
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="pd-comment-content">
                  <div className="pd-comment-name" style={{ color: dark ? "#e0dbd2" : "#1a1a1a" }}>
                    {comment.name}
                  </div>
                  <div className="pd-comment-email" style={{ color: "#9ca3af" }}>
                    {comment.email}
                  </div>
                  <p className="pd-comment-body" style={{ color: dark ? "#9a9490" : "#5a5550" }}>
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetails;