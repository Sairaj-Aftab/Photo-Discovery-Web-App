import { createSlice } from "@reduxjs/toolkit";
import {
  editProfile,
  getSingleUser,
  logOut,
  logedInMe,
  login,
  register,
} from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    singleUser: null,
    loader: false,
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
      .addCase(register.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(login.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload.message;
        state.auth = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.loader = false;
      })
      .addCase(logedInMe.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(logedInMe.rejected, (state, action) => {
        state.auth = null;
        state.loader = false;
      })
      .addCase(logedInMe.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.loader = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = "Log out faiied!";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.auth = null;
        localStorage.removeItem("user");
        state.success = true;
      })
      .addCase(editProfile.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.success = true;
        state.auth = action.payload.data;
        state.loader = false;
      })
      .addCase(getSingleUser.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.success = true;
        state.singleUser = action.payload.user;
        state.loader = false;
      });
  },
});

export const authData = (state) => state.auth;

// Export Reducer Actions
export const { setMessageEmpty } = authSlice.actions;

export default authSlice.reducer;
