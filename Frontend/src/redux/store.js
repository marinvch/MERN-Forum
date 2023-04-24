import { configureStore } from '@reduxjs/toolkit'

import authReducers from "./features/authSlice";
import errorAuthReducer from "./features/errorAurhSlice";
import postsReducer from "./features/postsSlice";


const store = configureStore({
  reducer: {
    auth: authReducers,
    authError: errorAuthReducer,
    posts: postsReducer,
  }
});

export default store;
