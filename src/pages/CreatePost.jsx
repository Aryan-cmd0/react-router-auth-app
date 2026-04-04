import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { posts, setPosts } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
    };

    setPosts([newPost, ...posts]); // add on top
    navigate("/posts");
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

    const updatedPosts = [newPost, ...existingPosts];

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // redirect
    navigate("/posts");
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "30px auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Create Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
        }}
      />

      <textarea
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          margin: "10px 0",
        }}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreatePost;
