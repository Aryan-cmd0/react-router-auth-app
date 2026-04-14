import { useEffect, useState } from "react";
import { getBookmarks } from "../services/bookmarkService";
import Posts from "./Posts";

export default function Bookmarks() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await getBookmarks();
      setPosts(res.data);
    };

    fetchBookmarks();
  }, []);

  return (
    <div>
      <h2>Saved Posts</h2>
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}