import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: {},
  status: null,
  id: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    getErrors(state, action) {
      state.msg = action.payload.msg
      state.status = action.payload.status
      state.id = action.payload.id
    },
    clearErrors(state) {
      state.msg = {}
      state.status = null
      state.id = null
    },
  },
})

export const { getErrors, clearErrors } = errorSlice.actions
export default errorSlice.reducer
