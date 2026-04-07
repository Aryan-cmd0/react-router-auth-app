import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PostDetail = () => {
  const { id } = useParams();
  const { posts, setPosts, addComment, darkMode } = useContext(AppContext);
  const post = posts.find((p) => String(p.id) === String(id));

  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!post) {
    return (
      <div style={styles.notFound}>
        <h2 style={styles.notFoundTitle}>Post not found</h2>
        <Link to="/posts" style={styles.backLink}>← Back to The Feed</Link>
      </div>
    );
  }

  const handleLike = () => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? { ...p, likes: p.liked ? p.likes - 1 : (p.likes || 0) + 1, liked: !p.liked }
          : p
      )
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    addComment(post.id, text);
    setCommentText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div style={styles.page}>
      {/* Back */}
      <Link to="/posts" style={styles.backLink}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Feed
      </Link>

      {/* Hero Image */}
      {post.image && (
        <div style={styles.heroWrap}>
          <img src={post.image} alt={post.title} style={styles.heroImg} />
          <div style={styles.heroOverlay} />
        </div>
      )}

      {/* Article */}
      <article style={styles.article}>
        <header style={styles.articleHeader}>
          <span style={styles.eyebrow}>DEVCONNECT  •  POST</span>
          <h1 style={styles.articleTitle}>{post.title}</h1>
          <div style={styles.meta}>
            <button onClick={handleLike} style={{
              ...styles.likeBtn,
              ...(post.liked ? styles.likeBtnActive : {})
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {post.likes || 0} {post.liked ? "Liked" : "Like"}
            </button>
            <span style={styles.commentCount}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {post.comments?.length || 0} comments
            </span>
          </div>
        </header>

        <div style={styles.divider} />

        {/* Body */}
        <div style={styles.articleBody}>
          {post.body || "No content provided for this post."}
        </div>

        <div style={styles.divider} />

        {/* ===== COMMENT SECTION ===== */}
        <section style={styles.commentSection}>
          <h3 style={styles.commentSectionTitle}>
            Discussion
            <span style={styles.commentBadge}>{post.comments?.length || 0}</span>
          </h3>

          {/* Comment list */}
          <div style={styles.commentList}>
            {post.comments?.length > 0 ? (
              post.comments.map((c, i) => (
                <div key={i} style={styles.commentCard}>
                  <div style={styles.commentAvatar}>
                    {String.fromCharCode(65 + (i % 26))}
                  </div>
                  <div style={styles.commentContent}>
                    <div style={styles.commentAuthor}>Commenter {i + 1}</div>
                    <p style={styles.commentText}>{c}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.noComments}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: 0.3 }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <p>No comments yet. Start the conversation below.</p>
              </div>
            )}
          </div>

          {/* Add comment */}
          <div style={styles.addCommentBox}>
            <h4 style={styles.addCommentTitle}>Leave a comment</h4>
            <textarea
              style={styles.commentTextarea}
              placeholder="Share your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onFocus={(e) => { e.target.style.borderColor = "#e8c547"; e.target.style.background = "rgba(232,197,71,0.03)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
              rows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleCommentSubmit(e);
              }}
            />
            <div style={styles.commentFooter}>
              <span style={styles.commentHint}>Ctrl+Enter to submit</span>
              <button
                onClick={handleCommentSubmit}
                style={{
                  ...styles.submitBtn,
                  ...(submitted ? styles.submitBtnSuccess : {})
                }}
                onMouseEnter={(e) => { if (!submitted) e.target.style.background = "#f5d96a"; }}
                onMouseLeave={(e) => { if (!submitted) e.target.style.background = "#e8c547"; }}
              >
                {submitted ? "✓ Posted!" : "Post Comment"}
              </button>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    maxWidth: "760px",
    margin: "0 auto",
    padding: "40px 28px 100px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#666",
    textDecoration: "none",
    marginBottom: "32px",
    transition: "color 0.2s",
    fontWeight: 500,
  },
  heroWrap: {
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "36px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
  },
  heroImg: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    display: "block",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)",
  },
  article: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "40px",
  },
  articleHeader: { marginBottom: "24px" },
  eyebrow: {
    display: "block",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#e8c547",
    fontWeight: 700,
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  articleTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 900,
    color: "#f5f0e8",
    margin: "0 0 20px",
    lineHeight: 1.15,
    letterSpacing: "-1px",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  likeBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "30px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#888",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  },
  likeBtnActive: {
    color: "#e8547a",
    borderColor: "rgba(232,84,122,0.35)",
    background: "rgba(232,84,122,0.08)",
  },
  commentCount: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#555",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    margin: "28px 0",
  },
  articleBody: {
    fontSize: "16px",
    lineHeight: 1.85,
    color: "#aaa",
    letterSpacing: "0.1px",
  },
  commentSection: { marginTop: "8px" },
  commentSectionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#f0ece0",
    margin: "0 0 24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  commentBadge: {
    background: "rgba(232,197,71,0.12)",
    border: "1px solid rgba(232,197,71,0.25)",
    color: "#e8c547",
    fontSize: "12px",
    fontWeight: 700,
    padding: "2px 10px",
    borderRadius: "20px",
    fontFamily: "'DM Sans', sans-serif",
  },
  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "32px",
  },
  commentCard: {
    display: "flex",
    gap: "14px",
    padding: "16px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  commentAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #e8c547, #c9a32a)",
    color: "#000",
    fontSize: "13px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  commentContent: { flex: 1, minWidth: 0 },
  commentAuthor: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#888",
    marginBottom: "4px",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  commentText: {
    margin: 0,
    fontSize: "14px",
    color: "#b0a898",
    lineHeight: 1.6,
  },
  noComments: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "32px",
    color: "#444",
    fontSize: "14px",
    fontStyle: "italic",
  },
  addCommentBox: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "24px",
  },
  addCommentTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#888",
    margin: "0 0 14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  commentTextarea: {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    color: "#e0ddd5",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
    lineHeight: 1.6,
  },
  commentFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12px",
    flexWrap: "wrap",
    gap: "10px",
  },
  commentHint: {
    fontSize: "11px",
    color: "#444",
    letterSpacing: "0.3px",
  },
  submitBtn: {
    padding: "10px 24px",
    background: "#e8c547",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
    letterSpacing: "0.3px",
  },
  submitBtnSuccess: {
    background: "#4ade80",
    color: "#000",
  },
  notFound: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "16px",
    fontFamily: "'DM Sans', sans-serif",
  },
  notFoundTitle: {
    color: "#f5f0e8",
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px",
    margin: 0,
  },
};

export default PostDetail;