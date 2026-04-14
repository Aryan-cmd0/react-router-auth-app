import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL of image
    },
    author: {
      type: String,
      default: "Anonymous",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;