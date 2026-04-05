import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import errorAuthReducer from "./features/errorAuthSlice.js";
import postsReducer from "./features/postsSlice.js";
import { authApi } from "./services/authApi.js";
import { postApi } from "./services/postApi.js";

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
