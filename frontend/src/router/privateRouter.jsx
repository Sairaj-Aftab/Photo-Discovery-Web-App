import Profile from "../pages/Profile/Profile";
import RootLayout from "../rootLayout/RootLayout";

const privateRouter = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];

export default privateRouter;
