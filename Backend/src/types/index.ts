import { Request } from "express";

export interface UserPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  repeatPassword: string;
  username?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface CreateCommentRequest {
  content: string;
  date?: string;
  author: string;
  postId: string;
}
