import React, { useState, useMemo, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getPosts, likePost } from "../services/postService";
import { toggleBookmark } from "../services/bookmarkService";
import {
  getComments,
  addComment,
  deleteComment,
} from "../services/commentService"; // make sure this service exists
import "./Posts.css";

/* ───────────────────── CONSTANTS ───────────────────── */
const TAGS = [
  "React",
  "Backend",
  "AI / ML",
  "DevOps",
  "Open Source",
  "CSS",
  "TypeScript",
  "System Design",
];

const TAG_STYLES = [
  {
    bg: "rgba(124,58,237,0.12)",
    color: "#a78bfa",
    border: "rgba(124,58,237,0.25)",
  },
  {
    bg: "rgba(16,185,129,0.10)",
    color: "#6ee7b7",
    border: "rgba(16,185,129,0.25)",
  },
  {
    bg: "rgba(245,158,11,0.10)",
    color: "#fbbf24",
    border: "rgba(245,158,11,0.25)",
  },
  {
    bg: "rgba(59,130,246,0.10)",
    color: "#93c5fd",
    border: "rgba(59,130,246,0.25)",
  },
  {
    bg: "rgba(236,72,153,0.10)",
    color: "#f9a8d4",
    border: "rgba(236,72,153,0.25)",
  },
  {
    bg: "rgba(20,184,166,0.10)",
    color: "#5eead4",
    border: "rgba(20,184,166,0.25)",
  },
  {
    bg: "rgba(249,115,22,0.10)",
    color: "#fdba74",
    border: "rgba(249,115,22,0.25)",
  },
  {
    bg: "rgba(168,85,247,0.10)",
    color: "#c4b5fd",
    border: "rgba(168,85,247,0.25)",
  },
];

const FILTERS = ["All", ...TAGS.slice(0, 5)];

/* ─────────────── INLINE COMMENT COMPONENT ─────────── */
const InlineComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getComments(postId);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [postId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await addComment(postId, text);
      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(postId, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="inline-comments">
      <div className="comments-list">
        {loading && <p className="comments-loading">Loading…</p>}
        {!loading && comments.length === 0 && (
          <p className="comments-empty">No comments yet — be the first!</p>
        )}
        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <div className="comment-avatar">
              {(c.user?.username || "U")[0].toUpperCase()}
            </div>
            <div className="comment-body">
              <span className="comment-author">
                {c.user?.username || "Anonymous"}
              </span>
              <span className="comment-text">{c.text}</span>
            </div>
            <button
              className="comment-delete"
              onClick={() => handleDelete(c._id)}
              title="Delete"
            >
              ×
            </button>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="comment-form" onSubmit={handleAdd}>
        <input
          className="comment-input"
          placeholder="Write a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="comment-send" type="submit" disabled={!text.trim()}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
};

/* ═══════════════════ MAIN POSTS PAGE ═══════════════════ */
const Posts = () => {
  const { search, setSearch } = useContext(AppContext);

  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [likeAnim, setLikeAnim] = useState({});
  const [bookmarked, setBookmarked] = useState({});

  /* ── Fetch Posts ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  /* ── Filtered Posts ── */
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeFilter !== "All") {
      result = result.filter(
        (p) => p.tags?.includes(activeFilter) || p.category === activeFilter,
      );
    }
    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return result;
  }, [posts, search, activeFilter]);

  /* ── Like ── */
  const handleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setLikeAnim((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setLikeAnim((prev) => ({ ...prev, [id]: false })), 600);

    try {
      const res = await likePost(id);
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, likes: res.data.likes } : p)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ── Bookmark ── */
  const handleBookmark = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleBookmark(id);
      setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (err) {
      console.error(err);
    }
  };

  /* ── Toggle Comments ── */
  const toggleCommentsDrawer = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* ── Time Ago helper ── */
  const timeAgo = (date) => {
    if (!date) return "";
    const s = Math.floor((Date.now() - new Date(date)) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  };

  /* ══════════════════════ RENDER ══════════════════════ */
  return (
    <div className="posts-page">
      {/* ─── HEADER ─── */}
      <header className="posts-header">
        <div className="posts-header-left">
          <span className="posts-eyebrow">✦ Threadly</span>
          <h1 className="posts-title">The Feed</h1>
          <p className="posts-subtitle">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "story" : "stories"} waiting for you
          </p>
        </div>

        <div className="posts-header-right">
          <div className="posts-search-wrap">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="posts-search"
              type="text"
              placeholder="Search stories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* ─── FILTER PILLS ─── */}
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ─── GRID ─── */}
      <div className="posts-grid">
        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>No stories found</p>
          </div>
        )}

        {filteredPosts.map((post, index) => {
          const tag = post.tags?.[0] || TAGS[index % TAGS.length];
          const ts = TAG_STYLES[index % TAG_STYLES.length];
          const isOpen = openComments[post._id];

          return (
            <article
              key={post._id}
              className={`post-card ${hoveredCard === post._id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredCard(post._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* ── Card Top (tag + bookmark) ── */}
              <div className="post-card-top">
                <span
                  className="post-tag"
                  style={{
                    background: ts.bg,
                    color: ts.color,
                    border: `1px solid ${ts.border}`,
                  }}
                >
                  {tag}
                </span>
                <button
                  className={`bookmark-btn ${bookmarked[post._id] ? "saved" : ""}`}
                  onClick={(e) => handleBookmark(e, post._id)}
                  title="Bookmark"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={bookmarked[post._id] ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>

              {/* ── Body (linked) ── */}
              <Link to={`/posts/${post._id}`} className="post-card-link">
                <div className="post-body">
                  {/* 🖼️ IMAGE (ADD THIS) */}
                  {post.image && (
                    <img src={post.image} alt="post" className="post-image" />
                  )}

                  <h2 className="post-card-title">{post.title}</h2>

                  <p className="post-card-excerpt">
                    {post.content?.slice(0, 120)}…
                  </p>
                </div>
              </Link>

              {/* ── Author + Time ── */}
              <div className="post-meta">
                <div className="post-author-avatar">
                  {(post.author?.username || "A")[0].toUpperCase()}
                </div>
                <span className="post-author-name">
                  {post.author?.username || "Anonymous"}
                </span>
                <span className="post-time">{timeAgo(post.createdAt)}</span>
              </div>

              {/* ── Actions Bar ── */}
              <div className="post-actions">
                <button
                  className={`action-btn like-btn ${likeAnim[post._id] ? "pop" : ""}`}
                  onClick={(e) => handleLike(e, post._id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{post.likes?.length || 0}</span>
                </button>

                <button
                  className={`action-btn comment-btn ${isOpen ? "active" : ""}`}
                  onClick={(e) => toggleCommentsDrawer(e, post._id)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Comment</span>
                </button>

                <button className="action-btn share-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              {/* ── Inline Comments Drawer ── */}
              {isOpen && (
                <div className="comments-drawer">
                  <InlineComments postId={post._id} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
