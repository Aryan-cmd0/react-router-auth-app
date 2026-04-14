import express from "express";
import Post from "../models/Post.js";

const router = express.Router();


// ✅ CREATE POST
router.post("/", async (req, res) => {
  try {
    const { title, content, image, author } = req.body;

    const newPost = new Post({
      title,
      content,
      image,
      author,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});


// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;