import { createBrowserRouter } from "react-router-dom";
import Orders from "./pages/Orders/Orders";
import SongsOrder from "./pages/SongsOrder/SongsOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Orders />,
  },
  {
    path: "/add",
    element: <SongsOrder />,
  },
  {
    path: "/edit/:id",
    element: <SongsOrder />,
  },
]);
