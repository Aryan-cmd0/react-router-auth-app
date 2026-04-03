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
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>Post Details</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <h2>Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PostDetails;