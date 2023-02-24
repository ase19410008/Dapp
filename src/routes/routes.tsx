import {
  createBrowserRouter, Navigate,
} from "react-router-dom";

import ErrorPage from "../error-page";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import School from "./School/index";
import Edit from "./School/Edit";
import DashBoard from "./DashBoard/DashBoard";
import Home from "./Home/Home";
import User from "./Home/User";
import Orders from "./DashBoard/Orders";
import Customers from "./DashBoard/Customers";
import Reports from "./DashBoard/Reports";
import Index from "./DashBoard/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'users/:uid',
    element: <User />,
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
    children: [
      { index: true, element: <Index /> },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "reports",
        element: <Reports />,
      }
    ]
  },
]);

export default router;