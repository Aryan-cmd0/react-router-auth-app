import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Post from "./models/Post.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// ✅ LOAD ENV FIRST
dotenv.config();

// ✅ CONNECT DB
connectDB();

//Temporally
const testPost = async () => {
  try {
    const post = await Post.create({
      title: "Test Post",
      content: "Backend is working 🚀",
    });

    console.log("Test Post Created:", post);
  } catch (error) {
    console.error(error);
  }
};

// testPost();

// ✅ CREATE APP FIRST (VERY IMPORTANT)
const app = express();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ ROUTES (AFTER app is created)
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});