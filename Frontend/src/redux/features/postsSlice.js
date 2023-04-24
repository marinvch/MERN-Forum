import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    viewPost(state, action) {
      state.posts = state.posts.filter((post) => post.id === action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { getPosts, viewPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
