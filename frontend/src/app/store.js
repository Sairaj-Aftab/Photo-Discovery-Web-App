import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import photosSlice from "../features/photos/photosSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    photos: photosSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
