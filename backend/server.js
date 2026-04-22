import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
// console.log("JWT:", process.env.JWT_SECRET);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Debug middleware (helps confirm requests hit server)
app.use((req, res, next) => {
  console.log(`👉 ${req.method} ${req.url}`);
  next();
});

//mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));


// ✅ GET
app.get("/api/posts/test", (req, res) => {
  res.status(200).json({
    message: "GET working ✅",
  });
});

// ✅ POST
app.post("/api/posts/test", (req, res) => {
  res.status(201).json({
    message: "POST working ✅",
    body: req.body,
  });
});

// ✅ PUT
app.put("/api/posts/test/:id", (req, res) => {
  res.status(200).json({
    message: "PUT working ✅",
    id: req.params.id,
    updatedData: req.body,
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});
//login
app.post("/api/auth/login", (req, res) => {
  res.json({ message: "Login route working ✅" });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log("🔥 FINAL SERVER RUNNING ON PORT 5000");
});