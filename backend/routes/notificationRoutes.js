import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET NOTIFICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK AS READ
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;