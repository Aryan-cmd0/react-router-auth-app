import express from "express";
import User from "../models/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// TOGGLE BOOKMARK
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const postId = req.params.postId;

    const alreadySaved = user.bookmarks.includes(postId);

    if (alreadySaved) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== postId
      );
    } else {
      user.bookmarks.push(postId);
    }

    await user.save();

    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BOOKMARKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("bookmarks");
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;