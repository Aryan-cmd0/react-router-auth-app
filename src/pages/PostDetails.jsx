import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Post Details</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;