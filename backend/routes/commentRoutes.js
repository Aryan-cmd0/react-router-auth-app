import express from "express";
import Comment from "../models/Comment.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD COMMENT
router.post("/:postId", authMiddleware, async (req, res) => {
  const comment = await Comment.create({
    postId: req.params.postId,
    userId: req.user,
    text: req.body.text
  });

  res.json(comment);
});

// GET COMMENTS
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({
    postId: req.params.postId
  }).populate("userId", "name");

  res.json(comments);
});

export default router;