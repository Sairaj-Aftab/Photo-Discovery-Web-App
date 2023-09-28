import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authData } from "../features/auth/authSlice";

const PrivateRouteGird = () => {
  const { auth } = useSelector(authData);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouteGird;
