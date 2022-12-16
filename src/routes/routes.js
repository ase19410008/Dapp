import {
  createBrowserRouter,
} from "react-router-dom";

import ErrorPage from "../error-page";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import School from "./School/index";
import Edit from "./School/Edit";
import DashBoard from "./DashBoard/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/school",
    element: <School />,
  },
  {
    path: "/school/edit",
    element: <Edit />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
]);

export default router;