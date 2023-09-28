import Profile from "../pages/Profile/Profile";
import RootLayout from "../rootLayout/RootLayout";
import PrivateRouteGird from "./PrivateRouteGrid";

const privateRouter = [
  {
    element: <RootLayout />,
    children: [
      {
        element: <PrivateRouteGird />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default privateRouter;
