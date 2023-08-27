import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logedInMe } from "./features/auth/authApiSlice";
import { authData, setMessageEmpty } from "./features/auth/authSlice";
import { toastify } from "./utility/toast";

function App() {
  const dispatch = useDispatch();
  const { message, success, error } = useSelector(authData);
  useEffect(() => {
    dispatch(logedInMe());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toastify(error);
    }
    if (message) {
      toastify(message, "success");
    }
    if (message || success || error) {
      setMessageEmpty();
    }
  }, [message, success, error]);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999999999 }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
