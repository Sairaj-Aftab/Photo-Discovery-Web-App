import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/user/register`,
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Login User
export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/user/login`,
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// Loged In Me
export const logedInMe = createAsyncThunk("user/loginme", async () => {
  try {
    const response = await axios.get(
      `http://localhost:5050/api/v1/user/logedIn`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// Log Out
export const logOut = createAsyncThunk("user/logOut", async () => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/user/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// Edit Profile or Update
export const editProfile = createAsyncThunk(
  "user/editprofile",
  async ({ data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/user/edit_user`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// get Single User
export const getSingleUser = createAsyncThunk("user/singleUser", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5050/api/v1/user/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
