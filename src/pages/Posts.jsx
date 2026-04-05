import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Posts.css";

const Posts = () => {
  const { posts, search, setSearch, deletePost } = useContext(AppContext);
  console.log("search",search)

  const filteredPosts = useMemo(() => {
    console.log("Filtering...");
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [posts, search]);

  // 🔥 SKELETON UI
  // if (loading) {
  //   return (
  //     <div style={{ width: "60%", margin: "30px auto" }}>
  //       {[1, 2, 3, 4].map((item) => (
  //         <div
  //           key={item}
  //           style={{
  //             background: "#fff",
  //             padding: "16px",
  //             marginBottom: "15px",
  //             borderRadius: "10px",
  //           }}
  //         >
  //           <div
  //             className="skeleton"
  //             style={{
  //               height: "20px",
  //               width: "60%",
  //               background: "#e5e7eb",
  //               marginBottom: "10px",
  //             }}
  //           />

  //           <div
  //             className="skeleton"
  //             style={{
  //               height: "15px",
  //               width: "90%",
  //               background: "#e5e7eb",
  //             }}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="posts-container">
      <h1>Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt="" className="post-wrapper" />
            <button className="delete-btn" onClick={() => deletePost(post.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-icon lucide-trash"
              >
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>

            <Link className="post-content" to={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
              <h3 className="post-title">{post.title}</h3>
              <p>{post.body.slice(0, 100)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
