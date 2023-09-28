import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { logedInMe } from "./features/auth/authApiSlice";
import { getAllPhotos } from "./features/photos/photosApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(logedInMe());
    }
    dispatch(getAllPhotos());
  }, [dispatch]);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999999999 }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
