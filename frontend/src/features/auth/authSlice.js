import { createSlice } from "@reduxjs/toolkit";
import { logedInMe, login, register } from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload.message;
        state.auth = action.payload.user;
      })
      .addCase(logedInMe.rejected, (state, action) => {
        state.auth = null;
      })
      .addCase(logedInMe.fulfilled, (state, action) => {
        state.success = true;
        state.auth = action.payload;
      });
  },
});

export const authData = (state) => state.auth;

// Export Reducer Actions
export const { setMessageEmpty } = authSlice.actions;

export default authSlice.reducer;
