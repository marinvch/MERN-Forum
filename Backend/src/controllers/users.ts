import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { RegisterRequest, LoginRequest, AuthRequest } from "../types/index.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, repeatPassword, username }: RegisterRequest =
      req.body;

    // Validate input fields
    if (!email || !password || !repeatPassword) {
      res.status(400).json({
        msg: "Email, password, and confirm password are required fields.",
      });
      return;
    }

    if (password !== repeatPassword) {
      res.status(400).json({ msg: "Passwords must match." });
      return;
    }

    if (password.length < 5) {
      res.status(400).json({
        msg: "Password must be at least 5 characters long.",
      });
      return;
    }

    const finalUsername = username || email;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        msg: "An account with this email already exists.",
      });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: passwordHash,
      username: finalUsername,
    });

    // Save new user to database
    const savedUser = await newUser.save();

    // Generate JWT and send response
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET is not configured" });
      return;
    }

    const token = jwt.sign({ id: savedUser._id }, jwtSecret);
    res.json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginRequest = req.body;

    // validate
    if (!email || !password) {
      res.status(400).json({ msg: "Not all fields have been entered." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: "No account with this email has been registered.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials." });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET is not configured" });
      return;
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.json({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const validToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res.json(false);
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET is not configured" });
      return;
    }

    const verified = jwt.verify(token, jwtSecret);
    if (!verified) {
      res.json(false);
      return;
    }

    const user = await User.findById((verified as any).id);
    if (!user) {
      res.json(false);
      return;
    }

    res.json({ verified: true, user });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const currentUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user);

    res.json({
      username: user?.username,
      id: user?._id,
      posts: user?.posts,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
