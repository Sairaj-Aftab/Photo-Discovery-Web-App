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
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
