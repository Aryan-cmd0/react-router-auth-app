import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // 🔥 useMemo optimization
  const filteredPosts = useMemo(() => {
    console.log("Filtering..."); // to see optimization
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  return (
    <div>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPosts.slice(0, 10).map((post) => (
        <div key={post.id}>
          <h1>Posts</h1>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Posts;