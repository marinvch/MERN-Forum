import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoading(state, action) {
      state.isLoading = true
    },
    userLoaded(state, action) {
      state.isAuthenticated = true
      state.isLoading = false
      state.user = action.payload.user
    },
    loginSuccess(state, action) {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload;
    },
    registerSuccess(state, action) {
      state.isAuthenticated = true
      state.isLoading = false
      state.user = action.payload;
    },
    logoutSuccess: () => initialState,
  }
})

export const { userLoading, userLoaded, loginSuccess, registerSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer;


