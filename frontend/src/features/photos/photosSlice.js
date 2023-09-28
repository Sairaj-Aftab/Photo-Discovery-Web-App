import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePhoto,
  getAllPhotos,
  searchPhotos,
} from "./photosApiSlice";

const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photos: null,
    loader: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    setPhotoMessageEmpty: (state, action) => {
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.success = true;
        state.photos = state.photos ?? [];
        state.photos.push(action.payload.post);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllPhotos.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllPhotos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.success = true;
        state.loader = false;
      })
      .addCase(searchPhotos.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(searchPhotos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload.photos;
        state.success = true;
        state.loader = false;
      })
      .addCase(deletePhoto.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.photos = state.photos.filter(
          (data) => data._id !== action.payload.delete._id
        );
        state.success = true;
        state.loader = false;
        state.message = action.payload.message;
      });
  },
});

export const photosData = (state) => state.photos;

// Export Reducer Actions
export const { setPhotoMessageEmpty } = photosSlice.actions;

export default photosSlice.reducer;
