import { RootState } from "../store.js";

export const postsSelector = (state: RootState) => state.posts.posts;

export const postsLoadingSelector = (state: RootState) => state.posts.isLoading;

export const postsErrorSelector = (state: RootState) => state.posts.error;
