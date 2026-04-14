import React, { useState } from "react";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image:null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData()
    data.append("title",form.title)
    data.append("content",form.content)
    data.append("image",form.image)

    if (form.image){
      data.append("image",form.image)
    }
    await createPost(data)
    alert("Post Created!")

    try {
      await createPost(form);
      alert("Post created!");
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }}>
      <div style={{
        width: "100%",
        maxWidth: 500,
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 16,
        padding: 32
      }}>
        <h2 style={{ marginBottom: 20 }}>Create Post</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            style={{
              width: "100%",
              height: "120px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
          <input type="file" onChange={(e)=>setForm({...form,image:e.target.files[0]})} />

          <button
            type="submit"
            style={{
              marginTop: "12px",
              padding: "10px 20px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;