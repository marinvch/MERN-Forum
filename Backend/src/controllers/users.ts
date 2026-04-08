import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { RegisterRequest, LoginRequest, AuthRequest } from "../types/index.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("📝 [AUTH] User registration request received");
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

    console.log(`📬 [DB QUERY] Checking if user with email ${email} exists...`);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`⚠️  [DB RESULT] User with email ${email} already exists`);
      res.status(400).json({
        msg: "An account with this email already exists.",
      });
      return;
    }
    console.log(`✅ [DB RESULT] Email ${email} is available`);

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
    console.log(`💾 [DB WRITE] Saving new user to MongoDB: ${email}`);
    const savedUser = await newUser.save();
    console.log(`✅ [DB WRITE SUCCESS] User saved with ID: ${savedUser._id}`);

    // Generate JWT and send response
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET is not configured" });
      return;
    }

    const token = jwt.sign({ id: savedUser._id }, jwtSecret);
    console.log(`🔑 [AUTH] JWT token generated for user ${email}`);
    res.json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
    console.log(`✅ [AUTH SUCCESS] User ${email} registered successfully`);
  } catch (err) {
    console.error(`❌ [AUTH ERROR] Registration failed:`, (err as Error).message);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🔐 [AUTH] User login request received");
    const { email, password }: LoginRequest = req.body;

    // validate
    if (!email || !password) {
      res.status(400).json({ msg: "Not all fields have been entered." });
      return;
    }

    console.log(`📬 [DB QUERY] Looking up user with email ${email}...`);
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`⚠️  [DB RESULT] No user found with email ${email}`);
      res.status(400).json({
        msg: "No account with this email has been registered.",
      });
      return;
    }
    console.log(`✅ [DB RESULT] User found: ${user.username}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log(`⚠️  [AUTH] Invalid password for user ${email}`);
      res.status(400).json({ msg: "Invalid credentials." });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT_SECRET is not configured" });
      return;
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    console.log(`🔑 [AUTH] JWT token generated for user ${email}`);
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
    console.log("🔐 [AUTH] validToken request received");
    const token = req.header("x-auth-token");
    console.log(`📬 [DB QUERY] Checking token validity...token: ${token ? token.substring(0, 20) + '...' : 'NO TOKEN'}`);
    
    if (!token) {
      console.log(`⚠️  [AUTH] No token provided in request`);
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
      console.log(`⚠️  [AUTH] Token verification failed`);
      res.json(false);
      return;
    }

    const user = await User.findById((verified as any).id);
    if (!user) {
      console.log(`⚠️  [DB RESULT] No user found for token`);
      res.json(false);
      return;
    }

    console.log(`✅ [AUTH] Token validated for user ${user.username}`);
    res.json({ verified: true, user });
  } catch (err) {
    console.error(`❌ [AUTH ERROR] Token validation failed:`, (err as Error).message);
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
