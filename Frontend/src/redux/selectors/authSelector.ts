import { RootState } from "../store.js";

export const authSelector = (state: RootState) => state.auth;

export const userSelector = (state: RootState) => state.auth.user;

export const isAuthenticatedSelector = (state: RootState) =>
  state.auth.isAuthenticated;

export const isLoadingSelector = (state: RootState) => state.auth.isLoading;

export const authErrorSelector = (state: RootState) => state.authError;
