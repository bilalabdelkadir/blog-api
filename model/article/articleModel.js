import User from "../user/userModel.js";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    min: 3,
  },
  body: {
    type: String,
    min: 100,
    required: [true, "Please write valid article"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Article = mongoose.model("Article", userSchema);

export default Article;
