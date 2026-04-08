import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState } from "../../types/index.js";

const initialState: ErrorState = {
  message: "",
  code: undefined,
};

const errorAuthSlice = createSlice({
  name: "authError",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{ message: string; code?: string }>) {
      state.message = action.payload.message;
      state.code = action.payload.code;
    },
    clearError(state) {
      state.message = "";
      state.code = undefined;
    },
  },
});

export const { setError, clearError } = errorAuthSlice.actions;
export default errorAuthSlice.reducer;
