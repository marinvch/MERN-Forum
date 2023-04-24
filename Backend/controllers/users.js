import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  // console.log(req.body)
  try {
    let { email, password, repeatPassword, username } = req.body;
    console.log(req.body)
    // Validate input fields
    if (!email || !password || !repeatPassword) {
      return res.status(400).json({ msg: "Email, password, and confirm password are required fields." });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ msg: "Passwords must match." });
    }

    if (password.length < 5) {
      return res.status(400).json({ msg: "Password must be at least 5 characters long." });
    }

    if (!username) {
      username = email;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });

    // Save new user to database
    const savedUser = await newUser.save();

    // Generate JWT and send response
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const validToken = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json({ verified: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const currentUser = async (req, res) => {
  const user = await User.findById(req.user);

  res.json({
    username: user.username,
    id: user._id,
    posts: user.posts,
  });
};
