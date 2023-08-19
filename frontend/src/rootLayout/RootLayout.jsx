import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";

const RootLayout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
