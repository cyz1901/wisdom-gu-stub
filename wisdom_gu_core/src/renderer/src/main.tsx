import "./index.css";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  //development
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>

  //production
  <RouterProvider router={router} />
);
