import { Request, Response } from "express";
import Post from "../models/post.js";
import User from "../models/user.js";
import { CreatePostRequest, AuthRequest } from "../types/index.js";

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log("📝 [POST] Create post request received");
    const { title, content }: CreatePostRequest = req.body;

    if (!title || !content) {
      res.status(422).json({ error: "Please add all fields." });
      return;
    }

    console.log(`📬 [DB QUERY] Checking if post with title "${title}" exists...`);
    const existingPost = await Post.findOne({ title });

    if (existingPost) {
      console.log(`⚠️  [DB RESULT] Post with title "${title}" already exists`);
      res.status(404).json({ message: "Title with this name exist." });
      return;
    }
    console.log(`✅ [DB RESULT] Title is available`);

    const newPost = new Post({
      title,
      content,
      createdAt: new Date(),
      author: req.user,
    });

    console.log(`💾 [DB WRITE] Saving post to MongoDB: "${title}"...`);
    const savedPost = await newPost.save();
    console.log(`✅ [DB WRITE SUCCESS] Post saved with ID: ${savedPost._id}`);

    console.log(`📬 [DB UPDATE] Adding post to user ${req.user}...`);
    await User.findByIdAndUpdate(req.user, {
      $push: { posts: savedPost },
    });
    console.log(`✅ [DB UPDATE SUCCESS] User ${req.user} updated with new post`);

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(409).json({ message: (error as Error).message });
  }
};

export const allPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log("📬 [DB QUERY] Fetching all posts from MongoDB...");
    const getAllPosts = await Post.find().populate("author", "_id username");
    console.log(`✅ [DB SUCCESS] Retrieved ${getAllPosts.length} posts from database`);

    res.status(200).json(getAllPosts);
  } catch (error) {
    console.error("❌ [DB ERROR] Failed to fetch posts:", (error as Error).message);
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    res.status(200).send(post);
  } catch (error) {
    res.status(409).json({ message: (error as Error).message });
  }
};

export const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(409).json({ message: (error as Error).message });
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const user = await User.findByIdAndUpdate(req.user, {
      $pull: { posts: req.params.id },
    }).populate("likedBy", "_id username");

    if (!post) {
      res.status(404).send("No post with that id");
      return;
    }

    res.send({ message: `${user?.username} deleted this post.` });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user);
    const post = await Post.findById(req.params.id);

    if (!user || !post) {
      res.status(404).json({ message: "User or post not found" });
      return;
    }

    const isOwnPost = user.posts.includes(req.params.id as any);

    if (!isOwnPost) {
      const alreadyLiked = post.likedBy.includes(user._id);

      if (!alreadyLiked) {
        await Post.findByIdAndUpdate(req.params.id, {
          $inc: { likes: 1 },
          $push: { likedBy: user._id },
        });

        res.json({ message: "You liked the post." });
      } else {
        res.status(201).json({ message: "You already liked this post." });
      }
    } else {
      res.status(201).json({ message: "You can't like your own post." });
    }
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const dislikePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user);
    const post = await Post.findById(req.params.id);

    if (!user || !post) {
      res.status(404).json({ message: "User or post not found" });
      return;
    }

    const alreadyLiked = post.likedBy.includes(user._id);

    if (alreadyLiked) {
      await Post.findByIdAndUpdate(req.params.id, {
        $inc: { likes: -1 },
        $pull: { likedBy: user._id },
      });

      res.json({ message: "You disliked the post." });
    } else {
      res.status(201).json({ message: "You can't dislike the post." });
    }
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
