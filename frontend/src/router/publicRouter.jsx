import TopBar from "../components/TopBar/TopBar";
import Home from "../pages/Home/Home";
import UserProfile from "../pages/UserProfile/UserProfile";
import RootLayout from "../rootLayout/RootLayout";

const publicRouter = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:userName",
        element: <UserProfile />,
      },
    ],
  },
];

export default publicRouter;
