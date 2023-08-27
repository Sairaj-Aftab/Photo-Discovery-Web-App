import { createSlice } from "@reduxjs/toolkit";
import {
  editProfile,
  logOut,
  logedInMe,
  login,
  register,
} from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null,
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
        localStorage.setItem("data", JSON.stringify(action.payload.user));
      })
      .addCase(logedInMe.rejected, (state, action) => {
        state.auth = null;
      })
      .addCase(logedInMe.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = "Log out faiied!";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.success = true;
        state.auth = null;
        localStorage.removeItem("data");
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.success = true;
        state.auth = action.payload.data;
      });
  },
});

export const authData = (state) => state.auth;

// Export Reducer Actions
export const { setMessageEmpty } = authSlice.actions;

export default authSlice.reducer;
