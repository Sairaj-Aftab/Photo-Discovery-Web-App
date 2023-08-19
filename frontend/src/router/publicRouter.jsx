import TopBar from "../components/TopBar/TopBar";
import Home from "../pages/Home/Home";
import RootLayout from "../rootLayout/RootLayout";

const publicRouter = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];

export default publicRouter;
