import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/index.js";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoading(state) {
      state.isLoading = true;
    },
    userLoaded(state, action: PayloadAction<{ user: User }>) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    },
  },
});

export const { userLoading, userLoaded, loginSuccess, registerSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
