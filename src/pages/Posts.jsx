import React, { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Posts.css";

const Posts = () => {
  const { posts, search, setSearch, deletePost, setPosts, addComment } =
    useContext(AppContext);

  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const handleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : (post.likes || 0) + 1,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  const toggleComments = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="posts-page">
      {/* Header */}
      <div className="posts-header">
        <div className="posts-header-left">
          <span className="posts-eyebrow">DEVCONNECT</span>
          <h1 className="posts-title">The Feed</h1>
          <p className="posts-subtitle">{filteredPosts.length} stories waiting for you</p>
        </div>
        <div className="posts-search-wrap">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="posts-search"
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <p>No posts found. Be the first to write something.</p>
          <Link to="/create" className="empty-cta">Create a Post →</Link>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`post-card ${hoveredCard === post.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Delete */}
              <button
                className="post-delete"
                title="Delete post"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); deletePost(post.id); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>

              {/* Card link area */}
              <Link to={`/posts/${post.id}`} className="post-card-link">
                {/* Image */}
                <div className="post-img-wrap">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="post-img" />
                  ) : (
                    <div className="post-img-placeholder">
                      <span>{post.title?.charAt(0)?.toUpperCase() || "?"}</span>
                    </div>
                  )}
                  <div className="post-img-overlay" />
                  <span className="post-index-badge">#{String(index + 1).padStart(2, "0")}</span>
                </div>

                {/* Text */}
                <div className="post-body">
                  <h2 className="post-card-title">{post.title}</h2>
                  <p className="post-card-excerpt">{post.body?.slice(0, 90)}…</p>
                </div>
              </Link>

              {/* Actions */}
              <div className="post-actions">
                <button
                  className={`action-btn like-btn ${post.liked ? "liked" : ""}`}
                  onClick={(e) => handleLike(e, post.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                    viewBox="0 0 24 24"
                    fill={post.liked ? "currentColor" : "none"}
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span>{post.likes || 0}</span>
                </button>

                <button
                  className={`action-btn comment-btn ${openComments[post.id] ? "active" : ""}`}
                  onClick={(e) => toggleComments(e, post.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>{post.comments?.length || 0}</span>
                </button>

                <Link to={`/posts/${post.id}`} className="action-btn read-btn">
                  Read →
                </Link>
              </div>

              {/* Comments drawer */}
              {openComments[post.id] && (
                <div className="comments-drawer" onClick={(e) => e.stopPropagation()}>
                  <div className="comments-list">
                    {post.comments?.length > 0 ? (
                      post.comments.map((c, i) => (
                        <div key={i} className="comment-item">
                          <div className="comment-avatar">{String.fromCharCode(65 + (i % 26))}</div>
                          <p className="comment-text">{c}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-comments">No comments yet — start the conversation.</p>
                    )}
                  </div>
                  <div className="comment-input-row">
                    <input
                      className="comment-input"
                      type="text"
                      placeholder="Share your thoughts..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCommentSubmit(e, post.id);
                      }}
                    />
                    <button
                      className="comment-post-btn"
                      onClick={(e) => handleCommentSubmit(e, post.id)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;