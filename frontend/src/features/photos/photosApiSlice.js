import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "photos/create_post",
  async ({ data }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/photos/create_post`,
        data,
        {
          withCredentials: true,
          onUploadProgress: (dat) => {
            console.log("Progress Event:", dat);
            console.log(Math.round((dat.loaded / dat.total) * 100));
            // setLoading(Math.round((data.loaded / data.total) * 100));
          },
          // cancelToken: cancelSource.token,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get All Photos
export const getAllPhotos = createAsyncThunk(
  "photos/getAllPhotos",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/photos`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Get Search Photos
export const searchPhotos = createAsyncThunk(
  "photos/searchPhotos",
  async ({ search }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/photos/search`,
        { search },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Photos
export const deletePhoto = createAsyncThunk(
  "photos/deletePhoto",
  async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/photos/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
