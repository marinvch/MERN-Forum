// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  posts?: string[];
  comments?: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

// Post Types
export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

// Comment Types
export interface Comment {
  _id: string;
  content: string;
  author: string;
  createdAt: string;
  post: string;
}

// Error Types
export interface ErrorState {
  message: string;
  code?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  token?: string;
}

export interface RegisterPayload {
  email: string;
  username?: string;
  password: string;
  repeatPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
}

export interface CreateCommentPayload {
  content: string;
  author: string;
  postId: string;
}
