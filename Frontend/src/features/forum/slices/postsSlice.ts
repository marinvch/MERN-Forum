import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "../../../types/index";

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    getPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
      state.isLoading = false;
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setLoading, getPosts, createPost, updatePost, deletePost, setError, clearError } = postsSlice.actions;
export default postsSlice.reducer;
