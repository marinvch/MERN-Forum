import express from "express";
import { auth } from "../middleware/auth.js";
import {
  register,
  login,
  deleteUser,
  currentUser,
  validToken,
} from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", auth, deleteUser);
router.get("/currentUser", auth, currentUser);
router.post("/validToken", validToken);

export default router;
