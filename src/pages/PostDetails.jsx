import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./PostDetail.css";

const TAG_STYLES = [
  { bg: "rgba(83,74,183,0.15)",  color: "#AFA9EC", border: "rgba(83,74,183,0.3)"  },
  { bg: "rgba(29,158,117,0.12)", color: "#5DCAA5", border: "rgba(29,158,117,0.3)" },
  { bg: "rgba(216,90,48,0.12)",  color: "#F0997B", border: "rgba(216,90,48,0.3)"  },
  { bg: "rgba(55,138,221,0.12)", color: "#85B7EB", border: "rgba(55,138,221,0.3)" },
  { bg: "rgba(212,83,126,0.12)", color: "#ED93B1", border: "rgba(212,83,126,0.3)" },
];
const TAGS = ["React", "Backend", "AI / ML", "DevOps", "Open Source"];

const PostDetails = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { posts, deletePost, setPosts } = useContext(AppContext);

  const [apiComments, setApiComments] = useState([]);
  const [loaded, setLoaded]           = useState(false);
  const [newComment, setNewComment]   = useState("");
  const [activeTab, setActiveTab]     = useState("post");

  const post      = posts.find((p) => p.id === Number(id));
  const postIndex = posts.findIndex((p) => p.id === Number(id));
  const ts        = TAG_STYLES[postIndex % TAG_STYLES.length];
  const tag       = TAGS[postIndex % TAGS.length];
  const initials  = post?.title?.slice(0, 2).toUpperCase() || "??";
  const wordCount = post?.body?.split(/\s+/).length || 0;
  const readTime  = Math.max(1, Math.ceil(wordCount / 200));

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((r) => r.json())
      .then((data) => {
        setApiComments(data);
        setTimeout(() => setLoaded(true), 80);
      })
      .catch(() => setLoaded(true));
  }, [id]);

  if (!post) return (
    <div className="pd-not-found">
      <span className="pd-404">404</span>
      <p>Post not found.</p>
      <button className="pd-back pd-back-plain" onClick={() => navigate("/posts")}>
        ← Back to feed
      </button>
    </div>
  );

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/posts");
  };

  const handleLike = () => {
    setPosts((prev) => prev.map((p) =>
      p.id === post.id
        ? { ...p, likes: p.liked ? (p.likes || 1) - 1 : (p.likes || 0) + 1, liked: !p.liked }
        : p
    ));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setApiComments((prev) => [{
      id: Date.now(),
      name: "You",
      email: "you@devpulse.io",
      body: newComment.trim(),
    }, ...prev]);
    setNewComment("");
  };

  const allComments = [
    ...(post.comments?.map((c, i) => ({
      id: `local-${i}`, name: "Community", email: "user@devpulse.io", body: c,
    })) || []),
    ...apiComments,
  ];

  return (
    <div className={`pd-page ${loaded ? "pd-loaded" : ""}`}>

      {/* BACK */}
      <button className="pd-back" onClick={() => navigate(-1)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8L2 12L6 16"/><path d="M2 12H22"/>
        </svg>
        <span>Back</span>
      </button>

      <div className="pd-wrapper">

        {/* HERO */}
        <div className="pd-hero">
          {post.image ? (
            <img src={post.image} alt={post.title} className="pd-hero-img" />
          ) : (
            <div className="pd-hero-placeholder">
              <span className="pd-hero-letter">{initials}</span>
            </div>
          )}
          <div className="pd-hero-overlay" />
          <div className="pd-hero-badges">
            <span
              className="pd-tag"
              style={{ background: ts.bg, color: ts.color, border: `0.5px solid ${ts.border}` }}
            >
              {tag}
            </span>
            <span className="pd-index-badge">
              #{String(postIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="pd-card">

          {/* META ROW */}
          <div className="pd-meta">
            <div className="pd-author-chip">
              <div
                className="pd-avatar-sm"
                style={{ background: ts.bg, color: ts.color }}
              >
                {initials}
              </div>
              <div>
                <div className="pd-author-name">@user</div>
                <div className="pd-author-sub">Author</div>
              </div>
            </div>

            <div className="pd-meta-center">
              <span className="pd-meta-item">{readTime} min read</span>
              <span className="pd-meta-dot" />
              <span className="pd-meta-item">{wordCount} words</span>
              <span className="pd-meta-dot" />
              <span className="pd-meta-item">
                POST #{String(post.id).slice(-6).toUpperCase()}
              </span>
            </div>

            <div className="pd-meta-actions">
              <button
                className={`pd-like-btn ${post.liked ? "pd-liked" : ""}`}
                onClick={handleLike}
              >
                <svg width="15" height="15" viewBox="0 0 24 24"
                  fill={post.liked ? "currentColor" : "none"}
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{post.likes || 0}</span>
              </button>

              <button className="pd-delete" onClick={handleDelete}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                </svg>
                Delete
              </button>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="pd-title">{post.title}</h1>
          <div className="pd-divider" />

          {/* TABS */}
          <div className="pd-tabs">
            <button
              className={`pd-tab ${activeTab === "post" ? "pd-tab-active" : ""}`}
              onClick={() => setActiveTab("post")}
            >
              Post
            </button>
            <button
              className={`pd-tab ${activeTab === "comments" ? "pd-tab-active" : ""}`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
              <span className="pd-tab-count">{allComments.length}</span>
            </button>
          </div>

          {/* POST BODY */}
          {activeTab === "post" && (
            <div className="pd-body">
              {post.body?.split("\n").map((para, i) =>
                para.trim()
                  ? <p key={i} className="pd-para">{para}</p>
                  : <br key={i} />
              )}
            </div>
          )}

          {/* COMMENTS TAB */}
          {activeTab === "comments" && (
            <div className="pd-comments-section">

              {/* Comment input */}
              <div className="pd-comment-box">
                <div
                  className="pd-avatar"
                  style={{ background: "#EEEDFE", color: "#534AB7" }}
                >
                  ME
                </div>
                <div className="pd-comment-input-inner">
                  <textarea
                    className="pd-textarea"
                    placeholder="Share your thoughts on this post…"
                    value={newComment}
                    rows={3}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) handleComment(e);
                    }}
                  />
                  <div className="pd-comment-footer-row">
                    <span className="pd-comment-hint">Enter to post · Shift+Enter new line</span>
                    <button
                      className="pd-post-btn"
                      onClick={handleComment}
                      disabled={!newComment.trim()}
                      style={{ opacity: newComment.trim() ? 1 : 0.4 }}
                    >
                      Post comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments header */}
              <div className="pd-comments-header">
                <h3>Comments</h3>
                <span className="pd-comment-count">{allComments.length}</span>
              </div>

              {/* Comments list */}
              <div className="pd-comments-list">
                {allComments.length === 0 ? (
                  <div className="pd-no-comments">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <p>No comments yet — start the conversation.</p>
                  </div>
                ) : (
                  allComments.map((c, i) => (
                    <div
                      key={c.id}
                      className="pd-comment"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <div
                        className="pd-avatar"
                        style={{
                          background: TAG_STYLES[i % TAG_STYLES.length].bg,
                          color:      TAG_STYLES[i % TAG_STYLES.length].color,
                        }}
                      >
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="pd-comment-content">
                        <div className="pd-comment-name">{c.name}</div>
                        <div className="pd-comment-email">{c.email}</div>
                        <p className="pd-comment-body">{c.body}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PostDetails;