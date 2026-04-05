import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = useContext(AppContext);

  const [comments, setComments] = useState([]);

  // ✅ Get post from your app
  const post = posts.find((p) => p.id === Number(id));

  // ✅ Only fetch comments
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  if (!post) return <h2>Post not found</h2>;

  // ✅ Delete handler
  const handleDelete = () => {
    deletePost(post.id);
    navigate("/posts");
  };

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        {/* ✅ DELETE BUTTON */}
        <button
          onClick={handleDelete}
          style={{
            marginTop: "15px",
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete Post
        </button>
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