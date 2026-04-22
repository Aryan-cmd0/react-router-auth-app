import express from "express";

const router = express.Router();
console.log("✅ postRoutes file loaded");
let posts = [
  {
    id: 1,
    title: "First Post",
    likes: 0,
    comments: [],
  },
];
//login
// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("👉 Incoming:", email, password);

    const user = await User.findOne({ email });
    console.log("👉 USER:", user);

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("👉 Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("❌ LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all posts (FIRST)
router.get("/", (req, res) => {
  res.json(posts);
});

// ✅ CREATE post
router.post("/", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    likes: 0,
    comments: [],
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// ❤️ LIKE
router.put("/:id/like", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ msg: "Not found" });

  post.likes++;
  res.json(post);
});

// 💬 COMMENT
router.post("/:id/comment", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ msg: "Not found" });

  const comment = { id: Date.now(), text: req.body.text };
  post.comments.push(comment);

  res.json(post);
});

// ❌ DELETE COMMENT
router.delete("/:postId/comment/:commentId", (req, res) => {
  const post = posts.find(p => p.id == req.params.postId);
  if (!post) return res.status(404).json({ msg: "Not found" });

  post.comments = post.comments.filter(
    c => c.id != req.params.commentId
  );

  res.json(post);
});

// ✅ GET single post (AFTER all specific routes)
router.get("/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ msg: "Not found" });

  res.json(post);
});

// ✅ UPDATE
router.put("/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ msg: "Not found" });

  post.title = req.body.title || post.title;
  res.json(post);
});

// ✅ DELETE post
router.delete("/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ message: "Deleted ✅" });
});

export default router;