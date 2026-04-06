import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./PostDetail.css";   // ← was missing .css

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = useContext(AppContext);
  const [comments, setComments] = useState([]);

  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  if (!post) return <h2>Post not found</h2>;

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/posts");
  };

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>

      <button className="back-btn" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8L2 12L6 16" />
          <path d="M2 12H22" />
        </svg>
      </button>

      <div className="post-details-card">
        {/* ✅ delete-btn is inside post-details-card which already has position:relative in CSS */}
        <button onClick={handleDelete} className="delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
        

        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PostDetails;