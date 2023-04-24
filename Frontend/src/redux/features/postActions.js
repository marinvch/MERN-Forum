import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllPosts, getPost } from "../services/postService";
import axios from "axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getAllPosts();
  return response.data;
});


export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await axios.get("/api/posts");
  return response.data;
});

export const viewCurrentPost = createAsyncThunk('posts/viewCurrentPost', async (id) => {
  const response = await getPost(id);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null
  },
  reducers: {
    deletePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    editPost(state, action) {
      const post = action.payload;
      const existingPost = state.posts.find((p) => p.id === post.id);
      if (existingPost) {
        existingPost.title = post.title;
        existingPost.body = post.body;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = [];
        state.error = action.error.message;
      })
      .addCase(viewCurrentPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewCurrentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(viewCurrentPost.rejected, (state, action) => {
        state.isLoading = false;
        state.currentPost = null;
        state.error = action.error.message;
      })
  }
});

export const { deletePost, editPost } = postsSlice.actions;
export default postsSlice.reducer;


