import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        width: "60%",
        margin: "30px auto",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 14px",
          borderRadius: "6px",
          border: "none",
          background: "#e0e7ff",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      {/* Post Card */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>
        <p style={{ color: "#444", lineHeight: "1.6" }}>{post.body}</p>
      </div>

      {/* Comments Section */}
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <h3>Comments</h3>

        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              background: "#fff",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ marginBottom: "5px" }}>{comment.name}</h4>
            <p style={{ color: "#555" }}>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;