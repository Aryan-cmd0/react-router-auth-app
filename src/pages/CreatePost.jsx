import { useState, useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { posts, setPosts, darkMode } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newPost = { id: Date.now(), title, body, image: imagePreview };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/posts");
  };

  const dark = darkMode;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: dark ? "#0f0f0f" : "#f0f4ff",
      fontFamily: "'Georgia', serif",
      padding: "40px 20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "620px",
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(79,70,229,0.15)",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: dark
          ? "0 25px 60px rgba(0,0,0,0.6)"
          : "0 25px 60px rgba(79,70,229,0.12)",
      }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#4f46e5",
            margin: "0 0 8px 0",
            fontFamily: "'Courier New', monospace",
          }}>
            New Entry
          </p>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
            color: dark ? "#f5f5f5" : "#111",
            letterSpacing: "-0.5px",
          }}>
            Create Post
          </h2>
        </div>

        {/* Title Input */}
        <div style={{ marginBottom: "16px", position: "relative" }}>
          <input
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "16px",
              fontFamily: "'Georgia', serif",
              background: dark ? "rgba(255,255,255,0.06)" : "#fff",
              border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #ddd",
              borderRadius: "12px",
              color: dark ? "#f0f0f0" : "#111",
              outline: "none",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4f46e5"}
            onBlur={(e) => e.target.style.border = dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #ddd"}
          />
        </div>

        {/* Body Textarea */}
        <div style={{ marginBottom: "20px" }}>
          <textarea
            placeholder="Write something interesting..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{
              width: "100%",
              height: "130px",
              padding: "14px 16px",
              fontSize: "15px",
              fontFamily: "'Georgia', serif",
              background: dark ? "rgba(255,255,255,0.06)" : "#fff",
              border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #ddd",
              borderRadius: "12px",
              color: dark ? "#f0f0f0" : "#111",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              transition: "border 0.2s",
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4f46e5"}
            onBlur={(e) => e.target.style.border = dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #ddd"}
          />
        </div>

        {/* Drag & Drop Upload Zone */}
        {!imagePreview ? (
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
              border: dragging
                ? "2px dashed #4f46e5"
                : dark ? "2px dashed rgba(255,255,255,0.12)" : "2px dashed #c7d2fe",
              borderRadius: "16px",
              padding: "36px 20px",
              textAlign: "center",
              cursor: "pointer",
              background: dragging
                ? dark ? "rgba(79,70,229,0.08)" : "#eef2ff"
                : "transparent",
              transition: "all 0.2s",
              marginBottom: "24px",
            }}
          >
            {/* Upload Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
              viewBox="0 0 24 24" fill="none" stroke={dragging ? "#4f46e5" : "#9ca3af"}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ marginBottom: "10px" }}>
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p style={{
              margin: "0 0 4px 0",
              fontSize: "14px",
              fontWeight: "600",
              color: dark ? "#e0e0e0" : "#374151",
            }}>
              {dragging ? "Drop it here!" : "Drag & drop an image"}
            </p>
            <p style={{
              margin: 0,
              fontSize: "12px",
              color: "#9ca3af",
            }}>
              or <span style={{ color: "#4f46e5", textDecoration: "underline" }}>browse to upload</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          /* Image Preview */
          <div style={{
            position: "relative",
            marginBottom: "24px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}>
            <img
              src={imagePreview}
              alt="preview"
              style={{ width: "100%", maxHeight: "220px", objectFit: "cover", display: "block" }}
            />
            {/* Overlay with remove */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
            >
              <button
                onClick={() => setImagePreview(null)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                  viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                  <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Remove Image
              </button>
            </div>

            {/* Corner badge */}
            <div style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "20px",
              backdropFilter: "blur(4px)",
            }}>
              ✓ Image added
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            letterSpacing: "0.3px",
            transition: "opacity 0.2s, transform 0.1s",
            fontFamily: "'Georgia', serif",
          }}
          onMouseEnter={(e) => { e.target.style.opacity = "0.92"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
          onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
          onMouseUp={(e) => e.target.style.transform = "translateY(-1px)"}
        >
          Publish Post →
        </button>

      </div>
    </div>
  );
};

export default CreatePost;