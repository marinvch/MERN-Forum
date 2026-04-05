import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createComment,
  allComments,
  getComment,
  editComment,
  deleteComment,
  likeComment,
  dislikeComment,
} from "../controllers/comments.js";

const router = express.Router();

router.post("/create", auth, createComment);
router.get("/:id", allComments);
router.get("/comment/:id", getComment);
router.put("/edit/:id", auth, editComment);
router.delete("/:id", auth, deleteComment);
router.post("/like/:id", auth, likeComment);
router.post("/dislike/:id", auth, dislikeComment);

export default router;
