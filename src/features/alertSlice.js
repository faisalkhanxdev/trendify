import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    clearAlert: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
