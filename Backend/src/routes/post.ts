import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createPost,
  allPosts,
  getPost,
  editPost,
  deletePost,
  likePost,
  dislikePost,
} from "../controllers/posts.js";

const router = express.Router();

router.post("/create", auth, createPost);
router.get("/", allPosts);
router.get("/:id", getPost);
router.put("/edit/:id", auth, editPost);
router.delete("/:id", auth, deletePost);
router.post("/like/:id", auth, likePost);
router.post("/dislike/:id", auth, dislikePost);

export default router;
