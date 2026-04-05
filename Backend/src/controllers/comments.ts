import { Request, Response } from "express";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { CreateCommentRequest, AuthRequest } from "../types/index.js";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

    const savedComment = await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment },
    });

    res.json(savedComment);
    res.status(201);
  } catch (err) {
    res.status(409).json({ error: (err as Error).message });
  }
};

export const allComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");

    res.status(200).json(post?.comments);
  } catch (error) {
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

export const likeComment = async (req: Request, res: Response): Promise<void> => {
  // TODO: Implement like functionality for comments
  res.json({ message: "Not yet implemented" });
};

export const dislikeComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: Implement dislike functionality for comments
  res.json({ message: "Not yet implemented" });
};
