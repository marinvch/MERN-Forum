import { Request, Response } from "express";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { CreateCommentRequest } from "../types/index.js";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("💬 [COMMENT] Create comment request received");
    const { content, author, postId }: CreateCommentRequest = req.body;

    if (!content || !author) {
      res.status(422).json({ error: "Please add all fields." });
      return;
    }

    const newComment = new Comment({
      content,
      createdAt: new Date(),
      author,
      post: postId,
    });

    console.log(`💾 [DB WRITE] Saving comment to MongoDB...`);
    const savedComment = await newComment.save();
    console.log(`✅ [DB WRITE SUCCESS] Comment saved with ID: ${savedComment._id}`);

    console.log(`📬 [DB UPDATE] Adding comment to post ${postId}...`);
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment },
    });
    console.log(`✅ [DB UPDATE SUCCESS] Post ${postId} updated with new comment`);

    res.json(savedComment);
    res.status(201);
  } catch (err) {
    console.error("❌ [COMMENT ERROR] Failed to create comment:", (err as Error).message);
    res.status(409).json({ error: (err as Error).message });
  }
};

export const allComments = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(`📬 [DB QUERY] Fetching all comments for post ${req.params.id}...`);
    const post = await Post.findById(req.params.id).populate("comments");
    console.log(`✅ [DB SUCCESS] Retrieved ${post?.comments?.length || 0} comments`);

    res.status(200).json(post?.comments);
  } catch (error) {
    console.error("❌ [COMMENT ERROR] Failed to fetch comments:", (error as Error).message);
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).send(comment);
  } catch (error) {
    res.status(409).json({ message: (error as Error).message });
  }
};

export const editComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(comment);
  } catch (error) {
    res.status(409).json({ message: (error as Error).message });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).send("No comment with that id");
      return;
    }

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: req.params.id },
    });

    res.send({ message: "Comment deleted." });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeComment = async (_req: Request, res: Response): Promise<void> => {
  // TODO: Implement like functionality for comments
  res.json({ message: "Not yet implemented" });
};

export const dislikeComment = async (
  _req: Request,
  res: Response
): Promise<void> => {
  // TODO: Implement dislike functionality for comments
  res.json({ message: "Not yet implemented" });
};
