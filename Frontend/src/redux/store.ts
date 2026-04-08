import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import errorAuthReducer from "../features/auth/errorAuthSlice.js";
import postsReducer from "../features/forum/slices/postsSlice.js";
import { authApi } from "../features/auth/authApi.js";
import { postApi } from "../features/forum/api/postsApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authError: errorAuthReducer,
    posts: postsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
